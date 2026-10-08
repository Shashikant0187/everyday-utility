import type { Metadata } from "next";
import ToolClient from "./ToolClient";
import { tools } from "../../../lib/tools";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const seoData: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "emi-calculator": {
    title: "EMI Calculator - Calculate Monthly EMI Online",
    description:
      "Calculate your monthly loan EMI, total interest and total repayment instantly with our free EMI calculator.",
  },

  "sip-calculator": {
    title: "SIP Calculator - Calculate SIP Returns Online",
    description:
      "Estimate your SIP investment returns, total investment and expected wealth using our free SIP calculator.",
  },

  "gst-calculator": {
    title: "GST Calculator - Calculate GST Online",
    description:
      "Calculate GST amount, inclusive price and exclusive price quickly with our free GST calculator.",
  },

  "percentage-calculator": {
    title: "Percentage Calculator - Calculate Percentages Online",
    description:
      "Calculate percentages, percentage increase, decrease and difference quickly with our free percentage calculator.",
  },

  "discount-calculator": {
    title: "Discount Calculator - Calculate Sale Price & Savings",
    description:
      "Calculate discount amount, final sale price and savings instantly with our free discount calculator.",
  },

  "age-calculator": {
    title: "Age Calculator - Calculate Your Exact Age",
    description:
      "Calculate your exact age in years, months and days from your date of birth with our free age calculator.",
  },

  "date-difference": {
    title: "Date Difference Calculator - Calculate Days Between Dates",
    description:
      "Calculate the exact difference between two dates in days, months and years with our free date difference calculator.",
  },

  "bmi-calculator": {
    title: "BMI Calculator - Calculate Body Mass Index",
    description:
      "Calculate your Body Mass Index using height and weight with our free online BMI calculator.",
  },

  "fuel-cost-calculator": {
    title: "Fuel Cost Calculator - Calculate Trip Fuel Cost",
    description:
      "Estimate fuel consumption and total trip fuel cost using distance, mileage and fuel price.",
  },

  "jpg-to-pdf": {
    title: "JPG to PDF Converter - Convert Images to PDF",
    description:
      "Convert JPG or PNG images to PDF directly in your browser with our free JPG to PDF converter.",
  },

  "pdf-to-jpg": {
    title: "PDF to JPG Converter - Convert PDF Pages to Images",
    description:
      "Convert PDF pages into JPG images directly in your browser with our free PDF to JPG converter.",
  },

  "merge-pdf": {
    title: "Merge PDF - Combine Multiple PDFs Online",
    description:
      "Combine multiple PDF files into a single PDF document directly in your browser.",
  },

  "compress-pdf": {
    title: "Compress PDF - Reduce PDF File Size",
    description:
      "Reduce PDF file size for easier sharing and uploading with our free browser-based PDF compressor.",
  },

  "pdf-to-word": {
    title: "PDF to Word Converter - Convert PDF to DOCX",
    description:
      "Convert supported PDF documents into editable Word DOCX files directly in your browser.",
  },
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Everyday Utility",
      description: "The requested utility tool could not be found.",
    };
  }

  const seo = seoData[slug];

  const title =
    seo?.title ?? `${tool.title} | Everyday Utility`;

  const description =
    seo?.description ?? tool.description;

  return {
    title,
    description,

    alternates: {
      canonical: `/tools/${slug}`,
    },

    openGraph: {
      title,
      description,
      url: `/tools/${slug}`,
      siteName: "Everyday Utility",
      type: "website",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  return <ToolClient slug={slug} />;
}