import { useEffect } from "react";
import site from "../config/site.js";

const SEO = ({ title, ...props }) => {
  useEffect(() => {
    document.title = `${title} — Taskee`;
  }, [title]);

  return null;
};

export default SEO;
