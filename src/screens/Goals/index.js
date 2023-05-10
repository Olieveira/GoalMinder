import { useState, useEffect } from 'react';
import { Bg, Clouds, CenterAdvice, TitleAdvice, GoalView, GoalsScrollView, GoalHorizontalView, ViewAnimated, IndicatorsView, DataText, Frame, IndicatorHeader, HeaderIndicatorTitle, IndicatorFrame, EditButton, NoneView, NoneText, GoalHeaderView, NoneDescription } from './styles';
import { Keyboard, View, Text } from 'react-native';
import cloudsBg from '../../assets/cloudsBg.png';
import CircleAdd from '../../components/Buttons/CircleAdd';
import AddForm from '../../components/AddForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize';
import THEME from '../../theme';
import GenericButton from '../../components/Buttons/Generic';
import ModalMessage from '../../components/ModalMessage';
import { LayoutAnimation } from 'react-native';

/**
 * Tela de metas
 */
export default function Goals({ navigation }) {
    // controla visibilidade do formulario de metas
    const [formDisplay, setFormDisplay] = useState(false);
    // quantidade de metas cadastradas
    const [goals, setGoals] = useState([]);
    // Armazena o id do item quando chama o form para edição.
    const [editId, setEditId] = useState("");

    // Controla a visibilidade do componente de confirmação
    const [showingConfirmation, setShowingConfirmation] = useState(false);
    // Componente de exibição de mensagens
    const [messageConfirmation, setMessageConfirmation] = useState('');
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalYes, setModalYes] = useState();

    // restaura os estados quando a tela é desfocada
    useEffect(() => {
        const reset = navigation.addListener('blur', () => {
            setFormDisplay(false);
            setShowingConfirmation(false);
            setEditId("");
        });

        return reset;
    }, [navigation]);

    // Busca as informações e atribui ao state responsável pela renderização dos componentes ao iniciar a tela
    useEffect(() => {
        fetchData();
    }, []);

    /**
     * Retira o vínculo de todas as metas com todos os hábitos
     */
    async function unlink() {
        const response = await AsyncStorage.getItem('@goalsmanagement:habits');
        const data = response ? JSON.parse(response) : [];

        const filtered = data.map((item) => {
            return {
                checklists: item.checklists,
                createdAt: item.createdAt,
                habit: item.habit,
                id: item.id,
                linked: []
            };
        })

        await AsyncStorage.setItem('@goalsmanagement:habits', JSON.stringify(filtered));
    };

    /**
     * Exclui todos os cadastros.
     */
    async function deleteAll() {
        // animação
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        await AsyncStorage.removeItem("@goalsmanagement:goals");

        await unlink(); // desvincula as metas

        setGoals([]); // zera o state responsável pela renderização

        setShowingConfirmation(false); // esconde a mensagem de confirmação de exclusão

        setTimeout(() => showInfo("SUCESSO", "Todas as metas foram excluídas com sucesso!", "success"), 100);

    };

    /**
     * Altera a exibição da mensagem de confirmação
     */
    function displayConfirmation() {
        setShowingConfirmation(!showingConfirmation);
    };

    /**
     * Exibe uma mensagem no centro da tela.
     * 
     * @param {string} message Título da mensagem. 
     * @param {string} description Mensagem central.
     * @param {string} type Tipo da mensagem: "info" | "success" | "warning."
     * @param {function} yes Função executada ao confirmar a mensagem.
     */
    async function showInfo(title, message, type, yes) {

        setModalTitle(title);

        setMessageConfirmation(message);

        setModalType(type);

        setModalYes(() => yes);

        displayConfirmation();
    };

    /**
     * Realiza consulta dos dados cadastrados e atribui no state vinculado a renderização dos componentes.
     */
    async function fetchData() {
        try {
            // animação
            LayoutAnimation.configureNext({
                duration: 300,
                update: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                },
            });

            const response = await AsyncStorage.getItem("@goalsmanagement:goals");
            response == null ? null : setGoals(JSON.parse(response));
        } catch (err) {
            console.log("Erro ao buscar metas cadastradas: ", err);
        }
    };

    /**
     * Controla visibilidade do formulário de adição/edição de metas.
     * 
     * @param {string} id - Id do item passado ao clicar no botão de editar. 
     */
    async function handleShowForm(id) {
        id != undefined ? setEditId(id) : null; // atribui o ID ao state caso tenha sido informado

        setFormDisplay(!formDisplay); // altera a visibilidade do formulário
        await fetchData();
    };

    /**
     * Verifica a quantidade de itens no state dos elementos a serem renderizados e define a tela a ser exibida
     * 
     * @returns {JSX.Element}
     */
    function currentUserView() {
        // se tiver alguma meta cadastrada e o formulário não estiver sendo exibido
        if (goals.length > 0 && formDisplay == false) {
            return (
                <View>
                    <GoalHeaderView>
                        <Feather
                            name='target'
                            size={RFPercentage(4)}
                            color={THEME.COLORS.PRIMARY800}
                        />
                        <TitleAdvice>METAS</TitleAdvice>
                    </GoalHeaderView>
                    {goals.map((item, i) => (
                        <GoalView
                            key={i}
                            animation='fadeInDown'
                            duration={500}
                        >
                            <Frame>
                                <IndicatorHeader>
                                    <Feather
                                        style={{
                                            marginRight: RFPercentage(1),
                                            borderRightColor: THEME.COLORS.BACKGROUND,
                                            borderRightWidth: 2,
                                            borderBottomRightRadius: 5,
                                            paddingRight: RFPercentage(1),
                                        }}
                                        name='target'
                                        size={25}
                                        color={THEME.COLORS.BACKGROUND}
                                    />
                                    <HeaderIndicatorTitle>{item.goal.toUpperCase()}</HeaderIndicatorTitle>
                                    <EditButton onPress={() => handleShowForm(item.id)}>
                                        <Feather
                                            style={{
                                                marginLeft: RFPercentage(1),
                                                borderLeftColor: THEME.COLORS.BACKGROUND,
                                                borderLeftWidth: 1.3,
                                                paddingLeft: RFPercentage(1),
                                            }}
                                            name='edit'
                                            size={25}
                                            color={THEME.COLORS.BACKGROUND}
                                        />
                                    </EditButton>
                                </IndicatorHeader>
                                <GoalHorizontalView>
                                    <GoalView>
                                        <Feather
                                            style={{ marginRight: RFPercentage(1.2) }}
                                            name="calendar"
                                            size={RFPercentage(3.5)}
                                            color={THEME.COLORS.BACKGROUND}
                                        />
                                        <DataText>
                                            {item.createdAt}
                                        </DataText>
                                    </GoalView>
                                    <GoalView>
                                        <Feather
                                            style={{ marginRight: RFPercentage(1.2) }}
                                            name="clock"
                                            size={RFPercentage(3.5)}
                                            color={THEME.COLORS.BACKGROUND}
                                        />
                                        <DataText>
                                            {item.time}
                                        </DataText>
                                    </GoalView>

                                </GoalHorizontalView>
                                <GoalView>
                                    <Feather
                                        style={{ marginRight: RFPercentage(1.2) }}
                                        name="flag"
                                        size={RFPercentage(3)}
                                        color={THEME.COLORS.BACKGROUND}
                                    />
                                    <IndicatorsView>
                                        {item.indicators.map((indicator, index) => (
                                            <IndicatorFrame
                                                key={`ind${index}`}
                                            >
                                                <DataText>
                                                    {indicator}
                                                </DataText>
                                            </IndicatorFrame>
                                        ))}
                                    </IndicatorsView>
                                </GoalView>
                            </Frame>
                        </GoalView>
                    ))}
                </View>
            );
        } else {
            // Se não haver nenhuma meta cadastrada e o formulário não estiver sendo exibido
            if (!formDisplay) {
                return (
                    <View>
                        <GoalHeaderView>
                            <Feather
                                name='target'
                                size={RFPercentage(4)}
                                color={THEME.COLORS.PRIMARY800}
                            />
                            <TitleAdvice>METAS</TitleAdvice>
                        </GoalHeaderView>
                        <NoneView>
                            <Feather
                                name='info'
                                size={RFPercentage(5)}
                                color={THEME.COLORS.PRIMARY900}
                                style={{ marginBottom: RFPercentage(1) }}
                            />
                            <NoneText
                                animation={"fadeInDown"}
                                delay={300}
                            >
                                Nenhum registro encontrado!
                            </NoneText>
                            <NoneDescription
                                animation={"fadeInRight"}
                                delay={1000}
                            >
                                Dê vida aos seus sonhos estabelecendo metas realistas e mensuráveis!
                            </NoneDescription>
                        </NoneView>
                    </View>
                );
            } else {
                return <></>
            }
        };
    }

    return (
        <Bg>
            <Clouds
                onPress={Keyboard.dismiss}
                source={cloudsBg}
                resizeMode="center"
                iterationCount={'infinite'}
                duration={30000}
                direction={'alternate-reverse'}
                animation={'pulse'}
            />

            <CenterAdvice
                animation={'fadeIn'}
                duration={1000}
                delay={300}
            >

                <GoalsScrollView >
                    {currentUserView()}
                </GoalsScrollView>

                {!formDisplay && (
                    <ViewAnimated
                        animation={"tada"}
                        iterationCount="infinite"
                        duration={1000}
                        iterationDelay={800}
                    >
                        <CircleAdd AddFunction={handleShowForm} />
                    </ViewAnimated>
                )}

                {!formDisplay && goals.length > 0 && (

                    <GoalView
                        animation={'fadeIn'}
                        delay={250}
                        style={{ display: formDisplay || goals.length <= 0 ? 'none' : 'flex', marginTop: RFPercentage(0.2) }}
                    >

                        <GenericButton
                            backgroundColor={THEME.COLORS.GOALS}
                            icon="x-octagon"
                            iconColor={THEME.COLORS.TEXT}
                            text="EXCLUIR TUDO"
                            txtColor={THEME.COLORS.TEXT}
                            width={RFPercentage(23)}
                            height={RFPercentage(6)}
                            handleFunction={() => {
                                showInfo("CONFIRMAÇÃO", `Deseja excluir todas as metas cadastradas? (${goals.length})`, "warning", () => deleteAll());
                            }}
                            fontFamily={THEME.FONTS.MEDIUM}
                            borderRadius={5}
                        />
                    </GoalView>
                )}

                {formDisplay && (
                    <AddForm
                        id={editId}
                        hideForm={handleShowForm}
                        showMessage={(title, message, type, yes) => showInfo(title, message, type, yes)}
                    />
                )}

            </CenterAdvice>
            {showingConfirmation && (
                <ModalMessage
                    hide={displayConfirmation}
                    yes={modalYes}
                    title={modalTitle}
                    message={messageConfirmation}
                    type={modalType}
                    closeOnEnd={false}
                />
            )}

        </Bg >

    );
}