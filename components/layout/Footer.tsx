import Link from "next/link";

const footerGroups = [
  {
    title: "PDF Tools",
    links: [
      { label: "Merge PDF", href: "/tools/merge-pdf" },
      { label: "Compress PDF", href: "/tools/compress-pdf" },
      { label: "JPG to PDF", href: "/tools/jpg-to-pdf" },
      { label: "PDF to JPG", href: "/tools/pdf-to-jpg" },
      { label: "PDF to Word", href: "/tools/pdf-to-word" },
    ],
  },
  {
    title: "Finance",
    links: [
      { label: "EMI Calculator", href: "/tools/emi-calculator" },
      { label: "Salary Calculator", href: "/tools/salary-calculator" },
      { label: "Income Tax Calculator", href: "/tools/income-tax-calculator" },
      { label: "SIP Calculator", href: "/tools/sip-calculator" },
      { label: "GST Calculator", href: "/tools/gst-calculator" },
    ],
  },
  {
    title: "Everyday Tools",
    links: [
      { label: "Percentage Calculator", href: "/tools/percentage-calculator" },
      { label: "Age Calculator", href: "/tools/age-calculator" },
      { label: "Date Difference", href: "/tools/date-difference" },
      { label: "BMI Calculator", href: "/tools/bmi-calculator" },
      { label: "Unit Converter", href: "/tools/unit-converter" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="eu-footer">
      <div className="eu-footer__main">
        <div className="eu-footer__brand">
          <Link href="/" className="eu-brand">
            <span className="eu-brand__mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 3 29 10 16 17 3 10 16 3Z"
                  fill="currentColor"
                />
                <path
                  d="m3 16 13 7 13-7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="m3 22 13 7 13-7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Everyday Utility</span>
          </Link>

          <p>
            Simple, practical tools for everyday decisions and tasks.
          </p>

          <span className="eu-footer__tagline">
            Useful tools. Clear results.
          </span>
        </div>

        {footerGroups.map((group) => (
          <div className="eu-footer__group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="eu-footer__group">
          <h3>Company</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="eu-footer__bottom">
        <p>© {new Date().getFullYear()} Everyday Utility. All rights reserved.</p>
        <p>Free online tools for everyday use.</p>
      </div>
    </footer>
  );
}