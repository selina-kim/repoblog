import type { BlogConfig } from "@/types/blog";

export const DEFAULT_BLOG_CONFIG: BlogConfig = {
  styles: {
    typography: {
      headingColor: "#1f2937",
      textColor: "#374151",
      linkColor: "#2563eb",
      linkHoverColor: "#1d4ed8",
      codeBg: "#f3f4f6",
      codeColor: "#e11d48",
    },
    fontSizes: {
      textSize: 1,
      h1Size: 2.25,
      h2Size: 1.875,
      h3Size: 1.5,
      h4Size: 1.25,
      h5Size: 1.125,
      h6Size: 1,
    },
    lineHeights: {
      lineHeight: 1.7,
      headingLineHeight: 1.3,
    },
    spacing: {
      paragraphMargin: 1.25,
      headingMarginTop: 2,
      headingMarginBottom: 1,
      listMargin: 1.25,
    },
    fontWeights: {
      headingWeight: 700,
      textWeight: 400,
      boldWeight: 600,
    },
  },
};
