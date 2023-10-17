/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';

export const HomeContainer = styled.View`
padding: 8px;
display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-left: 50px;
margin-right: 50px;
  border-color: ${theme.colors.grayTheme.gray80};
  border-radius: 4px;
  border-width: 1px;
`;
export const HomeContainerInfo = styled.View`
  border-radius: 4px;
  border-color: ${theme.colors.grayTheme.gray80};
  border-width: 1px;
  padding: 8px;
  margin: 20px;
 display: flex;
 justify-content: space-between;
 flex-direction: column;
`;
export const WhiteSquare = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BoldNumber = styled.TextInput.attrs({ readOnly: true })`
  color: black;
  font-weight: bold;
  font-size: 80px;
`;
