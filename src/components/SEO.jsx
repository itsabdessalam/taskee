import { useEffect } from "react";
import site from "../config/site.js";

const SEO = ({ title, ...props }) => {
  useEffect(() => {
    document.title = `${title} — ${site.siteMetadata.title}`;
  }, [title]);

  return null;
};

export default SEO;
