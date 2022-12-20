import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageImage } from "../../../constants/messages.constants";
import { IActivity } from "../../../models/activity.model";
import IMessage from "../../../models/message.model";
import ActivityHelper from "../../../services/activities.service";

export interface MessagesState {
  isLoading: boolean;
  isActivityAccepted: boolean;
  isUserBored: boolean;
  isAnswerNeeded: boolean;
  error?: string;
  messages: Array<IMessage>;
}

const initialState: MessagesState = {
  isLoading: false,
  isActivityAccepted: false,
  isUserBored: false,
  isAnswerNeeded: false,
  error: undefined,
  messages: [
    {
      text: "Hi, how can i help ?",
      isBotMessage: true,
      isDelayed: true,
    },
  ],
};

const acceptActivityMessage: IMessage = {
  text: "Thank's, that sounds nice 😁 !",
  image: MessageImage.Nice,
};
const declineActivityMessage: IMessage = {
  text: "Hmm... Maybe another time 🙃",
  image: MessageImage.Hmm,
};
const conclusionMessage: IMessage = {
  text: "No problem, feel free to come back to me next time you're bored 😊",
  isBotMessage: true,
  isDelayed: true,
};
const retryFetchActivityMessage: IMessage = {
  text: "Could you please retry ?",
};
const errorMessage: IMessage = {
  text: "Sorry, i'm not feeling well right now 🤕 Can you make sure that you are online 🛜 ?",
  isBotMessage: true,
  isErrorMessage: true,
};

export const messagesSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    resetChat: (state) => {
      state = initialState;
    },
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    acceptActivity: (state) => {
      state.isActivityAccepted = true;
      state.isAnswerNeeded = false;
      state.isUserBored = false;
      state.messages = state.messages.concat(acceptActivityMessage);
      state.messages = state.messages.concat(conclusionMessage);
    },
    declineActivity: (state) => {
      state.isActivityAccepted = false;
      state.isAnswerNeeded = false;
      state.messages = state.messages.concat(declineActivityMessage);
    },
    setIsUserBored: (state, action: PayloadAction<boolean>) => {
      state.isUserBored = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    retryFetchActivity: (state) => {
      state.messages = state.messages.concat(retryFetchActivityMessage);
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchActivity.pending, (state, _action) => {
        state.isLoading = true;
        state.isAnswerNeeded = false;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        // Add any fetched posts to the array
        state.messages = state.messages.concat({
          activity: action.payload,
          isBotMessage: true,
          isDelayed: true,
        });
        state.isAnswerNeeded = true;
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.messages = state.messages.concat(errorMessage);
      });
  },
});

export const fetchActivity = createAsyncThunk(
  "chat/fetchActivity",
  async () => {
    const newActivity = await ActivityHelper.getRandomActivity();
    return newActivity as IActivity;
  }
);

// Action creators are generated for each case reducer function
export const {
  addMessage,
  resetChat,
  toggleLoading,
  acceptActivity,
  declineActivity,
  setIsUserBored,
  setError,
  clearError,
  retryFetchActivity,
} = messagesSlice.actions;

export default messagesSlice.reducer;
