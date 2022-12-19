import { IActivity } from "./activity.model";

export default interface IMessage {
  text?: string;
  activity?: IActivity;
  isBotMessage: boolean;
  isErrorMessage?: boolean;
}
