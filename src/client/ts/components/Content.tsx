import * as React from 'react';
import styled from 'styled-components';

import styleguide from '../styledguide';

export const Content = (props: { children: React.ReactNode }) => {
  return <StyledContent>{props.children}</StyledContent>;
};

const StyledContent = styled.div`
  left: ${styleguide.gutters.siderWidth};
  padding: 10px 20px;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;
