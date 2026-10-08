export default function PercentageSeoContent() {
  return (
    <section className="seo-content">
      <h2>What is a Percentage Calculator?</h2>

      <p>
        A percentage calculator helps you calculate percentages quickly for
        everyday calculations such as finding a percentage of a number,
        comparing values, and calculating percentage increases or decreases.
      </p>

      <h2>What can you calculate with this percentage calculator?</h2>

      <ul>
        <li>Find a percentage of a number</li>
        <li>Find what percentage one number is of another</li>
        <li>Calculate percentage increase</li>
        <li>Calculate percentage decrease</li>
      </ul>

      <h2>How to calculate a percentage of a number</h2>

      <p>
        To find X percent of a number, multiply the number by X and divide the
        result by 100.
      </p>

      <div className="formula-box">
        <strong>Formula</strong>
        <p>Percentage of a number = (Percentage ÷ 100) × Number</p>
      </div>

      <h3>Example</h3>

      <p>
        To calculate 20% of 500:
      </p>

      <p>
        20 ÷ 100 × 500 = 100
      </p>

      <h2>How to find what percentage one number is of another</h2>

      <p>
        Divide the first number by the second number and multiply the result by
        100.
      </p>

      <div className="formula-box">
        <strong>Formula</strong>
        <p>Percentage = (Part ÷ Total) × 100</p>
      </div>

      <h3>Example</h3>

      <p>
        If 100 is compared with 500:
      </p>

      <p>
        (100 ÷ 500) × 100 = 20%
      </p>

      <h2>How to calculate percentage increase</h2>

      <p>
        Percentage increase shows how much a value has increased from its
        original value to a new value.
      </p>

      <div className="formula-box">
        <strong>Formula</strong>
        <p>
          Percentage increase = ((New value − Original value) ÷ Original
          value) × 100
        </p>
      </div>

      <h3>Example</h3>

      <p>
        If a value increases from 100 to 150, the percentage increase is 50%.
      </p>

      <h2>How to calculate percentage decrease</h2>

      <p>
        Percentage decrease shows how much a value has decreased compared with
        its original value.
      </p>

      <div className="formula-box">
        <strong>Formula</strong>
        <p>
          Percentage decrease = ((Original value − New value) ÷ Original
          value) × 100
        </p>
      </div>

      <h3>Example</h3>

      <p>
        If a value decreases from 150 to 100, the percentage decrease is
        approximately 33.33%.
      </p>

      <h2>Percentage Calculator FAQs</h2>

      <h3>How do I calculate X% of a number?</h3>

      <p>
        Divide the percentage by 100 and multiply it by the number. For
        example, 20% of 500 is 100.
      </p>

      <h3>How do I find what percentage one number is of another?</h3>

      <p>
        Divide the first number by the second number and multiply by 100.
      </p>

      <h3>How do I calculate percentage increase?</h3>

      <p>
        Subtract the original value from the new value, divide by the original
        value, and multiply by 100.
      </p>

      <h3>How do I calculate percentage decrease?</h3>

      <p>
        Subtract the new value from the original value, divide by the original
        value, and multiply by 100.
      </p>
    </section>
  );
}