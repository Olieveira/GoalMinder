import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme';
import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const InputTitle = styled.TextInput`
flex: 1;
text-align: center;
border: 2px solid ${THEME.COLORS.PRIMARY800};
border-radius: 3px;
margin: ${RFPercentage(1)}px;
`

export const SimpleView = styled.View`
    justify-content: center;
    align-items: center;
`

export const SimpleHorizontalView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    height: ${RFPercentage(5)}px;
`

export const MultiplyItensView = styled.View`
    flex-direction: row;
    flex: 1;
    width: 100%;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;
    margin: ${RFPercentage(1)}px ${RFPercentage(0.5)}px;
    padding: ${RFPercentage(0.5)}px;
    border: 1px dashed ${THEME.COLORS.ALERT900};
    border-radius: 5px;
`

export const BgView = styled(Animatable.View)`
    justify-content: center;
    align-items: center;
    padding: ${RFPercentage(1)}px;
    margin: ${RFPercentage(0.3)}px 0;
    width: ${RFPercentage(46)}px;
    border-radius: 3px;
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
    margin: ${RFPercentage(0.5)}px;
    padding: ${RFPercentage(0.5)}px;
`
export const FrameLabel = styled.Text`
    text-align: center;
    flex-grow: 1;
    margin-left: ${RFPercentage(0.8)}px;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.ALERT900};
    font-size: ${RFPercentage(2.2)}px;
    `