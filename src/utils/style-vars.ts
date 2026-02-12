import type { BlogConfig, SpacingPreset } from "@/src/types/blog";
import type { CSSProperties } from "react";

const SPACING_PRESETS: Record<
  SpacingPreset,
  {
    paragraphMargin: number;
    headingMarginTop: number;
    headingMarginBottom: number;
    listMargin: number;
    listItemSpacing: number;
  }
> = {
  tighter: {
    paragraphMargin: 0.5,
    headingMarginTop: 0.75,
    headingMarginBottom: 0.5,
    listMargin: 0.5,
    listItemSpacing: 0.25,
  },
  tight: {
    paragraphMargin: 0.5,
    headingMarginTop: 1,
    headingMarginBottom: 0.5,
    listMargin: 0.5,
    listItemSpacing: 0.25,
  },
  normal: {
    paragraphMargin: 0.65,
    headingMarginTop: 1.25,
    headingMarginBottom: 0.65,
    listMargin: 0.65,
    listItemSpacing: 0.35,
  },
  loose: {
    paragraphMargin: 0.9,
    headingMarginTop: 1.65,
    headingMarginBottom: 0.85,
    listMargin: 0.9,
    listItemSpacing: 0.45,
  },
  looser: {
    paragraphMargin: 1.25,
    headingMarginTop: 2,
    headingMarginBottom: 1,
    listMargin: 1.25,
    listItemSpacing: 0.5,
  },
};

function getSpacingValues(config: BlogConfig) {
  return SPACING_PRESETS[config.styles.spacing.preset];
}

export function generateStyleVars(config: BlogConfig): CSSProperties {
  const spacing = getSpacingValues(config);

  return {
    "--text-color": config.styles.typography.textColor,
    "--link-color": config.styles.typography.linkColor,
    "--link-hover-color": config.styles.typography.linkHoverColor,
    "--bold-color": config.styles.typography.boldColor,
    "--italic-color": config.styles.typography.italicColor,
    "--text-size": `${config.styles.fontSizes.textSize}rem`,
    "--line-height": config.styles.lineHeights.lineHeight,
    "--paragraph-margin": `${spacing.paragraphMargin}rem`,
    "--heading-margin-top": `${spacing.headingMarginTop}rem`,
    "--heading-margin-bottom": `${spacing.headingMarginBottom}rem`,
    "--list-margin": `${spacing.listMargin}rem`,
    "--list-item-spacing": `${spacing.listItemSpacing}rem`,
    "--text-weight": config.styles.fontWeights.textWeight,
    "--bold-weight": config.styles.fontWeights.boldWeight,
    // Inline code
    "--inline-code-bg": config.styles.typography.inlineCode.bg,
    "--inline-code-color": config.styles.typography.inlineCode.color,
    "--inline-code-font-size": `${config.styles.typography.inlineCode.fontSize}em`,
    // Code block
    "--code-block-bg": config.styles.typography.codeBlock.bg,
    "--code-block-text-color": config.styles.typography.codeBlock.textColor,
    "--code-block-border-radius": `${config.styles.typography.codeBlock.borderRadius}rem`,
    // Blockquote
    "--blockquote-border-color":
      config.styles.typography.blockquote.borderColor,
    "--blockquote-text-color": config.styles.typography.blockquote.textColor,
    "--blockquote-bg-color": config.styles.typography.blockquote.bgColor,
    "--blockquote-font-style": config.styles.typography.blockquote.italicize
      ? "italic"
      : "normal",
    // // TODO: Table
    // "--table-border-color": config.styles.typography.table.borderColor,
    // "--table-header-bg": config.styles.typography.table.headerBg,
    // "--table-header-color": config.styles.typography.table.headerColor,
    // "--table-cell-padding": `${config.styles.typography.table.cellPadding}rem`,
    // Horizontal rule
    "--hr-color": config.styles.typography.horizontalRule.color,
    "--hr-height": `${config.styles.typography.horizontalRule.height}px`,
    "--hr-margin": `${config.styles.typography.horizontalRule.margin}rem`,
    // List
    "--list-bullet-color": config.styles.typography.list.bulletColor,
    "--list-number-color": config.styles.typography.list.numberColor,
    "--list-text-color": config.styles.typography.list.textColor,
    // H1 styles
    "--h1-color": config.styles.headings.h1.color,
    "--h1-size": `${config.styles.headings.h1.size}rem`,
    "--h1-weight": config.styles.headings.h1.weight,
    "--h1-line-height": config.styles.headings.h1.lineHeight,
    "--h1-font-family": config.styles.headings.h1.fontFamily || "inherit",
    // H2 styles
    "--h2-color": config.styles.headings.h2.color,
    "--h2-size": `${config.styles.headings.h2.size}rem`,
    "--h2-weight": config.styles.headings.h2.weight,
    "--h2-line-height": config.styles.headings.h2.lineHeight,
    "--h2-font-family": config.styles.headings.h2.fontFamily || "inherit",
    // H3 styles
    "--h3-color": config.styles.headings.h3.color,
    "--h3-size": `${config.styles.headings.h3.size}rem`,
    "--h3-weight": config.styles.headings.h3.weight,
    "--h3-line-height": config.styles.headings.h3.lineHeight,
    "--h3-font-family": config.styles.headings.h3.fontFamily || "inherit",
    // H4 styles
    "--h4-color": config.styles.headings.h4.color,
    "--h4-size": `${config.styles.headings.h4.size}rem`,
    "--h4-weight": config.styles.headings.h4.weight,
    "--h4-line-height": config.styles.headings.h4.lineHeight,
    "--h4-font-family": config.styles.headings.h4.fontFamily || "inherit",
    // H5 styles
    "--h5-color": config.styles.headings.h5.color,
    "--h5-size": `${config.styles.headings.h5.size}rem`,
    "--h5-weight": config.styles.headings.h5.weight,
    "--h5-line-height": config.styles.headings.h5.lineHeight,
    "--h5-font-family": config.styles.headings.h5.fontFamily || "inherit",
    // H6 styles
    "--h6-color": config.styles.headings.h6.color,
    "--h6-size": `${config.styles.headings.h6.size}rem`,
    "--h6-weight": config.styles.headings.h6.weight,
    "--h6-line-height": config.styles.headings.h6.lineHeight,
    "--h6-font-family": config.styles.headings.h6.fontFamily || "inherit",
    // Image
    "--image-border-radius": `${config.styles.typography.image.borderRadius}rem`,
    "--image-box-shadow": config.styles.typography.image.shadow || "none",
    "--image-border": config.styles.typography.image.border || "none",
  } as CSSProperties;
}
