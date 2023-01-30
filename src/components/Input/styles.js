import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme';
import * as Animatable from "react-native-animatable";

export const LabelText = styled.Text`
  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFPercentage(2.5)}px;
  text-align: center;
`

export const VContainer = styled(Animatable.View)`
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
flex-grow: 1;
background-color: transparent;
border: solid ${RFPercentage(0.3)}px ${THEME.COLORS.BACKGROUND}; 
border-radius: 4px;
margin: ${RFPercentage(1)}px ${RFPercentage(1)}px;
padding: ${RFPercentage(0.3)}px ${RFPercentage(1)}px;
min-width: ${RFPercentage(24)}px;
max-width: ${RFPercentage(50)}px;
min-height: ${RFPercentage(5)}px;
`