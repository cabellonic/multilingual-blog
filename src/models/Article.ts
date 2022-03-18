export interface IArticle {
  id: string; // El id creado por Gatsby
  html: string; // El contenido creado por gatsby-source-filesystem
  frontmatter: {
    title: string;     //
    date: string;      // Nuestras variables
    content: string;   //
  };
  fields: {
    slug: string;
    language: string;
  };
}