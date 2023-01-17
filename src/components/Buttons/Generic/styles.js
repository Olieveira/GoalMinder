import styled from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const BtnText = styled.Text`
`
export const Button = styled.TouchableOpacity`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:  center;
    align-items: center;
    align-content: center;
    padding: ${RFPercentage(0.8)}px ${RFPercentage(1.3)}px;
    margin: 0 ${RFPercentage(1)}px;
    border: 1px solid black;
`