import styled from "styled-components/native";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

export const ViewAnimated = styled(Animatable.View)`
`

export const GoalsText = styled.Text`
`

export const GoalsScrollView = styled.ScrollView`
    flex: 1;
    min-height: ${RFPercentage(20)}px;
    max-height: ${RFPercentage(80)}px;
`
export const GoalHorizontalView = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
    justify-items: flex-start;
`
export const GoalView = styled(Animatable.View)`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${RFPercentage(1)}px;
    border-radius: 4px;
    margin: ${RFPercentage(0.8)}px 0; 
    `

export const horizontalContainer = styled.View`
  flex-direction: row;
`

export const CenterAdvice = styled(Animatable.View)`
    position: absolute;
    flex-direction: column;
    background-color: ${THEME.COLORS.ALERT900};
    padding: ${RFPercentage(1.3)}px ${RFPercentage(3.3)}px;
    width: ${RFPercentage(47)}px;
    border-radius: 10px;
`

export const TitleAdvice = styled(Animatable.Text)`
    font-size: ${RFPercentage(3.2)}px;
    color: ${THEME.COLORS.BACKGROUND};
    font-family: ${THEME.FONTS.BOLD};
    margin-bottom: ${RFPercentage(2)}px;
    text-align: center;
`

export const Bg = styled.View`
    flex: 1;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${THEME.COLORS.BACKGROUND};
`

export const Clouds = styled(Animatable.Image)`

`
export const Title = styled(Animatable.View)`
    `