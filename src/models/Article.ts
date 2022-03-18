export interface IArticle {
  id: string; // The id created by Gatsby
  html: string; // Article content created by gatsby-source-filesystem
  frontmatter: {
    title: string;     //
    date: string;      // Our variables
    content: string;   //
  };
  fields: {
    slug: string;
    language: string;
  };
}