import Link from "next/link";
import { tools } from "../lib/tools";

export default function ToolCard({ tool }: { tool: typeof tools[number] }) {
  return (
    <Link className="tool-card" href={`/tools/${tool.slug}`}>
      <div className="icon">{tool.icon}</div>
      <h3>{tool.title}</h3>
      <p>{tool.description}</p>
    </Link>
  );
}