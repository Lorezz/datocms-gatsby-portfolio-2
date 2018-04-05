import React from "react";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import Slider from "react-slick";

class Home extends React.Component {
  renderSlides(edges) {
    return edges.map(item => {
      let { title } = item.node;
      let { src } = item.node.img.sizes;
      let bg = {
        backgroundImage: `url("${src}")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "400px",
        color: "#fff"
      };
      return (
        <div className="slide__bg" style={bg} key={item.node.id}>
          <div className="slide__text">{item.node.title}</div>
        </div>
      );
    });
  }

  render() {
    let { home, contact, slides } = this.props.data;
    let settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };

    let video_url_parts = contact.video.url.split("/");
    let videoID = video_url_parts[video_url_parts.length-1];
    return (
      <article className="sheet">
        <HelmetDatoCms seo={home.seoMetaTags} />

        <div className="sheet__inner">
          <div className="sheet__body">
            <div className="slides__wrapper">
              <Slider {...settings}>{this.renderSlides(slides.edges)}</Slider>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: home.introTextNode.childMarkdownRemark.html
              }}
            />
            <div>
              <p>{videoID}</p>
              <iframe
                width="100%"
                height="360px"
                src={`https://www.youtube.com/embed/${videoID}`}
                poster={`${contact.video.thumbnailUrl}`}
                frameBorder="0"
                allowFullScreen
              />
              <p>{home.copyright}</p>
            </div>
          </div>
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
    contact: datoCmsContactPage(locale: { eq: $locale }) {
      video {
        url
        title
        width
        height
        provider
        providerUid
        thumbnailUrl
      }
    }
    slides: allDatoCmsSlide {
      edges {
        node {
          id
          title
          img {
            sizes(maxWidth: 800, imgixParams: { fm: "jpg", auto: "compress" }) {
              src
              aspectRatio
            }
          }
        }
      }
    }
  }
`;
