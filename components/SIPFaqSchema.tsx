import Script from "next/script";

export default function SIPFaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does SIP mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SIP stands for Systematic Investment Plan. It allows investors to invest a fixed amount at regular intervals, commonly monthly, into a mutual fund or other investment scheme that supports SIPs.",
        },
      },
      {
        "@type": "Question",
        name: "Are SIP calculator returns guaranteed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. SIP calculator results are estimates based on the expected rate of return entered by the user. Actual investment returns can vary.",
        },
      },
      {
        "@type": "Question",
        name: "Does investing for a longer period increase potential returns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A longer investment period can give your investment more time to compound, but actual returns depend on market performance and are not guaranteed.",
        },
      },
      {
        "@type": "Question",
        name: "Can I change my monthly SIP amount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The monthly investment amount can vary depending on the SIP and mutual fund options available to the investor. Use the calculator with different monthly amounts to compare potential outcomes.",
        },
      },
    ],
  };

  return (
    <Script
      id="sip-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}