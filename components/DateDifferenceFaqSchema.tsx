import Script from "next/script";

export default function DateDifferenceFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate the number of days between two dates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter the start date and end date into the calculator. It calculates the difference between the two dates in days.",
        },
      },
      {
        "@type": "Question",
        name: "Can I calculate the difference between dates in different years?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can enter dates from different years and calculate the number of days between them.",
        },
      },
      {
        "@type": "Question",
        name: "Does the calculator account for leap years?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The calculation is based on the actual date difference, including the extra day that occurs during a leap year.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this calculator for planning events?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It can be useful for calculating the duration between dates when planning trips, events, projects, or other activities.",
        },
      },
    ],
  };

  return (
    <Script
      id="date-difference-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}