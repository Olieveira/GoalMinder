import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme';
import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const ExpandedContent = styled(Animatable.View)`
`

export const HabitTitle = styled.Text`
    color: ${THEME.COLORS.ALERT900};
    font-family: ${THEME.FONTS.BOLD};
    font-size: ${RFPercentage(2.5)}px;
    text-align: center;
`
export const InformationsFrame = styled(Animatable.View)`
    flex-direction: column;
    width: ${RFPercentage(42)}px;
    margin: ${RFPercentage(1)}px;
    padding: ${RFPercentage(1)}px ${RFPercentage(1.5)}px;
    border-radius: 5px;
    background-color: ${THEME.COLORS.BACKGROUND};
`
export const HabitFrame = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`
