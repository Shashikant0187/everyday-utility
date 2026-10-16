"use client";



import { useState } from "react";

import IncomeTax from "../../../components/IncomeTax";

import SalaryCalculator from "../../../components/SalaryCalculator";

import {
  ImageCropper,
  JpgToPng,
  PngToJpg,
  WebpToJpg,
  ImagesToPdf,
} from "../../../components/ImageTools";






function money(n: number) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n); }

const pdfToolContent: Record<

  string,

  {

    title: string;

    description: string;

    steps: string[];

    related: { label: string; href: string }[];

  }

> = {

  "merge-pdf": {

    title: "Merge PDF Files Online for Free",

    description:

      "Combine multiple PDF documents into one file. Select your PDFs, keep them in the desired order, and download a single document.",

    steps: [

      "Select two or more PDF files from your device.",

      "Check that your files are in the correct order.",

      "Click Merge PDFs to download your combined document.",

    ],

    related: [

      { label: "Compress PDF", href: "/tools/compress-pdf" },

      { label: "JPG to PDF", href: "/tools/jpg-to-pdf" },

      { label: "PDF to JPG", href: "/tools/pdf-to-jpg" },

    ],

  },

  "compress-pdf": {

    title: "Compress PDF Online for Free",

    description:

      "Reduce the file size of a PDF to make it easier to upload, share, and store. Choose a compression level that suits your needs.",

    steps: [

      "Select the PDF file you want to compress.",

      "Choose a compression level based on size and image quality.",

      "Click Compress PDF and download the resulting file.",

    ],

    related: [

      { label: "Merge PDF", href: "/tools/merge-pdf" },

      { label: "PDF to JPG", href: "/tools/pdf-to-jpg" },

      { label: "PDF to Word", href: "/tools/pdf-to-word" },

    ],

  },

  "jpg-to-pdf": {

    title: "JPG to PDF Converter Online for Free",

    description:

      "Convert a JPG or PNG image into a PDF document directly in your browser, ready to save or share.",

    steps: [

      "Choose a JPG or PNG image from your device.",

      "Wait for the image to be processed.",

      "Download your converted PDF document.",

    ],

    related: [

      { label: "Merge PDF", href: "/tools/merge-pdf" },

      { label: "Compress PDF", href: "/tools/compress-pdf" },

      { label: "PDF to JPG", href: "/tools/pdf-to-jpg" },

    ],

  },

  "pdf-to-jpg": {

    title: "Convert PDF to JPG Images Online",

    description:

      "Turn the pages of a PDF into JPG images that you can view, share, or use in other documents.",

    steps: [

      "Select the PDF you want to convert.",

      "Click Convert to JPG and wait for the pages to render.",

      "Save the generated JPG images to your device.",

    ],

    related: [

      { label: "JPG to PDF", href: "/tools/jpg-to-pdf" },

      { label: "Compress PDF", href: "/tools/compress-pdf" },

      { label: "Merge PDF", href: "/tools/merge-pdf" },

    ],

  },

  "pdf-to-word": {

    title: "Convert PDF to Word Online",

    description:

      "Convert a PDF containing selectable text into an editable Word document. Complex layouts and scanned documents may not convert accurately.",

    steps: [

      "Choose a PDF that contains selectable text.",

      "Click Convert to Word and wait for processing.",

      "Download the generated DOCX file and review its formatting.",

    ],

    related: [

      { label: "Merge PDF", href: "/tools/merge-pdf" },

      { label: "Compress PDF", href: "/tools/compress-pdf" },

      { label: "JPG to PDF", href: "/tools/jpg-to-pdf" },

    ],

  },

};

