export interface Post {
  path: string;
  sha: string;
  size: number;
  title: string;
  slug: string;
  content: string;
  metadata?: Record<string, string>;
}

export interface HeadingStyle {
  color: string;
  size: number;
  weight: number;
  lineHeight: number;
  fontFamily?: string;
}

export interface BlogConfig {
  styles: {
    typography: {
      textColor: string;
      linkColor: string;
      linkHoverColor: string;
      codeBg: string;
      codeColor: string;
    };
    headings: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
    fontSizes: {
      textSize: number;
    };
    lineHeights: {
      lineHeight: number;
    };
    spacing: {
      paragraphMargin: number;
      headingMarginTop: number;
      headingMarginBottom: number;
      listMargin: number;
    };
    fontWeights: {
      textWeight: number;
      boldWeight: number;
    };
  };
}
