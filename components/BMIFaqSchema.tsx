import Script from "next/script";

export default function BMIFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does BMI stand for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BMI stands for Body Mass Index. It is a calculation based on a person's weight and height.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate BMI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divide your weight in kilograms by your height in metres squared.",
        },
      },
      {
        "@type": "Question",
        name: "What is a normal BMI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A BMI from 18.5 to below 25 is commonly classified as the normal category for adults.",
        },
      },
      {
        "@type": "Question",
        name: "Is BMI a complete measure of health?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. BMI is a screening measure and should not be considered a complete assessment of an individual's health or body composition.",
        },
      },
    ],
  };

  return (
    <Script
      id="bmi-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}