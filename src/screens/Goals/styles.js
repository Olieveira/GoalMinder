import styled from "styled-components/native";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

export const EditButton = styled.TouchableOpacity`

`

export const IndicatorFrame = styled.View`
    border: 1.5px dotted ${THEME.COLORS.PRIMARY900};
    border-radius: 7px;
    margin: ${RFPercentage(1)}px ${RFPercentage(0.4)}px;

`

export const HeaderIndicatorTitle = styled.Text`
    margin: 0 ${RFPercentage(0.7)}px;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.PRIMARY900};
    font-size: ${RFPercentage(2)}px;
`

export const IndicatorHeader = styled.View`
    flex: 1;
    flex-direction: row;
    z-index: 1000;
    justify-content: space-between;
    align-items: center;
    background-color: ${THEME.COLORS.ALERT900};
    padding: ${RFPercentage(1)}px 0px;
    border-bottom-color: rgba(0,0,0,0.5);
    border-bottom-width: 2px;
    margin: 0 ${RFPercentage(2)}px;
`

export const Frame = styled.View`
    border: solid 2.5px ${THEME.COLORS.BACKGROUND};
    border-radius: 5px;
    margin: ${RFPercentage(0.8)}px 0;
    width: ${RFPercentage(40)}px;
`

export const DataText = styled.Text`
    margin: ${RFPercentage(0.4)}px ${RFPercentage(2)}px;
    font-size: ${RFPercentage(2.2)}px;
    color: ${THEME.COLORS.PRIMARY900};
    font-family: ${THEME.FONTS.MEDIUM};
`

export const IndicatorsView = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`

export const ViewAnimated = styled(Animatable.View)`
`
export const GoalsScrollView = styled.ScrollView`
    flex: 1;
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
    `

export const horizontalContainer = styled.View`
  flex-direction: row;
`

export const CenterAdvice = styled(Animatable.View)`
    position: absolute;
    flex: 1;
    max-height: ${RFPercentage(90)}px;
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