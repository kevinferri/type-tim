import * as React from 'react';
import { useState } from 'react';
import { Layout } from 'antd';
import { Button, Form, Input } from 'antd';
import { useMutation } from '../hooks/useApiResource';

import '../../scss/components/Content.scss';

export const CreateGroup = () => {
  const [name, setName] = useState<String | null>(null);
  const [description, setDescription] = useState<String | null>(null);
  const [picture, setPicture] = useState<String | null>(null);
  const [{ post }, { isLoading }] = useMutation('/api/me/groups');

  return (
    <div>
      <Layout.Content className="Content">
        <Form wrapperCol={{ span: 14 }} layout="horizontal">
          <Form.Item>
            <b>Name</b>
            <Input
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <b>Description</b>
            <Input
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <b>Picture</b>
            <Input
              onChange={e => {
                setPicture(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              loading={isLoading}
              onClick={() => {
                post({
                  name,
                  description,
                  picture,
                });
              }}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    </div>
  );
};
