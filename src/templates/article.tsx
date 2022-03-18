import React from "react";
import { graphql, PageProps } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
// Models
import { IArticle } from "models/Article";
// Components
import Layout from "components/Layout";

type ArticlePageProps = {
  article: IArticle;
};

const ArticlePage: React.FC<PageProps<ArticlePageProps>> = ({ data }) => {
  const { t } = useTranslation();
  const article = data.article;
  const { title, date } = article.frontmatter;
  const { language } = article.fields;
  // Change the way the date is displayed according to the chosen language
  const formattedDate = new Date(date).toLocaleDateString(language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <h1>{title}</h1>
      <small>{formattedDate}</small>
      <main dangerouslySetInnerHTML={{ __html: article.html }} />
      <hr />
      <Link to="/blog">
        <h1>« {t("go_to_my_blog")} »</h1>
      </Link>
    </Layout>
  );
};

export default ArticlePage;

export const ArticlePageQuery = graphql`
  query ArticlePageQuery($language: String!, $slug: String!) {
    locales: allLocale(
      filter: { ns: { in: ["common"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }

    article: markdownRemark(
      fields: { slug: { eq: $slug }, language: { eq: $language } }
    ) {
      html
      frontmatter {
        date
        title
      }
      fields {
        slug
        language
      }
    }
  }
`;
