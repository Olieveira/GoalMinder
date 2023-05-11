import styled from "styled-components/native";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

export const RightHeaderIconAnimation = styled(Animatable.View)`
`
export const TextBody = styled.Text`
    flex: 1;
    font-size: ${RFPercentage(2.3)}px;
    text-align: center;
    color: ${THEME.COLORS.PRIMARY900};
    font-family: ${THEME.FONTS.MEDIUM};
    padding: ${RFPercentage(1)}px ${RFPercentage(1.7)}px;
    line-height: ${RFPercentage(4)}px;
`
export const CenterBody = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${THEME.COLORS.ALERT800};
`
export const CenterHeader = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const RightBodyIconView = styled.View`
    justify-content: center;
    background-color: ${THEME.COLORS.PRIMARY900};
    padding: ${RFPercentage(1)}px ${RFPercentage(5)}px;
    border-bottom-left-radius: 7px;
    height: 100%;
`
export const RightHeaderIconView = styled(Animatable.View)`
    justify-content: center;
    background-color: ${THEME.COLORS.ALERT800};
    padding: ${RFPercentage(1)}px ${RFPercentage(5)}px;
    border-top-left-radius: 7px;
`

export const NoneCheckIconView = styled(Animatable.View)`
    margin-right: ${RFPercentage(1)}px;
`
export const NoneCheckTitle = styled(Animatable.Text)`
    font-family: ${THEME.FONTS.BOLD};
    font-size: ${RFPercentage(3)}px;
    color: ${THEME.COLORS.TEXT};
    margin-bottom: ${RFPercentage(1)}px;
`
export const NoneCheckMessage = styled(Animatable.Text)`
    font-family: ${THEME.FONTS.MEDIUM};
    font-size: ${RFPercentage(2.4)}px;
    color: ${THEME.COLORS.ALERT800};
`
export const NoneCheckView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${RFPercentage(1)}px ${RFPercentage(2)}px;
    max-width: ${RFPercentage(40)}px;
`
export const TouchableDefault = styled.TouchableOpacity`
`
export const Line = styled.View`
    min-height: 3px;
    background-color: ${THEME.COLORS.PRIMARY900};
    width: ${RFPercentage(35)}px;
    margin: ${RFPercentage(1)}px 0;
    border-radius: 10px;
`
export const HeaderTable = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${RFPercentage(1)}px;
`
export const HeaderTableText = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${THEME.FONTS.BOLD};
`

export const GroupCheckDataInfo = styled.View`
    justify-content: center;
    align-items: center;
`
export const InfoCheckBody = styled.Text`
    text-align: center;
    flex: 1;
`
export const GroupCheckParentView = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: ${RFPercentage(1)}px ${RFPercentage(2)}px;
`
export const GroupCheckHorizontalView = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`
export const GroupCheckBody = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1.3px solid ${THEME.COLORS.PRIMARY900};
    border-radius: 5px;
`
export const GroupCheckTitle = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${THEME.FONTS.MEDIUM};
    font-size: ${RFPercentage(2.1)}px;
`
export const GroupCheckHeader = styled.TouchableOpacity`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${RFPercentage(1)}px;
`
export const GroupCheckView = styled.View`
    background-color: ${THEME.COLORS.PRIMARY600};
    flex: 1;
    width: 100%;
    padding: ${RFPercentage(1)}px ${RFPercentage(1.5)}px;
    justify-content: center;
    align-items: center;
`
export const GroupHabitsBody = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
export const GroupHabitsTitle = styled.Text`
    text-align: center;
    flex: 1;
    font-family: ${THEME.FONTS.BOLD};
    font-size: ${RFPercentage(2.4)}px;
    color: ${THEME.COLORS.TEXT};
`
export const GroupHabitsHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFPercentage(1)}px;
    `
export const GroupHabitsView = styled.View`
    flex: 1;
    background-color: ${THEME.COLORS.PRIMARY900};
    border: solid 2.5px ${THEME.COLORS.PRIMARY600};
    margin: ${RFPercentage(1)}px;
    border-radius: 6px;
`
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
    text-align: center;
`
export const IconAnimationLoop = styled(Animatable.View)`
`
export const CheckHeader = styled.TouchableOpacity`
    background-color: ${THEME.COLORS.PRIMARY600};
    flex-direction: row;
    width: 100%;
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
    flex: 1;
    margin-bottom: ${RFPercentage(2)}px;
    background-color: rgba(0,50,100,0.9);
    padding: ${RFPercentage(1)}px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
`
export const DatesTitle = styled.Text`
    font-size: ${RFPercentage(3)}px;
    font-family: ${THEME.FONTS.BOLD};
    color: ${THEME.COLORS.TEXT};
    text-align: center;
`

export const DatesFrame = styled.View`
    background-color: rgba(0,50,100,0.75);
    border: 3px solid ${THEME.COLORS.PRIMARY600};
    min-height: ${RFPercentage(13)}px;
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
    justify-content: center;
    align-items: center;
`

export const CenterTitle = styled(Animatable.Text)`
    flex: 1;
    text-align: center;
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.ALERT800};
    font-size: ${RFPercentage(2.8)}px;
`
export const CenterGroup = styled(Animatable.View)`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const CenterView = styled(Animatable.View)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: ${RFPercentage(2)}px 0;
  max-height: ${RFPercentage(25)}px;
  background-color: ${THEME.COLORS.PRIMARY900};
  border: 2px solid ${THEME.COLORS.ALERT800};
`
export const MainContainer = styled.View`
    min-height: 100%;
    min-width: 100%;
    background-color: ${THEME.COLORS.BACKGROUND};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MainImage = styled(Animatable.Image)`
    width: 100%;
    height: 100%;
    position: absolute;
`;
export const StartView = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
`;
export const TitleContainerHeader = styled(Animatable.View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${THEME.COLORS.PRIMARY900};
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    padding: ${RFPercentage(1)}px ${RFPercentage(0.8)}px;
`
export const TitleContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    background-color: rgba(68, 128, 220, 0.89);
    z-index: 1000;
`;
export const Title = styled.Text`
    flex: 1;
    font-size: ${RFPercentage(3.7)}px;
    color: ${THEME.COLORS.ALERT800};
    font-family: ${THEME.FONTS.BOLD};
    text-align: center;
`;

export const Text = styled(Animatable.Text)`
    font-size: ${RFPercentage(3)}px;
    text-align: center;
    color: ${THEME.COLORS.TEXT};
    padding: ${RFPercentage(1.5)}px;
    font-family: ${THEME.FONTS.MEDIUM};
`;

export const StatusBar = styled.StatusBar`
    `;