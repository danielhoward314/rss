import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const CenteredSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3em;
`;

const Spinner = () => {
  return (
    <CenteredSpinner>
      <CircularProgress />
    </CenteredSpinner>
  );
};

export default Spinner;
