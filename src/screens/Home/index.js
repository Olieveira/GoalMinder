import { MainContainer, Title, StatusBar, TitleContainer, MainImage, Text, AnimatedIcon, CenterView, CenterTitle, CenterGroup, DefaultView, ChecksBg, CheckFrame, DatesFrame, DatesHeader, DatesTitle, IconAnimationLoop, CheckHeader, TitleHeaderCheck, ChecksScroll, ParentChecksView, IconShakeLoop } from "./styles";
import { useEffect } from "react";
import THEME from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"
import bg from '../../assets/background.png';
import target from '../../assets/target.png';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { LayoutAnimation } from "react-native";

export default function Home() {
    const [checksToday, setChecksToday] = useState([]);
    const [checksLate, setChecksLate] = useState([]);
    const [showing, setShowing] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        console.log("\nLATES: ", checksLate);
    }, [checksLate]);

    useEffect(() => {
        /**
         * Realiza os calculos de data dos checkBox's e faz os devidos ajustes nos cadastros
         */
        async function adjustChecks() {
            const response = await AsyncStorage.getItem('@goalsmanagement:habits');
            const data = response ? JSON.parse(response) : [];

            /**
             * Calcula diferença entre duas datas
             * 
             * @param {object} date1 Objeto de data  
             * @param {object} date2 Objeto de data
             * @returns 
             */
            const calcDiferenca = (date1, date2) => {
                const day = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
                const diferenca = Math.abs(date1 - date2); // diferença em milissegundos

                return Math.round(diferenca / day);
            };

            // pega e formata data atual para comparação
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const nowFormatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear().toString().padStart(2, '0')}`;

            let toSubmit = []; // Array que armazenará objetos dos checks atrasados

            // loop nos hábitos
            data.map((habito, index) => {

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

                    // pega e formata a data de criação do check.
                    const created = item.created.split('/');
                    const createdObj = new Date(created[2], created[1] - 1, created[0]);

                    // quantidade de vezes que o check deve ter sido feito até o momento atual
                    const hadDone = Math.floor(calcDiferenca(createdObj, now) / intervalo) + 1;

                    for (let j = 0; j < hadDone; j++) {

                        const converted = new Date(createdObj.getTime() + (intervalo * (j)) * (24 * 60 * 60 * 1000)); // data que o item deveria ter sido marcado
                        const toCompare = `${converted.getDate().toString().padStart(2, '0')}/${(converted.getMonth() + 1).toString().padStart(2, '0')}/${converted.getFullYear().toString().padStart(2, '0')}`; // formatado para comparação

                        // Se essa repetição do item não foi marcado
                        if (!item.historic.includes(toCompare)) {
                            toSubmit.push({
                                habito: index,
                                check: i,
                                checkTitle: item.title,
                                repeticao: item.repeat,
                                data: toCompare
                            });
                        };
                    };
                });
            });

            setChecksLate(toSubmit.filter(item => item.data != nowFormatted)); // define os itens atrasados
            setChecksToday(toSubmit.filter(item => item.data == nowFormatted)) // define os itens do dia atual
        };

        adjustChecks();

    }, []);

    function setShowingFrame(frame) {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: "linear"
            }
        });

        if (frame == "lates") {
            showing == "lates" ? setShowing(undefined) : setShowing("lates")
        };
        if (frame == "today") {
            showing == "today" ? setShowing(undefined) : setShowing("today")
        };
    };

    /** Realiza a navegação entre telas
     * 
     * @param {string} Screen - Tela destino.
     */
    function go(Screen) {
        navigation.navigate(Screen);
    }
    return (
        <MainContainer>

            {checksToday.length < 1 && checksLate.length < 1 ? (
                <DefaultView>
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
                </DefaultView>
            ) : null}

            {checksToday.length > 0 || checksLate.length > 0 ? (
                <ChecksBg>
                    <DatesHeader>
                        <IconAnimationLoop
                            animation={'rotate'}
                            iterationCount="infinite"
                            duration={2500}
                            iterationDelay={500}
                        >
                            <MaterialIcons
                                name="star"
                                size={RFPercentage(6)}
                                color={THEME.COLORS.ALERT900}
                            />
                        </IconAnimationLoop>
                        <DatesTitle>SUAS ATIVIDADES</DatesTitle>
                    </DatesHeader>
                    <DatesFrame>
                        <CheckFrame>
                            <CheckHeader
                                onPress={() => setShowingFrame("lates")}
                            >
                                <IconShakeLoop
                                    animation={'rubberBand'}
                                    iterationCount="infinite"
                                    duration={2000}
                                    iterationDelay={3500}
                                >
                                    <MaterialIcons
                                        name='assignment-late'
                                        color={THEME.COLORS.TEXT}
                                        size={RFPercentage(4)}
                                    />
                                </IconShakeLoop>
                                <TitleHeaderCheck>ATRASADOS</TitleHeaderCheck>
                            </CheckHeader>
                            <ParentChecksView
                                animation={showing == "lates" ? 'fadeIn' : null}
                                duration={500}
                                delay={300}
                            >
                                <ChecksScroll>
                                    {showing == "lates" && checksLate.map((item, i) => (
                                        <Text key={i}>
                                            {item.checkTitle}
                                        </Text>
                                    ))}
                                </ChecksScroll>
                            </ParentChecksView>
                        </CheckFrame>

                        <CheckFrame>
                            <CheckHeader
                                onPress={() => setShowingFrame("today")}
                            >
                                <IconShakeLoop
                                    animation={'rubberBand'}
                                    iterationCount="infinite"
                                    duration={2000}
                                    iterationDelay={3500}
                                >
                                    <MaterialIcons
                                        name='circle-notifications'
                                        color={THEME.COLORS.TEXT}
                                        size={RFPercentage(4)}
                                    />
                                </IconShakeLoop>
                                <TitleHeaderCheck>PENDENTES</TitleHeaderCheck>
                            </CheckHeader>
                            <ParentChecksView
                                animation={showing == "today" ? 'fadeIn' : null}
                                duration={500}
                                delay={2000}
                            >
                                <ChecksScroll>
                                    {showing == "today" && checksToday.map((item, i) => (
                                        <Text key={i}>
                                            {item.checkTitle}
                                        </Text>
                                    ))}

                                </ChecksScroll>
                            </ParentChecksView>
                        </CheckFrame>
                    </DatesFrame>
                </ChecksBg>
            ) : null}

            <MainImage
                animation={'fadeInUpBig'}
                direction={'normal'}
                duration={1850}
                delay={500}
                source={bg}
                resizeMode='center'
            />

        </MainContainer>
    )
};