import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryBackground};
  height: 100%;
  width: 100%;
`;

const Msg = styled.p`
  margin: auto;
  display: block;
  padding: 5rem;
  font-size: 1.5rem;
  line-height: 1.6;
`;

const LoadMsg = ({ content }) => {
  return (
    <Wrapper>
      <Msg>{content}</Msg>
    </Wrapper>
  );
};

export default LoadMsg;
