import React from "react";
import PropTyles from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100vh;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: #e74c3c;
`;

const Message = ({ text, color }) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

Message.propTyles = {
  text: PropTyles.string.isRequired,
  color: PropTyles.string.isRequired,
};

export default Message;
