import React from "react";
import { graphql, PageProps } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
// Components
import Layout from "components/Layout";
// Models
import { IArticle } from "models/Article";

type BlogPageProps = {
  articles: {
    nodes: IArticle[];
  };
};

const BlogPage: React.FC<PageProps<BlogPageProps>> = ({ data }) => {
  const { t } = useTranslation();
  const articles = data.articles.nodes;

  return (
    <Layout>
      <h1>{t("my_articles")}</h1>
      {articles.map((article) => {
        const { title } = article.frontmatter;
        const { slug } = article.fields;
        return (
          <Link to={`/blog/${slug}`} key={article.id}>
            <h2>{title}</h2>
          </Link>
        );
      })}
      <Link to="/">
        <h1>« {t("go_to_home")} »</h1>
      </Link>
    </Layout>
  );
};

export default BlogPage;

export const BlogPageQuery = graphql`
  query BlogPageQuery($language: String!) {
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

    articles: allMarkdownRemark(
      filter: { fields: { language: { eq: $language } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
        }
        fields {
          slug
          language
        }
      }
    }
  }
`;
