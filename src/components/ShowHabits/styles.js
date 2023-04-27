import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../theme';
import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const MarkCheckView = styled.TouchableOpacity`
   justify-content: center;
    align-items: center;
`

export const EditButton = styled.TouchableOpacity`
    position: absolute;
    top: -${RFPercentage(2)}px;
    right: -${RFPercentage(2)}px;
    background-color: ${THEME.COLORS.BACKGROUND};
    border-radius: 50px;
    padding: ${RFPercentage(0.7)}px;
    border: solid 3px ${THEME.COLORS.PRIMARY800};
    z-index: 1000;
`

export const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: -${RFPercentage(2)}px;
    left: -${RFPercentage(2)}px;
    background-color: ${THEME.COLORS.BACKGROUND};
    border-radius: 50px;
    padding: ${RFPercentage(0.6)}px;
    border: solid 3px ${THEME.COLORS.PRIMARY800};
    z-index: 1000;
`

export const CheckVerticalView = styled.View`
    justify-content: center;
    align-items: center;
`

export const CheckHorizontalView = styled.View`
    margin-top: ${RFPercentage(1)}px;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const CheckHeaders = styled.View`
    width: 100%;
    background-color: ${THEME.COLORS.PRIMARY900};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFPercentage(0.3)}px ${RFPercentage(0.8)}px;
`

export const CheckValues = styled(Animatable.View)`
    margin: ${RFPercentage(0.6)}px;
    padding: 0 0 ${RFPercentage(1)}px 0;
    justify-content: center;
    align-items: center;
    width: ${RFPercentage(30)}px;
    background-color: ${THEME.COLORS.PRIMARY800};
    border: 1.2px solid ${THEME.COLORS.PRIMARY900};
    border-radius: 4px;
`

export const SimpleView = styled(Animatable.View)`
    justify-content: center;
    align-items: center;
`

export const SimpleHorizontalView = styled.View`
    width: ${RFPercentage(31)}px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const MultiplyItensView = styled(Animatable.View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: ${RFPercentage(1)}px ${RFPercentage(0.5)}px;
    padding: ${RFPercentage(1)}px ${RFPercentage(0.5)}px ${RFPercentage(0.5)}px ${RFPercentage(0.5)}px;
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
    width: 100%;
    padding: ${RFPercentage(0.5)}px;
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
    padding: ${RFPercentage(0.7)}px 0;
`

export const HeaderLabel = styled.Text`
    text-align: center;
    flex: 1;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.ALERT900};
    font-size: ${RFPercentage(2.2)}px;
    margin: ${RFPercentage(0.3)}px 0;
`

export const FrameLabel = styled.Text`
    text-align: center;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.ALERT900};
    font-size: ${RFPercentage(2.2)}px;
`