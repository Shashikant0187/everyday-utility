
"use client";

import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";

type SupportedImage = "image/jpeg" | "image/png" | "image/webp";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            URL.revokeObjectURL(url);
            resolve(image);
        };

        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Could not load this image. Please try another file."));
        };

        image.src = url;
    });
}

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function baseName(filename: string) {
    return filename.replace(/\.[^.]+$/, "");
}

function ImagePicker({
    onFile,
    multiple = false,
}: {
    onFile: (files: File[]) => void;
    multiple?: boolean;
}) {
    return (
        <div className="field">
            <label htmlFor={multiple ? "image-files" : "image-file"}>
                {multiple ? "Choose images" : "Choose an image"}
            </label>
            <input
                id={multiple ? "image-files" : "image-file"}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple={multiple}
                onChange={(event) => {
                    onFile(Array.from(event.target.files ?? []));
                    event.currentTarget.value = "";
                }}
            />
            <p className="muted">
                Supported formats: JPG, PNG and WebP.
            </p>
        </div>
    );
}

function ImagePreview({
    src,
    alt = "Selected image preview",
}: {
    src: string;
    alt?: string;
}) {
    if (!src) return null;

    return (
        <div className="image-tool-preview">
            <img src={src} alt={alt} />
        </div>
    );
}

/* -------------------------------------------------------
   1. IMAGE CROPPER
------------------------------------------------------- */

