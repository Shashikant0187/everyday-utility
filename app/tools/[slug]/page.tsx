import type { Metadata } from "next";
import ToolClient from "./ToolClient";
import { tools } from "../../../lib/tools";
import EMISeoContent from "../../../components/EMISeoContent";
import EMIFaqSchema from "../../../components/EMIFaqSchema";
import RelatedTools from "../../../components/RelatedTools";
import SIPSeoContent from "../../../components/SIPSeoContent";
import SIPFaqSchema from "../../../components/SIPFaqSchema";
import GSTSeoContent from "../../../components/GSTSeoContent";
import GSTFaqSchema from "../../../components/GSTFaqSchema";
import PercentageSeoContent from "../../../components/PercentageSeoContent";
import PercentageFaqSchema from "../../../components/PercentageFaqSchema";
import DiscountSeoContent from "../../../components/DiscountSeoContent";
import DiscountFaqSchema from "../../../components/DiscountFaqSchema";
import AgeSeoContent from "../../../components/AgeSeoContent";
import AgeFaqSchema from "../../../components/AgeFaqSchema";
import DateDifferenceSeoContent from "../../../components/DateDifferenceSeoContent";
import DateDifferenceFaqSchema from "../../../components/DateDifferenceFaqSchema";
import BMISeoContent from "../../../components/BMISeoContent";
import BMIFaqSchema from "../../../components/BMIFaqSchema";

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
    title: "EMI Calculator – Loan EMI, Interest & Payment",
    description:
      "Use our free EMI calculator to calculate monthly loan EMI, total interest and total repayment for home, car and personal loans.",
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
      "Use our free percentage calculator to find a percentage of a number, calculate what percentage one number is of another, and calculate percentage increase or decrease.",
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

  return (
    <main>
      {slug === "emi-calculator" ? (
        <>
          <header className="tool-seo-header">
            <h1>BMI Calculator - Calculate Body Mass Index</h1>

            <p>
              Use our free BMI calculator to calculate Body Mass Index from your
              weight and height and see the corresponding BMI category.
            </p>
          </header>

          <EMIFaqSchema />

          <ToolClient slug={slug} />

          <EMISeoContent />

          <RelatedTools />
        </>
      ) : slug === "sip-calculator" ? (
        <>
          <header className="tool-seo-header">
            <h1>SIP Calculator - Calculate SIP Returns Online</h1>

            <p>
              Use our free SIP calculator to estimate your total investment,
              expected returns and potential future value based on your monthly
              investment, expected return and investment duration.
            </p>
          </header>

          <SIPFaqSchema />

          <ToolClient slug={slug} />

          <SIPSeoContent />

          <RelatedTools />
        </>

      ) : slug === "gst-calculator" ? (
        <>
          <header className="tool-seo-header">
            <h1>GST Calculator - Calculate GST Online</h1>

            <p>
              Use our free GST calculator to calculate GST amount and total price
              including GST. Enter the amount before GST and the applicable GST rate
              to get the result instantly.
            </p>
          </header>

          <GSTFaqSchema />

          <ToolClient slug={slug} />

          <GSTSeoContent />

          <RelatedTools />
        </>

      ) : slug === "percentage-calculator" ? (
        <>
          <header className="tool-seo-header">
            <h1>Percentage Calculator - Calculate Percentages Online</h1>

            <p>
              Use our free percentage calculator to quickly calculate a percentage
              of any number. Enter the percentage and number to get the result
              instantly.
            </p>
          </header>

          <PercentageFaqSchema />

          <ToolClient slug={slug} />

          <PercentageSeoContent />

          <RelatedTools />
        </>

      ) : slug === "discount-calculator" ? (
        <>
          <header className="tool-seo-header">
            <h1>Discount Calculator - Calculate Sale Price & Savings</h1>

            <p>
              Use our free discount calculator to calculate the discount amount,
              final sale price and money saved. Enter the original price and
              discount percentage to get the result instantly.
            </p>
          </header>

          <DiscountFaqSchema />

          <ToolClient slug={slug} />

          <DiscountSeoContent />

          <RelatedTools />
        </>

      ) : slug === "age-calculator" ? (
        <>
          <header className="tool-seo-header">
            <h1>Age Calculator - Calculate Your Exact Age</h1>

            <p>
              Use our free age calculator to calculate your current age from your
              date of birth. Enter your birth date to quickly calculate your age in
              years and months.
            </p>
          </header>

          <AgeFaqSchema />

          <ToolClient slug={slug} />

          <AgeSeoContent />

          <RelatedTools />
        </>

      ) : slug === "date-difference" ? (
        <>
          <header className="tool-seo-header">
            <h1>Date Difference Calculator - Calculate Days Between Dates</h1>

            <p>
              Use our free date difference calculator to calculate the number of
              days between two dates. Enter a start date and end date to get the
              difference instantly.
            </p>
          </header>

          <DateDifferenceFaqSchema />

          <ToolClient slug={slug} />

          <DateDifferenceSeoContent />

          <RelatedTools />
        </>

      ) : slug === "bmi-calculator" ? (
        <>
          <header className="tool-seo-header">
            <h1>BMI Calculator - Calculate Body Mass Index</h1>

            <p>
              Use our free BMI calculator to calculate Body Mass Index from your
              weight and height and see the corresponding BMI category.
            </p>
          </header>

          <BMIFaqSchema />

          <ToolClient slug={slug} />

          <BMISeoContent />

          <RelatedTools />
        </>
      ) : (
        <ToolClient slug={slug} />
      )}
    </main>
  );
}