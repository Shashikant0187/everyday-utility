import FAQAccordion from "../FAQAccordion";
import { compressPdfFAQs } from "./faqData";

export default function CompressPdfFAQ() {
  return (
    <section className="pdf-tool-faq">
      <FAQAccordion faqs={compressPdfFAQs} />
    </section>
  );
}