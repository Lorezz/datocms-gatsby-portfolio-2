import React from "react";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";

class Home extends React.Component {
  render() {
    let { home } = this.props.data;
    return (
      <article className="sheet">
        <HelmetDatoCms seo={home.seoMetaTags} />
        <div className="sheet__inner">
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: home.introTextNode.childMarkdownRemark.html
            }}
          />
          <p>{home.copyright}</p>
        </div>
      </article>
    );
  }
}

export default Home;

export const query = graphql`
  query HomeQuery($locale: String!) {
    home: datoCmsHome(locale: { eq: $locale }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      copyright
    }
  }
`;
