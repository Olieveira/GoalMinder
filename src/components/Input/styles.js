import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme'

export const LabelText = styled.Text`
  color: ${THEME.COLORS.BACKGROUND};
  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFPercentage(2.5)}px;
  text-align: center;
`

export const VContainer = styled.View`
  flex-direction: column;
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
padding: ${RFPercentage(0.3)}px ${RFPercentage(2)}px;
margin: ${RFPercentage(0.5)}px 0;
border: solid ${RFPercentage(0.3)}px ${THEME.COLORS.BACKGROUND}; 
border-radius: 4px;
margin: ${RFPercentage(1)}px ${RFPercentage(2)}px;
width: ${RFPercentage(24)}px;
`