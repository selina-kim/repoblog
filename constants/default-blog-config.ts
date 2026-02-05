import type { BlogConfig } from "@/types/blog";

export const DEFAULT_BLOG_CONFIG: BlogConfig = {
  styles: {
    typography: {
      textColor: "#374151",
      linkColor: "#2563eb",
      linkHoverColor: "#1d4ed8",
      codeBg: "#f3f4f6",
      codeColor: "#e11d48",
    },
    headings: {
      h1: {
        color: "#1f2937",
        size: 2.25,
        weight: 700,
        lineHeight: 1.3,
        fontFamily: "inherit",
      },
      h2: {
        color: "#1f2937",
        size: 1.875,
        weight: 700,
        lineHeight: 1.3,
        fontFamily: "inherit",
      },
      h3: {
        color: "#1f2937",
        size: 1.5,
        weight: 700,
        lineHeight: 1.3,
        fontFamily: "inherit",
      },
      h4: {
        color: "#1f2937",
        size: 1.25,
        weight: 700,
        lineHeight: 1.3,
        fontFamily: "inherit",
      },
      h5: {
        color: "#1f2937",
        size: 1.125,
        weight: 700,
        lineHeight: 1.3,
        fontFamily: "inherit",
      },
      h6: {
        color: "#1f2937",
        size: 1,
        weight: 700,
        lineHeight: 1.3,
        fontFamily: "inherit",
      },
    },
    fontSizes: {
      textSize: 1,
    },
    lineHeights: {
      lineHeight: 1.7,
    },
    spacing: {
      paragraphMargin: 1.25,
      headingMarginTop: 2,
      headingMarginBottom: 1,
      listMargin: 1.25,
    },
    fontWeights: {
      textWeight: 400,
      boldWeight: 600,
    },
  },
};
