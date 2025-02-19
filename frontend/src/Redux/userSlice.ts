import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserRole } from './types';

const initialState: UserState = {
  role: 'customer',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<UserRole>) {
      state.role = action.payload;
    },
  },
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;
