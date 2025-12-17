import { useEffect } from "react";

const DEFAULT_TITLE = "Wonderfull Inn";
const DEFAULT_DESCRIPTION =
  "Book your dream vacation with Wonderfull Inn. Explore amazing travel packages to destinations worldwide with expert travel agents.";
const DEFAULT_KEYWORDS =
  "travel packages, vacation booking, travel agent, tourism, destinations, holiday packages";

export const useSEO = ({ title, description, keywords, ogTitle, ogDescription, ogImage } = {}) => {
  useEffect(() => {
    // Set page title
    const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    document.title = pageTitle;

    // Set meta description
    const metaDescription =
      document.querySelector('meta[name="description"]') || document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute("content", description || DEFAULT_DESCRIPTION);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Set meta keywords
    const metaKeywords =
      document.querySelector('meta[name="keywords"]') || document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    metaKeywords.setAttribute("content", keywords || DEFAULT_KEYWORDS);
    if (!document.querySelector('meta[name="keywords"]')) {
      document.head.appendChild(metaKeywords);
    }

    // Open Graph meta tags
    const ogTitleMeta =
      document.querySelector('meta[property="og:title"]') || document.createElement("meta");
    ogTitleMeta.setAttribute("property", "og:title");
    ogTitleMeta.setAttribute("content", ogTitle || pageTitle);
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitleMeta);
    }

    const ogDescriptionMeta =
      document.querySelector('meta[property="og:description"]') || document.createElement("meta");
    ogDescriptionMeta.setAttribute("property", "og:description");
    ogDescriptionMeta.setAttribute("content", ogDescription || description || DEFAULT_DESCRIPTION);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescriptionMeta);
    }

    if (ogImage) {
      const ogImageMeta =
        document.querySelector('meta[property="og:image"]') || document.createElement("meta");
      ogImageMeta.setAttribute("property", "og:image");
      ogImageMeta.setAttribute("content", ogImage);
      if (!document.querySelector('meta[property="og:image"]')) {
        document.head.appendChild(ogImageMeta);
      }
    }

    // Twitter Card meta tags
    const twitterCardMeta =
      document.querySelector('meta[name="twitter:card"]') || document.createElement("meta");
    twitterCardMeta.setAttribute("name", "twitter:card");
    twitterCardMeta.setAttribute("content", "summary_large_image");
    if (!document.querySelector('meta[name="twitter:card"]')) {
      document.head.appendChild(twitterCardMeta);
    }

    const twitterTitleMeta =
      document.querySelector('meta[name="twitter:title"]') || document.createElement("meta");
    twitterTitleMeta.setAttribute("name", "twitter:title");
    twitterTitleMeta.setAttribute("content", ogTitle || pageTitle);
    if (!document.querySelector('meta[name="twitter:title"]')) {
      document.head.appendChild(twitterTitleMeta);
    }

    const twitterDescriptionMeta =
      document.querySelector('meta[name="twitter:description"]') || document.createElement("meta");
    twitterDescriptionMeta.setAttribute("name", "twitter:description");
    twitterDescriptionMeta.setAttribute(
      "content",
      ogDescription || description || DEFAULT_DESCRIPTION
    );
    if (!document.querySelector('meta[name="twitter:description"]')) {
      document.head.appendChild(twitterDescriptionMeta);
    }

    // Cleanup function to reset to defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);
};
