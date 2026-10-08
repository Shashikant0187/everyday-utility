import Script from "next/script";

export default function DiscountFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate a discount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply the original price by the discount percentage and divide by 100. Subtract the resulting discount amount from the original price to get the sale price.",
        },
      },
      {
        "@type": "Question",
        name: "What is 20% off ₹1,000?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 20% discount on ₹1,000 is ₹200, making the final sale price ₹800.",
        },
      },
      {
        "@type": "Question",
        name: "How much do I save with a discount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your savings are equal to the discount amount calculated from the original price and discount percentage.",
        },
      },
      {
        "@type": "Question",
        name: "Can I calculate different discount percentages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Enter the original price and the discount percentage to calculate the discounted price and amount saved.",
        },
      },
    ],
  };

  return (
    <Script
      id="discount-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}