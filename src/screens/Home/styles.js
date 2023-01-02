import { startTransition } from "react";
import styled from "styled-components/native";

export const MainContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
`;

export const VerticalContainer = styled.View`
    flex-direction: column;
`;
export const HorizontalContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
`;


export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background-color: #2596be;
    padding: 13px;
    border-radius: 7px;
    text-shadow: 0px 5px 8px black;
    `;

export const StatusBar = styled.StatusBar`
`