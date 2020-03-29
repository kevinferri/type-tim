import * as React from 'react';
import { Content } from '../components/Content';

export const LoggedOut = () => {
  return (
    <Content>
      <a href="/auth/google">Sign in</a>
    </Content>
  );
};
