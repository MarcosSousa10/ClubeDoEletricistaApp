/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
interface ContainerTextProps {
  color?: string;
  customMargin?: string;
  fontSize?: string;
  fontFamily?: 'Poppins-SemiBold' | 'Poppins-Bold' | 'Poppins-Italic' | 'Poppins-Light' | 'Poppins-Regular';
}
export const ContainerText = styled.Text<ContainerTextProps>`
  ${(props: { color: any; }) => (props.color ? `color: ${props.color};` : '')};
  ${(props: { customMargin: any; }) => (props.customMargin ? `margin: ${props.customMargin};` : '')};
  padding-top: 3px;
  font-family: ${(props: { fontFamily: any; })=> props.fontFamily};
  font-size: ${(props: { fontSize: any; }) => props.fontSize};
`;
