import * as React from 'react';
import { useState } from 'react';
import { Input, Skeleton } from 'antd';
import { IGroup } from '../interfaces/IGroup';
import { IMessage } from '../interfaces/IMessage';
import { useGet, useMutation } from '../hooks/useApiResource';

import '../../scss/components/GroupHeader.scss';

export const Group = (props: { group: IGroup }) => {
  const { group } = props;
  const [message, setMessage] = useState<string | null>(null);
  const [{ post }] = useMutation(`/api/group/${group._id}/messages`);
  const { data, isLoading, error } = useGet<IMessage[]>(
    `/api/group/${group._id}/messages`,
  );

  return (
    <div>
      <div className="GroupHeader">
        <b>{group.name}</b>
      </div>
      <div style={{ margin: '20px' }}>
        {isLoading ? <Loader /> : <Messages messages={data} />}
      </div>
      <Input
        placeholder={`Enter your message in ${group.name}`}
        value={message}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            post({
              text: message,
            });
            setMessage(null);
          }
        }}
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
    </div>
  );
};

const Messages = (props: { messages: IMessage[] }) => {
  return (
    <div>
      {props.messages.map((message: any) => {
        return <p key={message._id}>{message.text}</p>;
      })}
    </div>
  );
};

const Loader = () => {
  const multiplyer = 3;

  return (
    <div>
      {new Array(10).fill(0).map(() => {
        return (
          <Skeleton
            active
            avatar={{ size: 'small' }}
            paragraph={{
              rows: Math.floor(Math.random() * multiplyer),
            }}
          />
        );
      })}
    </div>
  );
};
