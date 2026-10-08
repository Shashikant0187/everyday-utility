import Script from "next/script";

export default function PercentageFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate X% of a number?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divide the percentage by 100 and multiply it by the number. For example, 20% of 500 is 100.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find what percentage one number is of another?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divide the first number by the second number and multiply by 100.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate percentage increase?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subtract the original value from the new value, divide by the original value, and multiply by 100.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate percentage decrease?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subtract the new value from the original value, divide by the original value, and multiply by 100.",
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