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
  const categoryItems = items.filter((t) => t.category === category);

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

  const filteredTools = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return tools;

    const searchWords = search
      .split(/\s+/)
      .filter(Boolean);

    const matchesWholeWord = (text: string) => {
      const words = text
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);

      return searchWords.every((word) => words.includes(word));
    };

    return tools
      .filter((tool) => {
        return (
          matchesWholeWord(tool.title) ||
          matchesWholeWord(tool.description) ||
          matchesWholeWord(tool.slug) ||
          matchesWholeWord(tool.category)
        );
      })
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        if (aTitle === search) return -1;
        if (bTitle === search) return 1;

        return 0;
      });
  }, [query]);

  const popularTools = tools.filter((tool) =>
    popularSlugs.includes(tool.slug)
  );

  const scrollToResults = () => {
    document
      .getElementById("tools-results")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* HERO */}
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

          <div className="search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  scrollToResults();
                }
              }}
              placeholder="What do you need to calculate or do?"
            />

            <button onClick={scrollToResults}>
              Search
            </button>
          </div>

          {query && (
            <p className="muted" style={{ marginTop: "12px" }}>
              {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "tool" : "tools"} found for "
              {query}"
            </p>
          )}
        </div>
      </section>

      {/* POPULAR TOOLS */}
      {!query && (
        <section className="section">
          <div className="section-head">
            <div>
              <h2>Popular Tools</h2>
              <p className="muted">
                Quick access to tools people use most.
              </p>
            </div>
          </div>

          <div className="grid">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* SEARCH RESULTS / CATEGORIES */}
      <div id="tools-results">
        {query ? (
          <>
            {filteredTools.length > 0 ? (
              <section className="section">
                <div className="section-head">
                  <div>
                    <h2>Search Results</h2>
                    <p className="muted">
                      Tools matching your search.
                    </p>
                  </div>
                </div>

                <div className="grid">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            ) : (
              <section className="section">
                <div className="section-head">
                  <div>
                    <h2>No tools found</h2>
                    <p className="muted">
                      Try searching for EMI, GST, age, PDF, percentage,
                      SIP, or another tool.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            <Section
              id="money"
              title="Money"
              subtitle="Make everyday financial calculations simple."
              category="money"
              items={tools}
            />

            <Section
              id="daily"
              title="Daily Life"
              subtitle="Small tools for everyday decisions."
              category="daily"
              items={tools}
            />

            <Section
              id="documents"
              title="Documents"
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