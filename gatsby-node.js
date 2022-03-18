// Path sirve para trabajar con las rutas de nuestros archivos.
const path = require("path");
// createFilePath nos va a ayudar a crear la url de nuestro artículo.
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  // createNodeField es la función que va a crear los nuevos nodos.
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // createFilePath va a devolver un string de esta manera:
    // /article-name/index.lang/
    // El split(".") lo utilizo para separar el idioma del resto.
    const [slug, language] = createFilePath({ node, getNode }).split(".");
    // Nos va a quedar:
    // slug = /article-name/index
    // language = lang/

    // Creamos el nodo para el idioma.
    createNodeField({
      node,
      // Language es el nombre del campo que vamos a recoger al hacer la query
      name: "language",
      // Language tiene el valor de "lang/"
      // Este split parte el string en el "/" del final, devolviendonos solo "lang"
      value: language.split("/")[0],
    });

    // Creamos el nodo para el slug.
    createNodeField({
      node,
      // Slug es el nombre del campo que vamos a recoger al hacer la query
      name: "slug",
      // Slug tiene el valor de "/article-name/index"
      // Este split parte el string en cada "/"
      // Recogiendo el segundo valor del array nos devuelve solo "article-name"
      value: slug.split("/")[1],
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Con createPage podemos crear cada página individualmente
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

  // Si ocurre algún error lo reportamos y detenemos la ejecución
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the page content`,
      result.errors
    );
    return;
  }

  // articles va a ser un arreglo de artículos
  const articles = result.data.articles.nodes;
  // El template de nuestros artículos.
  const articleTemplate = path.resolve(`./src/templates/article.tsx`);

  // Recorremos el arreglo de artículos
  articles.forEach((article) => {
    // Del artículo solo necesitamos el id, el slug y el lenguaje
    const { id } = article;
    const { slug, language } = article.fields;
    // Creamos la página para cada uno de ellos
    createPage({
      // path va a ser la URL del artículo
      path: `/${language}/blog/${slug}`,
      // component es el template que vamos a usar
      component: articleTemplate,
      // En context están los parámetros que podemos pasar a nuestro template
      // Nos van a servir para hacer las queries de cada artículo
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
