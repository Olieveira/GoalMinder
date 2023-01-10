import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme'

export const LabelText = styled.Text`
  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFPercentage(2.5)}px;
  text-align: center;
`

export const VContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const HContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  width: ${RFPercentage(29)}px;
`
export const TextInput = styled.TextInput`
background-color: transparent;
border: solid ${RFPercentage(0.3)}px ${THEME.COLORS.BACKGROUND}; 
border-radius: 4px;
margin: ${RFPercentage(1)}px ${RFPercentage(2)}px;
padding: ${RFPercentage(0.3)}px ${RFPercentage(2)}px;
width: ${RFPercentage(24)}px;
height: ${RFPercentage(5)}px;
`