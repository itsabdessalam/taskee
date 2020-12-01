const BASE = {
  colors: {
    text: "#1e293b",
    muted: "#64748b",
    background: "#ffffff",
    editor: "#ffffff",
    navigation: "#ffffff",
    item: "",
    primary: "#6c29f5",
    secondary: "#f56c29",
    logo: "#1e293b",
    card: "#ffffff",
    separator: "#edf2f7",
    checkbox: " #e2e8f0"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  },
  fonts: {
    body: '"Circular", "Helvetica", "Arial", sans-serif',
    logo: '"Euclid Flex", "Helvetica", "Arial", sans-serif',
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
    ...BASE,
    mode: "light"
  },
  dark: {
    ...BASE,
    mode: "dark",
    colors: {
      text: "#ffffff",
      muted: "#ffffff",
      background: "#1b2535",
      editor: "#1b2535",
      navigation: "#1e293b",
      primary: "#6c29f5",
      secondary: "#f56c29",
      logo: "#ffffff",
      card: "#1e293b",
      separator: "#1e293b",
      checkbox: "#ffffff"
    }
  }
};

export default THEME;
