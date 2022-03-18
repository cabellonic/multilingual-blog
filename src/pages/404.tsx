import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
// Components
import Layout from "components/Layout";

const NotFoundPage: React.FC<PageProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <h1 style={{ fontSize: "8rem", margin: 0 }}>4😔4</h1>
      <Link to="/">
        <h1>« {t("go_to_home")} »</h1>
      </Link>
    </Layout>
  );
};

export default NotFoundPage;

export const NotFoundPageQuery = graphql`
  query NotFoundPageQuery($language: String!) {
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
