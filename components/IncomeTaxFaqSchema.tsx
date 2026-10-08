export default function IncomeTaxFaqSchema() {
  const faqs = [
    {
      question:
        "Which financial year does the income tax calculator cover?",
      answer:
        "This income tax calculator is designed for FY 2026-27, corresponding to AY 2027-28.",
    },
    {
      question:
        "Can I compare the old and new tax regimes?",
      answer:
        "Yes. The calculator compares estimated tax under both regimes and shows the estimated difference.",
    },
    {
      question:
        "Does the calculator include the standard deduction?",
      answer:
        "Yes. The calculator applies the configured standard deduction for the selected tax regime.",
    },
    {
      question:
        "Does the calculator include surcharge and cess?",
      answer:
        "Yes. The calculator includes applicable surcharge, surcharge marginal relief and 4% Health & Education Cess.",
    },
    {
      question:
        "Is this a complete income tax return calculator?",
      answer:
        "No. It is a salary-income tax estimator and does not cover every income type, special tax rate or ITR filing requirement.",
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context":
            "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(
            (faq) => ({
              "@type":
                "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type":
                  "Answer",
                text: faq.answer,
              },
            })
          ),
        }),
      }}
    />
  );
}