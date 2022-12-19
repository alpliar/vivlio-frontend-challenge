import IMessage from "../models/message.model";

export enum MessageActionKind {
  ADD = "ADD",
  RESET = "RESET",
  // SAVE_ERROR = "SAVE ERROR",
  // TOGGLE_LOADING = "TOGGLE LOADING",
  // TOGGLE_ACTIVITY_ACCEPTED = "TOGGLE ACTIVITY ACCEPTED",
}
export interface IAddMessageAction {
  type: MessageActionKind.ADD;
  payload: IMessage;
}

export interface IResetAction {
  type: MessageActionKind.RESET;
}

// export interface ISaveErrorAction {
//   type: MessageActionKind.SAVE_ERROR;
//   payload: string;
// }

// export interface IToggleLoadingAction {
//   type: MessageActionKind.TOGGLE_LOADING;
// }

// export interface IToggleActivityAccepted {
//   type: MessageActionKind.TOGGLE_ACTIVITY_ACCEPTED;
// }

export type IMessagesActions = IAddMessageAction | IResetAction;
// | ISaveErrorAction
// | IToggleLoadingAction
// | IToggleActivityAccepted;

export interface IRootState {
  messages: Array<IMessage>;
  // error?: string;
  // isLoading: boolean;
  // isActivityAccepted: boolean;
}

export const defaultState: IRootState = {
  messages: [
    {
      text: "Hi, how can i help ?",
      isBotMessage: true,
      isDelayed: true,
    },
  ],
  // error: undefined,
  // isLoading: false,
  // isActivityAccepted: false,
};

export const rootReducer = (
  state: IRootState,
  action: IMessagesActions
): IRootState => {
  switch (action.type) {
    case MessageActionKind.ADD:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        // error: undefined,
      };
    case MessageActionKind.RESET:
      return {
        ...defaultState,
      };
    // case MessageActionKind.SAVE_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // case MessageActionKind.TOGGLE_LOADING:
    //   return {
    //     ...state,
    //     isLoading: !state.isLoading,
    //   };
    // case MessageActionKind.TOGGLE_ACTIVITY_ACCEPTED:
    //   return {
    //     ...state,
    //     isActivityAccepted: !state.isActivityAccepted,
    //   };
    default:
      throw new Error();
  }
};
