export type TaxRegime = "old" | "new";

export interface IncomeTaxInput {
  grossSalary: number;
  age: number;

  // 87A eligibility
  residentIndividual?: boolean;

  // Old-regime eligible deductions
  deduction80C?: number;
  deduction80D?: number;
  nps?: number;
  hra?: number;
  homeLoanInterest?: number;
  otherDeductions?: number;
}

export interface TaxCalculation {
  regime: TaxRegime;

  grossSalary: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;

  incomeTaxBeforeRebate: number;
  rebate: number;
  incomeTax: number;

  surchargeRate: number;
  surchargeBeforeRelief: number;
  surchargeRelief: number;
  surcharge: number;

  cess: number;
  totalTax: number;

  effectiveTaxRate: number;
  monthlyTax: number;
}

const NEW_STANDARD_DEDUCTION = 75_000;
const OLD_STANDARD_DEDUCTION = 50_000;

const CESS_RATE = 0.04;

function roundToTen(value: number): number {
  return Math.round(value / 10) * 10;
}

function calculateNewRegimeTax(
  taxableIncome: number
): number {
  let income = taxableIncome;
  let tax = 0;

  if (income > 2_400_000) {
    tax += (income - 2_400_000) * 0.30;
    income = 2_400_000;
  }

  if (income > 2_000_000) {
    tax += (income - 2_000_000) * 0.25;
    income = 2_000_000;
  }

  if (income > 1_600_000) {
    tax += (income - 1_600_000) * 0.20;
    income = 1_600_000;
  }

  if (income > 1_200_000) {
    tax += (income - 1_200_000) * 0.15;
    income = 1_200_000;
  }

  if (income > 800_000) {
    tax += (income - 800_000) * 0.10;
    income = 800_000;
  }

  if (income > 400_000) {
    tax += (income - 400_000) * 0.05;
  }

  return tax;
}

function calculateOldRegimeTax(
  taxableIncome: number,
  age: number
): number {
  let basicExemption = 250_000;

  if (age >= 60 && age < 80) {
    basicExemption = 300_000;
  }

  if (age >= 80) {
    basicExemption = 500_000;
  }

  let income = taxableIncome;
  let tax = 0;

  if (income > 1_000_000) {
    tax += (income - 1_000_000) * 0.30;
    income = 1_000_000;
  }

  if (income > 500_000) {
    tax += (income - 500_000) * 0.20;
    income = 500_000;
  }

  if (income > basicExemption) {
    tax += (income - basicExemption) * 0.05;
  }

  return tax;
}

function apply87ARebate(
  tax: number,
  taxableIncome: number,
  regime: TaxRegime,
  residentIndividual: boolean
): {
  tax: number;
  rebate: number;
} {
  if (!residentIndividual) {
    return {
      tax,
      rebate: 0,
    };
  }

  // New regime
  if (regime === "new") {
    if (taxableIncome <= 1_200_000) {
      const rebate = Math.min(tax, 60_000);

      return {
        tax: tax - rebate,
        rebate,
      };
    }

    /*
     * Marginal relief around ₹12 lakh.
     *
     * Tax should not exceed the amount by which
     * taxable income exceeds ₹12 lakh.
     */
    const excessIncome =
      taxableIncome - 1_200_000;

    if (tax > excessIncome) {
      const relief = tax - excessIncome;

      return {
        tax: tax - relief,
        rebate: relief,
      };
    }
  }

  // Old regime
  if (
    regime === "old" &&
    taxableIncome <= 500_000
  ) {
    const rebate = Math.min(tax, 12_500);

    return {
      tax: tax - rebate,
      rebate,
    };
  }

  return {
    tax,
    rebate: 0,
  };
}

function getSurchargeRate(
  taxableIncome: number,
  regime: TaxRegime
): number {
  if (taxableIncome <= 5_000_000) {
    return 0;
  }

  if (taxableIncome <= 10_000_000) {
    return 0.10;
  }

  if (taxableIncome <= 20_000_000) {
    return 0.15;
  }

  if (taxableIncome <= 50_000_000) {
    return 0.25;
  }

  // Above ₹5 crore
  return regime === "new" ? 0.25 : 0.37;
}

function calculateTaxAtThreshold(
  threshold: number,
  regime: TaxRegime,
  age: number,
  residentIndividual: boolean
): number {
  const taxBeforeRebate =
    regime === "new"
      ? calculateNewRegimeTax(threshold)
      : calculateOldRegimeTax(
          threshold,
          age
        );

  const rebateResult = apply87ARebate(
    taxBeforeRebate,
    threshold,
    regime,
    residentIndividual
  );

  return rebateResult.tax;
}

