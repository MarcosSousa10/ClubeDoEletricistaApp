/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
interface DisplayProps{
    customMargin?: string;
}
export const DisplayFlexColumn = styled.View<DisplayProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${(props: { customMargin: any; }) => props.customMargin ? props.customMargin : '0px'};
`;

export const  FlexBetweenRow = styled.View`
flex-direction: row;
justify-content: space-between;
`;
