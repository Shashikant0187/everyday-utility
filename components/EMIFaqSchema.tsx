import Script from "next/script";

export default function EMIFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does EMI mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "EMI means Equated Monthly Instalment. It is the periodic payment made toward repaying a loan and generally includes both principal and interest.",
        },
      },
      {
        "@type": "Question",
        name: "Does a higher interest rate increase EMI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. If the loan amount and tenure remain the same, a higher interest rate generally results in a higher monthly EMI and higher total interest.",
        },
      },
      {
        "@type": "Question",
        name: "Does a longer loan tenure reduce EMI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A longer loan tenure generally reduces the monthly EMI, but it can increase the total interest paid over the life of the loan.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this for a home loan or personal loan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can enter the relevant loan amount, interest rate and tenure to estimate monthly repayments for home loans, car loans, personal loans and other loans.",
        },
      },
    ],
  };

  return (
    <Script
      id="emi-calculator-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}