import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme';
import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    background-color: ${THEME.COLORS.BACKGROUND};
    border-radius: 10px;
    padding: ${RFPercentage(0.15)}px ${RFPercentage(0.3)}px;
    top: -${RFPercentage(2)}px;
    justify-content: center;
    align-items: center;
`
export const OptionsSection = styled(Animatable.View)`
    border: 2px solid ${THEME.COLORS.ALERT800};
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    min-width: ${RFPercentage(18)}px;
    padding: 0 ${RFPercentage(0.5)}px;
    margin: ${RFPercentage(0.8)}px 0;
`

export const OptionText = styled.Text`
    font-family: ${THEME.FONTS.MEDIUM};
    font-size: ${RFPercentage(2)}px;
    padding: ${RFPercentage(0.3)}px 0;
    color: ${THEME.COLORS.PRIMARY900};
    text-align: left;
`

export const OptionSelectedText = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${THEME.FONTS.MEDIUM};
    font-size: ${RFPercentage(2.15)}px;
    color: ${THEME.COLORS.ALERT800};
`

export const OptionView = styled(Animatable.View)`
justify-content: center;
align-items: flex-start;
width: 100%;
`

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

export const MultiplyItensView = styled(Animatable.View)`
    flex-direction: row;
    flex: 1;
    width: 100%;
    flex-grow: 1;
    justify-content: space-around;
    align-items: flex-start;
    margin: ${RFPercentage(1)}px ${RFPercentage(0.5)}px;
    padding: ${RFPercentage(0.5)}px;
    border: 1px dashed ${THEME.COLORS.ALERT900};
    border-radius: 5px;
`

export const BgView = styled(Animatable.View)`
    justify-content: center;
    align-items: center;
    padding: ${RFPercentage(1)}px ${RFPercentage(0.3)}px ${RFPercentage(0.3)}px ${RFPercentage(0.3)}px;
    margin: ${RFPercentage(0.6)}px ${RFPercentage(0.3)}px;
    width: ${RFPercentage(43)}px;
    border-radius: 3px;
    background-color: ${THEME.COLORS.BACKGROUND};
    border: 2px solid ${THEME.COLORS.PRIMARY800};
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
    margin: ${RFPercentage(0.2)}px ${RFPercentage(0.5)}px;
    padding: ${RFPercentage(0.2)}px;
`
export const FrameLabel = styled.Text`
    text-align: center;
    flex-grow: 1;
    margin-left: ${RFPercentage(0.8)}px;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.ALERT900};
    font-size: ${RFPercentage(2.2)}px;
    `