import React from "react";
import { graphql, PageProps } from "gatsby";
// Utilizar el Link de gatsby-plugin-react-i18next
// nos permite que las urls tengan el idioma que el usuario eligió
// sin la necesidad de tener que especificarlo
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
// Components
import Layout from "components/Layout";

const HomePage: React.FC<PageProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Link to="/blog">
        <h1>« {t("go_to_my_blog")} »</h1>
      </Link>
    </Layout>
  );
};

export default HomePage;

export const HomeQuery = graphql`
  query Home($language: String!) {
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
  }
`;