export default function ToolClient({ slug }: { slug: string }) {

  let content: React.ReactNode;



  if (slug === "emi-calculator") content = <EMI />;

  else if (slug === "sip-calculator") content = <SIP />;

  else if (slug === "gst-calculator") content = <GST />;

  else if (slug === "percentage-calculator") content = <Percentage />;

  else if (slug === "discount-calculator") content = <Discount />;

  else if (slug === "age-calculator") content = <Age />;

  else if (slug === "bmi-calculator") content = <BMI />;

  else if (slug === "fuel-cost-calculator") content = <Fuel />;

  else if (slug === "jpg-to-pdf") content = <JpgToPdf />;
  else if (slug === "image-compressor") content = <ImageCompressor />;
  else if (slug === "image-resizer") {
    content = <ImageResizer />;
}

  else if (slug === "image-cropper") content = <ImageCropper />;
  else if (slug === "jpg-to-png") content = <JpgToPng />;
  else if (slug === "png-to-jpg") content = <PngToJpg />;
  else if (slug === "webp-to-jpg") content = <WebpToJpg />;
  else if (slug === "images-to-pdf") content = <ImagesToPdf />;


  else if (slug === "pdf-to-jpg") content = <PdfToJpg />;

  else if (slug === "pdf-to-word") content = <PdfToWord />;

  else if (slug === "compress-pdf") content = <CompressPdf />;

  else if (slug === "merge-pdf") content = <MergePdf />;

  else if (slug === "date-difference") content = <DateDifference />;

  else if (slug === "income-tax-calculator")

    content = <IncomeTax />;

  else if (slug === "salary-calculator")

    content = <SalaryCalculator />;

  else content = <ComingSoon />;





  function goBack() {

    if (window.history.length > 1) {

      window.history.back();

    } else {

      window.location.href = "/";

    }

  }



  const pdfPage = pdfToolContent[slug];

  if (pdfPage) {
    return (
      <main className="pdf-tool-page">
        <nav className="pdf-tool-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/pdf-tools">PDF Tools</a>
          <span aria-hidden="true">/</span>
          <span>{pdfPage.title}</span>
        </nav>

        <header className="pdf-tool-intro">
          <p className="pdf-tool-eyebrow">FREE ONLINE PDF TOOL</p>
          <h1>{pdfPage.title}</h1>
          <p>{pdfPage.description}</p>
        </header>

        <section className="pdf-tool-workspace" aria-label={pdfPage.title}>
          {content}
        </section>

        <section className="pdf-tool-howto">
          <h2>How to use this tool</h2>
          <ol>
            {pdfPage.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <nav className="pdf-tool-related" aria-label="Related PDF tools">
          <h2>Related PDF tools</h2>
          <div className="pdf-tool-related-grid">
            {pdfPage.related.map((item) => (
              <a href={item.href} key={item.href}>
                <span>{item.label}</span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </nav>
      </main>
    );
  }

  return (
    <div className="pdf-tool-page eu-generic-tool-page">
      <nav className="pdf-tool-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <a href="/">All tools</a>
        <span aria-hidden="true">/</span>
        <span>{slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</span>
      </nav>
      <section className="pdf-tool-workspace" aria-label="Tool workspace">
        {content}
      </section>
    </div>
  );

}



function Box({ children }: { children: React.ReactNode }) { return <div className="tool-box">{children}</div>; }



function EMI() {

  const [p, setP] = useState(500000), [rate, setRate] = useState(10), [years, setYears] = useState(5);

  const r = rate / 12 / 100, n = years * 12, emi = r ? p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : p / n;

  return <Box><div className="form-grid">

    <Field label="Loan amount (₹)" value={p} onChange={setP} /><Field label="Interest rate (% yearly)" value={rate} onChange={setRate} /><Field label="Tenure (years)" value={years} onChange={setYears} />

  </div><div className="result"><span>Monthly EMI</span><strong>{money(emi)}</strong><div className="cards"><Mini l="Total interest" v={money(emi * n - p)} /><Mini l="Total payment" v={money(emi * n)} /><Mini l="Months" v={String(n)} /></div></div></Box>;

}

function SIP() {

  const [monthly, setMonthly] = useState(5000), [rate, setRate] = useState(12), [years, setYears] = useState(10);

  const m = rate / 100 / 12, n = years * 12, invested = monthly * n, value = m ? monthly * ((Math.pow(1 + m, n) - 1) / m) * (1 + m) : invested;

  return <Box><div className="form-grid"><Field label="Monthly investment (₹)" value={monthly} onChange={setMonthly} /><Field label="Expected return (% yearly)" value={rate} onChange={setRate} /><Field label="Duration (years)" value={years} onChange={setYears} /></div><div className="result"><span>Estimated value</span><strong>{money(value)}</strong><div className="cards"><Mini l="Invested" v={money(invested)} /><Mini l="Estimated gains" v={money(value - invested)} /><Mini l="Duration" v={`${years} years`} /></div></div></Box>;

}

function GST() {

  const [amount, setAmount] = useState(1000), [rate, setRate] = useState(18);

  const tax = amount * rate / 100, total = amount + tax;

  return <Box><div className="form-grid"><Field label="Amount before GST (₹)" value={amount} onChange={setAmount} /><Field label="GST rate (%)" value={rate} onChange={setRate} /></div><div className="result"><span>GST amount</span><strong>{money(tax)}</strong><div className="cards"><Mini l="Base amount" v={money(amount)} /><Mini l="Total" v={money(total)} /></div></div></Box>;

}

function Percentage() {

  const [mode, setMode] = useState("of");

  const [a, setA] = useState<number | "">(20);

  const [b, setB] = useState<number | "">(500);



  const first = a === "" ? 0 : a;

  const second = b === "" ? 0 : b;



  let result = 0;

  let label = "Result";



  if (mode === "of") {

    result = (first / 100) * second;

    label = `${first}% of ${second}`;

  }



  if (mode === "what-percent") {

    result = second !== 0 ? (first / second) * 100 : 0;

    label = `${first} is what % of ${second}`;

  }



  if (mode === "increase") {

    result = first !== 0

      ? ((second - first) / Math.abs(first)) * 100

      : 0;



    label = "Percentage increase";

  }



  if (mode === "decrease") {

    result = first !== 0

      ? ((first - second) / Math.abs(first)) * 100

      : 0;



    label = "Percentage decrease";

  }



  return (

    <Box>

      <div className="field">

        <label>Calculate</label>



        <select

          value={mode}

          onChange={(e) => setMode(e.target.value)}

        >

          <option value="of">What is X% of Y?</option>

          <option value="what-percent">X is what % of Y?</option>

          <option value="increase">Percentage increase</option>

          <option value="decrease">Percentage decrease</option>

        </select>

      </div>



      <div className="form-grid">

        <div className="field">

          <label>{mode === "of" ? "Percentage (%)" : "First value"}</label>



          <input

            type="number"

            value={a}

            onChange={(e) =>

              setA(e.target.value === "" ? "" : Number(e.target.value))

            }

          />

        </div>



        <div className="field">

          <label>{mode === "of" ? "Of number" : "Second value"}</label>



          <input

            type="number"

            value={b}

            onChange={(e) =>

              setB(e.target.value === "" ? "" : Number(e.target.value))

            }

          />

        </div>

      </div>



      <div className="result">

        <span>{label}</span>



        <strong>

          {mode === "of"

            ? result.toLocaleString("en-IN", {

              maximumFractionDigits: 2,

            })

            : `${result.toFixed(2)}%`}

        </strong>

      </div>

    </Box>

  );

}

function Discount() {

  const [price, setPrice] = useState(1000), [d, setD] = useState(20); const save = price * d / 100;

  return <Box><div className="form-grid"><Field label="Original price (₹)" value={price} onChange={setPrice} /><Field label="Discount (%)" value={d} onChange={setD} /></div><div className="result"><span>Sale price</span><strong>{money(price - save)}</strong><div className="cards"><Mini l="You save" v={money(save)} /><Mini l="Original" v={money(price)} /></div></div></Box>;

}

function Age() {

  const [dob, setDob] = useState("2000-11-19"); const now = new Date(), d = new Date(dob); let y = now.getFullYear() - d.getFullYear(); let m = now.getMonth() - d.getMonth(); let day = now.getDate() - d.getDate(); if (day < 0) m--; if (m < 0) { y--; m += 12; } return <Box><div className="field"><label>Date of birth</label><input type="date" value={dob} onChange={e => setDob(e.target.value)} /></div><div className="result"><span>Current age</span><strong>{Math.max(0, y)} years {Math.max(0, m)} months</strong></div></Box>;

}

function BMI() {

  const [kg, setKg] = useState(70), [cm, setCm] = useState(170); const bmi = kg / Math.pow(cm / 100, 2); const status = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obesity";

  return <Box><div className="form-grid"><Field label="Weight (kg)" value={kg} onChange={setKg} /><Field label="Height (cm)" value={cm} onChange={setCm} /></div><div className="result"><span>BMI</span><strong>{bmi.toFixed(1)}</strong><p>{status}</p></div></Box>;

}

function Fuel() {

  const [distance, setDistance] = useState(300), [mileage, setMileage] = useState(18), [price, setPrice] = useState(100); const litres = distance / mileage, cost = litres * price;

  return <Box><div className="form-grid"><Field label="Distance (km)" value={distance} onChange={setDistance} /><Field label="Mileage (km/L)" value={mileage} onChange={setMileage} /><Field label="Fuel price (₹/L)" value={price} onChange={setPrice} /></div><div className="result"><span>Estimated fuel cost</span><strong>{money(cost)}</strong><p>Approx. {litres.toFixed(1)} litres required.</p></div></Box>;

}

function JpgToPdf() {

  const [file, setFile] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);



  async function convert() {

    if (!file) return;



    setBusy(true);



    try {

      // Load jsPDF only when this tool is actually used

      const { jsPDF } = await import("jspdf");



      const data = await file.arrayBuffer();



      const url = URL.createObjectURL(

        new Blob([data], {

          type: file.type,

        })

      );



      const img = new Image();



      img.onload = () => {

        const pdf = new jsPDF({

          orientation:

            img.width > img.height

              ? "landscape"

              : "portrait",

          unit: "px",

          format: [img.width, img.height],

        });



        pdf.addImage(

          url,

          "JPEG",

          0,

          0,

          img.width,

          img.height

        );



        pdf.save(

          file.name.replace(

            /\.[^.]+$/,

            ""

          ) + ".pdf"

        );



        URL.revokeObjectURL(url);



        setBusy(false);

      };



      img.onerror = () => {

        URL.revokeObjectURL(url);

        setBusy(false);

      };



      img.src = url;

    } catch (error) {

      console.error(

        "JPG TO PDF ERROR:",

        error

      );



      setBusy(false);

    }

  }



  return (

    <Box>

      <div className="field">

        <label>Select JPG/PNG</label>



        <input

          type="file"

          accept="image/jpeg,image/png"

          onChange={(e) =>

            setFile(

              e.target.files?.[0] || null

            )

          }

        />

      </div>



      <button

        className="primary"

        style={{ marginTop: 18 }}

        onClick={convert}

        disabled={!file || busy}

      >

        {busy

          ? "Converting…"

          : "Convert to PDF"}

      </button>

    </Box>

  );

}



function PdfToJpg() {

  const [file, setFile] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);

  const [status, setStatus] = useState("");



  async function convert() {

    if (!file) return;



    setBusy(true);

    setStatus("Reading PDF...");



    try {

      const pdfjsLib = await import(

        "pdfjs-dist/legacy/build/pdf.mjs"

      );



      // Tell PDF.js where its worker is located.

      pdfjsLib.GlobalWorkerOptions.workerSrc =

        "/pdf.worker.min.mjs";



      const data = await file.arrayBuffer();



      const pdf = await pdfjsLib.getDocument({

        data: new Uint8Array(data),

      }).promise;



      const baseName = file.name.replace(/\.[^.]+$/, "");



      for (

        let pageNumber = 1;

        pageNumber <= pdf.numPages;

        pageNumber++

      ) {

        setStatus(

          `Converting page ${pageNumber} of ${pdf.numPages}...`

        );



        const page = await pdf.getPage(pageNumber);



        const viewport = page.getViewport({

          scale: 1.5,

        });



        const canvas = document.createElement("canvas");



        canvas.width = Math.ceil(viewport.width);

        canvas.height = Math.ceil(viewport.height);



        const context = canvas.getContext("2d");



        if (!context) {

          throw new Error(

            "Could not create canvas 2D context."

          );

        }



        await page.render({

          canvas,

          canvasContext: context,

          viewport,

        }).promise;



        const imageUrl = canvas.toDataURL(

          "image/jpeg",

          0.9

        );



        const link = document.createElement("a");



        link.href = imageUrl;

        link.download =

          `${baseName}-page-${pageNumber}.jpg`;



        document.body.appendChild(link);

        link.click();

        link.remove();



        await new Promise((resolve) =>

          setTimeout(resolve, 200)

        );

      }



      setStatus(

        `${pdf.numPages} page${pdf.numPages === 1 ? "" : "s"

        } converted successfully.`

      );

    } catch (error) {

      console.error("PDF TO JPG ERROR:", error);



      const message =

        error instanceof Error

          ? error.message

          : String(error);



      setStatus(`Conversion failed: ${message}`);

    } finally {

      setBusy(false);

    }

  }



  return (

    <Box>

      <div className="field">

        <label>Select PDF</label>



        <input

          type="file"

          accept="application/pdf"

          onChange={(e) =>

            setFile(e.target.files?.[0] || null)

          }

        />

      </div>



      {file && (

        <p className="muted" style={{ marginTop: 12 }}>

          Selected: {file.name}

        </p>

      )}



      <button

        className="primary"

        style={{ marginTop: 18 }}

        onClick={convert}

        disabled={!file || busy}

      >

        {busy ? "Converting…" : "Convert to JPG"}

      </button>



      {status && (

        <div className="result">

          <span>Status</span>

          <p style={{ marginBottom: 0 }}>

            {status}

          </p>

        </div>

      )}

    </Box>

  );

}

function PdfToWord() {

  const [file, setFile] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);

  const [status, setStatus] = useState("");



  async function convert() {

    if (!file) return;



    setBusy(true);

    setStatus("Reading PDF...");



    try {

      // -----------------------------------------

      // 1. Load PDF.js

      // -----------------------------------------

      const pdfjsLib = await import(

        "pdfjs-dist/legacy/build/pdf.mjs"

      );



      pdfjsLib.GlobalWorkerOptions.workerSrc =

        "/pdf.worker.min.mjs";



      const data = await file.arrayBuffer();



      const pdf = await pdfjsLib.getDocument({

        data: new Uint8Array(data),

      }).promise;



      // -----------------------------------------

      // 2. Load DOCX library

      // -----------------------------------------

      const {

        Document,

        Packer,

        Paragraph,

        TextRun,

        AlignmentType,

        PageBreak,

      } = await import("docx");



      const documentChildren: any[] = [];



      // -----------------------------------------

      // Process every PDF page

      // -----------------------------------------

      for (

        let pageNumber = 1;

        pageNumber <= pdf.numPages;

        pageNumber++

      ) {

        setStatus(

          `Analyzing page ${pageNumber} of ${pdf.numPages}...`

        );



        const page = await pdf.getPage(pageNumber);



        const viewport = page.getViewport({

          scale: 1,

        });



        const textContent = await page.getTextContent();



        // -----------------------------------------

        // Extract usable text items

        // -----------------------------------------

        const items = textContent.items

          .filter((item) => "str" in item)

          .map((item) => {

            if (!("str" in item)) {

              return null;

            }



            const transform = item.transform;



            const x = transform[4];



            const y = transform[5];



            const fontSize = Math.abs(

              transform[3]

            );



            const fontName =

              textContent.styles[item.fontName]

                ?.fontFamily || item.fontName;



            return {

              text: item.str,

              x,

              y,

              width: item.width || 0,

              fontSize: fontSize || 12,

              fontName: fontName || "",

            };

          })

          .filter(Boolean);



        if (!items.length) {

          continue;

        }



        // -----------------------------------------

        // Find typical body font size

        // -----------------------------------------

        const fontSizes = items

          .map((item) => item!.fontSize)

          .filter((size) => size > 0)

          .sort((a, b) => a - b);



        const medianFontSize =

          fontSizes.length > 0

            ? fontSizes[

            Math.floor(fontSizes.length / 2)

            ]

            : 12;



        // -----------------------------------------

        // Sort text from top → bottom

        // -----------------------------------------

        items.sort((a, b) => {

          const yDifference = b!.y - a!.y;



          if (Math.abs(yDifference) > 2) {

            return yDifference;

          }



          return a!.x - b!.x;

        });



        // -----------------------------------------

        // Group text items into lines

        // -----------------------------------------

        const lines: any[][] = [];



        for (const item of items) {

          if (!item) continue;



          const lastLine =

            lines[lines.length - 1];



          if (!lastLine) {

            lines.push([item]);

            continue;

          }



          const reference = lastLine[0];



          const tolerance = Math.max(

            3,

            Math.min(reference.fontSize * 0.6, 8)

          );



          if (

            Math.abs(item.y - reference.y) <=

            tolerance

          ) {

            lastLine.push(item);

          } else {

            lines.push([item]);

          }

        }



        // -----------------------------------------

        // Sort items inside each line left → right

        // -----------------------------------------

        for (const line of lines) {

          line.sort((a, b) => a.x - b.x);

        }



        // -----------------------------------------

        // Convert each PDF line to Word paragraph

        // -----------------------------------------

        for (

          let lineIndex = 0;

          lineIndex < lines.length;

          lineIndex++

        ) {

          const line = lines[lineIndex];



          if (!line.length) continue;



          const firstItem = line[0];



          const lastItem =

            line[line.length - 1];



          const lineStartX = firstItem.x;



          const lineEndX =

            lastItem.x + lastItem.width;



          const lineWidth =

            lineEndX - lineStartX;



          const pageWidth = viewport.width;



          const lineCenter =

            lineStartX + lineWidth / 2;



          // -----------------------------------------

          // Detect alignment

          // -----------------------------------------

          let alignment: "left" | "center" | "right" = "left";



          const centerDistance =

            Math.abs(lineCenter - pageWidth / 2);



          if (

            centerDistance < pageWidth * 0.08 &&

            lineWidth < pageWidth * 0.8

          ) {

            alignment = "center";

          } else if (

            lineEndX > pageWidth * 0.85

          ) {

            alignment = "right";

          }



          // -----------------------------------------

          // Create Word text runs

          // -----------------------------------------

          const runs = line.map(

            (item, itemIndex) => {

              const fontFamily =

                String(item.fontName || "")

                  .toLowerCase();



              const isBold =

                fontFamily.includes("bold") ||

                fontFamily.includes("black") ||

                fontFamily.includes("heavy") ||

                fontFamily.includes("semibold");



              const isItalic =

                fontFamily.includes("italic") ||

                fontFamily.includes("oblique");



              // PDF font size → Word half-points

              const wordFontSize = Math.max(

                16,

                Math.min(

                  Math.round(

                    item.fontSize * 2

                  ),

                  56

                )

              );



              // -------------------------------------

              // Detect spacing between PDF text items

              // -------------------------------------

              let text = item.text;



              if (itemIndex > 0) {

                const previous =

                  line[itemIndex - 1];



                const previousEnd =

                  previous.x +

                  previous.width;



                const gap =

                  item.x - previousEnd;



                // Add a space when there is a meaningful

                // visual gap between PDF text items.

                if (

                  gap >

                  Math.max(

                    2,

                    item.fontSize * 0.18

                  )

                ) {

                  text = " " + text;

                }

              }



              return new TextRun({

                text,

                bold: isBold,

                italics: isItalic,

                size: wordFontSize,

              });

            }

          );



          // -----------------------------------------

          // Determine if line looks like heading

          // -----------------------------------------

          const averageFontSize =

            line.reduce(

              (sum, item) =>

                sum + item.fontSize,

              0

            ) / line.length;



          const lineFontFamily =

            line

              .map((item) =>

                String(

                  item.fontName || ""

                ).toLowerCase()

              )

              .join(" ");



          const appearsBold =

            lineFontFamily.includes(

              "bold"

            ) ||

            lineFontFamily.includes(

              "black"

            ) ||

            lineFontFamily.includes(

              "semibold"

            );



          const looksLikeLargeHeading =

            averageFontSize >

            medianFontSize * 1.35;



          const looksLikeHeading =

            looksLikeLargeHeading ||

            (

              appearsBold &&

              averageFontSize >

              medianFontSize * 1.15

            );



          // -----------------------------------------

          // Create Word paragraph

          // -----------------------------------------

          const paragraph = new Paragraph({

            alignment,

            spacing: {

              after: looksLikeHeading

                ? 140

                : 80,

              line: 276,

            },

            children: runs,

          });



          documentChildren.push(

            paragraph

          );



          // -----------------------------------------

          // Extra spacing after headings

          // -----------------------------------------

          if (looksLikeHeading) {

            documentChildren.push(

              new Paragraph({

                spacing: {

                  after: 60,

                },

                children: [

                  new TextRun({

                    text: "",

                  }),

                ],

              })

            );

          }

        }



        // -----------------------------------------

        // Add page break between PDF pages

        // -----------------------------------------

        if (

          pageNumber < pdf.numPages

        ) {

          documentChildren.push(

            new Paragraph({

              children: [

                new PageBreak(),

              ],

            })

          );

        }

      }



      // -----------------------------------------

      // No text found

      // -----------------------------------------

      if (

        documentChildren.length === 0

      ) {

        throw new Error(

          "No selectable text was found. This PDF may be scanned or image-based."

        );

      }



      setStatus(

        "Creating formatted Word document..."

      );



      // -----------------------------------------

      // Create DOCX

      // -----------------------------------------

      const doc = new Document({

        sections: [

          {

            properties: {},

            children: documentChildren,

          },

        ],

      });



      // -----------------------------------------

      // Generate DOCX blob

      // -----------------------------------------

      const blob =

        await Packer.toBlob(doc);



      const url =

        URL.createObjectURL(blob);



      const link =

        window.document.createElement(

          "a"

        );



      link.href = url;



      link.download =

        file.name.replace(

          /\.pdf$/i,

          ""

        ) + ".docx";



      window.document.body.appendChild(

        link

      );



      link.click();



      link.remove();



      URL.revokeObjectURL(url);



      setStatus(

        `Done. ${pdf.numPages} page${pdf.numPages === 1

          ? ""

          : "s"

        } converted successfully.`

      );

    } catch (error) {

      console.error(

        "PDF TO WORD ERROR:",

        error

      );



      const message =

        error instanceof Error

          ? error.message

          : String(error);



      setStatus(

        `Conversion failed: ${message}`

      );

    } finally {

      setBusy(false);

    }

  }



  return (

    <Box>

      <div className="field">

        <label>Select PDF</label>



        <input

          type="file"

          accept="application/pdf"

          onChange={(e) =>

            setFile(

              e.target.files?.[0] ||

              null

            )

          }

        />

      </div>



      {file && (

        <p

          className="muted"

          style={{

            marginTop: 12,

          }}

        >

          Selected: {file.name} (

          {(

            file.size /

            1024 /

            1024

          ).toFixed(2)}{" "}

          MB)

        </p>

      )}



      <button

        className="primary"

        style={{

          marginTop: 18,

        }}

        onClick={convert}

        disabled={!file || busy}

      >

        {busy

          ? "Converting…"

          : "Convert to Word"}

      </button>



      {status && (

        <div className="result">

          <span>Status</span>



          <p

            style={{

              marginBottom: 0,

            }}

          >

            {status}

          </p>

        </div>

      )}



      <p

        className="muted"

        style={{

          marginTop: 16,

        }}

      >

        Converts selectable PDF text while

        preserving approximate headings,

        font sizes, bold text, line breaks,

        spacing and alignment.

      </p>

    </Box>

  );

}



function CompressPdf() {

  const [file, setFile] = useState<File | null>(null);

  const [quality, setQuality] = useState("medium");

  const [busy, setBusy] = useState(false);

  const [status, setStatus] = useState("");



  async function compress() {

    if (!file) return;



    setBusy(true);

    setStatus("Preparing PDF...");



    try {

      const { PDFDocument } =

        await import("pdf-lib");



      const pdfjsLib = await import(

        "pdfjs-dist/legacy/build/pdf.mjs"

      );



      pdfjsLib.GlobalWorkerOptions.workerSrc =

        "/pdf.worker.min.mjs";



      const data = await file.arrayBuffer();



      const sourcePdf = await pdfjsLib.getDocument({

        data: new Uint8Array(data),

      }).promise;



      const outputPdf = await PDFDocument.create();



      const scale =

        quality === "low"

          ? 1

          : quality === "high"

            ? 2

            : 1.5;



      const jpegQuality =

        quality === "low"

          ? 0.55

          : quality === "high"

            ? 0.85

            : 0.7;



      for (

        let pageNumber = 1;

        pageNumber <= sourcePdf.numPages;

        pageNumber++

      ) {

        setStatus(

          `Compressing page ${pageNumber} of ${sourcePdf.numPages}...`

        );



        const page = await sourcePdf.getPage(pageNumber);



        const viewport = page.getViewport({

          scale,

        });



        const canvas = document.createElement("canvas");



        canvas.width = Math.ceil(viewport.width);

        canvas.height = Math.ceil(viewport.height);



        const context = canvas.getContext("2d");



        if (!context) {

          throw new Error(

            "Could not create canvas context."

          );

        }



        await page.render({

          canvas,

          canvasContext: context,

          viewport,

        }).promise;



        const imageDataUrl = canvas.toDataURL(

          "image/jpeg",

          jpegQuality

        );



        const imageBytes = await fetch(

          imageDataUrl

        ).then((res) => res.arrayBuffer());



        const image = await outputPdf.embedJpg(

          imageBytes

        );



        const outputPage = outputPdf.addPage([

          viewport.width / scale,

          viewport.height / scale,

        ]);



        outputPage.drawImage(image, {

          x: 0,

          y: 0,

          width: viewport.width / scale,

          height: viewport.height / scale,

        });

      }



      setStatus("Creating compressed PDF...");



      const compressedBytes = await outputPdf.save();



      const buffer = new ArrayBuffer(compressedBytes.byteLength);



      new Uint8Array(buffer).set(compressedBytes);



      const blob = new Blob([buffer], {

        type: "application/pdf",

      });



      const url = URL.createObjectURL(blob);



      const link = document.createElement("a");



      link.href = url;

      link.download =

        file.name.replace(

          /\.pdf$/i,

          ""

        ) + "-compressed.pdf";



      document.body.appendChild(link);

      link.click();

      link.remove();



      URL.revokeObjectURL(url);

      console.log("Selected file:", file.name, file.size, "bytes");

      const originalMB =

        file.size / 1024 / 1024;



      const compressedMB =

        compressedBytes.length / 1024 / 1024;



      const reduction =

        ((file.size - compressedBytes.length) /

          file.size) *

        100;



      setStatus(

        `Done. ${originalMB.toFixed(2)} MB → ${compressedMB.toFixed(

          2

        )} MB (${Math.max(0, reduction).toFixed(1)}% smaller).`

      );

    } catch (error) {

      console.error(

        "PDF compression failed:",

        error

      );



      const message =

        error instanceof Error

          ? error.message

          : String(error);



      setStatus(

        `Compression failed: ${message}`

      );

    } finally {

      setBusy(false);

    }

  }



  return (

    <Box>

      <div className="field">

        <label>Select PDF</label>



        <input

          type="file"

          accept="application/pdf"

          onChange={(e) =>

            setFile(

              e.target.files?.[0] || null

            )

          }

        />

      </div>



      {file && (

        <p

          className="muted"

          style={{ marginTop: 12 }}

        >

          Selected: {file.name} (

          {(file.size / 1024 / 1024).toFixed(2)} MB)

        </p>

      )}



      <div

        className="field"

        style={{ marginTop: 18 }}

      >

        <label>Compression level</label>



        <select

          value={quality}

          onChange={(e) =>

            setQuality(e.target.value)

          }

        >

          <option value="low">

            Strong compression — smaller file

          </option>



          <option value="medium">

            Balanced — recommended

          </option>



          <option value="high">

            Higher quality — larger file

          </option>

        </select>

      </div>



      <button

        className="primary"

        style={{ marginTop: 18 }}

        onClick={compress}

        disabled={!file || busy}

      >

        {busy

          ? "Compressing…"

          : "Compress PDF"}

      </button>



      {status && (

        <div className="result">

          <span>Status</span>



          <p style={{ marginBottom: 0 }}>

            {status}

          </p>

        </div>

      )}

    </Box>

  );

}



function MergePdf() {

  const [files, setFiles] = useState<File[]>(

    []

  );



  const [busy, setBusy] =

    useState(false);



  async function merge() {

    if (!files.length) return;



    setBusy(true);



    try {

      // Load pdf-lib only when this tool is used

      const { PDFDocument } =

        await import("pdf-lib");



      const out =

        await PDFDocument.create();



      for (const file of files) {

        const src =

          await PDFDocument.load(

            await file.arrayBuffer()

          );



        const pages =

          await out.copyPages(

            src,

            src.getPageIndices()

          );



        pages.forEach((page) =>

          out.addPage(page)

        );

      }



      const bytes =

        await out.save();



      // Create a real ArrayBuffer

      // to avoid BlobPart TypeScript issues

      const buffer =

        new ArrayBuffer(

          bytes.byteLength

        );



      new Uint8Array(buffer).set(

        bytes

      );



      const blob = new Blob(

        [buffer],

        {

          type: "application/pdf",

        }

      );



      const url =

        URL.createObjectURL(blob);



      const a =

        document.createElement("a");



      a.href = url;

      a.download = "merged.pdf";



      document.body.appendChild(a);



      a.click();



      a.remove();



      URL.revokeObjectURL(url);

    } catch (error) {

      console.error(

        "PDF merge failed:",

        error

      );



      alert(

        "Could not merge the PDF files. Please check that they are valid PDFs."

      );

    } finally {

      setBusy(false);

    }

  }



  return (

    <Box>

      <div className="field">

        <label>Select PDF files</label>



        <input

          type="file"

          accept="application/pdf"

          multiple

          onChange={(e) =>

            setFiles(

              Array.from(

                e.target.files || []

              )

            )

          }

        />

      </div>



      <p className="muted">

        {files.length} file(s) selected.

      </p>



      <button

        className="primary"

        onClick={merge}

        disabled={!files.length || busy}

      >

        {busy

          ? "Merging…"

          : "Merge PDFs"}

      </button>

    </Box>

  );

}



function DateDifference() { const [a, setA] = useState("2026-01-01"), [b, setB] = useState("2026-10-08"); const days = Math.abs(Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)); return <Box><div className="form-grid"><div className="field"><label>Start date</label><input type="date" value={a} onChange={e => setA(e.target.value)} /></div><div className="field"><label>End date</label><input type="date" value={b} onChange={e => setB(e.target.value)} /></div></div><div className="result"><span>Difference</span><strong>{days.toLocaleString("en-IN")} days</strong></div></Box> }

function ComingSoon() { return <Box><h2>Coming soon</h2><p className="muted">This tool is in the next build. The product architecture is ready so we can add utilities quickly.</p></Box> }

/**
 * Image Compressor
 *
 * Features:
 * - Accepts JPG, PNG, and WebP images.
 * - Processes images locally in the browser.
 * - Allows users to adjust image quality.
 * - Displays original and compressed file sizes.
 * - Provides a download link for the result.
 *
 * Styling:
 * Uses the existing project classes:
 * Box, field, primary, result, and muted.
 */
function ImageCompressor() {
  // Store the uploaded image.
  const [file, setFile] = useState<File | null>(null);

  // Compression quality ranges from 0.1 to 1.
  const [quality, setQuality] = useState(0.7);

  // Store preview URLs for the original and compressed images.
  const [originalUrl, setOriginalUrl] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");

  // Store the generated file's size and processing status.
  const [compressedSize, setCompressedSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  /**
   * Release temporary browser URLs when the component unmounts.
   * This helps prevent unnecessary memory usage.
   */
  // Note: Existing preview URLs are also released when a new image is selected.

  /**
   * Handle image selection and validate the file type.
   */
  function chooseFile(selectedFile?: File) {
    if (!selectedFile) return;

    const supportedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!supportedTypes.includes(selectedFile.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      return;
    }

    // Release previous preview URLs before replacing them.
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);

    // Save the selected file and create its preview.
    setFile(selectedFile);
    setOriginalUrl(URL.createObjectURL(selectedFile));

    // Clear results from the previous image.
    setCompressedUrl("");
    setCompressedSize(0);
    setError("");
  }

  /**
   * Convert the selected image using the browser Canvas API.
   */
  async function compressImage() {
    if (!file) return;

    setBusy(true);
    setError("");

    let sourceUrl = "";

    try {
      // Create a temporary URL so the browser can load the image.
      sourceUrl = URL.createObjectURL(file);

      const image = new Image();
      image.src = sourceUrl;

      // Wait until the browser has loaded the image.
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("The selected image could not be loaded."));
      });

      // Create a canvas using the original image dimensions.
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Image processing is not supported by this browser.");
      }

      // Draw the original image onto the canvas.
      context.drawImage(image, 0, 0);

      /**
       * Preserve PNG output for PNG uploads.
       * Encode JPG and WebP uploads as JPEG.
       *
       * JPEG does not support transparency.
       * PNG encoding does not use the quality slider.
       */
      const outputType =
        file.type === "image/png" ? "image/png" : "image/jpeg";

      // Generate the compressed image as a Blob.
      const compressedBlob = await new Promise<Blob>(
        (resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("The browser could not create the image."));
              }
            },
            outputType,
            quality
          );
        }
      );

      // Release the temporary source URL.
      URL.revokeObjectURL(sourceUrl);
      sourceUrl = "";

      // Release the previous result URL, if one exists.
      if (compressedUrl) {
        URL.revokeObjectURL(compressedUrl);
      }

      // Store the new result and its actual file size.
      setCompressedUrl(URL.createObjectURL(compressedBlob));
      setCompressedSize(compressedBlob.size);
    } catch (err) {
      // Show a readable error if processing fails.
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while compressing the image."
      );
    } finally {
      // Always release temporary resources and reset the loading state.
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      setBusy(false);
    }
  }

  /**
   * Format byte values into readable units.
   */
  function formatSize(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  // Calculate the percentage saved after compression.
  const savedPercent =
    file && compressedSize > 0
      ? Math.round(((file.size - compressedSize) / file.size) * 100)
      : 0;

  // Determine the correct extension for the generated file.
  const outputExtension =
    file?.type === "image/png" ? "png" : "jpg";

  // Remove the original extension to build a clean download filename.
  const baseName = file
    ? file.name.replace(/\.[^.]+$/, "")
    : "image";

  return (
    <Box>
      {/* Image upload */}
      <div className="field">
        <label htmlFor="image-compressor-upload">
          Select an image (JPG, PNG, or WebP)
        </label>

        <input
          id="image-compressor-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) =>
            chooseFile(event.target.files?.[0])
          }
        />
      </div>

      {/* Selected image details and compression settings */}
      {file && (
        <>
          <p className="muted" style={{ marginTop: 12 }}>
            Selected: {file.name} ({formatSize(file.size)})
          </p>

          <div className="field" style={{ marginTop: 18 }}>
            <label htmlFor="image-compressor-quality">
              Image quality: {Math.round(quality * 100)}%
            </label>

            <input
              id="image-compressor-quality"
              type="range"
              min="10"
              max="100"
              step="5"
              value={Math.round(quality * 100)}
              onChange={(event) =>
                setQuality(Number(event.target.value) / 100)
              }
              disabled={file.type === "image/png"}
            />

            {/* PNG ignores the Canvas quality setting. */}
            {file.type === "image/png" && (
              <p className="muted">
                The quality slider is unavailable for PNG images.
              </p>
            )}
          </div>

          {/* Start compression */}
          <button
            type="button"
            className="primary"
            style={{ marginTop: 18 }}
            onClick={compressImage}
            disabled={busy}
          >
            {busy ? "Compressing..." : "Compress Image"}
          </button>
        </>
      )}

      {/* Display errors without hiding the rest of the interface. */}
      {error && (
        <p role="alert" style={{ color: "red", marginTop: 16 }}>
          {error}
        </p>
      )}

      {/* Before-and-after comparison */}
      {file && (
        <div
          className="form-grid"
          style={{ marginTop: 24 }}
        >
          {/* Original image preview */}
          <div className="result">
            <span>Original image</span>

            {originalUrl && (
              <img
                src={originalUrl}
                alt="Original uploaded image"
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  marginTop: 12,
                }}
              />
            )}

            <p className="muted" style={{ marginTop: 12 }}>
              Original size: {formatSize(file.size)}
            </p>
          </div>

          {/* Compressed image preview and download */}
          {compressedUrl && (
            <div className="result">
              <span>Compressed image</span>

              <img
                src={compressedUrl}
                alt="Compressed image preview"
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  marginTop: 12,
                }}
              />

              <p style={{ marginTop: 12 }}>
                New size: {formatSize(compressedSize)}
              </p>

              <p>
                {savedPercent >= 0
                  ? `${savedPercent}% smaller`
                  : `${Math.abs(savedPercent)}% larger than the original`}
              </p>

              <a
                href={compressedUrl}
                download={`compressed-${baseName}.${outputExtension}`}
                className="primary"
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  textDecoration: "none",
                }}
              >
                Download Compressed Image
              </a>
            </div>
          )}
        </div>
      )}

      {/* Privacy and compression information */}
      <p className="muted" style={{ marginTop: 20 }}>
        Your image is processed locally in your browser.
        Compression does not guarantee a smaller file for every image.
        WebP uploads are downloaded as JPEG, so transparency may be lost.
      </p>
    </Box>
  );
}

