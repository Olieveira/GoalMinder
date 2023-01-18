import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const AddButton = styled.TouchableOpacity`
    background-color: transparent !important;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    padding: ${RFPercentage(0.3)}px ${RFPercentage(2)}px;
    border-radius: 100px;
`;