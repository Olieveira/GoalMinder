import styled from "styled-components/native";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

export const TitleHeaderCheck = styled.Text`
`

export const CheckHeader = styled.View`
`

export const CheckFrame = styled.View`
`

export const ChecksBg = styled(Animatable.View)`
    flex: 1;
    flex-direction: column;
    background-color: #fff;
    height: ${RFPercentage(10)}px;
    width: 100%;

`

export const DefaultView = styled.View`
`

export const CenterTitle = styled(Animatable.Text)`
  font-family: ${THEME.FONTS.MEDIUM};
  color: ${THEME.COLORS.TEXT};
  font-size: ${RFPercentage(2.8)}px;  
  `
export const CenterGroup = styled(Animatable.View)`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    position: absolute;
`
export const CenterView = styled(Animatable.View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 0 ${RFPercentage(3)}px;
  margin: ${RFPercentage(2)}px 0;
  width: ${RFPercentage(25)}px;
  height: ${RFPercentage(7)}px;
  background-color: ${THEME.COLORS.PRIMARY900};
  border-radius: 8px;
  border: 1px solid ${THEME.COLORS.TEXT};
`

export const SmallIcon = styled(Animatable.Image)`
  width: ${RFPercentage(4)}px;
  height: ${RFPercentage(4)}px;
`

export const AnimatedIcon = styled(Animatable.Image)`
    width: ${RFPercentage(6)}px;    
    height: ${RFPercentage(6)}px;
`
export const MainContainer = styled.View`
    flex: 1;
    padding-top: ${RFPercentage(14)}px;
    background-color: ${THEME.COLORS.BACKGROUND};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
    width: 100%;
`;

export const MainImage = styled(Animatable.Image)`
    width: 100%;
    height: 100%;
`;

export const TitleContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    align-content: center;
    background-color: ${THEME.COLORS.PRIMARY600};
    padding: ${RFPercentage(2.5)}px ${RFPercentage(3)}px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;
export const Title = styled.Text`
    font-size: ${RFPercentage(3.7)}px;
    color: ${THEME.COLORS.TEXT};
    font-family: ${THEME.FONTS.BOLD};
`;

export const Text = styled(Animatable.Text)`
    font-size: ${RFPercentage(3)}px;
    margin-top: ${RFPercentage(3.2)}px;
    color: ${THEME.COLORS.TEXT};
    font-family: ${THEME.FONTS.MEDIUM};
`;

export const StatusBar = styled.StatusBar`
    `;