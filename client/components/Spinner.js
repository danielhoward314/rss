import React from 'react';
import styled from 'styled-components';

const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #fff;
`;

const InnerDiv = styled.div`
  left: 50%;
  margin-left: -4em;
  font-size: 10px;
  border: .8em solid rgba(218, 219, 223, 1);
  border-left: .8em solid rgba(58, 166, 165, 1);
  animation: spin 1.1s infinite linear;
  border-radius: 50%;
  width: 8em;
  height: 8em;
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -4.05em;
  &:after {
    border-radius: 50%;
    width: 8em;
    height: 8em;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -4.05em;
  }
  @keyframes spin {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const Spinner = () => {
  return (
    <OuterDiv>
      <InnerDiv />
    </OuterDiv>
  );
};

export default Spinner;
