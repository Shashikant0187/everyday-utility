import Link from "next/link";
import { tools } from "../lib/tools";

type RelatedToolsProps = {
  currentSlug?: string;
};

const relatedGroups: Record<string, string[]> = {
  "emi-calculator": ["salary-calculator", "income-tax-calculator", "sip-calculator", "discount-calculator"],
  "sip-calculator": ["emi-calculator", "salary-calculator", "income-tax-calculator", "percentage-calculator"],
  "gst-calculator": ["percentage-calculator", "discount-calculator", "income-tax-calculator", "emi-calculator"],
  "percentage-calculator": ["discount-calculator", "gst-calculator", "emi-calculator", "salary-calculator"],
  "discount-calculator": ["percentage-calculator", "gst-calculator", "emi-calculator", "sip-calculator"],
  "income-tax-calculator": ["salary-calculator", "emi-calculator", "sip-calculator", "gst-calculator"],
  "salary-calculator": ["income-tax-calculator", "emi-calculator", "sip-calculator", "percentage-calculator"],
  "age-calculator": ["date-difference", "bmi-calculator", "unit-converter", "fuel-cost-calculator"],
  "date-difference": ["age-calculator", "fuel-cost-calculator", "unit-converter", "bmi-calculator"],
  "unit-converter": ["bmi-calculator", "fuel-cost-calculator", "date-difference", "age-calculator"],
  "bmi-calculator": ["age-calculator", "unit-converter", "date-difference", "fuel-cost-calculator"],
  "fuel-cost-calculator": ["unit-converter", "date-difference", "emi-calculator", "age-calculator"],
  "jpg-to-pdf": ["pdf-to-jpg", "merge-pdf", "compress-pdf", "pdf-to-word"],
  "pdf-to-jpg": ["jpg-to-pdf", "merge-pdf", "compress-pdf", "pdf-to-word"],
  "merge-pdf": ["compress-pdf", "jpg-to-pdf", "pdf-to-jpg", "pdf-to-word"],
  "compress-pdf": ["merge-pdf", "pdf-to-word", "jpg-to-pdf", "pdf-to-jpg"],
  "pdf-to-word": ["jpg-to-pdf", "pdf-to-jpg", "merge-pdf", "compress-pdf"],
};

const fallbackGroups: Record<string, string[]> = {
  money: ["emi-calculator", "sip-calculator", "gst-calculator", "percentage-calculator"],
  daily: ["age-calculator", "date-difference", "bmi-calculator", "fuel-cost-calculator"],
  documents: ["jpg-to-pdf", "pdf-to-jpg", "merge-pdf", "compress-pdf"],
};

export default function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const currentTool = tools.find((tool) => tool.slug === currentSlug);

  const suggestedSlugs: string[] =
    (currentSlug ? relatedGroups[currentSlug] : undefined) ??
    fallbackGroups[currentTool?.category ?? "money"] ??
    fallbackGroups.money;

  const related = suggestedSlugs
    .filter((slug: string) => slug !== currentSlug)
    .map((slug: string) => tools.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined)
    .slice(0, 4);


  if (related.length === 0) return null;

  return (
    <section className="related-tools" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading">Related Tools</h2>
      <p className="muted related-tools-intro">
        Explore other useful tools that work well with this calculator.
      </p>
      <div className="related-tools-grid">
        {related.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="related-tool-card">
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
