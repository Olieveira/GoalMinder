import { MainContainer, Title, StatusBar, TitleContainer, MainImage, Text, AnimatedIcon, CenterView, CenterTitle, SmallIcon } from "./styles";
import THEME from "../../theme";

import bg from '../../assets/background.png';
import target from '../../assets/target.png';
import home from '../../assets/home.png';

export default function Home() {
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

            <CenterView animation={'fadeInDown'} delay={2300}>
                <CenterTitle
                    animation={'fadeInDown'}
                    duration={1500}
                    delay={2600}>
                    METAS
                </CenterTitle>
                <SmallIcon
                    source={home}
                    resizeMode={"center"}
                    animation={"fadeInUp"}
                    duration={1500}
                    delay={2600}
                />
            </CenterView>

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