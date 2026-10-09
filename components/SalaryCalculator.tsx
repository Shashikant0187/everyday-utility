"use client";

import { useMemo, useState } from "react";
import {
  calculateSalary,
  type SalaryTaxRegime,
} from "../lib/salaryCalculator";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

function NumberField({
  label,
  value,
  onChange,
  hint,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  max?: number;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="number"
        min="0"
        max={max}
        value={value}
        onChange={(event) =>
          onChange(event.target.value === "" ? 0 : Math.max(0, Number(event.target.value)))
        }
      />
      {hint && <small className="muted">{hint}</small>}
    </div>
  );
}

function ResultRow({ label, value, strong = false }: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="salary-result-row">
      <span>{label}</span>
      {strong ? <strong>{value}</strong> : <b>{value}</b>}
    </div>
  );
}

export default function SalaryCalculator() {
  const [annualCtc, setAnnualCtc] = useState(800000);
  const [variablePay, setVariablePay] = useState(0);
  const [employerPf, setEmployerPf] = useState(21600);
  const [gratuity, setGratuity] = useState(11538);
  const [employeePf, setEmployeePf] = useState(21600);
  const [professionalTax, setProfessionalTax] = useState(2400);
  const [otherMonthlyDeductions, setOtherMonthlyDeductions] = useState(0);
  const [age, setAge] = useState(30);
  const [residentIndividual, setResidentIndividual] = useState(true);
  const [taxRegime, setTaxRegime] = useState<SalaryTaxRegime>("new");
  const [deduction80C, setDeduction80C] = useState(0);
  const [deduction80D, setDeduction80D] = useState(0);
  const [nps, setNps] = useState(0);
  const [hra, setHra] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [showOldRegimeDeductions, setShowOldRegimeDeductions] = useState(false);

  const result = useMemo(() => calculateSalary({
    annualCtc,
    variablePay,
    employerPf,
    gratuity,
    employeePf,
    professionalTax,
    otherMonthlyDeductions,
    age,
    residentIndividual,
    taxRegime,
    deduction80C,
    deduction80D,
    nps,
    hra,
    homeLoanInterest,
    otherDeductions,
  }), [
    annualCtc, variablePay, employerPf, gratuity, employeePf,
    professionalTax, otherMonthlyDeductions, age, residentIndividual,
    taxRegime, deduction80C, deduction80D, nps, hra, homeLoanInterest,
    otherDeductions,
  ]);

  return (
    <div className="tool-box salary-calculator">
      <div className="form-grid">
        <NumberField
          label="Annual CTC (₹)"
          value={annualCtc}
          onChange={setAnnualCtc}
          hint="Total annual cost to company."
        />
        <NumberField
          label="Annual variable pay / bonus (₹)"
          value={variablePay}
          onChange={setVariablePay}
          hint="Included in CTC but not guaranteed monthly pay."
        />
        <NumberField
          label="Employer PF included in CTC (annual ₹)"
          value={employerPf}
          onChange={setEmployerPf}
          hint="Set to 0 if not included in your CTC."
        />
        <NumberField
          label="Gratuity included in CTC (annual ₹)"
          value={gratuity}
          onChange={setGratuity}
          hint="Set to 0 if not included or not known."
        />
        <NumberField
          label="Employee PF deduction (annual ₹)"
          value={employeePf}
          onChange={setEmployeePf}
          hint="Your contribution deducted from salary."
        />
        <NumberField
          label="Professional tax (annual ₹)"
          value={professionalTax}
          onChange={setProfessionalTax}
          hint="Enter the annual amount for your state."
        />
        <NumberField
          label="Other monthly deductions (₹)"
          value={otherMonthlyDeductions}
          onChange={setOtherMonthlyDeductions}
          hint="Insurance, meal card recovery or other payroll deductions."
        />
        <NumberField label="Age" value={age} onChange={setAge} />
      </div>

      <div className="field salary-checkbox">
        <label>
          <input
            type="checkbox"
            checked={residentIndividual}
            onChange={(event) => setResidentIndividual(event.target.checked)}
          />
          Resident individual for income-tax rebate eligibility
        </label>
      </div>

      <div className="field">
        <label>Income-tax regime</label>
        <select
          value={taxRegime}
          onChange={(event) => setTaxRegime(event.target.value as SalaryTaxRegime)}
        >
          <option value="new">New regime</option>
          <option value="old">Old regime</option>
        </select>
      </div>

      <button
        type="button"
        className="primary salary-toggle"
        onClick={() => setShowOldRegimeDeductions((value) => !value)}
      >
        {showOldRegimeDeductions ? "Hide" : "Add"} old-regime tax deductions
      </button>

      {showOldRegimeDeductions && (
        <div className="form-grid salary-deductions">
          <NumberField label="Eligible Section 80C amount (₹/year)" value={deduction80C} onChange={setDeduction80C} max={150000} hint="Maximum ₹1,50,000." />
          <NumberField label="Eligible Section 80D amount (₹/year)" value={deduction80D} onChange={setDeduction80D} max={100000} hint="Enter the eligible amount; model cap ₹1,00,000." />
          <NumberField label="Eligible NPS deduction (₹/year)" value={nps} onChange={setNps} max={50000} hint="Model cap ₹50,000." />
          <NumberField label="Eligible HRA exemption (₹/year)" value={hra} onChange={setHra} />
          <NumberField label="Eligible home-loan interest (₹/year)" value={homeLoanInterest} onChange={setHomeLoanInterest} />
          <NumberField label="Other eligible deductions (₹/year)" value={otherDeductions} onChange={setOtherDeductions} />
        </div>
      )}

      <div className="result salary-primary-result">
        <span>Estimated monthly in-hand salary</span>
        <strong>{money(result.monthlyTakeHome)}</strong>
        <div className="cards">
          <div className="mini"><small>Monthly gross</small><b>{money(result.monthlyGrossSalary)}</b></div>
          <div className="mini"><small>Monthly income tax</small><b>{money(result.monthlyIncomeTax)}</b></div>
          <div className="mini"><small>Annual take-home</small><b>{money(result.annualTakeHome)}</b></div>
        </div>
      </div>

      <section className="salary-breakdown">
        <h3>Annual salary breakdown</h3>
        <ResultRow label="Annual CTC" value={money(result.annualCtc)} />
        <ResultRow label="Less: variable pay / bonus" value={`− ${money(result.annualVariablePay)}`} />
        <ResultRow label="Less: employer PF included in CTC" value={`− ${money(result.annualEmployerPf)}`} />
        <ResultRow label="Less: gratuity included in CTC" value={`− ${money(result.annualGratuity)}`} />
        <ResultRow label="Annual gross salary used for estimate" value={money(result.annualGrossSalary)} strong />
        <ResultRow label="Annual taxable income (estimated)" value={money(result.annualTaxableSalary)} />
        <ResultRow label="Employee PF" value={money(result.annualEmployeePf)} />
        <ResultRow label="Professional tax" value={money(result.annualProfessionalTax)} />
        <ResultRow label="Other payroll deductions" value={money(result.annualOtherDeductions)} />
        <ResultRow label="Estimated annual income tax" value={money(result.annualIncomeTax)} />
        <ResultRow label="Estimated annual take-home" value={money(result.annualTakeHome)} strong />
      </section>

      <p className="muted salary-disclaimer">
        Estimate only. Actual payslips depend on your salary structure, PF wage
        rules, state professional-tax rules, tax eligibility and employer policy.
        This tool uses the site's Income Tax Calculator for the selected regime.
        Verify your employer's CTC breakup and current tax rules before making
        financial decisions.
      </p>
    </div>
  );
}
