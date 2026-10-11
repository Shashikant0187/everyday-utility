"use client";

import { useState } from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQItem[];
};

export default function FAQAccordion({
  faqs,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="eu-faq">
      <h2>Frequently Asked Questions</h2>

      <div className="eu-faq__list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div className="eu-faq__item" key={faq.question}>
              <button
                type="button"
                className="eu-faq__question"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                <span>{faq.question}</span>
                <span aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="eu-faq__answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}