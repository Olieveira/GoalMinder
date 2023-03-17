import styled from "styled-components/native";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

export const IconShakeLoop = styled(Animatable.View)`
`
export const ParentChecksView = styled(Animatable.View)`
`
export const ChecksScroll = styled.ScrollView`
    max-height: ${RFPercentage(60)}px;
`
export const TitleHeaderCheck = styled.Text`
    font-size: ${RFPercentage(2.3)}px;
    font-family: ${THEME.FONTS.BOLD};
`
export const IconAnimationLoop = styled(Animatable.View)`
`
export const CheckHeader = styled.TouchableOpacity`
    background-color: ${THEME.COLORS.PRIMARY600};
    flex-direction: row;
    width: ${RFPercentage(33)}px;
    justify-content: space-evenly;
    align-items: center;
    padding: ${RFPercentage(1)}px 0;
`
export const CheckFrame = styled.View`
    border: 2px solid ${THEME.COLORS.PRIMARY600};
    border-radius: 5px;
    flex: 1;
    margin: ${RFPercentage(1)}px;
`
export const DatesHeader = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: ${RFPercentage(2)}px;
    background-color: rgba(0,50,100,0.8);
    padding: ${RFPercentage(1)}px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
`
export const DatesTitle = styled.Text`
    font-size: ${RFPercentage(3)}px;
    font-family: ${THEME.FONTS.BOLD};
    color: ${THEME.COLORS.TEXT};
`

export const DatesFrame = styled.View`
    background-color: rgba(0,50,100,0.5);
    border: 3px solid ${THEME.COLORS.PRIMARY600};
    min-height: ${RFPercentage(13)}px;
    min-width: ${RFPercentage(40)}px;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: ${RFPercentage(1)}px ${RFPercentage(0.2)}px;
`

export const ChecksBg = styled(Animatable.View)`
    position: absolute;
    flex: 1;
    flex-direction: column;    
    z-index: 1000;
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
    min-height: 100%;
    min-width: 100%;
    padding-top: ${RFPercentage(14)}px;
    background-color: ${THEME.COLORS.BACKGROUND};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
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