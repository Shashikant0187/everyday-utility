"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

type Tool = {
  name: string;
  description: string;
  href: string;
  category: "PDF & Documents" | "Finance" | "Everyday Calculators" | "Converters";
  icon: string;
};

const tools: Tool[] = [
  { name: "Merge PDF", description: "Combine multiple PDFs", href: "/tools/merge-pdf", category: "PDF & Documents", icon: "▤" },
  { name: "Compress PDF", description: "Reduce PDF file size", href: "/tools/compress-pdf", category: "PDF & Documents", icon: "⇩" },
  { name: "JPG to PDF", description: "Convert images to PDF", href: "/tools/jpg-to-pdf", category: "PDF & Documents", icon: "▧" },
  { name: "PDF to JPG", description: "Export PDF pages as images", href: "/tools/pdf-to-jpg", category: "PDF & Documents", icon: "▣" },
  { name: "PDF to Word", description: "Extract text from PDF files", href: "/tools/pdf-to-word", category: "PDF & Documents", icon: "W" },
  { name: "Salary Calculator", description: "Estimate your in-hand salary", href: "/tools/salary-calculator", category: "Finance", icon: "₹" },
  { name: "EMI Calculator", description: "Calculate loan EMI and interest", href: "/tools/emi-calculator", category: "Finance", icon: "▦" },
  { name: "Income Tax Calculator", description: "Estimate income tax liability", href: "/tools/income-tax-calculator", category: "Finance", icon: "%" },
  { name: "SIP Calculator", description: "Estimate returns on monthly investing", href: "/tools/sip-calculator", category: "Finance", icon: "↗" },
  { name: "GST Calculator", description: "Calculate GST-inclusive or exclusive price", href: "/tools/gst-calculator", category: "Finance", icon: "GST" },
  { name: "Percentage Calculator", description: "Solve common percentage problems", href: "/tools/percentage-calculator", category: "Everyday Calculators", icon: "%" },
  { name: "Discount Calculator", description: "Find sale price and savings", href: "/tools/discount-calculator", category: "Everyday Calculators", icon: "−" },
  { name: "Age Calculator", description: "Calculate your exact age", href: "/tools/age-calculator", category: "Everyday Calculators", icon: "▦" },
  { name: "Date Difference", description: "Count days between two dates", href: "/tools/date-difference", category: "Everyday Calculators", icon: "◷" },
  { name: "BMI Calculator", description: "Calculate body mass index", href: "/tools/bmi-calculator", category: "Everyday Calculators", icon: "＋" },
  { name: "Unit Converter", description: "Convert common units quickly", href: "/tools/unit-converter", category: "Converters", icon: "⇄" },
  { name: "Fuel Cost Calculator", description: "Estimate the cost of a trip", href: "/tools/fuel-cost-calculator", category: "Everyday Calculators", icon: "⌁" },
];

