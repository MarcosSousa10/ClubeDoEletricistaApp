/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GLobalModalType } from '../../../shared/modal/globalModal/GlobalModal';
interface GlobalStore {
    modal: GLobalModalType;
}
const initialState: GlobalStore = {
    modal: {
        visible: false,
        text: '',
        title: '',
    },
};
export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setModalAction: (state, action: PayloadAction<GLobalModalType>) => {
      state.modal = action.payload;
    },
  },
});

export const { setModalAction } = globalSlice.actions;

export default globalSlice.reducer;
