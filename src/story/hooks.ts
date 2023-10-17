/* eslint-disable prettier/prettier */
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '.';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
