import React from "react";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { compose, withHandlers } from "recompose";

const MyMapComponent = compose(
  withScriptjs,
  withGoogleMap,
  withHandlers({
    onMapMounted: props => ref => {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({
        lat: props.position.latitude,
        lng: props.position.longitude
      });

      ref && ref.fitBounds(bounds);
    }
  })
)(props => {
  return (
    <GoogleMap defaultZoom={18} ref={props.onMapMounted}>
      <Marker
        position={{
          lat: props.position.latitude,
          lng: props.position.longitude
        }}
      />
    </GoogleMap>
  );
});

class Contact extends React.Component {
  renderMap() {
    let { contact } = this.props.data;
    return (
      <MyMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDBDqgxAX1nntEPKvUx1_-wUXrJVq1Wnk4"
        loadingElement={<div style={{ height: `60vh`, width: `100%` }} />}
        containerElement={<div style={{ height: `60vh`, width: `100%` }} />}
        mapElement={<div style={{ height: `60vh`, width: `100%` }} />}
        position={contact.geoposition}
      />
    );
  }

  /*
            <video
            width="640px"
            height="360px"
            src={contact.video.url}
            poster={contact.video.thumbnailUrl}
            controls
          />

            <iframe
            width="640px"
            height="360px"
            src={contact.video.url}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
          */

  render() {
    let { contact } = this.props.data;

    return (
      <article className="sheet">
        <HelmetDatoCms seo={contact.seoMetaTags} />
        <div className="sheet__inner">
          <h1 className="sheet__title">{contact.slug}</h1>
          <p className="sheet__lead">{contact.text}</p>

          <div className="sheet__body">
            <div className="map_wrap" width="500px" height="350px">
              {this.renderMap()}
            </div>

            <div style={{ marginTop: "40px", marginBottom: "40px" }}>
              <h3>Netlify Contact Form</h3>
              <a
                href="https://www.netlify.com/docs/form-handling/"
                target="_blank"
              >
                netlify.com form-handling
              </a>
              <form name="contact" method="POST"   data-netlify="true">
                  <label>Your Name:</label>
                  <input type="text" name="name" />
                  <label>Your Email:</label>
                  <input type="email" name="email" />
                  <label>Message:</label>
                  <textarea name="message" />
                  <button type="submit"   className="button" >Send</button>
              </form>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Contact;

export const query = graphql`
  query ContactQuery($locale: String!) {
    contact: datoCmsContactPage(locale: { eq: $locale }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      locale
      video {
        url
        title
        width
        height
        provider
        providerUid
        thumbnailUrl
      }
      text
      geoposition {
        latitude
        longitude
      }
    }
  }
`;
