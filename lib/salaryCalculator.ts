import { calculateIncomeTax } from "./incomeTax";

export type SalaryTaxRegime = "new" | "old";

export interface SalaryInput {
  annualCtc: number;
  variablePay: number;
  employerPf: number;
  gratuity: number;
  employeePf: number;
  professionalTax: number;
  otherMonthlyDeductions: number;
  age: number;
  residentIndividual: boolean;
  taxRegime: SalaryTaxRegime;
  deduction80C: number;
  deduction80D: number;
  nps: number;
  hra: number;
  homeLoanInterest: number;
  otherDeductions: number;
}

export interface SalaryBreakdown {
  annualCtc: number;
  annualVariablePay: number;
  annualEmployerPf: number;
  annualGratuity: number;
  annualGrossSalary: number;
  annualEmployeePf: number;
  annualProfessionalTax: number;
  annualOtherDeductions: number;
  annualIncomeTax: number;
  annualTakeHome: number;
  monthlyGrossSalary: number;
  monthlyEmployeePf: number;
  monthlyProfessionalTax: number;
  monthlyOtherDeductions: number;
  monthlyIncomeTax: number;
  monthlyTakeHome: number;
  annualTaxableSalary: number;
  effectiveIncomeTaxRate: number;
  employerComponentsTotal: number;
  annualFixedGross: number;
}

const nonNegative = (n: number) => Number.isFinite(n) ? Math.max(0, n) : 0;
const capped = (n: number, cap: number) => Math.min(nonNegative(n), cap);

export function calculateSalary(input: SalaryInput): SalaryBreakdown {
  const ctc = nonNegative(input.annualCtc);
  const variablePay = Math.min(nonNegative(input.variablePay), ctc);
  const employerPf = Math.min(nonNegative(input.employerPf), ctc - variablePay);
  const gratuity = Math.min(nonNegative(input.gratuity), Math.max(0, ctc - variablePay - employerPf));

  // CTC may include variable pay, employer PF and gratuity. These are excluded
  // from fixed gross salary to avoid presenting them as monthly cash earnings.
  const annualFixedGross = Math.max(0, ctc - variablePay - employerPf - gratuity);
  const annualGrossSalary = annualFixedGross + variablePay;

  const annualEmployeePf = nonNegative(input.employeePf);
  const annualProfessionalTax = nonNegative(input.professionalTax);
  const annualOtherDeductions = nonNegative(input.otherMonthlyDeductions) * 12;

  const tax = calculateIncomeTax({
    grossSalary: annualGrossSalary,
    age: input.age,
    residentIndividual: input.residentIndividual,
    deduction80C: capped(input.deduction80C, 150_000),
    deduction80D: capped(input.deduction80D, 100_000),
    nps: capped(input.nps, 50_000),
    hra: nonNegative(input.hra),
    homeLoanInterest: nonNegative(input.homeLoanInterest),
    otherDeductions: nonNegative(input.otherDeductions),
  }, input.taxRegime);

  const annualTakeHome = Math.max(
    0,
    annualGrossSalary -
      annualEmployeePf -
      annualProfessionalTax -
      annualOtherDeductions -
      tax.totalTax
  );

  return {
    annualCtc: ctc,
    annualVariablePay: variablePay,
    annualEmployerPf: employerPf,
    annualGratuity: gratuity,
    annualGrossSalary,
    annualEmployeePf,
    annualProfessionalTax,
    annualOtherDeductions,
    annualIncomeTax: tax.totalTax,
    annualTakeHome,
    monthlyGrossSalary: annualGrossSalary / 12,
    monthlyEmployeePf: annualEmployeePf / 12,
    monthlyProfessionalTax: annualProfessionalTax / 12,
    monthlyOtherDeductions: annualOtherDeductions / 12,
    monthlyIncomeTax: tax.totalTax / 12,
    monthlyTakeHome: annualTakeHome / 12,
    annualTaxableSalary: tax.taxableIncome,
    effectiveIncomeTaxRate: tax.effectiveTaxRate,
    employerComponentsTotal: variablePay + employerPf + gratuity,
    annualFixedGross,
  };
}
