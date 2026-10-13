import FAQAccordion from "../FAQAccordion";
import { mergePdfFAQs } from "./faqData";

export default function MergePdfFAQ() {
  return (
    <section className="pdf-tool-faq">
      <FAQAccordion faqs={mergePdfFAQs} />
    </section>
  );
}