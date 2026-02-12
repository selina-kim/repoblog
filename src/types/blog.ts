export interface Post {
  path: string;
  sha: string;
  size: number;
  title: string;
  slug: string;
  content: string;
  metadata?: Record<string, string>;
}

export interface TreeNode {
  name: string;
  path: string;
  type: "file" | "folder";
  sha?: string;
  children?: TreeNode[];
  title?: string;
  slug?: string;
}

export interface HeadingStyle {
  color: string;
  size: number;
  weight: number;
  lineHeight: number;
  fontFamily?: string;
}

export type SpacingPreset = "tighter" | "tight" | "normal" | "loose" | "looser";

export interface BlogConfig {
  styles: {
    typography: {
      textColor: string;
      linkColor: string;
      linkHoverColor: string;
      boldColor: string;
      italicColor: string;
      inlineCode: {
        bg: string;
        color: string;
        fontSize: number;
      };
      codeBlock: {
        bg: string;
        textColor: string;
        borderRadius: number;
      };
      blockquote: {
        borderColor: string;
        textColor: string;
        bgColor: string;
        italicize: boolean;
      };
      // table: {
      //   borderColor: string;
      //   headerBg: string;
      //   headerColor: string;
      //   cellPadding: number;
      // };
      horizontalRule: {
        color: string;
        height: number;
        margin: number;
      };
      list: {
        bulletColor: string;
        numberColor: string;
        textColor: string;
      };
      image: {
        borderRadius: number;
        shadow: string;
        border: string;
      };
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
      preset: SpacingPreset;
    };
    fontWeights: {
      textWeight: number;
      boldWeight: number;
    };
  };
}
