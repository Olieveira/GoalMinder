import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons"
import THEME from "../../../theme";

export const AddButton = styled.TouchableOpacity`
    background-color: transparent !important;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    padding: ${RFPercentage(0.3)}px ${RFPercentage(2)}px;
    border-radius: 100px;
`;