
import Link from "next/link";

const pdfTools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
    href: "/tools/merge-pdf",
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF file size for easier sharing.",
    href: "/tools/compress-pdf",
  },
  {
    title: "JPG to PDF",
    description: "Turn your images into a PDF document.",
    href: "/tools/jpg-to-pdf",
  },
  {
    title: "PDF to JPG",
    description: "Convert PDF pages into image files.",
    href: "/tools/pdf-to-jpg",
  },
  {
    title: "PDF to Word",
    description: "Convert PDF documents into editable Word files.",
    href: "/tools/pdf-to-word",
  },
];

export const metadata = {
  title: "Free PDF Tools Online",
  description:
    "Explore free online PDF tools to merge PDFs, compress files, and convert JPG images to PDF with Everyday Utility.",
};

export default function PdfToolsPage() {
  return (
    <main className="eu-pdf-page">
      <div className="eu-pdf-container">
        <nav className="eu-pdf-breadcrumb">
          <Link href="/">Home</Link> / PDF Tools
        </nav>

        <header>
          <p className="eu-pdf-eyebrow">Everyday Utility</p>
          <h1 className="eu-pdf-heading">Free Online PDF Tools</h1>
          <p className="eu-pdf-intro">
            Merge, compress, and convert documents with simple tools
            designed to make everyday file tasks easier.
          </p>
        </header>

        <section className="eu-pdf-grid" aria-label="Available PDF tools">
          {pdfTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="eu-pdf-card"
            >
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              <span>Open tool →</span>
            </Link>
          ))}
        </section>

        <p className="eu-pdf-note">
          Everyday Utility provides convenient online tools for everyday
          document tasks. Check each tool&apos;s supported formats before
          uploading your files.
        </p>
      </div>
    </main>
  );
}
