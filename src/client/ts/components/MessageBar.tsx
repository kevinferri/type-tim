import * as React from 'react';
import { useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import { IGroup } from '../interfaces/IGroup';
import { useMutation } from '../hooks/useApiResource';

export const MessageBar = (props: { group: IGroup }) => {
  const { group } = props;

  const [{ post }] = useMutation(`/api/group/${group._id}/messages`);
  const [message, setMessage] = useState<string | null>(null);

  return (
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
  );
};
