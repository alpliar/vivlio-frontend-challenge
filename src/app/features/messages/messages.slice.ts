import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IMessage from "../../../models/message.model";

export interface MessagesState {
  messages: Array<IMessage>;
}

const initialState: MessagesState = {
  messages: [
    {
      text: "Hi, how can i help ?",
      isBotMessage: true,
      isDelayed: true,
    },
  ],
};

export const messagesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    add: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, reset } = messagesSlice.actions;

export default messagesSlice.reducer;
