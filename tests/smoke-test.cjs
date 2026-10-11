const assert = require('node:assert/strict');
const { calculateIncomeTax } = require('../build/incomeTax.js');
const { calculateSalary } = require('../build/salaryCalculator.js');

const commonSalaryInput = {
  annualCtc: 800000, variablePay: 0, employerPf: 21600, gratuity: 11538,
  employeePf: 21600, professionalTax: 2400, otherMonthlyDeductions: 0,
  age: 30, residentIndividual: true, taxRegime: 'new', deduction80C: 0,
  deduction80D: 0, nps: 0, hra: 0, homeLoanInterest: 0, otherDeductions: 0,
};

const threshold = calculateIncomeTax({ grossSalary: 1275000, age: 30, residentIndividual: true }, 'new');
assert.equal(threshold.taxableIncome, 1200000);
assert.equal(threshold.totalTax, 0);

const marginalRelief = calculateIncomeTax({ grossSalary: 1275010, age: 30, residentIndividual: true }, 'new');
assert.equal(marginalRelief.taxableIncome, 1200010);
assert.equal(marginalRelief.totalTax, 10);

const invalid = calculateIncomeTax({ grossSalary: Infinity, age: NaN, residentIndividual: true }, 'new');
assert.equal(invalid.grossSalary, 0);
assert.equal(invalid.totalTax, 0);

const salary = calculateSalary(commonSalaryInput);
assert.equal(salary.annualGrossSalary, 766862);
assert.equal(salary.annualIncomeTax, 0);
assert.equal(salary.annualTakeHome, 742862);

const overAllocated = calculateSalary({ ...commonSalaryInput, annualCtc: 100000, variablePay: 90000, employerPf: 90000, gratuity: 90000 });
assert.ok(overAllocated.employerComponentsTotal <= overAllocated.annualCtc);

console.log('PASS: new-regime rebate threshold');
console.log('PASS: marginal relief just above threshold');
console.log('PASS: non-finite tax inputs are sanitized');
console.log('PASS: default salary take-home calculation');
console.log('PASS: CTC component cap invariant');
