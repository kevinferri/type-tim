import * as React from 'react';
import { Group } from '../components/Group';
import { IGroup } from '../interfaces/IGroup';
import { useGet } from '../hooks/useApiResource';

export const GroupContainer = (props: any) => {
  const { id } = props.match.params;
  const { data, isLoading } = useGet<IGroup>(`/api/group/${id}`);

  if (isLoading) {
    return null;
  }

  return <Group group={data} />;
};
