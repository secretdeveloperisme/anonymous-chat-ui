import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, Group } from '~/types/model';

interface ChatState {
  currentUser: User | null;
  currentGroup: Group | null;
}

const initialState: ChatState = {
  currentUser: null,
  currentGroup: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setCurrentGroup: (state, action: PayloadAction<Group | null>) => {
      state.currentGroup = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setCurrentUser, setCurrentGroup, resetState } = chatSlice.actions;
export default chatSlice.reducer;
