import * as React from 'react';
import { Input, Spin } from 'antd';
const { TextArea } = Input;
import { LoadingOutlined } from '@ant-design/icons';

import { Message } from '../components/Message';
import { IGroup } from '../interfaces/IGroup';
import { IMessage } from '../interfaces/IMessage';
import { useGet } from '../hooks/useApiResource';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { MessageBar } from '../components/MessageBar';

import '../../scss/components/Group.scss';

export const Group = (props: { group: IGroup }) => {
  const { group } = props;
  const { data, isLoading } = useGet<IMessage[]>(
    `/api/group/${group._id}/messages`,
  );

  useDocumentTitle(group.name);

  return (
    <div className="Group">
      <div className="GroupHeader">
        <b>{group.name}</b>
      </div>
      <div className="Messages">
        {isLoading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
        ) : (
          <div>
            {[...data].reverse().map((message: IMessage) => {
              return <Message key={message._id} message={message} />;
            })}
          </div>
        )}
      </div>
      <MessageBar group={group} />
    </div>
  );
};
