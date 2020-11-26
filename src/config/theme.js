const BASE = {
  colors: {
    text: "#1e293b",
    muted: "#64748b",
    background: "#f8fafc",
    primary: "#6c29f5",
    secondary: "#f56c29"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace"
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  }
};

const THEME = {
  light: {
    ...BASE
  },
  dark: {
    ...BASE,
    colors: {
      text: "#ffffff",
      muted: "#ffffff",
      background: "#1a202f",
      primary: "#6c29f5",
      secondary: "#f56c29"
    }
  }
};

export default THEME;