function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [keepRatio, setKeepRatio] = useState(true);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(selected: File | undefined) {
    setError("");
    setPreview("");

    if (!selected) {
      setFile(null);
      return;
    }

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      setFile(null);
      return;
    }

    const url = URL.createObjectURL(selected);
    setFile(selected);
    setPreview(url);

    const image = new Image();
    image.onload = () => {
      setWidth(String(image.naturalWidth));
      setHeight(String(image.naturalHeight));
    };
    image.src = url;
  }

  function resizeImage() {
    if (!file || !preview) return;

    const targetWidth = Number(width);
    const targetHeight = Number(height);

    if (
      !Number.isInteger(targetWidth) ||
      !Number.isInteger(targetHeight) ||
      targetWidth < 1 ||
      targetHeight < 1 ||
      targetWidth > 12000 ||
      targetHeight > 12000
    ) {
      setError("Enter valid dimensions between 1 and 12000 pixels.");
      return;
    }

    setError("");

    const image = new Image();

    image.onload = () => {
      let outputWidth = targetWidth;
      let outputHeight = targetHeight;

      if (keepRatio) {
        const scale = Math.min(
          targetWidth / image.naturalWidth,
          targetHeight / image.naturalHeight
        );

        outputWidth = Math.max(1, Math.round(image.naturalWidth * scale));
        outputHeight = Math.max(1, Math.round(image.naturalHeight * scale));
      }

      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        setError("Unable to process this image in your browser.");
        return;
      }

      context.drawImage(image, 0, 0, outputWidth, outputHeight);

      const outputType =
        file.type === "image/png" ? "image/png" : "image/jpeg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Image resizing failed. Please try another image.");
            return;
          }

          const extension = outputType === "image/png" ? "png" : "jpg";
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);

          link.href = url;
          link.download = `resized-${file.name.replace(/\.[^.]+$/, "")}.${extension}`;
          link.click();

          URL.revokeObjectURL(url);
        },
        outputType,
        0.92
      );
    };

    image.onerror = () => setError("Unable to load this image.");
    image.src = preview;
  }

  return (
    <div className="image-resizer-tool">
      <div className="field">
        <label htmlFor="resize-image">Choose an image</label>
        <input
          id="resize-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handleFileChange(event.target.files?.[0])}
        />
      </div>

      {file && (
        <>
          <div style={{ margin: "16px 0" }}>
            <img
              src={preview}
              alt="Selected image preview"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: 280,
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
            <p className="muted">
              Original size: {file.name}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 12,
            }}
          >
            <div className="field">
              <label htmlFor="resize-width">Width (px)</label>
              <input
                id="resize-width"
                type="number"
                min="1"
                max="12000"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="resize-height">Height (px)</label>
              <input
                id="resize-height"
                type="number"
                min="1"
                max="12000"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: "12px 0 18px",
            }}
          >
            <input
              type="checkbox"
              checked={keepRatio}
              onChange={(event) => setKeepRatio(event.target.checked)}
            />
            Keep aspect ratio (fit within dimensions)
          </label>

          <button className="primary" type="button" onClick={resizeImage}>
            Resize & Download
          </button>
        </>
      )}

      {error && (
        <p role="alert" style={{ color: "#dc2626", marginTop: 12 }}>
          {error}
        </p>
      )}
    </div>
  );
}


function Field({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) { return <div className="field"><label>{label}</label><input type="number" value={value} onChange={e => onChange(Number(e.target.value))} /></div> }

function Mini({ l, v }: { l: string, v: string }) { return <div className="mini"><small>{l}</small><b>{v}</b></div> }
