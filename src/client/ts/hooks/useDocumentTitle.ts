import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  const baseTitle = 'Tim |';

  useEffect(() => {
    document.title = `${baseTitle} ${title}`;
  }, [title]);
};
