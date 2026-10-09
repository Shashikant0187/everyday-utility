export default function SalaryFaqSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is CTC the same as in-hand salary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. CTC can include employer-side benefits and variable components, while in-hand salary is the amount left after applicable payroll deductions and estimated income tax.",
        },
      },
      {
        "@type": "Question",
        name: "Does the salary calculator include income tax?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It estimates income tax using the site's Income Tax Calculator and the selected regime. It is not a full tax-return calculation.",
        },
      },
      {
        "@type": "Question",
        name: "Why can actual in-hand salary differ from the estimate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Actual pay depends on the employer's salary structure, PF wages, variable-pay timing, benefits, professional-tax rules and payroll deductions.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
