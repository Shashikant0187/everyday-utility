import Script from "next/script";

export default function GSTFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is GST?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GST stands for Goods and Services Tax. It is an indirect tax applied to the supply of many goods and services in India.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate GST on an amount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply the amount before GST by the GST rate and divide the result by 100. Add the GST amount to the base amount to get the total price including GST.",
        },
      },
      {
        "@type": "Question",
        name: "How much is 18% GST on ₹1,000?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "18% GST on ₹1,000 is ₹180. The total amount including GST is ₹1,180.",
        },
      },
      {
        "@type": "Question",
        name: "Can I calculate different GST rates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Enter the amount before GST and the GST rate you want to calculate.",
        },
      },
    ],
  };

  return (
    <Script
      id="gst-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}