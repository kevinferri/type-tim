import * as React from 'react';
import { Avatar } from 'antd';

import { IMessage } from '../interfaces/IMessage';

import '../../scss/components/Message.scss';

interface Props {
  message: IMessage;
}

export const Message = (props: Props) => {
  const { message } = props;

  return (
    <div className="Message">
      <div className="Message__contents">
        <Avatar src={message.sentBy.picture} />
        <strong>{message.sentBy.name}</strong>
        <span>{message.text}</span>
      </div>
    </div>
  );
};
