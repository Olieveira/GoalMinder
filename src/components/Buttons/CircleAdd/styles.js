import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from "../../../theme";

export const AddButton = styled(Animatable.Text)`
    background-color: transparent !important;
    text-align: center;
    padding: ${RFPercentage(0.8)}px ${RFPercentage(2)}px;
    border: solid ${RFPercentage(0.5)}px ${THEME.COLORS.BACKGROUND};
    border-radius: 7px;
    font-size: ${RFPercentage(2.5)}px;
    font-family: ${THEME.FONTS.BOLD};
`;