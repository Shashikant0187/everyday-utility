import Link from "next/link";

type RelatedTool = {
  slug: string;
  title: string;
  description: string;
};

const relatedTools: RelatedTool[] = [
  {
    slug: "sip-calculator",
    title: "SIP Calculator",
    description: "Estimate SIP returns and investment growth.",
  },
  {
    slug: "gst-calculator",
    title: "GST Calculator",
    description: "Calculate GST amount and final price.",
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages quickly and easily.",
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    description: "Calculate discounts, savings and sale prices.",
  },
];

export default function RelatedTools() {
  return (
    <section className="related-tools">
      <h2>Related Calculators</h2>

      <div className="related-tools-grid">
        {relatedTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="related-tool-card"
          >
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}