import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "Components/Message";

const Container = styled.div``;

const DetailPresenter = ({ result, error, loading }) => (
  <Container>{error && <Message color="#e74c3c" text={error} />}</Container>
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.string,
};

export default DetailPresenter;
