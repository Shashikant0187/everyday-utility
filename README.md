# Everyday Utility — Salary Calculator targeted patch

This patch contains targeted, low-risk improvements to the uploaded Salary Calculator implementation.

## Files
- `components/SalaryCalculator.tsx` — associates labels with their inputs, safely sanitizes numeric input, enforces configured UI maxima, and prevents variable pay/employer PF/gratuity fields from exceeding the available CTC components.
- `lib/salaryCalculator.ts` — current salary calculation engine, included unchanged for a complete dependency set.
- `lib/incomeTax.ts` — current tax engine with defensive handling for non-finite gross-salary and age inputs.

## Apply
Copy these files into the corresponding locations in the existing Next.js project. Back up the current files first. Do not replace routing, tool catalog, global CSS, or other files with this patch.

## Important
This patch does not certify the tax engine as legally authoritative for FY 2026–27. The tax slab/rebate/surcharge assumptions still need to be checked against the applicable official rules and tested with reference examples before relying on results for financial decisions. It also does not include the full project, so a full application build cannot be run from this patch alone.

## Run included smoke tests
From this folder, run:

```sh
tsc --strict --target ES2020 --module commonjs --outDir build lib/incomeTax.ts lib/salaryCalculator.ts
node tests/smoke-test.cjs
```
