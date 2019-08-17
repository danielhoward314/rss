import React from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = () => {
  return (
    <OuterDiv>
      <CircularProgress />
    </OuterDiv>
  );
};

export default Spinner;
