import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from "../../theme";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    justify-items: center;
    width: ${RFPercentage(38)}px;
`

export const Frame = styled.View`
    border: 1.5px solid ${THEME.COLORS.BACKGROUND};
    padding: ${RFPercentage(2.3)}px;
    border-radius: 10px;
    margin-top: ${RFPercentage(1)}px
`