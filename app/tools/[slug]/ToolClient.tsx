"use client";

import { useState } from "react";
import IncomeTax from "../../../components/IncomeTax";


function money(n: number) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n); }

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
  else if (slug === "pdf-to-jpg") content = <PdfToJpg />;
  else if (slug === "pdf-to-word") content = <PdfToWord />;
  else if (slug === "compress-pdf") content = <CompressPdf />;
  else if (slug === "merge-pdf") content = <MergePdf />;
  else if (slug === "date-difference") content = <DateDifference />;
  else if (slug === "income-tax-calculator")
  content = <IncomeTax />;
  else content = <ComingSoon />;
  

  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  }

  return (
    <>
      <div className="tool-back">
        <button onClick={goBack}>
          ← Back to all tools
        </button>
      </div>

      {content}
    </>
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
function Field({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) { return <div className="field"><label>{label}</label><input type="number" value={value} onChange={e => onChange(Number(e.target.value))} /></div> }
function Mini({ l, v }: { l: string, v: string }) { return <div className="mini"><small>{l}</small><b>{v}</b></div> }
