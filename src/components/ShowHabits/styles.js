import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme';
import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const SimpleView = styled.View`
    justify-content: center;
    align-items: center;
`

export const SimpleHorizontalView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    width: ${RFPercentage(15)}px;
    height: ${RFPercentage(5)}px;
`

export const MultiplyItensView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: ${RFPercentage(0.5)}px;
    padding: ${RFPercentage(0.5)}px;
    border: 1px dashed ${THEME.COLORS.ALERT900};
    border-radius: 10px;
`

export const BgView = styled(Animatable.View)`
    justify-content: center;
    align-items: center;
    padding: ${RFPercentage(1)}px;
    width: ${RFPercentage(40)}px;
    border-radius: 9px;
    background-color: ${THEME.COLORS.BACKGROUND};
    border: 4px solid ${THEME.COLORS.PRIMARY800};
`
export const HorizontalView = styled(Animatable.View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const FrameDataView = styled(Animatable.View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 2px solid ${THEME.COLORS.PRIMARY900};
    margin: ${RFPercentage(0.5)}px;
    padding: ${RFPercentage(0.5)}px;
`
export const FrameLabel = styled.Text`
    text-align: center;
    flex-grow: 1;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.ALERT900};
    font-size: ${RFPercentage(2.2)}px;
    `