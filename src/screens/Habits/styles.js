import styled from "styled-components/native";
import THEME from '../../theme';
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';

export const HabitTitle = styled.Text`
`

export const SuggestionTextView = styled.View`
    justify-content: center;
    align-items: center;
    padding-right: ${RFPercentage(1)}px;
    max-width: ${RFPercentage(29)}px;
`

export const HabitsScrollView = styled.ScrollView`
max-height: ${RFPercentage(53)}px;
`

export const HabitsView = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: ${RFPercentage(0)}px ${RFPercentage(1)}px ${RFPercentage(1)}px ${RFPercentage(1)}px;
    padding: ${RFPercentage(0.5)}px ${RFPercentage(1)}px;
`

export const BodyText = styled.Text`
    font-family: ${THEME.FONTS.MEDIUM};
    color: ${THEME.COLORS.BACKGROUND};
    font-size: ${RFPercentage(2.4)}px;
    margin-top: ${RFPercentage(1.5)}px;
`
export const DefaultView = styled.View`
    justify-content: center;
    align-items: center;
    margin: ${RFPercentage(1)}px;
    padding: ${RFPercentage(1)}px ${RFPercentage(1.5)}px;
    border-radius: 5px;
`
export const DefaultHorizontalView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: ${RFPercentage(33)}px;
    min-height: ${RFPercentage(5)}px;
    margin: ${RFPercentage(1)}px ${RFPercentage(0.4)}px;
    padding: ${RFPercentage(0.7)}px ${RFPercentage(0.7)}px;
    border-radius: 5px;
`
export const HeaderTitle = styled.Text`
    font-family: ${THEME.FONTS.BOLD};
    font-size: ${RFPercentage(3)}px;
    color: ${THEME.COLORS.PRIMARY900};
    text-align: center;
    align-self: center;
`
export const HeaderView = styled.View`
    flex-direction: row;
    width: 100%;
    padding: ${RFPercentage(0)}px ${RFPercentage(2)}px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 2px;
    border-bottom-color: ${THEME.COLORS.PRIMARY900};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`
export const CenterView = styled(Animatable.View)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${THEME.COLORS.ALERT900};
    width: ${RFPercentage(48)}px;
    max-height: ${RFPercentage(90)}px;
    border-radius: 5px;
`

export const RootView = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${THEME.COLORS.BACKGROUND};
`

export const HabitsImage = styled(Animatable.Image)`
    width: ${RFPercentage(60)}px;
`
export const FooterLicenseView = styled.View`
    position: absolute;
    bottom: 5px;
    width: ${RFPercentage(50)}px;
`
export const LicenseText = styled.Text`
    color: ${THEME.COLORS.PRIMARY800};
    font-size: 10px;
    text-align: left;
`

export const ImageView = styled(Animatable.View)`
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: ${RFPercentage(10)}px!important;
`