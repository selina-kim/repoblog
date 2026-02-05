import type { BlogConfig } from "@/types/blog";
import type { CSSProperties } from "react";

export function generateStyleVars(config: BlogConfig): CSSProperties {
  return {
    "--text-color": config.styles.typography.textColor,
    "--link-color": config.styles.typography.linkColor,
    "--link-hover-color": config.styles.typography.linkHoverColor,
    "--code-bg": config.styles.typography.codeBg,
    "--code-color": config.styles.typography.codeColor,
    "--text-size": `${config.styles.fontSizes.textSize}rem`,
    "--line-height": config.styles.lineHeights.lineHeight,
    "--paragraph-margin": `${config.styles.spacing.paragraphMargin}rem`,
    "--heading-margin-top": `${config.styles.spacing.headingMarginTop}rem`,
    "--heading-margin-bottom": `${config.styles.spacing.headingMarginBottom}rem`,
    "--list-margin": `${config.styles.spacing.listMargin}rem`,
    "--text-weight": config.styles.fontWeights.textWeight,
    "--bold-weight": config.styles.fontWeights.boldWeight,
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
  } as CSSProperties;
}
