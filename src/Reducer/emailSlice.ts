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

interface InititalState {
  emails: Emails[];
}

const initialState: InititalState = {
  emails: [],
};

export const emailsSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    getEmails: (state, action: PayloadAction<Emails[]>) => {
      state.emails = [...action.payload];
    },
  },
});

export const { getEmails } = emailsSlice.actions;

export const emails = (state: RootState) => state.email.emails;

export default emailsSlice.reducer;
