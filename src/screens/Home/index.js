import { MainContainer, Title, StatusBar, TitleContainer, MainImage, Text, AnimatedIcon, CenterView, CenterTitle, CenterGroup } from "./styles";
import THEME from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"

import bg from '../../assets/background.png';
import target from '../../assets/target.png';
import home from '../../assets/home.png';
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Home() {
    const navigation = useNavigation();
    function go(Screen) {
        navigation.navigate(Screen);
    }
    return (
        <MainContainer>
            <StatusBar animated backgroundColor={THEME.COLORS.BACKGROUND} barStyle={"dark-content"} />

            <TitleContainer>
                <AnimatedIcon
                    source={target}
                    resizeMode={"center"}
                    animation={'rotate'}
                    direction='normal'
                    iterationCount={'infinite'}
                    duration={3500}
                    delay={1000}
                />
                <Title>
                    GERENCIADOR DE METAS
                </Title>
                <Text
                    delay={1500}
                    animation={'fadeInDown'}>
                    Crie metas e indicadores para acompanhar seu progresso!
                </Text>
            </TitleContainer>

            <CenterGroup>
                <CenterView onTouchEnd={() => go('Goals')} animation={'fadeInDown'} delay={2300}>
                    <CenterTitle
                        animation={'fadeInDown'}
                        duration={1500}
                        delay={2600}>
                        METAS
                    </CenterTitle>
                    <MaterialIcons color={THEME.COLORS.TEXT} size={RFPercentage(3.4)} name="add-task"/>
                </CenterView>
                <CenterView onTouchEnd={() => go('Habits')} animation={'fadeInDown'} delay={2300}>
                    <CenterTitle
                        animation={'fadeInDown'}
                        duration={1500}
                        delay={2600}>
                        HÁBITOS
                    </CenterTitle>
                    <MaterialIcons color={THEME.COLORS.TEXT} size={RFPercentage(3.4)} name="menu-book"/>
                </CenterView>
            </CenterGroup>

            <MainImage
                animation={'fadeInUpBig'}
                direction={'normal'}
                duration={1850}
                delay={500}
                source={bg}
                resizeMode='center'
            />

        </MainContainer>
    );
}