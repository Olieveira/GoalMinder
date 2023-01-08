import styled from "styled-components/native";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

export const horizontalContainer = styled.View`
  flex-direction: row;
`

export const CenterAdvice = styled(Animatable.View)`
    position: absolute;
    flex-direction: column;
    background-color: ${THEME.COLORS.ALERT900};
    padding: ${RFPercentage(3.3)}px;
    border-radius: 10px;
`

export const TitleAdvice = styled(Animatable.Text)`
    font-size: ${RFPercentage(3.2)}px;
    color: ${THEME.COLORS.BACKGROUND};
    font-family: ${THEME.FONTS.BOLD};
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