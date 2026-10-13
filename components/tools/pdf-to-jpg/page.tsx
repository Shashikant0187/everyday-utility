import FAQAccordion from "../FAQAccordion";
import { pdfToJpgFAQs } from "./faqData";

export default function PdfToJpgFAQ() {
  return (
    <section className="pdf-tool-faq">
      <FAQAccordion faqs={pdfToJpgFAQs} />
    </section>
  );
}