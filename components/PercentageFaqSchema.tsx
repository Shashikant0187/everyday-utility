import Script from "next/script";

export default function PercentageFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate a percentage of a number?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply the percentage by the number and divide the result by 100.",
        },
      },
      {
        "@type": "Question",
        name: "What is 20% of 500?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "20% of 500 is 100.",
        },
      },
      {
        "@type": "Question",
        name: "What is the basic percentage formula?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The basic formula for calculating a percentage of a number is Percentage × Number ÷ 100.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this calculator for everyday calculations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can use it whenever you need to calculate a percentage of a given number quickly.",
        },
      },
    ],
  };

  return (
    <Script
      id="percentage-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}