import styled from "styled-components/native";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

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