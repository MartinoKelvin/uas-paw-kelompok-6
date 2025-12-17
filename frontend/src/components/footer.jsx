import PropTypes from "prop-types";
import { Logo, LogoImage, LogoText } from "@/components/logo";
import { Link } from "react-router-dom";

const Footer = ({
  logo = {
    src: "/tree-palm.svg",
    alt: "Wonderfull Inn",
    title: "Wonderfull Inn",
    url: "/",
  },
  tagline = "Your journey begins here. Discover the world with us.",
  menuItems = [
    {
      title: "Explore",
      links: [
        { text: "Destinations", url: "/destinations" },
        { text: "Packages", url: "/packages" },
      ],
    },
    {
      title: "Services",
      links: [
        { text: "Book a Package", url: "/packages" },
        { text: "Become an Agent", url: "/sign-up" },
        { text: "My Bookings", url: "/dashboard" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [{ text: "Help Center", url: "/help" }],
    },
  ],
  copyright = "© 2025 Wonderfull Inn. All rights reserved.",
  bottomLinks = [],
}) => {
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url="/">
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10 dark:invert"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-primary font-medium">
                      {link.url.startsWith("http") ||
                      link.url.startsWith("mailto:") ||
                      link.url.startsWith("#") ? (
                        <a href={link.url}>{link.text}</a>
                      ) : (
                        <Link to={link.url}>{link.text}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-center gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            {bottomLinks.length > 0 && (
              <ul className="flex gap-4">
                {bottomLinks.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary underline">
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </footer>
      </div>
    </section>
  );
};

Footer.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  tagline: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  copyright: PropTypes.string,
  bottomLinks: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

export { Footer };
