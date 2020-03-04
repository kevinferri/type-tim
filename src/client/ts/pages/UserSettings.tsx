import * as React from 'react';
import { useContext } from 'react';

import { ViewerContext } from '../contexts/ViewerContext';

export const UserSettings = () => {
  const viewer = useContext(ViewerContext);

  return (
    <div>
      <p>Hey, {viewer.name}</p>
      <p>You can edit your settings here</p>
    </div>
  );
};