export function ImageCropper() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [x, setX] = useState("0");
    const [y, setY] = useState("0");
    const [width, setWidth] = useState("500");
    const [height, setHeight] = useState("500");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    function chooseFile(files: File[]) {
        const selected = files[0];
        setError("");

        if (!selected) return;

        if (!ACCEPTED.includes(selected.type)) {
            setError("Please select a JPG, PNG or WebP image.");
            return;
        }

        const url = URL.createObjectURL(selected);
        setFile(selected);
        setPreview(url);

        const image = new Image();

        image.onload = () => {
            setImageSize({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
            setX("0");
            setY("0");
            setWidth(String(image.naturalWidth));
            setHeight(String(image.naturalHeight));
        };

        image.onerror = () => setError("Unable to read this image.");
        image.src = url;
    }

    async function cropImage() {
        if (!file || !preview) return;

        const cropX = Number(x);
        const cropY = Number(y);
        const cropWidth = Number(width);
        const cropHeight = Number(height);

        if (
            ![cropX, cropY, cropWidth, cropHeight].every(Number.isInteger) ||
            cropX < 0 ||
            cropY < 0 ||
            cropWidth < 1 ||
            cropHeight < 1 ||
            cropX + cropWidth > imageSize.width ||
            cropY + cropHeight > imageSize.height
        ) {
            setError(
                `Enter a valid crop area inside the image (${imageSize.width} × ${imageSize.height}px).`
            );
            return;
        }

        setBusy(true);
        setError("");

        try {
            const image = await loadImage(file);
            const canvas = document.createElement("canvas");
            canvas.width = cropWidth;
            canvas.height = cropHeight;

            const context = canvas.getContext("2d");
            if (!context) throw new Error("Your browser could not process this image.");

            context.drawImage(
                image,
                cropX,
                cropY,
                cropWidth,
                cropHeight,
                0,
                0,
                cropWidth,
                cropHeight
            );

            const outputType =
                file.type === "image/png" ? "image/png" : "image/jpeg";

            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (result) =>
                        result
                            ? resolve(result)
                            : reject(new Error("Could not create the cropped image.")),
                    outputType,
                    0.92
                );
            });

            downloadBlob(
                blob,
                `cropped-${baseName(file.name)}.${outputType === "image/png" ? "png" : "jpg"}`
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : "Cropping failed.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="image-tool">
            <h2>Image Cropper</h2>
            <p className="muted">
                Crop an image by entering the starting position and output dimensions in pixels.
            </p>

            <ImagePicker onFile={chooseFile} />
            <ImagePreview src={preview} />

            {file && (
                <>
                    <p className="muted">
                        Original dimensions: {imageSize.width} × {imageSize.height}px
                    </p>

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="crop-x">X position (px)</label>
                            <input id="crop-x" type="number" min="0" value={x}
                                onChange={(e) => setX(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="crop-y">Y position (px)</label>
                            <input id="crop-y" type="number" min="0" value={y}
                                onChange={(e) => setY(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="crop-width">Crop width (px)</label>
                            <input id="crop-width" type="number" min="1" value={width}
                                onChange={(e) => setWidth(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="crop-height">Crop height (px)</label>
                            <input id="crop-height" type="number" min="1" value={height}
                                onChange={(e) => setHeight(e.target.value)} />
                        </div>
                    </div>

                    <button className="primary" onClick={cropImage} disabled={busy}>
                        {busy ? "Cropping…" : "Crop and Download"}
                    </button>
                </>
            )}

            {error && <p className="image-tool-error" role="alert">{error}</p>}
        </div>
    );
}

/* -------------------------------------------------------
   2. IMAGE FORMAT CONVERTER
------------------------------------------------------- */

function ImageConverter({
    title,
    outputType,
    extension,
}: {
    title: string;
    outputType: "image/png" | "image/jpeg";
    extension: "png" | "jpg";
}) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [quality, setQuality] = useState(0.9);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    function chooseFile(files: File[]) {
        const selected = files[0];
        setError("");

        if (!selected) return;

        if (!ACCEPTED.includes(selected.type)) {
            setError("Please select a JPG, PNG or WebP image.");
            return;
        }

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }

    async function convert() {
        if (!file) return;

        setBusy(true);
        setError("");

        try {
            const image = await loadImage(file);
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            const context = canvas.getContext("2d");
            if (!context) throw new Error("Your browser could not process this image.");

            // JPEG does not support transparency. Use a white background.
            if (outputType === "image/jpeg") {
                context.fillStyle = "#ffffff";
                context.fillRect(0, 0, canvas.width, canvas.height);
            }

            context.drawImage(image, 0, 0);

            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (result) =>
                        result
                            ? resolve(result)
                            : reject(new Error("Conversion failed. Please try another image.")),
                    outputType,
                    quality
                );
            });

            downloadBlob(blob, `${baseName(file.name)}.${extension}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="image-tool">
            <h2>{title}</h2>
            <p className="muted">
                Convert your image in your browser and download the converted file.
            </p>

            <ImagePicker onFile={chooseFile} />
            <ImagePreview src={preview} />

            {file && (
                <>
                    {outputType === "image/jpeg" && (
                        <div className="field">
                            <label htmlFor={`quality-${extension}`}>
                                JPG quality: {Math.round(quality * 100)}%
                            </label>
                            <input
                                id={`quality-${extension}`}
                                type="range"
                                min="0.5"
                                max="1"
                                step="0.05"
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                            />
                            <p className="muted">
                                PNG transparency will become a white background when converted to JPG.
                            </p>
                        </div>
                    )}

                    <button className="primary" onClick={convert} disabled={busy}>
                        {busy ? "Converting…" : `Convert to ${extension.toUpperCase()} and Download`}
                    </button>
                </>
            )}

            {error && <p className="image-tool-error" role="alert">{error}</p>}
        </div>
    );
}

export function JpgToPng() {
    return (
        <ImageConverter
            title="JPG to PNG Converter"
            outputType="image/png"
            extension="png"
        />
    );
}

export function PngToJpg() {
    return (
        <ImageConverter
            title="PNG to JPG Converter"
            outputType="image/jpeg"
            extension="jpg"
        />
    );
}

export function WebpToJpg() {
    return (
        <ImageConverter
            title="WebP to JPG Converter"
            outputType="image/jpeg"
            extension="jpg"
        />
    );
}

/* -------------------------------------------------------
   3. IMAGES TO PDF
------------------------------------------------------- */

export function ImagesToPdf() {
    const [files, setFiles] = useState<File[]>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    function chooseFiles(selected: File[]) {
        setError("");

        const valid = selected.filter((file) => ACCEPTED.includes(file.type));

        if (valid.length !== selected.length) {
            setError("Only JPG, PNG and WebP images are supported. Unsupported files were skipped.");
        }

        setFiles(valid);
    }

    async function createPdf() {
        if (!files.length) return;

        setBusy(true);
        setError("");

        try {
            const pdf = await PDFDocument.create();

            for (const file of files) {
                const image = await loadImage(file);
                const canvas = document.createElement("canvas");
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;

                const context = canvas.getContext("2d");
                if (!context) throw new Error("Your browser could not process an image.");

                // Use JPEG embedding for consistent JPG, PNG and WebP support.
                context.fillStyle = "#ffffff";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0);

                const jpgBlob = await new Promise<Blob>((resolve, reject) => {
                    canvas.toBlob(
                        (blob) =>
                            blob
                                ? resolve(blob)
                                : reject(new Error(`Could not process ${file.name}.`)),
                        "image/jpeg",
                        0.92
                    );
                });

                const bytes = await jpgBlob.arrayBuffer();
                const embedded = await pdf.embedJpg(bytes);

                // Fit the image within a standard A4 page while preserving its aspect ratio.
                const pageWidth = 595.28;
                const pageHeight = 841.89;
                const margin = 24;
                const scale = Math.min(
                    (pageWidth - margin * 2) / embedded.width,
                    (pageHeight - margin * 2) / embedded.height
                );

                const drawWidth = embedded.width * scale;
                const drawHeight = embedded.height * scale;
                const page = pdf.addPage([pageWidth, pageHeight]);

                page.drawImage(embedded, {
                    x: (pageWidth - drawWidth) / 2,
                    y: (pageHeight - drawHeight) / 2,
                    width: drawWidth,
                    height: drawHeight,
                });
            }

            const bytes = await pdf.save();
            const pdfBytes = new Uint8Array(bytes);
            const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
                type: "application/pdf",
            });
            downloadBlob(blob, "images-to-pdf.pdf");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not create the PDF.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="image-tool">
            <h2>Images to PDF</h2>
            <p className="muted">
                Combine multiple JPG, PNG or WebP images into one PDF. Each image is placed on its own A4 page.
            </p>

            <ImagePicker onFile={chooseFiles} multiple />

            {files.length > 0 && (
                <>
                    <p className="muted">{files.length} image(s) selected.</p>
                    <ol className="image-tool-file-list">
                        {files.map((file, index) => (
                            <li key={`${file.name}-${index}`}>{file.name}</li>
                        ))}
                    </ol>
                    <button className="primary" onClick={createPdf} disabled={busy}>
                        {busy ? "Creating PDF…" : "Convert Images to PDF"}
                    </button>
                </>
            )}

            {error && <p className="image-tool-error" role="alert">{error}</p>}
        </div>
    );
}

/* Keep this type available for callers that need image MIME types. */
export type { SupportedImage };
