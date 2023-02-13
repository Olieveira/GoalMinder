import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from "../../theme";
import * as Animatable from 'react-native-animatable';

export const InactiveBG = styled(Animatable.View)`
    flex: 1;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
`
export const CenterView = styled(Animatable.View)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: ${RFPercentage(45)}px;
    min-height: ${RFPercentage(23)}px;
    border-radius: 5px;
    background-color: ${THEME.COLORS.ALERT800};
    padding: ${RFPercentage(0)}px ${RFPercentage(2.3)}px ${RFPercentage(1)}px;
`
export const TitleView = styled.View`
    flex-direction: row;
    width: 100%;
    height: ${RFPercentage(5)}px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    margin: ${RFPercentage(1)}px 0 ${RFPercentage(2)}px 0 ;
`
export const TitleMessage = styled.Text`
    font-size: ${RFPercentage(2.5)}px;
    font-family: ${THEME.FONTS.BOLD};
`

export const BodyMessage = styled.Text`
    font-size: ${RFPercentage(2.2)}px;
    font-family: ${THEME.FONTS.REGULAR};
`

export const ButtonsView = styled.View`
    margin-top: ${RFPercentage(5)}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    justify-items: center;
    align-content: center;
`