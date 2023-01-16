import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//Define Interface For the initial state.
export interface Emails {
  id: string;
  date: number;
  subject: string;
  short_description: string;
  from: {
    email: string;
    name: string;
  };
}

interface EmailSenderInformation {
  id: string;
  name: string;
  date: number;
}

interface InititalState {
  emails: Emails[];
  isEmailOpen: boolean;
  emailId: string;
  emailSender: EmailSenderInformation;
}

const initialState: InititalState = {
  emails: [],
  isEmailOpen: false,
  emailId: "",
  emailSender: {
    id: "",
    name: "",
    date: 0,
  },
};

export const emailsSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    getEmails: (state, action: PayloadAction<Emails[]>) => {
      state.emails = [...action.payload];
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isEmailOpen = action.payload;
    },
    setEmailId: (
      state,
      action: PayloadAction<{
        isEmailOpen: boolean;
        emailId: string;
        sender: EmailSenderInformation;
      }>
    ) => {
      state.emailId = action.payload.emailId;
      state.isEmailOpen = action.payload.isEmailOpen;
      state.emailSender = action.payload.sender;
    },
    setEmailUserInfo: (
      state,
      action: PayloadAction<EmailSenderInformation>
    ) => {
      state.emailSender = action.payload;
    },
  },
});

export const { getEmails, setIsOpen, setEmailId } = emailsSlice.actions;

export const emails = (state: RootState) => state.email.emails;
export const isEmailOpen = (state: RootState) => state.email.isEmailOpen;
export const emailId = (state: RootState) => state.email.emailId;
export const emailSender = (state: RootState) => state.email.emailSender;

export default emailsSlice.reducer;
