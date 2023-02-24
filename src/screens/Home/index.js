import { MainContainer, Title, StatusBar, TitleContainer, MainImage, Text, AnimatedIcon, CenterView, CenterTitle, CenterGroup } from "./styles";
import { useEffect } from "react";
import THEME from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"
import bg from '../../assets/background.png';
import target from '../../assets/target.png';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function Home() {
    const [checksToday, setChecksToday] = useState();
    const [checksLate, setChecksLate] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        /**
         * Realiza os calculos de data dos checkBox's e faz os devidos ajustes nos cadastros
         */
        async function adjustChecks() {
            const response = await AsyncStorage.getItem('@goalsmanagement:habits');
            const data = response ? JSON.parse(response) : [];

            const calcDiferenca = (date1, date2) => {
                const day = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
                const diferenca = Math.abs(date1 - date2); // diferença em milissegundos

                return Math.round(diferenca / day);
            };

            // loop nos hábitos
            data.map((habito, index) => {
                console.log('Hábito n° ', index);
                // loop nos checkBox's
                habito.checklists.map((item, i) => {

                    let intervalo = 0;

                    // pega o intervalo de lembrete do item
                    switch (item.repeat) {
                        case 'Mensal':
                            intervalo = 30;
                            break;
                        case 'Semanal':
                            intervalo = 7;
                            break;
                        case 'Diário':
                            intervalo = 1;
                            break;
                        default:
                            intervalo = 0;
                    };

                    if (item.historic.length > 0) {
                        // formata a ultima data cadastrada para comparação
                        const checkData = item.historic[item.historic.length - 1].split("/");
                        const checkDataObj = new Date(checkData[2], checkData[1] - 1, checkData[0]);

                        // pega a data atual e formata para comparação
                        const now = new Date();
                        now.setHours(0, 0, 0, 0);

                        // diferença
                        const diferenca = calcDiferenca(checkDataObj, now);

                        console.log(`-----------Diferença------------\n${checkDataObj} - ${now}\nrepeat: ${item.repeat}\n${diferenca}\n`);

                        if (diferenca > intervalo) {
                            console.log("Pronto para resetar!");
                        }
                    };

                });
            });

        };

        adjustChecks();

    }, []);

    /** Realiza a navegação entre telas
     * 
     * @param {string} Screen - Tela destino.
     */
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
                    <MaterialIcons color={THEME.COLORS.TEXT} size={RFPercentage(3.4)} name="add-task" />
                </CenterView>
                <CenterView onTouchEnd={() => go('Habits')} animation={'fadeInDown'} delay={2300}>
                    <CenterTitle
                        animation={'fadeInDown'}
                        duration={1500}
                        delay={2600}>
                        HÁBITOS
                    </CenterTitle>
                    <MaterialIcons color={THEME.COLORS.TEXT} size={RFPercentage(3.4)} name="menu-book" />
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