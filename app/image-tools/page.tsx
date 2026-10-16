
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Image Tools | Everyday Utility",
  description:
    "Compress, resize, crop and convert images online. Convert JPG, PNG and WebP images, or combine images into a PDF for free.",
  alternates: {
    canonical: "/image-tools",
  },
};

const imageTools = [
  {
    title: "Image Compressor",
    description: "Reduce image file size while adjusting output quality.",
    href: "/tools/image-compressor",
    icon: "◈",
  },
  {
    title: "Image Resizer",
    description: "Resize images to custom dimensions in pixels.",
    href: "/tools/image-resizer",
    icon: "↔",
  },
  {
    title: "Image Cropper",
    description: "Crop an image using custom position and dimensions.",
    href: "/tools/image-cropper",
    icon: "▧",
  },
  {
    title: "JPG to PNG",
    description: "Convert JPG images to PNG format.",
    href: "/tools/jpg-to-png",
    icon: "⇄",
  },
  {
    title: "PNG to JPG",
    description: "Convert PNG images to JPG format.",
    href: "/tools/png-to-jpg",
    icon: "⇄",
  },
  {
    title: "WebP to JPG",
    description: "Convert WebP images to JPG format.",
    href: "/tools/webp-to-jpg",
    icon: "⇄",
  },
  {
    title: "Images to PDF",
    description: "Combine multiple images into one PDF document.",
    href: "/tools/images-to-pdf",
    icon: "▤",
  },
];

export default function ImageToolsPage() {
  return (
    <main className="image-tools-page">
      <nav className="pdf-tool-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Image Tools</span>
      </nav>

      <header className="pdf-tool-intro">
        <p className="pdf-tool-eyebrow">FREE ONLINE IMAGE TOOLS</p>
        <h1>Image Tools</h1>
        <p>
          Compress, resize, crop and convert your images directly in your
          browser. Simple tools for everyday image tasks.
        </p>
      </header>

      <section className="image-tools-grid" aria-label="Available image tools">
        {imageTools.map((tool) => (
          <a className="image-tools-card" href={tool.href} key={tool.href}>
            <span className="image-tools-icon" aria-hidden="true">
              {tool.icon}
            </span>
            <span className="image-tools-card-content">
              <strong>{tool.title}</strong>
              <span>{tool.description}</span>
              <span className="image-tools-card-link">Open tool →</span>
            </span>
          </a>
        ))}
      </section>

      <section className="pdf-tool-howto image-tools-note">
        <h2>Private and convenient image processing</h2>
        <p>
          These image tools process files in your browser. Converted images
          are downloaded to your device. Images to PDF creates a PDF locally
          in your browser as well.
        </p>
      </section>
    </main>
  );
}
