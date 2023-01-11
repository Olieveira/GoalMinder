import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from "../../theme";

export const ButtonsView = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    padding: ${RFPercentage(2)}px 0 ${RFPercentage(1)}px 0
`

export const CadastroTxt = styled.Text`
    text-align: center;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.TEXT};
    font-size: ${RFPercentage(2.3)}px;
`

export const CadastroBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-self: flex-end;
    justify-content: center;
    padding: ${RFPercentage(0.6)}px;
    margin-top: ${RFPercentage(2)}px;
    flex: 1;
    background-color: ${THEME.COLORS.SUCCESS};
    width: ${RFPercentage(16)}px;    
    
`

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
    margin-top: ${RFPercentage(2)}px;
    align-self: flex-start;

`
