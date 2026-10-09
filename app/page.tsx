"use client";

import { useMemo, useState } from "react";
import { tools } from "../lib/tools";
import ToolCard from "../components/ToolCard";

const popularSlugs = [
  "emi-calculator",
  "sip-calculator",
  "gst-calculator",
  "percentage-calculator",
  "age-calculator",
  "jpg-to-pdf",
];

const categories = [
  { id: "all", label: "All tools", description: "Browse every available utility." },
  { id: "money", label: "Finance", description: "Calculators for salary, tax, savings and everyday money decisions." },
  { id: "daily", label: "Daily Life", description: "Quick answers for dates, health metrics and travel costs." },
  { id: "documents", label: "PDF & Documents", description: "Convert and manage common document formats." },
] as const;

type CategoryId = (typeof categories)[number]["id"];

function Section({
  id,
  title,
  subtitle,
  category,
  items,
}: {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  items: typeof tools;
}) {
  const categoryItems = items.filter((tool) => tool.category === category);
  if (categoryItems.length === 0) return null;

  return (
    <section id={id} className="section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          <p className="muted">{subtitle}</p>
        </div>
      </div>
      <div className="grid">
        {categoryItems.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filteredTools = useMemo(() => {
    const search = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || tool.category === activeCategory;
      if (!matchesCategory) return false;
      if (!search) return true;

      const searchableText = [
        tool.title,
        tool.description,
        tool.slug.replace(/-/g, " "),
        tool.category,
        tool.category === "money" ? "finance salary tax investment loan savings" : "",
        tool.category === "daily" ? "age date health bmi fuel travel converter" : "",
        tool.category === "documents" ? "pdf image word jpg convert merge compress document" : "",
      ]
        .join(" ")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ");

      const normalizedSearch = search.replace(/[^a-z0-9]+/g, " ").trim();
      return normalizedSearch
        .split(/\s+/)
        .filter(Boolean)
        .every((word) => searchableText.includes(word));
    });
  }, [query, activeCategory]);

  const popularTools = tools.filter((tool) => popularSlugs.includes(tool.slug));

  const scrollToResults = () => {
    document.getElementById("tools-results")?.scrollIntoView({ behavior: "smooth" });
  };

  const chooseCategory = (category: CategoryId) => {
    setActiveCategory(category);
    setQuery("");
    window.setTimeout(() => {
      document.getElementById("tools-results")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const isBrowsingAll = !query.trim() && activeCategory === "all";

  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <span className="badge">Free everyday tools</span>
          <h1>
            Simple tools for the things
            <br />
            you need to get done.
          </h1>
          <p>
            Calculate money, solve everyday questions and work with documents
            — without complicated software.
          </p>

          <div className="search" role="search">
            <input
              aria-label="Search tools"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") scrollToResults();
              }}
              placeholder="Try salary, EMI, tax, age, PDF..."
            />
            <button type="button" onClick={scrollToResults}>Search</button>
          </div>

          {query.trim() && (
            <p className="muted search-count" aria-live="polite">
              {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} found for “{query.trim()}”
            </p>
          )}
        </div>
      </section>

      <section className="section category-browser" aria-label="Browse tools by category">
        <div className="section-head">
          <div>
            <h2>Explore tools</h2>
            <p className="muted">Choose a category or search across the complete toolkit.</p>
          </div>
        </div>
        <div className="category-chips" role="group" aria-label="Filter tools by category">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-chip${activeCategory === category.id ? " is-active" : ""}`}
              aria-pressed={activeCategory === category.id}
              onClick={() => chooseCategory(category.id)}
            >
              <span>{category.label}</span>
              <span className="category-count">
                {category.id === "all"
                  ? tools.length
                  : tools.filter((tool) => tool.category === category.id).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {isBrowsingAll && (
        <section className="section">
          <div className="section-head">
            <div>
              <h2>Popular Tools</h2>
              <p className="muted">Quick access to useful everyday tools.</p>
            </div>
          </div>
          <div className="grid">
            {popularTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </section>
      )}

      <div id="tools-results">
        {query.trim() || activeCategory !== "all" ? (
          <section className="section">
            <div className="section-head">
              <div>
                <h2>{query.trim() ? "Search Results" : categories.find((item) => item.id === activeCategory)?.label}</h2>
                <p className="muted">
                  {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} available
                  {query.trim() ? ` for “${query.trim()}”` : " in this category"}.
                </p>
              </div>
              {(query.trim() || activeCategory !== "all") && (
                <button
                  type="button"
                  className="clear-filters"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
            {filteredTools.length ? (
              <div className="grid">
                {filteredTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
              </div>
            ) : (
              <div className="empty-search">
                <h3>No matching tools yet</h3>
                <p>Try a shorter search such as “tax”, “salary”, “date”, or “PDF”.</p>
                <button type="button" className="clear-filters" onClick={() => { setQuery(""); setActiveCategory("all"); }}>
                  Show all tools
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            <Section
              id="money"
              title="Finance Tools"
              subtitle="Make everyday financial calculations simple."
              category="money"
              items={tools}
            />
            <Section
              id="daily"
              title="Daily Life Tools"
              subtitle="Small tools for everyday decisions."
              category="daily"
              items={tools}
            />
            <Section
              id="documents"
              title="PDF & Document Tools"
              subtitle="Useful document utilities, right in your browser."
              category="documents"
              items={tools}
            />
          </>
        )}
      </div>
    </main>
  );
}
