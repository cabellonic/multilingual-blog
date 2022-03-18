const { __DEFAULT_LANGUAGE__, __LANGUAGES__ } = require("./languajes");

module.exports = {
  siteMetadata: {
    title: `multilingual-blog`,
    siteUrl: `https://www.example.com`,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`, // This name is important because we will use it later.
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // It must be the same name we used in the previous configuration.
        defaultLanguage: __DEFAULT_LANGUAGE__,
        languages: __LANGUAGES__,
        redirect: true,
        generateDefaultLanguagePage: true,
        siteUrl: `https://example.com`,
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: "/:lang/blog/:slug*", // Our blog address
            getLanguageFromPath: true,
          },
        ],
      },
    },
  ],
};
