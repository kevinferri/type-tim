import { IViewer } from './IViewer';

export interface IMessage {
  _id: string;
  text: string;
  sentBy: IViewer;
}
