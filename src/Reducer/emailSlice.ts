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

interface EmailStatus {
  isFavourite: boolean;
  isRead: boolean;
}

interface EmailSenderInformation {
  id: string;
  name: string;
  date: number;
}

interface LocalEmails {
  [key: string]: EmailStatus;
}

interface InititalState {
  emails: Emails[];
  isEmailOpen: boolean;
  emailId: string;
  emailSender: EmailSenderInformation;
  localEmails: LocalEmails;
  currentMenu: number;
  pageNumber: number;
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
  localEmails: {},
  currentMenu: 0,
  pageNumber: 1,
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
    setLocalEmails: (state, action: PayloadAction<LocalEmails>) => {
      state.localEmails = action.payload;
    },
    setCurrentMenu: (state, action: PayloadAction<number>) => {
      state.currentMenu = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
  },
});

export const {
  getEmails,
  setIsOpen,
  setEmailId,
  setLocalEmails,
  setCurrentMenu,
  setPageNumber,
} = emailsSlice.actions;

export const emails = (state: RootState) => state.email.emails;
export const isEmailOpen = (state: RootState) => state.email.isEmailOpen;
export const emailId = (state: RootState) => state.email.emailId;
export const emailSender = (state: RootState) => state.email.emailSender;
export const localEmails = (state: RootState) => state.email.localEmails;
export const currentMenu = (state: RootState) => state.email.currentMenu;
export const pageNumber = (state: RootState) => state.email.pageNumber;

export default emailsSlice.reducer;
