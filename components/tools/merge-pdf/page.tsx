import FAQAccordion from "../FAQAccordion";
import { mergePdfFAQs } from "./faqData";

export default function MergePdfFAQ() {
  return <FAQAccordion faqs={mergePdfFAQs} />;
}