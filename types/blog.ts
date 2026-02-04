export interface Post {
  path: string;
  sha: string;
  size: number;
  title: string;
  slug: string;
  content: string;
  metadata?: Record<string, string>;
}

export interface BlogConfig {
  styles: {
    typography: {
      headingColor: string;
      textColor: string;
      linkColor: string;
      linkHoverColor: string;
      codeBg: string;
      codeColor: string;
    };
    fontSizes: {
      textSize: number;
      h1Size: number;
      h2Size: number;
      h3Size: number;
      h4Size: number;
      h5Size: number;
      h6Size: number;
    };
    lineHeights: {
      lineHeight: number;
      headingLineHeight: number;
    };
    spacing: {
      paragraphMargin: number;
      headingMarginTop: number;
      headingMarginBottom: number;
      listMargin: number;
    };
    fontWeights: {
      headingWeight: number;
      textWeight: number;
      boldWeight: number;
    };
  };
}
