import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  religion: string;
  isProfileCompleted: boolean;
  role: string;
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: (state:any) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUser: (state:any, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: () => {},
});

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
