import { createContext } from 'react';
import { IViewer } from '../interfaces/IViewer';

export const ViewerContext = createContext<IViewer | null>((window as any).bootstrapData.viewer);
