import Link from "next/link";


const navMenus = [
  {
    label: "PDF Tools",
    items: [
      { label: "All PDF Tools", href: "/pdf-tools" },
      { label: "Merge PDF", href: "/tools/merge-pdf" },
      { label: "Compress PDF", href: "/tools/compress-pdf" },
      { label: "JPG to PDF", href: "/tools/jpg-to-pdf" },
      { label: "PDF to JPG", href: "/tools/pdf-to-jpg" },
      { label: "PDF to Word", href: "/tools/pdf-to-word" },
    ],
  },
  {
    label: "Image Tools",
    items: [
      { label: "All Image Tools", href: "/image-tools" },
      { label: "Image Compressor", href: "/tools/image-compressor" },
      { label: "Image Resizer", href: "/tools/image-resizer" },
      { label: "Image Cropper", href: "/tools/image-cropper" },
      { label: "JPG to PNG", href: "/tools/jpg-to-png" },
      { label: "PNG to JPG", href: "/tools/png-to-jpg" },
      { label: "WebP to JPG", href: "/tools/webp-to-jpg" },
      { label: "Images to PDF", href: "/tools/images-to-pdf" },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "EMI Calculator", href: "/tools/emi-calculator" },
      { label: "Salary Calculator", href: "/tools/salary-calculator" },
      { label: "Income Tax Calculator", href: "/tools/income-tax-calculator" },
      { label: "SIP Calculator", href: "/tools/sip-calculator" },
      { label: "GST Calculator", href: "/tools/gst-calculator" },
    ],
  },
  {
    label: "Calculators",
    items: [
      { label: "Percentage Calculator", href: "/tools/percentage-calculator" },
      { label: "Discount Calculator", href: "/tools/discount-calculator" },
      { label: "Age Calculator", href: "/tools/age-calculator" },
      { label: "Date Difference", href: "/tools/date-difference" },
      { label: "BMI Calculator", href: "/tools/bmi-calculator" },
      { label: "Fuel Cost Calculator", href: "/tools/fuel-cost-calculator" },
      { label: "Unit Converter", href: "/tools/unit-converter" },
    ],
  },
];


export default function Header() {
  return (
    <header className="eu-header">
      <div className="eu-header__inner">
        <Link
          href="/"
          className="eu-brand"
          aria-label="Everyday Utility home"
        >
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

        <nav className="eu-nav" aria-label="Main navigation">
          <Link href="/" className="eu-nav__link">
            Home
          </Link>

          {navMenus.map((menu) => (
            <details
              className="eu-nav-dropdown"
              key={menu.label}
              onClick={(event) => {
                const currentMenu = event.currentTarget;

                document
                  .querySelectorAll(".eu-nav-dropdown")
                  .forEach((element) => {
                    if (element !== currentMenu) {
                      element.removeAttribute("open");
                    }
                  });
              }}
            >
              <summary className="eu-nav__link">
                {menu.label}
                <span className="eu-dropdown-arrow" aria-hidden="true">
                  ▾
                </span>
              </summary>

              <div className="eu-dropdown-panel">
                {menu.items.map((item) => (
                  <Link href={item.href} key={item.label}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>

        <form
          action="/"
          method="get"
          className="eu-header-search"
          role="search"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            name="q"
            type="search"
            placeholder="Search tools..."
            aria-label="Search tools"
          />
        </form>

        <div className="eu-header__links">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <details className="eu-mobile-menu">
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>

          <nav aria-label="Mobile navigation">
            <Link href="/">Home</Link>

            {navMenus.map((menu) => (
              <details key={menu.label} className="eu-mobile-submenu">
                <summary>{menu.label}</summary>
                {menu.items.map((item) => (
                  <Link href={item.href} key={item.label}>
                    {item.label}
                  </Link>
                ))}
              </details>
            ))}

            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}