const categories = [
  { name: "PDF & Document Tools", key: "PDF & Documents", description: "Merge, compress and convert your PDF files.", icon: "▤", tone: "rose", href: "/pdf-tools" },
  { name: "Finance Calculators", key: "Finance", description: "EMI, salary, income tax, SIP, GST and more.", icon: "▥", tone: "green", href: "/tools/emi-calculator" },
  { name: "Everyday Calculators", key: "Everyday Calculators", description: "Percentage, age, date, BMI, discount and more.", icon: "▦", tone: "blue", href: "/tools/percentage-calculator" },
  { name: "Unit Converters", key: "Converters", description: "Convert length, weight, temperature and more.", icon: "⇄", tone: "purple", href: "/tools/unit-converter" },
] as const;

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? tools.filter((tool) => `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(q)) : tools;
  }, [query]);

  const popularTools = query ? filteredTools : tools.slice(0, 10);

  return (
    <>
      <Header />
      <main className="eu-home">
        <section className="eu-hero">
          <div className="eu-home__container eu-hero__grid">
            <div className="eu-hero__copy">
              <span className="eu-eyebrow"><span aria-hidden="true">✦</span> 17+ free online tools</span>
              <h1>Everyday tasks,<br /><span>made simpler.</span></h1>
              <p className="eu-hero__intro">Free, easy-to-use calculators, converters and PDF tools for your everyday needs. Fast, practical and available online.</p>
              <form className="eu-home-search" role="search" onSubmit={(event) => event.preventDefault()}>
                <SearchIcon />
                <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search for a tool (e.g. PDF, EMI, BMI)" aria-label="Search all tools" />
                <button type="submit"><SearchIcon /><span>Search</span></button>
              </form>
              <div className="eu-popular-searches">
                <span>Popular searches:</span>
                {["Merge PDF", "Compress PDF", "Salary Calculator", "EMI Calculator", "JPG to PDF"].map((term) => (
                  <button type="button" key={term} onClick={() => setQuery(term)}>{term}</button>
                ))}
              </div>
            </div>
            <div
              className="eu-hero-art"
              aria-label="Everyday Utility tools illustration"
            >
              <div className="eu-art-glow" />

              <div className="eu-visual-heading">
                <span className="eu-visual-eyebrow">YOUR EVERYDAY TOOLKIT</span>
                <h2>
                  Everything you need.
                  <br />
                  <span>All in one place.</span>
                </h2>
                <p>Simple tools for everyday tasks and decisions.</p>
              </div>

              <div className="eu-visual-cards">
                <Link
                  href="/tools/merge-pdf"
                  className="eu-visual-card eu-visual-card--pdf"
                >
                  <span className="eu-visual-icon">PDF</span>
                  <span className="eu-visual-card-copy">
                    <strong>Merge PDF</strong>
                    <small>Combine documents</small>
                  </span>
                  <span className="eu-visual-arrow">↗</span>
                </Link>

                <Link
                  href="/tools/emi-calculator"
                  className="eu-visual-card eu-visual-card--finance"
                >
                  <span className="eu-visual-icon">₹</span>
                  <span className="eu-visual-card-copy">
                    <strong>EMI Calculator</strong>
                    <small>Plan your monthly payments</small>
                  </span>
                  <span className="eu-visual-arrow">↗</span>
                </Link>

                <Link
                  href="/tools/jpg-to-pdf"
                  className="eu-visual-card eu-visual-card--image"
                >
                  <span className="eu-visual-icon">▧</span>
                  <span className="eu-visual-card-copy">
                    <strong>JPG to PDF</strong>
                    <small>Convert images easily</small>
                  </span>
                  <span className="eu-visual-arrow">↗</span>
                </Link>

                <Link
                  href="/tools/percentage-calculator"
                  className="eu-visual-card eu-visual-card--calc"
                >
                  <span className="eu-visual-icon">%</span>
                  <span className="eu-visual-card-copy">
                    <strong>Percentage</strong>
                    <small>Get quick calculations</small>
                  </span>
                  <span className="eu-visual-arrow">↗</span>
                </Link>
              </div>

              <div className="eu-visual-note">
                <span className="eu-visual-note-icon">✓</span>
                <span>
                  <strong>Ready when you need it</strong>
                  <small>Useful tools, right in your browser</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="eu-section eu-categories">
          <div className="eu-home__container">
            <div className="eu-section-heading">
              <h2>Explore our tool categories</h2>
              <p>Find the right tool for your needs. Simple, practical and free to use.</p>
            </div>
            <div className="eu-category-grid">
              {categories.map((category) => (
                <Link className={`eu-category-card eu-tone--${category.tone}`} href={category.href} key={category.key}>
                  <span className="eu-category-icon">{category.icon}</span>
                  <span className="eu-category-copy"><strong>{category.name}</strong><small>{category.description}</small></span>
                  <span className="eu-category-arrow" aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="eu-section eu-tools-section" id="popular-tools">
          <div className="eu-home__container">
            <div className="eu-tools-heading">
              <div><h2>{query ? "Search results" : "Popular tools"}</h2><p>{query ? `${filteredTools.length} matching tool${filteredTools.length === 1 ? "" : "s"}` : "Useful tools, ready when you need them."}</p></div>
              {query ? <button className="eu-clear-search" type="button" onClick={() => setQuery("")}>Clear search ×</button> : <Link href="/pdf-tools">Explore PDF tools <span aria-hidden="true">→</span></Link>}
            </div>
            {popularTools.length ? (
              <div className="eu-tools-grid">
                {popularTools.map((tool, index) => (
                  <Link className="eu-tool-card" href={tool.href} key={tool.name}>
                    <span className={`eu-tool-icon eu-tool-icon--${index % 5}`}>{tool.icon}</span>
                    <span className="eu-tool-card__copy"><strong>{tool.name}</strong><small>{tool.description}</small></span>
                    <span className="eu-tool-card__arrow" aria-hidden="true">›</span>
                  </Link>
                ))}
              </div>
            ) : <div className="eu-empty-search"><strong>No matching tools found.</strong><span>Try searching for PDF, salary, EMI, age or percentage.</span></div>}
          </div>
        </section>

        <section className="eu-trust-strip eu-home__container" aria-label="Everyday Utility benefits">
          <div><span>✓</span><p><strong>Easy to use</strong><small>Clear, focused workflows</small></p></div>
          <div><span>◇</span><p><strong>17+ useful tools</strong><small>Everyday needs in one place</small></p></div>
          <div><span>ϟ</span><p><strong>Online access</strong><small>No software installation</small></p></div>
          <div><span>◎</span><p><strong>Works across devices</strong><small>Responsive by design</small></p></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
