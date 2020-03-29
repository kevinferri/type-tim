import * as React from 'react';

import '../../scss/components/Content.scss';

export const Content = (props: { children: React.ReactNode }) => {
  return <div className="Content">{props.children}</div>;
};
