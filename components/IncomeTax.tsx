"use client";

import { useMemo, useState } from "react";

import {
  calculateIncomeTax,
  type TaxRegime,
} from "../lib/incomeTax";

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

type InputValue = number | "";

function Input({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  value: InputValue;
  onChange: (value: InputValue) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="field">
      <label>{label}</label>

      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const value = e.target.value;

          onChange(value === "" ? "" : Number(value));
        }}
      />
    </div>
  );
}

function toNumber(value: InputValue) {
  return value === "" ? 0 : value;
}

function ResultRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 20,
        padding: "10px 0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <span>{label}</span>

      {strong ? (
        <strong>{value}</strong>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}

function RegimeSummary({
  title,
  result,
}: {
  title: string;
  result: ReturnType<typeof calculateIncomeTax>;
}) {
  return (
    <div
      style={{
        border: "1px solid #dbe3ec",
        borderRadius: 14,
        padding: 20,
        background: "#fff",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 16,
        }}
      >
        {title}
      </h3>

      <ResultRow
        label="Taxable income"
        value={money(result.taxableIncome)}
      />

      <ResultRow
        label="Income tax"
        value={money(result.incomeTax)}
      />

      <ResultRow
        label="Surcharge"
        value={money(result.surcharge)}
      />

      <ResultRow
        label="Cess"
        value={money(result.cess)}
      />

      <div
        style={{
          marginTop: 14,
          paddingTop: 14,
        }}
      >
        <ResultRow
          label="Total tax"
          value={money(result.totalTax)}
          strong
        />
      </div>
    </div>
  );
}

export default function IncomeTax() {
  /*
   * Keep numeric inputs as number | "".
   *
   * This is important because HTML number inputs need to be
   * temporarily empty while the user is editing them.
   */
  const [salary, setSalary] = useState<InputValue>("");

  const [age, setAge] = useState<InputValue>("");

  const [regime, setRegime] =
    useState<"new" | "old" | "compare">("compare");

  const [resident, setResident] = useState(true);

  const [deduction80C, setDeduction80C] =
    useState<InputValue>("");

  const [deduction80D, setDeduction80D] =
    useState<InputValue>("");

  const [nps, setNps] =
    useState<InputValue>("");

  const [hra, setHra] =
    useState<InputValue>("");

  const [homeLoanInterest, setHomeLoanInterest] =
    useState<InputValue>("");

  const [otherDeductions, setOtherDeductions] =
    useState<InputValue>("");

  /*
   * Convert empty inputs to 0 only when sending
   * values to the tax calculation engine.
   */
  const input = useMemo(
    () => ({
      grossSalary: toNumber(salary),

      age: toNumber(age),

      residentIndividual: resident,

      deduction80C: toNumber(deduction80C),

      deduction80D: toNumber(deduction80D),

      nps: toNumber(nps),

      hra: toNumber(hra),

      homeLoanInterest: toNumber(homeLoanInterest),

      otherDeductions: toNumber(otherDeductions),
    }),
    [
      salary,
      age,
      resident,
      deduction80C,
      deduction80D,
      nps,
      hra,
      homeLoanInterest,
      otherDeductions,
    ]
  );

  const newTax = useMemo(
    () => calculateIncomeTax(input, "new"),
    [input]
  );

  const oldTax = useMemo(
    () => calculateIncomeTax(input, "old"),
    [input]
  );

  const recommended: TaxRegime =
    newTax.totalTax <= oldTax.totalTax
      ? "new"
      : "old";

  const savings = Math.abs(
    newTax.totalTax - oldTax.totalTax
  );

  const selected =
    regime === "new"
      ? newTax
      : oldTax;

  return (
    <div className="tool-box">
      <h2
        style={{
          marginTop: 0,
        }}
      >
        Income Tax Calculator
      </h2>

      <p className="muted">
        Estimate income tax for FY 2026-27 (AY 2027-28)
        for a salaried individual.
      </p>

      <div className="form-grid">
        <Input
          label="Annual gross salary (₹)"
          value={salary}
          onChange={setSalary}
          min={0}
        />

        <Input
          label="Age"
          value={age}
          onChange={setAge}
          min={0}
          max={120}
        />
      </div>

      <div className="field">
        <label>Tax regime</label>

        <select
          value={regime}
          onChange={(e) =>
            setRegime(
              e.target.value as
                | "new"
                | "old"
                | "compare"
            )
          }
        >
          <option value="compare">
            Compare New vs Old
          </option>

          <option value="new">
            New Tax Regime
          </option>

          <option value="old">
            Old Tax Regime
          </option>
        </select>
      </div>

      <div
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 12,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={resident}
            onChange={(e) =>
              setResident(e.target.checked)
            }
          />

          Resident individual
        </label>
      </div>

      {regime !== "new" && (
        <>
          <h3
            style={{
              marginTop: 30,
            }}
          >
            Old Regime Deductions
          </h3>

          <p className="muted">
            Enter eligible deduction amounts. The calculator
            applies the limits used by this calculator.
          </p>

          <div className="form-grid">
            <Input
              label="80C eligible deduction (₹)"
              value={deduction80C}
              onChange={setDeduction80C}
              max={150000}
            />

            <Input
              label="80D eligible deduction (₹)"
              value={deduction80D}
              onChange={setDeduction80D}
              max={100000}
            />

            <Input
              label="NPS 80CCD(1B) (₹)"
              value={nps}
              onChange={setNps}
              max={50000}
            />

            <Input
              label="Eligible HRA deduction (₹)"
              value={hra}
              onChange={setHra}
            />

            <Input
              label="Eligible home-loan interest (₹)"
              value={homeLoanInterest}
              onChange={setHomeLoanInterest}
            />

            <Input
              label="Other eligible deductions (₹)"
              value={otherDeductions}
              onChange={setOtherDeductions}
            />
          </div>
        </>
      )}

      <div
        className="result"
        style={{
          marginTop: 28,
        }}
      >
        <span>Recommended regime</span>

        <strong>
          {recommended === "new"
            ? "New Tax Regime"
            : "Old Tax Regime"}
        </strong>

        <p>
          Estimated saving:{" "}
          <strong>{money(savings)}</strong>
        </p>
      </div>

      {regime === "compare" && (
        <>
          <h3
            style={{
              marginTop: 32,
            }}
          >
            New vs Old Regime
          </h3>

          <div className="cards">
            <RegimeSummary
              title="New Tax Regime"
              result={newTax}
            />

            <RegimeSummary
              title="Old Tax Regime"
              result={oldTax}
            />
          </div>
        </>
      )}

      {regime !== "compare" && (
        <>
          <h3
            style={{
              marginTop: 32,
            }}
          >
            Tax Result
          </h3>

          <RegimeSummary
            title={
              regime === "new"
                ? "New Tax Regime"
                : "Old Tax Regime"
            }
            result={selected}
          />
        </>
      )}

      <h3
        style={{
          marginTop: 32,
        }}
      >
        Detailed Breakdown
      </h3>

      <div
        style={{
          border: "1px solid #dbe3ec",
          borderRadius: 14,
          padding: 20,
        }}
      >
        <ResultRow
          label="Gross salary"
          value={money(selected.grossSalary)}
        />

        <ResultRow
          label="Standard deduction"
          value={money(selected.standardDeduction)}
        />

        <ResultRow
          label="Total deductions"
          value={money(selected.totalDeductions)}
        />

        <ResultRow
          label="Taxable income"
          value={money(selected.taxableIncome)}
        />

        <ResultRow
          label="Income tax before rebate"
          value={money(selected.incomeTaxBeforeRebate)}
        />

        <ResultRow
          label="Rebate / marginal relief"
          value={money(selected.rebate)}
        />

        <ResultRow
          label="Income tax after relief"
          value={money(selected.incomeTax)}
        />

        <ResultRow
          label="Surcharge"
          value={money(selected.surcharge)}
        />

        <ResultRow
          label="Surcharge marginal relief"
          value={money(selected.surchargeRelief)}
        />

        <ResultRow
          label="Health & Education cess"
          value={money(selected.cess)}
        />

        <ResultRow
          label="Final estimated tax"
          value={money(selected.totalTax)}
          strong
        />

        <ResultRow
          label="Monthly tax equivalent"
          value={money(selected.monthlyTax)}
        />

        <ResultRow
          label="Effective tax rate"
          value={`${selected.effectiveTaxRate.toFixed(2)}%`}
        />
      </div>

      <p
        className="muted"
        style={{
          marginTop: 24,
          fontSize: 13,
        }}
      >
        This calculator is an estimate for salaried
        individuals with ordinary slab-rate income. It
        does not calculate capital gains, special-rate
        income, business income, or file an income-tax
        return. Verify your final tax liability with the
        latest official rules or a tax professional.
      </p>
    </div>
  );
}