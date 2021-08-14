import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "Components/Message";
const DetailPresenter = ({ result, error, loading }) => null;

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.string,
};

export default DetailPresenter;
