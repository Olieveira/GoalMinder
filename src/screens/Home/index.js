import {
    MainContainer, Title, StatusBar, StartView, TitleContainer, MainImage, Text, CenterView, CenterTitle, CenterGroup, DefaultView, ChecksBg, CheckFrame, DatesFrame, DatesHeader,
    DatesTitle, IconAnimationLoop, CheckHeader, TitleHeaderCheck, ChecksScroll, ParentChecksView, IconShakeLoop, GroupHabitsView, GroupHabitsHeader, GroupCheckTitle, GroupCheckHeader, GroupHabitsBody,
    GroupCheckView, GroupHabitsTitle, GroupCheckBody, GroupCheckHorizontalView, InfoCheckBody, GroupCheckParentView, GroupCheckDataInfo, Line, HeaderTable, HeaderTableText, TouchableDefault, NoneCheckView,
    NoneCheckMessage, NoneCheckTitle, NoneCheckIconView, TitleContainerHeader
} from "./styles";
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
    const [latesShowing, setLatesShowing] = useState([-1, -1]);
    const [pendingShowing, setPendingShowing] = useState([-1, -1]);
    const navigation = useNavigation();

    // restaura os states quando é desfocada
    useEffect(() => {
        const reset = navigation.addListener('blur', () => {
            setShowing(undefined);
            setLatesShowing([-1, -1]);
            setPendingShowing([-1, -1]);
        });

        return reset;
    }, [navigation]);

    // atualiza a tela quando é focada
    useEffect(() => {
        const reset = navigation.addListener('focus', () => {
            adjustChecks();
        });

        return reset;
    }, [navigation]);

    // busca informações quando a tela é aberta pela primeira vez
    useEffect(() => {
        adjustChecks();
    }, []);

    /**
    * Realiza os cálculos de data dos checkBox's e atribui para os respectivos states
    * 
    * @returns {void}
    */
    async function adjustChecks() {
        const response = await AsyncStorage.getItem('@goalsmanagement:habits');
        const data = response ? JSON.parse(response) : [];

        /**
         * Calcula diferença entre duas datas
         * 
         * @param {object} date1 Objeto de data  
         * @param {object} date2 Objeto de data
         * 
         * @returns {number} Diferença entre as duas datas
         */
        const calcDiferenca = (date1, date2) => {
            const day = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
            const diferenca = Math.abs(date1 - date2); // diferença em milissegundos

            return Math.round(diferenca / day);
        };

        /**
         * Agrupa os itens do array por hábitos e checkLists
         * 
         * @param {Array} array Array que será agrupados
         * 
         * @returns {Array[Array[object]]} Array composto agrupado.
         */
        const agruparArray = (array) => {

            let byGroup = []; // array temporario para armazenar o agrupamento
            let lastHabit = -1; // armazena o ultimo hábito agrupado
            let lastCheck = -1; // armazena o ultimo checkBox agrupado

            array.map((item) => {

                if (item.habito == lastHabit) {
                    if (item.check == lastCheck) {
                        byGroup[byGroup.length - 1][byGroup[byGroup.length - 1].length - 1].push(item);
                    } else {
                        lastCheck = item.check;
                        byGroup[byGroup.length - 1].push([item]);
                    }
                } else {
                    lastHabit = item.habito;
                    lastCheck = item.check;
                    byGroup.push([[item]]);
                }
            })

            return byGroup;
        };

        // pega e formata data atual para comparação
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const nowFormatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear().toString().padStart(2, '0')}`;

        let toSubmit = []; // Array que armazenará objetos dos checks atrasados
        let toHabitsGroup = []; // Array para armazenar temporariamente o titulo dos habitos

        // loop nos hábitos
        data.map((habit, index) => {

            toHabitsGroup.push(habit.habit);

            // loop nos checkBox's do hábito
            habit.checklists.map((item, i) => {

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
                const hadDone = intervalo !== 0 ? Math.floor(calcDiferenca(createdObj, now) / intervalo) + 1 : 1;

                for (let j = 0; j < hadDone; j++) {

                    const converted = new Date(createdObj.getTime() + (intervalo * (j)) * (24 * 60 * 60 * 1000)); // data que o item deveria ter sido marcado
                    const toCompare = `${converted.getDate().toString().padStart(2, '0')}/${(converted.getMonth() + 1).toString().padStart(2, '0')}/${converted.getFullYear().toString().padStart(2, '0')}`; // formatado para comparação

                    // Se essa repetição do item não foi marcado
                    if (!item.historic.includes(toCompare)) {
                        toSubmit.push({
                            habito: index,
                            habitoTitle: toHabitsGroup[index],
                            habitoID: habit.id,
                            check: i,
                            checkTitle: item.title,
                            repeticao: item.repeat,
                            data: toCompare
                        });
                    };
                };
            });
        });

        setChecksLate(agruparArray(toSubmit.filter(item => item.data != nowFormatted))); // define os itens atrasados
        setChecksToday(agruparArray(toSubmit.filter(item => item.data == nowFormatted))); // define os itens do dia atual
    };

    /**
      * Marca/Desmarca o checkBox do respectivo hábito e insere no histórico de alterações.
      * 
      * @param {string} id ID do hábito que contém o checkBox a ser marcado/desmarcado.
      * 
      * @param {number} i Index do check a ser alterado.
      * 
      * @param {string} date Data que o check deveria ter sido feito.
      */
    async function changeChecks(id, i, date) {
        const response = await AsyncStorage.getItem('@goalsmanagement:habits');
        const data = response ? JSON.parse(response) : [];

        // pega e formata a data de criação do check.
        const created = date.split('/');
        const converted = new Date(created[2], created[1] - 1, created[0]);
        const toDoAt = `${converted.getDate().toString().padStart(2, '0')}/${(converted.getMonth() + 1).toString().padStart(2, '0')}/${converted.getFullYear().toString().padStart(2, '0')}`; // formatado para comparação

        const changed = data.map((habit) => {
            if (habit.id === id) {
                return {
                    createdAt: habit.createdAt,
                    habit: habit.habit,
                    id: habit.id,
                    linked: habit.linked,
                    checklists: habit.checklists.map((check, index) => {
                        if (index === i) {
                            return {
                                done: !check.done,
                                historic: [...check.historic, toDoAt],
                                repeat: check.repeat,
                                title: check.title,
                                created: check.created
                            };
                        } else {
                            return check;
                        };
                    })
                };
            } else {
                return habit;
            };
        });

        await AsyncStorage.setItem('@goalsmanagement:habits', JSON.stringify(changed));
        adjustChecks();
    };

    /**
     * Define a visibilidade do hábito || check específico.
     * 
     * @param {Array} index Array contendo os index's do hábito e/ou check clicado.
     * 
     * @returns {void}
     */
    function setShowingPendingChecks(index) {
        // animação
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: "easeIn",
            }
        });

        if (showing == "lates") {
            setLatesShowing(index);
        } else if (showing == "today") {
            setPendingShowing(index);
        };
    };

    /**
     * Altera a visibilidade das views dos checks atrasados e pendentes
     * 
     * @param {string} frame 'lates' || 'today' Frame que chamou a função
     * 
     */
    function setShowingFrame(frame) {
        // animação
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: "linear"
            }
        });

        setLatesShowing(-1, -1); // zera a visibilidade dos checks atrasados
        setPendingShowing(-1, -1); // zera a visibilidade dos checks pendentes

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
     * 
     */
    function go(Screen) {
        navigation.navigate(Screen);
    };

    return (
        <MainContainer>
            {checksToday.length < 1 && checksLate.length < 1 ? (
                <StartView>
                    <StatusBar animated backgroundColor={THEME.COLORS.BACKGROUND} barStyle={"dark-content"} />

                    <TitleContainer>
                        <TitleContainerHeader>
                            <MaterialIcons
                                name="star-border"
                                size={RFPercentage(3.8)}
                                color={THEME.COLORS.ALERT800}
                            />
                            <Title>
                                GERENCIADOR DE METAS
                            </Title>
                        </TitleContainerHeader>
                        <Text
                            delay={1500}
                            animation={'fadeInDown'}>
                            Estabeleça metas, acompanhe seu progresso e conquiste seus objetivos com facilidade!
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

                    <DefaultView />
                </StartView>
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
                                        <GroupHabitsView key={i}>
                                            <GroupHabitsHeader>
                                                <GroupHabitsTitle>
                                                    {item[0][0].habitoTitle}
                                                </GroupHabitsTitle>
                                                <MaterialIcons
                                                    onPress={() => {
                                                        latesShowing[0] == i ?
                                                            setShowingPendingChecks([-1, -1]) :
                                                            setShowingPendingChecks([i, -1])
                                                    }
                                                    }
                                                    name={latesShowing[0] == i ? 'visibility' : 'visibility-off'}
                                                    size={RFPercentage(3)}
                                                    color={THEME.COLORS.TEXT}
                                                />
                                            </GroupHabitsHeader>
                                            {latesShowing[0] == i && (
                                                <GroupHabitsBody>

                                                    {item.map((checks, index) => (
                                                        <GroupCheckView key={index}>
                                                            <GroupCheckHeader onPress={() => latesShowing[1] == index ? setShowingPendingChecks([i, -1]) : setShowingPendingChecks([i, index])}>
                                                                <MaterialIcons
                                                                    style={{
                                                                        zIndex: 1000,
                                                                        borderRadius: 5,
                                                                    }}
                                                                    name="crop-square"
                                                                    size={RFPercentage(3.5)}
                                                                />
                                                                <GroupCheckTitle>
                                                                    {checks[0].checkTitle}
                                                                </GroupCheckTitle>
                                                                <GroupCheckTitle>
                                                                    {checks[0].repeticao !== false ? checks[0].repeticao : "Único"}
                                                                </GroupCheckTitle>

                                                            </GroupCheckHeader>
                                                            {latesShowing[1] == index && (
                                                                <GroupCheckBody>
                                                                    <HeaderTable>
                                                                        <HeaderTableText>
                                                                            DATA
                                                                        </HeaderTableText>
                                                                        <HeaderTableText>
                                                                            FEITO
                                                                        </HeaderTableText>
                                                                    </HeaderTable>

                                                                    {checks.map((dates, j) => (
                                                                        <GroupCheckParentView
                                                                            key={j}
                                                                            style={{ backgroundColor: j % 2 == 0 ? THEME.COLORS.PRIMARY700 : null }}
                                                                        >
                                                                            <GroupCheckHorizontalView>
                                                                                <GroupCheckDataInfo>
                                                                                    <MaterialIcons
                                                                                        name="calendar-today"
                                                                                        size={RFPercentage(2.3)}
                                                                                    />
                                                                                    <InfoCheckBody>
                                                                                        {dates.data}
                                                                                    </InfoCheckBody>
                                                                                </GroupCheckDataInfo>

                                                                                <TouchableDefault onPress={() => { changeChecks(dates.habitoID, dates.check, dates.data) }}>
                                                                                    <MaterialIcons
                                                                                        name="crop-square"
                                                                                        size={RFPercentage(3)}
                                                                                    />
                                                                                </TouchableDefault>

                                                                            </GroupCheckHorizontalView>
                                                                        </GroupCheckParentView>
                                                                    ))}
                                                                </GroupCheckBody>
                                                            )}

                                                            <Line />
                                                        </GroupCheckView>
                                                    ))}
                                                </GroupHabitsBody>
                                            )}
                                        </GroupHabitsView>
                                    ))}

                                    {showing == "lates" && checksLate.length <= 0 && (
                                        <DefaultView>
                                            <NoneCheckView>
                                                <NoneCheckIconView>
                                                    <MaterialIcons
                                                        name="military-tech"
                                                        size={RFPercentage(8)}
                                                        color={THEME.COLORS.ALERT900}
                                                    />
                                                </NoneCheckIconView>
                                                <DefaultView>
                                                    <NoneCheckTitle
                                                        animation={"fadeInDown"}
                                                        delay={200}
                                                        duration={850}
                                                    >
                                                        Parabéns!
                                                    </NoneCheckTitle>
                                                    <NoneCheckMessage
                                                        animation={"fadeInDown"}
                                                        delay={900}
                                                        duration={850}
                                                    >
                                                        Você não tem nenhuma atividade atrasada!
                                                    </NoneCheckMessage>
                                                </DefaultView>
                                            </NoneCheckView>
                                        </DefaultView>
                                    )}

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
                                        name='assignment'
                                        color={THEME.COLORS.TEXT}
                                        size={RFPercentage(4)}
                                    />
                                </IconShakeLoop>
                                <TitleHeaderCheck>PENDENTES</TitleHeaderCheck>
                            </CheckHeader>
                            <ParentChecksView
                                animation={showing == "today" ? 'fadeIn' : null}
                                duration={500}
                                delay={300}
                            >
                                <ChecksScroll>
                                    {showing == "today" && checksToday.map((item, i) => (
                                        <GroupHabitsView key={i}>
                                            <GroupHabitsHeader>
                                                <GroupHabitsTitle>
                                                    {item[0][0].habitoTitle}
                                                </GroupHabitsTitle>
                                                <MaterialIcons
                                                    onPress={() => {
                                                        pendingShowing[0] == i ?
                                                            setShowingPendingChecks([-1, -1]) :
                                                            setShowingPendingChecks([i, -1])
                                                    }
                                                    }
                                                    name={pendingShowing[0] == i ? 'visibility' : 'visibility-off'}
                                                    size={RFPercentage(3)}
                                                    color={THEME.COLORS.TEXT}
                                                />
                                            </GroupHabitsHeader>
                                            {pendingShowing[0] == i && (
                                                <GroupHabitsBody>

                                                    {item.map((checks, index) => (
                                                        <GroupCheckView key={index}>
                                                            <GroupCheckHeader onPress={() => pendingShowing[1] == index ? setShowingPendingChecks([i, -1]) : setShowingPendingChecks([i, index])}>
                                                                <MaterialIcons
                                                                    style={{
                                                                        zIndex: 1000,
                                                                        borderRadius: 5,
                                                                    }}
                                                                    name="crop-square"
                                                                    size={RFPercentage(3.5)}
                                                                />
                                                                <GroupCheckTitle>
                                                                    {checks[0].checkTitle}
                                                                </GroupCheckTitle>
                                                                <GroupCheckTitle>
                                                                    {checks[0].repeticao !== false ? checks[0].repeticao : "Único"}
                                                                </GroupCheckTitle>

                                                            </GroupCheckHeader>
                                                            {pendingShowing[1] == index && (
                                                                <GroupCheckBody>
                                                                    <HeaderTable>
                                                                        <HeaderTableText>
                                                                            DATA
                                                                        </HeaderTableText>
                                                                        <HeaderTableText>
                                                                            FEITO
                                                                        </HeaderTableText>
                                                                    </HeaderTable>

                                                                    {checks.map((dates, j) => (
                                                                        <GroupCheckParentView
                                                                            key={j}
                                                                            style={{ backgroundColor: j % 2 == 0 ? THEME.COLORS.PRIMARY700 : null }}
                                                                        >
                                                                            <GroupCheckHorizontalView>
                                                                                <GroupCheckDataInfo>
                                                                                    <MaterialIcons
                                                                                        name="calendar-today"
                                                                                        size={RFPercentage(2.3)}
                                                                                    />
                                                                                    <InfoCheckBody>
                                                                                        {dates.data}
                                                                                    </InfoCheckBody>
                                                                                </GroupCheckDataInfo>


                                                                                <TouchableDefault onPress={() => { changeChecks(dates.habitoID, dates.check, dates.data) }}>
                                                                                    <MaterialIcons
                                                                                        name="crop-square"
                                                                                        size={RFPercentage(3)}
                                                                                    />
                                                                                </TouchableDefault>

                                                                            </GroupCheckHorizontalView>
                                                                        </GroupCheckParentView>
                                                                    ))}
                                                                </GroupCheckBody>
                                                            )}

                                                            <Line />
                                                        </GroupCheckView>)

                                                    )}
                                                </GroupHabitsBody>
                                            )}
                                        </GroupHabitsView>
                                    ))}

                                    {showing == "today" && checksToday.length <= 0 && (
                                        <DefaultView>
                                            <NoneCheckView>
                                                <NoneCheckIconView>
                                                    <MaterialIcons
                                                        name="done-all"
                                                        size={RFPercentage(8)}
                                                        color={THEME.COLORS.ALERT900}
                                                    />
                                                </NoneCheckIconView>
                                                <DefaultView>
                                                    <NoneCheckTitle
                                                        animation={"fadeInDown"}
                                                        delay={200}
                                                        duration={850}
                                                    >
                                                        Nenhuma pendência!
                                                    </NoneCheckTitle>
                                                    <NoneCheckMessage
                                                        animation={"fadeInDown"}
                                                        delay={900}
                                                        duration={850}
                                                    >
                                                        Crie novas tarefas cadastrando novos Hábitos ou edite os existentes!
                                                    </NoneCheckMessage>
                                                </DefaultView>
                                            </NoneCheckView>
                                        </DefaultView>
                                    )}
                                </ChecksScroll>
                            </ParentChecksView>
                        </CheckFrame>
                    </DatesFrame>
                </ChecksBg>
            ) : null
            }

            <MainImage
                animation={'fadeInUpBig'}
                direction={'normal'}
                duration={1850}
                delay={500}
                source={bg}
                resizeMode='center'
            />

        </MainContainer >
    )
};