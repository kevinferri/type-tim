import * as React from 'react';
import { useContext } from 'react';
import { Avatar, Typography } from 'antd';
const { Paragraph } = Typography;

import { IMessage } from '../interfaces/IMessage';
import { ViewerContext } from '../contexts/ViewerContext';

import '../../scss/components/Message.scss';

interface Props {
  message: IMessage;
}

export const Message = (props: Props) => {
  const { message } = props;
  const viewer = useContext(ViewerContext);
  const sentAt = new Date(message.sentAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="Message">
      <div className="Message__contents">
        <Avatar src={message.sentBy.picture} />
        <span>{message.sentBy.name}</span>
        <span>{sentAt}</span>
        {viewer._id === message.sentBy._id ? (
          <Paragraph
            className="Message__text"
            editable={{
              onChange: e => {
                console.log(e);
              },
            }}
          >
            {message.text}
          </Paragraph>
        ) : (
          <Paragraph className="Message__text">{message.text}</Paragraph>
        )}
      </div>
    </div>
  );
};
