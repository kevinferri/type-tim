import { IViewer } from './IViewer';

export interface IMessage {
  _id: string;
  text: string;
  sentAt: string;
  sentBy: IViewer;
}
