import FAQAccordion from "../FAQAccordion";
import { pdfToWordFAQs } from "./faqData";

export default function PdfToWordFAQ() {
  return (
    <section className="pdf-tool-faq">
      <FAQAccordion faqs={pdfToWordFAQs} />
    </section>
  );
}