import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from "../../theme";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    width: ${RFPercentage(38)}px;
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
    align-self: center;

`
