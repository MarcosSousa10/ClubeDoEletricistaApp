/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { theme } from '../../themes/theme';
import { Icon } from '../icon/Icon';
interface ContainerInputProps{
  isError?: boolean;
  hasSecureTextEntry?:boolean;
}
export const ContainerInput = styled.TextInput<ContainerInputProps>`
  width: 100%;
  height: 40px;
  padding: 8px 16px;
  background-color: ${theme.colors.neutraTheme.white};
  color: ${theme.colors.neutraTheme.black};
  border-radius: 4px;
  padding-right: ${(props: { hasSecureTextEntry: any; }) => props.hasSecureTextEntry ? '52px' : '26px'};
  border-width: 1px;
  border-color: ${(props: { isError: any; }) => props.isError ? theme.colors.orangeTheme.orange80 : theme.colors.grayTheme.gray80};
`;
export const IconEye = styled(Icon)`
position: absolute;
right: 16px;
top: 10px;
`;
export const IconSearch = styled(Icon)`
position: absolute;
right: 16px;
top: 12px;
`;