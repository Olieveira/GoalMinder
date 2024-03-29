import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from "../../theme";
import * as Animatable from 'react-native-animatable'
import { ScrollView } from 'react-native-gesture-handler'

export const HeaderView = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${THEME.COLORS.ALERT800};
    padding: ${RFPercentage(2)}px 0;
    border: solid 2px ${THEME.COLORS.PRIMARY900};
`

export const HeaderTitle = styled.Text`
    width: 100%;
    text-align: center;
    font-size: ${RFPercentage(2.7)}px;
    font-family: ${THEME.FONTS.BOLD};
    color: ${THEME.COLORS.BACKGROUND};
`

export const BgCenterView = styled.View`
    justify-content: center;
    align-items: center;
`
export const GoalsText = styled.Text`
    width: ${RFPercentage(29)}px;
    text-align: left;
    margin-left: ${RFPercentage(1.6)}px;
    padding: 0 ${RFPercentage(1)}px;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.ALERT900};
    font-size: ${RFPercentage(2)}px;
    `

export const HorizontalGoalsView = styled(Animatable.View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${THEME.COLORS.BACKGROUND};
    padding: ${RFPercentage(0.8)}px ${RFPercentage(1)}px;
    margin: ${RFPercentage(1)}px ${RFPercentage(0)}px;
    border-radius: 3px;
    border: 2.5px solid ${THEME.COLORS.PRIMARY800};
`
export const DefaultView = styled(Animatable.View)`
`

export const GoalsLabelView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFPercentage(2)}px;
    width: ${RFPercentage(25)}px;
    align-self: flex-start;
    margin-left: ${RFPercentage(4.5)}px;

`
export const CenterView = styled(ScrollView)`
    flex: 1;
    max-height: ${RFPercentage(78)}px;
    width: ${RFPercentage(50)}px;
    background-color: ${THEME.COLORS.ALERT800};
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
`
export const Container = styled(Animatable.View)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`
export const VerticalButtonsView = styled.View`
    flex-direction: column;
    align-items: center;
    background-color: ${THEME.COLORS.ALERT900};
    border-radius: 5px;
    margin: ${RFPercentage(1)}px ${RFPercentage(0.5)}px;
    border: solid 2.4px ${THEME.COLORS.ALERT800};
`

export const ButtonsView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFPercentage(1)}px 0;
`

export const Frame = styled.ScrollView`
    flex-direction: column;
    margin-top: ${RFPercentage(1)}px;
    border: solid 2px ${THEME.COLORS.BACKGROUND};
    border-radius: 2px;
`

export const Label = styled.Text`
    font-size: ${RFPercentage(2.4)}px;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.PRIMARY800};
    align-self: flex-start;

`