function applySurchargeMarginalRelief(
  taxableIncome: number,
  incomeTax: number,
  surcharge: number,
  regime: TaxRegime,
  age: number,
  residentIndividual: boolean
): {
  surcharge: number;
  surchargeRelief: number;
} {
  let threshold = 0;

  if (
    taxableIncome > 5_000_000 &&
    taxableIncome <= 10_000_000
  ) {
    threshold = 5_000_000;
  } else if (
    taxableIncome > 10_000_000 &&
    taxableIncome <= 20_000_000
  ) {
    threshold = 10_000_000;
  } else if (
    taxableIncome > 20_000_000 &&
    taxableIncome <= 50_000_000
  ) {
    threshold = 20_000_000;
  } else if (
    taxableIncome > 50_000_000 &&
    regime === "old"
  ) {
    threshold = 50_000_000;
  }

  if (threshold === 0) {
    return {
      surcharge,
      surchargeRelief: 0,
    };
  }

  const taxAtThreshold =
    calculateTaxAtThreshold(
      threshold,
      regime,
      age,
      residentIndividual
    );

  const totalTaxBeforeRelief =
    incomeTax + surcharge;

  const maximumAllowed =
    taxAtThreshold +
    (taxableIncome - threshold);

  if (
    totalTaxBeforeRelief > maximumAllowed
  ) {
    const surchargeRelief =
      totalTaxBeforeRelief -
      maximumAllowed;

    return {
      surcharge: Math.max(
        0,
        surcharge - surchargeRelief
      ),
      surchargeRelief,
    };
  }

  return {
    surcharge,
    surchargeRelief: 0,
  };
}

export function calculateIncomeTax(
  input: IncomeTaxInput,
  regime: TaxRegime
): TaxCalculation {
  const grossSalary = Math.max(
    0,
    input.grossSalary
  );

  const age = Math.max(
    0,
    input.age
  );

  const residentIndividual =
    input.residentIndividual ?? true;

  const standardDeduction =
    regime === "new"
      ? NEW_STANDARD_DEDUCTION
      : OLD_STANDARD_DEDUCTION;

  let totalDeductions =
    standardDeduction;

  if (regime === "old") {
    totalDeductions += Math.min(
      Math.max(
        0,
        input.deduction80C ?? 0
      ),
      150_000
    );

    totalDeductions += Math.min(
      Math.max(
        0,
        input.deduction80D ?? 0
      ),
      100_000
    );

    totalDeductions += Math.min(
      Math.max(
        0,
        input.nps ?? 0
      ),
      50_000
    );

    totalDeductions += Math.max(
      0,
      input.hra ?? 0
    );

    totalDeductions += Math.max(
      0,
      input.homeLoanInterest ?? 0
    );

    totalDeductions += Math.max(
      0,
      input.otherDeductions ?? 0
    );
  }

  const taxableIncome = Math.max(
    0,
    grossSalary - totalDeductions
  );

  const incomeTaxBeforeRebate =
    regime === "new"
      ? calculateNewRegimeTax(
          taxableIncome
        )
      : calculateOldRegimeTax(
          taxableIncome,
          age
        );

  const rebateResult =
    apply87ARebate(
      incomeTaxBeforeRebate,
      taxableIncome,
      regime,
      residentIndividual
    );

  const incomeTax =
    rebateResult.tax;

  const surchargeRate =
    getSurchargeRate(
      taxableIncome,
      regime
    );

  const surchargeBeforeRelief =
    incomeTax * surchargeRate;

  const surchargeResult =
    applySurchargeMarginalRelief(
      taxableIncome,
      incomeTax,
      surchargeBeforeRelief,
      regime,
      age,
      residentIndividual
    );

  const surcharge =
    surchargeResult.surcharge;

  const surchargeRelief =
    surchargeResult.surchargeRelief;

  const cess =
    (incomeTax + surcharge) *
    CESS_RATE;

  const rawTotalTax =
    incomeTax +
    surcharge +
    cess;

  const totalTax =
    roundToTen(rawTotalTax);

  const effectiveTaxRate =
    grossSalary > 0
      ? (totalTax / grossSalary) * 100
      : 0;

  const monthlyTax =
    totalTax / 12;

  return {
    regime,

    grossSalary,
    standardDeduction,
    totalDeductions,
    taxableIncome,

    incomeTaxBeforeRebate,
    rebate: rebateResult.rebate,
    incomeTax,

    surchargeRate,
    surchargeBeforeRelief,
    surchargeRelief,
    surcharge,

    cess,
    totalTax,

    effectiveTaxRate,
    monthlyTax,
  };
}