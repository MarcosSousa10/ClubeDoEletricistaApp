/* eslint-disable prettier/prettier */
import {  NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps, View } from 'react-native';
import { ContainerInput, IconEye, IconSearch } from './input.style';
import Text from '../text/Text';
import { textTypes } from '../text/textTypes';
import { theme } from '../../themes/theme';
import { forwardRef, useState } from 'react';

import React from 'react';
import { DisplayFlexColumn } from '../globalStyles/globalView.style';
import { insertMaskInPhone } from '../../functions/phone';
import { insertMaskIDataNasc } from '../../functions/datanasc';
import { insertMaskInCep } from '../../functions/cep';
// type InputProps = TextInputProps;
interface InputProps extends TextInputProps {
  title?: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
  margin?: string;
  type?: 'cel-phone'| 'datanasc' |'cep' ;
  iconRight?: string;
  onPressIconRight?: ()=> void;
}
  const Input = forwardRef<TextInput,InputProps>(({ margin, secureTextEntry, title,onChange,type, errorMessage, onPressIconRight, iconRight, ...props }: InputProps, ref) => {
  const [currentSecure, setCurrentSecure] = useState<boolean>(!!secureTextEntry);
  const handleOnChange = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
    if (onChange){
      let text = event.nativeEvent.text;
      switch (type) {
        case 'cel-phone':
          text = insertMaskInPhone(text);
          break;
        case 'datanasc':
          text = insertMaskIDataNasc(text);
          break;
        case 'cep':
          text = insertMaskInCep(text);
          break;
        default:
          text = event.nativeEvent.text;
          break;
      }
    onChange({
      ...event,
      nativeEvent:{
        ...event.nativeEvent,
        text,
      },
    }
    );
    }
  };
const handleOnPressEye = () => {
  setCurrentSecure((current)=>!current);
};
  return (
    <DisplayFlexColumn customMargin={margin}>
      {title && (
        <Text
          margin="0px 0px 4px 8px"
          color={theme.colors.grayTheme.gray100}
          type={textTypes.PARAGRAPH_SMALL_SEMI_BOLD}
        >
          {title}
        </Text>
      )}
      <View>
        <ContainerInput
        hasSecureTextEntry={secureTextEntry}
        secureTextEntry={currentSecure}
        isError={!!errorMessage}
        onChange={handleOnChange}
        {...props}
        ref={ref}
         />
        {secureTextEntry && <IconEye onPress={handleOnPressEye} name={currentSecure ? 'eye' : 'eye-blocked'} size={20} />}

      </View>
      {iconRight  && <IconSearch name="search" size={14} onPress={onPressIconRight}/>}
      {errorMessage && (
        <Text
          margin="0px 0px 0px 8px"
          color={theme.colors.orangeTheme.orange80}
          type={textTypes.PARAGRAPH_SMALL_SEMI_BOLD}
        >
          {errorMessage}
        </Text>
      )}
    </DisplayFlexColumn>
  );
});
export default Input;
