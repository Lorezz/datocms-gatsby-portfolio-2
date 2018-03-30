import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import it from "react-intl/locale-data/it";
import itMessages from "../locales/it.js";
import enMessages from "../locales/en.js";

import "../styles/index.sass";

addLocaleData([...it, ...en]);

const messages = {
  it: itMessages,
  en: enMessages
};

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  renderNav(prefix) {
    return (
      <ul className="sidebar__menu">
        <li>
          <Link to={`${prefix}/`}>Home</Link>
        </li>
        <li>
          <Link to={`${prefix}/portfolio`}>Portfolio</Link>
        </li>
        <li>
          <Link to={`${prefix}/about`}>About</Link>
        </li>
        <li>
          <Link to={`${prefix}/contact`}>Contact</Link>
        </li>
      </ul>
    );
  }

  render() {
    const locale = this.props.location.pathname.startsWith("/it") ? "it" : "en";
    let prefix = locale === "en" ? "" : "it";
    let { children, data } = this.props;
    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div className="container">
          <div className="container__sidebar">
            <div className="sidebar">
              <h6 className="sidebar__title">
                <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
              </h6>

              {this.renderNav(prefix)}

              <p className="sidebar__social">
                {data.allDatoCmsSocialProfile.edges.map(
                  ({ node: profile }, index) => (
                    <a
                      key={index}
                      href={profile.url}
                      target="blank"
                      className={`social social--${profile.profileType.toLowerCase()}`}
                    />
                  )
                )}
              </p>
            </div>
          </div>
          <div className="container__body">
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                  <Link to="#" data-js="toggleSidebar" />
                </div>
                <div className="mobile-header__logo">
                  <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                </div>
              </div>
            </div>
            {children()}
          </div>
        </div>
      </IntlProvider>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const query = graphql`
  query LayoutQuery {
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
  }
`;
