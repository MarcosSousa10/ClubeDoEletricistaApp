/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { theme } from '../themes/theme';
import { Icon } from '../icon/Icon';

export const ContainerModal = styled.View`
  position: absolute;
  bottom: 0;
  background-color: ${theme.colors.neutraTheme.white};
  height: 200px;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  padding: 16px;
  z-index: 9;
  shadow-color: ${theme.colors.neutraTheme.black};
  shadow-offset: {
    width: 0;
    height: 0;
  }
  shadow-opacity: 1;
  shadow-radius: 1px;
  elevation: 10;
`;

export const IconCloseModal = styled(Icon)`
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 10;
`;
