const { __DEFAULT_LANGUAGE__, __LANGUAGES__ } = require("./languages");

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
        name: `locale`, // Este nombre es importante porque lo usaremos más adelante.
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // Debe ser el mismo nombre que usamos en la configuración anterior.
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
            matchPath: "/:lang/blog/:slug*", // La dirección de nuestro blog
            getLanguageFromPath: true,
          },
        ],
      },
    },
  ],
};
