export default function EMISeoContent() {
  return (
    <section className="seo-content">
      <h2>What is an EMI Calculator?</h2>

      <p>
        An EMI calculator helps you estimate the monthly payment required
        to repay a loan over a specific period. EMI stands for Equated
        Monthly Instalment and generally includes both the principal
        amount and the interest charged by the lender.
      </p>

      <h2>How is EMI calculated?</h2>

      <p>
        EMI is calculated using the loan amount, interest rate and loan
        tenure. The standard EMI formula is:
      </p>

      <div className="formula-box">
        EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)
      </div>

      <p>Where:</p>

      <ul>
        <li>
          <strong>P</strong> = Principal loan amount
        </li>
        <li>
          <strong>r</strong> = Monthly interest rate
        </li>
        <li>
          <strong>n</strong> = Total number of monthly instalments
        </li>
      </ul>

      <h2>What can you calculate with this EMI calculator?</h2>

      <p>
        You can use this calculator to estimate EMI payments for different
        types of loans, including home loans, car loans and personal loans.
        Enter the loan amount, annual interest rate and loan tenure to
        calculate your estimated monthly EMI, total interest and total
        repayment.
      </p>

      <h2>Example of EMI Calculation</h2>

      <p>
        Suppose you take a loan of ₹5,00,000 at an annual interest rate
        of 10% for 5 years. The estimated monthly EMI is approximately
        ₹10,624.
      </p>

      <p>
        Over the 5-year period, the total interest would be approximately
        ₹1,37,411, making the total repayment approximately ₹6,37,411.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What does EMI mean?</h3>

      <p>
        EMI means Equated Monthly Instalment. It is the periodic payment
        made toward repaying a loan and generally includes both principal
        and interest.
      </p>

      <h3>Does a higher interest rate increase EMI?</h3>

      <p>
        Yes. If the loan amount and tenure remain the same, a higher
        interest rate generally results in a higher monthly EMI and higher
        total interest.
      </p>

      <h3>Does a longer loan tenure reduce EMI?</h3>

      <p>
        A longer loan tenure generally reduces the monthly EMI, but it can
        increase the total interest paid over the life of the loan.
      </p>

      <h3>Can I use this for a home loan or personal loan?</h3>

      <p>
        Yes. You can enter the relevant loan amount, interest rate and
        tenure to estimate monthly repayments for home loans, car loans,
        personal loans and other loans.
      </p>
    </section>
  );
}