/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import { Icon } from '../../../shared/icon/Icon';
import { Dimensions } from 'react-native';

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
export const VendasViewAling = styled.View`
align-items: center;
`;
export const VendasViewRow = styled.View`
flex-direction: row;
border-width: 1px;
border-color: ${theme.colors.mainTheme.primary};
align-items: center;
justify-content: center;
`;
export const VendasTouchableOpacity = styled.TouchableOpacity`
flex-direction: row;
margin-left: 20px;
padding-left: 20px;
flex: 1;
align-items: center;
justify-content: center;
`;
export const VendasIcon = styled(Icon)`
padding-right: 10px;
`;
export const VendasText = styled.Text`
flex-direction: column;
padding-left: 20px;
`;
export const VendasViewCenter = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
border-width: 1px;
padding: 15px;
width: ${Dimensions.get('window').width};
`;
export const VendasViewp = styled.View`
flex-direction: row;
padding: 2px;
`;
export const TextBold = styled.Text`
font-weight: bold;
`;
export const TextBoldBlue = styled.Text`
font-weight: bold;
color: blue;
`;
export  const TextMarginColor = styled.Text`
margin-left: 10px;
color: purple;
`;
