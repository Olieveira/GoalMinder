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

export const Frame = styled.ScrollView`
    border: 1.5px solid ${THEME.COLORS.BACKGROUND};
    border-radius: 10px;
    margin-top: ${RFPercentage(1)}px;
    height: ${RFPercentage(45)}px;
    width: ${RFPercentage(40)}px;
`