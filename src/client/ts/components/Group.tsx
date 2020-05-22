import * as React from 'react';
import styled from 'styled-components';
import { Input, Spin } from 'antd';
const { TextArea } = Input;
import { LoadingOutlined } from '@ant-design/icons';

import { Message } from '../components/Message';
import { IGroup } from '../interfaces/IGroup';
import { IMessage } from '../interfaces/IMessage';
import { useGet } from '../hooks/useApiResource';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { MessageBar } from '../components/MessageBar';
import styleguide from '../styledguide';

export const Group = (props: { group: IGroup }) => {
  const { group } = props;
  const { data, isLoading } = useGet<IMessage[]>(
    `/api/group/${group._id}/messages`,
  );

  useDocumentTitle(group.name);

  return (
    <StyledGroup>
      <StyledGroupHeader>
        <b>{group.name}</b>
      </StyledGroupHeader>
      <StyledMessages>
        {isLoading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
        ) : (
          <div>
            {[...data].reverse().map((message: IMessage) => {
              return <Message key={message._id} message={message} />;
            })}
          </div>
        )}
      </StyledMessages>
      <MessageBar group={group} />
    </StyledGroup>
  );
};

const StyledGroup = styled.div``;

const StyledGroupHeader = styled.div`
  background: ${styleguide.colors.grey2};
  border-bottom: 1px solid ${styleguide.colors.grey1};
  padding: 12px;
  margin-bottom: 10px;
  display: flex;
  position: fixed;
  top: 0;
  left: ${styleguide.gutters.siderWidth};
  right: 0;
  z-index: 1;
`;

const StyledMessages = styled.div`
  left: ${styleguide.gutters.siderWidth};
  height: calc(100% - ${styleguide.gutters.siderWidth} * 2);
  position: relative;
  overflow-wrap: break-word;
  overflow-y: scroll;
  top: 40px;
  width: calc(100% - ${styleguide.gutters.siderWidth});

  &::-webkit-scrollbar {
    display: none;
  }
`;
