// Path is used to work with the paths of our files.
const path = require("path");
// createFilePath will help us to create the url of our article.
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  // createNodeField is the function that will create the new nodes.
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // createFilePath will return a string like this:
    // /article-name/index.lang/
    // I use the split(".") to separate the language from the rest.
    const [slug, language] = createFilePath({ node, getNode }).split(".");
    // Now we have:
    // slug = /article-name/index
    // language = lang/

    // Now we create the node for the language.
    createNodeField({
      node,
      // language will be the name of the field that we are going to pick up when querying
      name: "language",
      // language has the value of "lang/"
      // this split function splits the string at the "/" at the end, returning only "lang".
      value: language.split("/")[0],
    });

    // We create the node for the slug.
    createNodeField({
      node,
      // Slug will be the name of the field that we are going to pick up when querying
      name: "slug",
      // Slug tiene el valor de "/article-name/index"
      // This split function splits the string into each "/".
      // We pick up only the second value of the returned array, wich is "article-name"
      value: slug.split("/")[1],
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // With createPage we can create each page individually
  const { createPage } = actions;
  // Recogemos con graphql todos los archivos Markdown que hemos creado
  const result = await graphql(`
    {
      articles: allMarkdownRemark(limit: 1000) {
        nodes {
          id
          fields {
            slug
            language
          }
        }
      }
    }
  `);

  // We collect with graphql all the Markdown files that we have created.
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the page content`,
      result.errors
    );
    return;
  }

  // articles will be an array of articles
  const articles = result.data.articles.nodes;
  // The template of our articles.
  const articleTemplate = path.resolve(`./src/templates/article.tsx`);

  // We go through the articles array
  articles.forEach((article) => {
    // From the article, we only need the id, the slug and the language.
    const { id } = article;
    const { slug, language } = article.fields;
    // We create the page for each of them
    createPage({
      // path will be the URL of the article
      path: `/${language}/blog/${slug}`,
      // component is the template we are going to use
      component: articleTemplate,
      // In context there are the parameters that we can pass to our template
      // They will be used to make the queries for each article.
      context: {
        id,
        slug,
        language,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};
