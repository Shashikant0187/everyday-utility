# Everyday Utility — Unified Tool Page Styling Update

This ZIP contains your project source with a shared visual system inspired by the existing Merge PDF page.

## What changed

- `app/globals.css`: appended shared responsive styling for tool pages, headings, workspace cards, inputs, file pickers, buttons, results and mobile layouts. Existing CSS was retained above the new block.
- `app/tools/[slug]/ToolClient.tsx`: non-PDF tools now use the same breadcrumb and outer workspace-card structure as the PDF tools. Existing PDF-specific rendering and tool logic remain in place. The Image Resizer no longer adds a separate custom card inside the workspace.
- `app/tools/[slug]/page.tsx`: added SEO metadata and matching heading sections for Image Compressor and Image Resizer; added the consistent heading for Fuel Cost Calculator.

## Apply the update

1. Make a backup of your current project.
2. Extract this ZIP into a separate folder first, rather than directly overwriting your working project.
3. Compare/replace the included source files in your working project:
   - `app/globals.css`
   - `app/tools/[slug]/ToolClient.tsx`
   - `app/tools/[slug]/page.tsx`
4. Keep your `.env` file in your local project; it is intentionally not included here.
5. In your project terminal, run:

   ```bash
   npm ci
   npm run build
   npm run dev
   ```

6. Check a calculator, Image Compressor, Image Resizer and each PDF tool. Confirm both styling and existing functionality before deploying.

## Validation note

The source ZIP was updated, but a production build could not be completed in this environment because dependencies were not installed successfully (`next` was unavailable). Please run the build locally before deployment.
