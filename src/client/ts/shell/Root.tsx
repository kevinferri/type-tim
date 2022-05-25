import * as React from 'react';
import { useContext } from 'react';
import { Avatar, Layout, Spin, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { IGroup } from '../interfaces/IGroup';
import { useGet } from '../hooks/useApiResource';
import { ViewerContext } from '../contexts/ViewerContext';
import { LoggedOut } from '../pages/LoggedOut';
import { Route, Switch } from 'react-router-dom';
import { LoggedInHome } from '../pages/LoggedInHome';
import { GroupContainer } from '../pages/GroupContainer';
import { CreateGroup } from '../pages/CreateGroup';
import { UserSettings } from '../pages/UserSettings';
import { NotFound } from '../pages/NotFound';
import styleguide from '../styledguide';

const { Sider } = Layout;

import 'antd/dist/antd.css';

export const Root = () => {
  const viewer = useContext(ViewerContext);
  let groups: IGroup[] = [];
  let isLoading = false;

  if (viewer !== null) {
    const requestState = useGet<IGroup[]>('/api/me/groups');
    groups = requestState.data;
    isLoading = requestState.isLoading;
  }

  if (isLoading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
    );
  }

  return (
    <StyledRoot>
      <StyledSider theme="light" width={60}>
        {viewer && (
          <Tooltip
            placement="right"
            title="Edit your profile"
            mouseEnterDelay={0.01}
          >
            <StyledNavLink exact activeClassName="active-link" to={`/me`}>
              <Avatar size="small" src={viewer ? viewer.picture : null} />
            </StyledNavLink>
          </Tooltip>
        )}

        {groups.map((group: IGroup) => {
          return (
            <Tooltip
              key={group._id}
              placement="right"
              title={group.name}
              mouseEnterDelay={0.01}
            >
              <StyledNavLink
                exact
                activeClassName="active-link"
                to={`/groups/${group._id}`}
              >
                {group.picture ? (
                  <Avatar src={group.picture} size="small" />
                ) : (
                  <Avatar style={{ verticalAlign: 'middle' }} size="small">
                    {group.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </StyledNavLink>
            </Tooltip>
          );
        })}
        <Tooltip placement="right" title="Create a group">
          <StyledNavLink
            exact
            activeClassName="Sider__link--active"
            to="/groups/new"
          >
            <PlusCircleOutlined />
          </StyledNavLink>
        </Tooltip>
      </StyledSider>
      <div>
        {viewer === null ? (
          <LoggedOut />
        ) : (
          <Switch>
            <Route exact path="/" component={LoggedInHome} />
            <Route exact path="/groups/new" component={CreateGroup} />
            <Route exact path="/groups/:id" component={GroupContainer} />
            <Route exact path="/me" component={UserSettings} />
            <Route component={NotFound} />
          </Switch>
        )}
      </div>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  min-height: 100vh;
  min-width: 100%;
  font-family: 'Open Sans';
`;

const StyledSider = styled(Sider)`
  background: ${styleguide.colors.grey2} !important;
  border-right: 1px solid ${styleguide.colors.grey1};
  height: 100%;
  position: fixed;
  overflow-y: scroll;

  img,
  svg {
    border-radius: 50%;
    height: 24px;
    width: 24px;
  }
`;

const StyledNavLink = styled(NavLink)`
  border-right: 3px solid transparent;
  display: block;
  margin-left: 3px;
  padding: 12px;
  text-align: center;

  &.active-link {
    background: ${styleguide.colors.lightBlue};
    border-right: 3px solid ${styleguide.colors.brandBlue};
  }

  &:hover {
    opacity: 0.8;
  }

  &__icon {
    margin-right: 18px;
  }
`;
