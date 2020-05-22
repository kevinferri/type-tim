import * as React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { Avatar, Typography } from 'antd';
const { Paragraph } = Typography;

import { IMessage } from '../interfaces/IMessage';
import { ViewerContext } from '../contexts/ViewerContext';
import styleguide from '../styledguide';

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
    <StyledMessage>
      <StyledMessageContents>
        <Avatar src={message.sentBy.picture} />
        <span>{message.sentBy.name}</span>
        <span>{sentAt}</span>
        {viewer._id === message.sentBy._id ? (
          <StyledParagraph
            editable={{
              onChange: (e) => {
                console.log(e);
              },
            }}
          >
            {message.text}
          </StyledParagraph>
        ) : (
          <StyledParagraph>{message.text}</StyledParagraph>
        )}
      </StyledMessageContents>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  &:hover {
    background: ${styleguide.colors.grey2};
  }
`;

const StyledMessageContents = styled.div`
  padding: 10px;
`;

const StyledParagraph = styled(Paragraph)`
  color: ${styleguide.colors.black};
  margin-bottom: 0 !important;
`;
