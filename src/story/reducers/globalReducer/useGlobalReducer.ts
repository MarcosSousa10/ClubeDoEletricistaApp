/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';
import {useAppSelector} from '../../hooks';
import { setModalAction } from '.';
import { GLobalModalType } from '../../../shared/modal/globalModal/GlobalModal';

export const useGlobalRducer = () => {
    const dispatch = useDispatch();
  const {modal} = useAppSelector(state => state.globalReducer);

  const closeModal = ()=>{
    dispatch(setModalAction({
        ...modal,
        visible: false,
    }),
    );
  };
  const setModal = (currentModal: GLobalModalType)=>{
    dispatch(setModalAction(currentModal));
  };
  return {
    modal,
    closeModal,
    setModal,
};
};
