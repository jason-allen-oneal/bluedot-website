import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

export default function Footer({
  tagline = "App development for all.",
  menuItems = [
    {
      title: "Company",
      links: [
        { text: "About", url: "/about" },
        { text: "Blog", url: "/blog" },
        { text: "Contact", url: "/contact" }
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
      ],
    },
  ],
  copyright = ` ᴥ BlueDot IT ᴥ Jason O'Neal. All rights reserved.`,
  bottomLinks = [
    { text: "Privacy", url: "/legal/privacy" },
    { text: "Terms & Conditions", url: "/legal/terms"}
  ],
}: FooterProps) {
  return (
    <section className="p-12">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Image
                  src="/bluedot-logo.png"
                  alt="Logo"
                  width={128}
                  height={128}
                  className="h-8 w-auto"
                />
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} {copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };