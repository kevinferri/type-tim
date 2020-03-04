import * as React from 'react';
import { useContext } from 'react';
import { Avatar, Layout, Spin, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { IGroup } from '../interfaces/IGroup';
import { useGet } from '../hooks/useApiResource';
import { ViewerContext } from '../contexts/ViewerContext';
import { LoggedOut } from '../components/LoggedOut';
import { Route, Switch } from 'react-router-dom';
import { LoggedInHome } from '../pages/LoggedInHome';
import { GroupContainer } from '../pages/GroupContainer';
import { CreateGroup } from '../pages/CreateGroup';
import { UserSettings } from '../pages/UserSettings';

const { Sider } = Layout;

import 'antd/dist/antd.css';
import '../../scss/root.scss';
import '../../scss/components/Sider.scss';

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
    <Layout style={{ minHeight: '100vh', minWidth: '100%' }}>
      <Sider theme="light" className="Sider" width={60}>
        <Tooltip
          placement="right"
          title="Edit your profile"
          mouseEnterDelay={0.01}
        >
          <NavLink
            exact
            activeClassName="Sider__link--active"
            className="Sider__link"
            to={`/me`}
          >
            <Avatar size="small" src={viewer.picture} />
          </NavLink>
        </Tooltip>
        {groups.map((group: IGroup) => {
          return (
            <Tooltip
              key={group._id}
              placement="right"
              title={group.name}
              mouseEnterDelay={0.01}
            >
              <NavLink
                exact
                activeClassName="Sider__link--active"
                className="Sider__link"
                to={`/groups/${group._id}`}
              >
                {group.picture ? (
                  <Avatar src={group.picture} size="small" />
                ) : (
                  <Avatar style={{ verticalAlign: 'middle' }} size="small">
                    {group.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </NavLink>
            </Tooltip>
          );
        })}
        <Tooltip placement="right" title="Create a group">
          <NavLink
            exact
            activeClassName="Sider__link--active"
            className="Sider__link"
            to="/groups/new"
          >
            <PlusCircleOutlined />
          </NavLink>
        </Tooltip>
      </Sider>
      <Layout>
        {viewer === null ? (
          <LoggedOut />
        ) : (
          <Switch>
            <Route exact path="/" component={LoggedInHome} />
            <Route exact path="/groups/new" component={CreateGroup} />
            <Route exact path="/groups/:id" component={GroupContainer} />
            <Route exact path="/me" component={UserSettings} />
          </Switch>
        )}
      </Layout>
    </Layout>
  );
};
