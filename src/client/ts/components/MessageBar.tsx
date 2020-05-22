import * as React from 'react';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import styleguide from '../styledguide';
const { TextArea } = Input;

import { IGroup } from '../interfaces/IGroup';
import { useEmit } from '../hooks/useApiResource';
import { ViewerContext } from '../contexts/ViewerContext';

export const MessageBar = (props: { group: IGroup }) => {
  const { group } = props;
  const [{ emit }] = useEmit(
    'MESSAGE_SENT',
    `/api/group/${group._id}/messages`,
  );
  const [message, setMessage] = useState<string | null>(null);
  const viewer = useContext(ViewerContext);

  return (
    <StyledMessageBar>
      <TextArea
        allowClear
        autoSize
        placeholder={`Enter your message in ${group.name}`}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            emit({
              text: message,
              group_id: group._id,
              user: viewer,
            });
            setMessage(null);
          }
        }}
      />
    </StyledMessageBar>
  );
};

const StyledMessageBar = styled.div`
  background: ${styleguide.colors.grey2};
  border-top: 1px solid ${styleguide.colors.grey1};
  bottom: 0;
  padding: 14px;
  position: fixed;
  right: 0;
  width: calc(100% - ${styleguide.gutters.siderWidth});
  z-index: 1;

  textarea {
    resize: none;
  }
`;
