const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const locales = ["it", "en"];

  locales.forEach(locale => {
    const prefix = locale === "en" ? "" : `/${locale}`;
    createPage({
      path: `${prefix}/portfolio`,
      component: path.resolve(`./src/templates/index.js`),
      context: { locale }
    });
  });

  Promise.all(
    locales.map(locale => {
      graphql(`
        {
          home: datoCmsHome(locale: { eq: "${locale}" }) {
            locale
            slug
          }
          about: datoCmsAboutPage(locale: { eq: "${locale}" }) {
            locale
            slug
          }
          contact: datoCmsContactPage(locale: { eq: "${locale}" }) {
            locale
            slug
          },
          works: allDatoCmsWork(filter: {locale: { eq: "${locale}" } }) {
            edges {
              node {
                slug
                locale
              }
            }
          }
        }
      `).then(result => {
        console.log(result);

        ["home", "about", "contact"].forEach(template => {
          let page = result.data[template];
          const prefix = page.locale === "en" ? "" : `/${page.locale}`;
          let slug = template === "home" ? "" : page.slug;
          createPage({
            path: `${prefix}/${slug}`,
            component: path.resolve(`./src/templates/${template}.js`),
            context: { locale: page.locale }
          });
        });

        result.data.works.edges.forEach(item => {
          const prefix = locale === "en" ? "" : `/${locale}`;
          let p = `${prefix}/works/${item.node.slug}`;
          createPage({
            path: p,
            component: path.resolve(`./src/templates/work.js`),
            context: {
              slug: item.node.slug,
              locale
            }
          });
        });
      });
    })
  );
};
