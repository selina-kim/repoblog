import type { BlogConfig } from "@/types/blog";

export const DEFAULT_BLOG_CONFIG: BlogConfig = {
  styles: {
    typography: {
      textColor: "#1f2937",
      linkColor: "inherit",
      linkHoverColor: "#1d4ed8",
      boldColor: "inherit",
      italicColor: "inherit",
      inlineCode: {
        bg: "#f3f4f6",
        color: "#e11d48",
        fontSize: 0.875,
      },
      codeBlock: {
        bg: "#f3f4f6",
        textColor: "#1f2937",
        borderRadius: 0.5,
      },
      blockquote: {
        borderColor: "#2563eb",
        textColor: "#4b5563",
        bgColor: "transparent",
        italicize: true,
      },
      // TODO: implement mdx table rendering
      // table: {
      //   borderColor: "#e5e7eb",
      //   headerBg: "#f3f4f6",
      //   headerColor: "#1f2937",
      //   cellPadding: 0.75,
      // },
      horizontalRule: {
        color: "#e5e7eb",
        height: 1,
        margin: 2,
      },
      list: {
        bulletColor: "inherit",
        numberColor: "inherit",
        textColor: "inherit",
      },
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
      preset: "normal",
    },
    fontWeights: {
      textWeight: 400,
      boldWeight: 600,
    },
  },
};
