/* eslint-disable react/react-in-jsx-scope *//* eslint-disable prettier/prettier */
import {  TextInput, TextInputProps, View } from 'react-native';
import { ContainerInput, IconEye, IconSearch } from './input.style';
import Text from '../text/Text';
import { textTypes } from '../text/textTypes';
import { theme } from '../../themes/theme';
import { forwardRef, useState } from 'react';

import React from 'react';
import { DisplayFlexColumn } from '../globalStyles/globalView.style';
// type InputProps = TextInputProps;
interface InputProps extends TextInputProps {
  title?: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
  margin?: string;
  type?: 'cel-phone'| 'cpf';
  iconRight?: string;
  onPressIconRight?: ()=> void;
}
  const Input = forwardRef<TextInput,InputProps>(({ margin, secureTextEntry, title, errorMessage, onPressIconRight, iconRight, ...props }: InputProps, ref) => {
  const [currentSecure, setCurrentSecure] = useState<boolean>(!!secureTextEntry);

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
