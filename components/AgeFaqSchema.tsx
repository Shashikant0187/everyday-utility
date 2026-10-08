import Script from "next/script";

export default function AgeFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate my age?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter your date of birth into the calculator. It compares your birth date with the current date and calculates your age.",
        },
      },
      {
        "@type": "Question",
        name: "Can I calculate my age from my date of birth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Enter your date of birth to calculate your current age in years and months.",
        },
      },
      {
        "@type": "Question",
        name: "Does my age change on my birthday?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Your completed age in years increases by one on your birthday each year.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use an age calculator for official purposes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This calculator is intended for general calculations. For official applications or legal purposes, use the age or date information required by the relevant authority.",
        },
      },
    ],
  };

  return (
    <Script
      id="age-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}