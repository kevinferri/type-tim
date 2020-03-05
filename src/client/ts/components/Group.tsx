import * as React from 'react';
import { useEffect, useState } from 'react';
import { Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { TextArea } = Input;

import { Message } from '../components/Message';
import { IGroup } from '../interfaces/IGroup';
import { IMessage } from '../interfaces/IMessage';
import { useGet, useMutation } from '../hooks/useApiResource';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import '../../scss/components/Group.scss';

export const Group = (props: { group: IGroup }) => {
  const { group } = props;
  const [message, setMessage] = useState<string | null>(null);
  const [{ post }] = useMutation(`/api/group/${group._id}/messages`);
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
            {data.map((message: IMessage) => {
              return <Message key={message._id} message={message} />;
            })}
          </div>
        )}
      </div>
      <div className="MessageBar">
        <TextArea
          allowClear
          autoSize
          placeholder={`Enter your message in ${group.name}`}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              post({
                text: message,
              });
              setMessage(null);
            }
          }}
        />
      </div>
    </div>
  );
};
