import * as React from 'react';
import { useContext } from 'react';

import { ViewerContext } from '../contexts/ViewerContext';
import { Content } from '../components/Content';

export const UserSettings = () => {
  const viewer = useContext(ViewerContext);

  return (
    <Content>
      <p>Hey, {viewer.name}</p>
      <p>You can edit your settings here</p>
    </Content>
  );
};
