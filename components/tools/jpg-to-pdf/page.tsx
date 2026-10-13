import FAQAccordion from "../FAQAccordion";
import { jpgToPdfFAQs } from "./faqData";

export default function JpgToPdfFAQ() {
  return (
    <section className="pdf-tool-faq">
      <FAQAccordion faqs={jpgToPdfFAQs} />
    </section>
  );
}