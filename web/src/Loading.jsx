/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import loadingIcon from "./loading.png";

import "./loading.css";

function Loading() {
  return (
    <section className="loading-page">
      <div className="loading-icon">
        <img src={loadingIcon} alt="" />
      </div>
    </section>
  );
}

Loading.propTypes = {};

Loading.defaultProps = {};

export default Loading;
