import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from "../../theme";
import * as Animatable from 'react-native-animatable'

export const VerticalButtonsView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const ButtonsView = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    padding: ${RFPercentage(2)}px 0 ${RFPercentage(2.5)}px 0;
`
export const Container = styled(Animatable.View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    width: 100%;
`

export const Frame = styled.ScrollView`
    background-color: ${THEME.COLORS.ALERT800};
    flex: 1;
    flex-direction: column;
    border: 1.5px solid ${THEME.COLORS.BACKGROUND};
    border-top-color: ${THEME.COLORS.ALERT800}!important;
    border-radius: 10px;
    margin-top: ${RFPercentage(1)}px;
    max-height: ${RFPercentage(45)}px;
    width: ${RFPercentage(40)}px;
`

export const Label = styled.Text`
    font-size: ${RFPercentage(2.4)}px;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.PRIMARY800};
    margin-top: ${RFPercentage(2)}px;
    align-self: flex-start;

`
