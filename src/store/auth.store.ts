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
  // Extended profile fields
  profileimageurl?: string;
  gender?: string;
  ageGroup?: string;
  ethnicity?: string;
  ethnicityOther?: string;
  paternalEthnicity?: string;
  paternalEthnicityOther?: string;
  maternalEthnicity?: string;
  maternalEthnicityOther?: string;
  siblingsCount?: number;
  siblings?: any[];
  musicGenres?: string[];
  sameAsEarly?: boolean | null;
  earlyChildhood?: any;
  lateChildhood?: any;
  sameAsEarlyAdulthood?: boolean | null;
  earlyAdulthood?: any;
  lateAdulthood?: any;
  shareStory?: string;
  storyHighlight?: any;
  referenceImages?: any;
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
    logOut: (state: AuthState) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    updateUserProfile: (state: AuthState, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    updateUserProfileField: (state: AuthState, action: PayloadAction<{ field: keyof User; value: any }>) => {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value;
      }
    },
  },
  extraReducers: () => {},
});

export const { logOut, setUser, updateUserProfile, updateUserProfileField } = authSlice.actions;
export default authSlice.reducer;