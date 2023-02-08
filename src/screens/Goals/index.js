import { useState, useEffect } from 'react';
import { Bg, Clouds, CenterAdvice, TitleAdvice, GoalView, GoalsScrollView, GoalHorizontalView, ViewAnimated, IndicatorsView, DataText, Frame, IndicatorHeader, HeaderIndicatorTitle, IndicatorFrame, EditButton } from './styles';
import { Keyboard, View, Text } from 'react-native';
import cloudsBg from '../../assets/cloudsBg.png';
import CircleAdd from '../../components/Buttons/CircleAdd';
import AddForm from '../../components/AddForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize';
import THEME from '../../theme';
import GenericButton from '../../components/Buttons/Generic';
import ConfirmDelete from '../../components/ConfirmDelete';
import { LayoutAnimation } from 'react-native';

export default function Goals() {
    // controla visibilidade do formulario de adição/edição de metas
    const [formDisplay, setFormDisplay] = useState(false);
    // quantidade de metas cadastradas
    const [goals, setGoals] = useState([]);
    // Armazena o id do item quando chama o form para edição.
    const [editId, setEditId] = useState("");
    // Controla a visibilidade do componente de confirmação
    const [showingConfirmation, setShowingConfirmation] = useState(false);
    // Mensagem exibida no componente de confirmação
    const [messageConfirmation, setMessageConfirmation] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    /**
    * Deleta o item atual.
    */
    async function deleteItem() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        const previousData = response ? JSON.parse(response) : [];

        const data = previousData.filter(item => item.id != editId);

        await AsyncStorage.setItem("@goalsmanagement:goals", JSON.stringify(data));

        setEditId(undefined);

        showInfo("META EXCLUIDA COM SUCESSO!", "", "success");
        handleShowForm();
    };

    /**
     * Exclui todos os cadastros.
     */
    function deleteAll() {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        AsyncStorage.removeItem("@goalsmanagement:goals");
        setGoals([]);
        showInfo("SUCESSO", "Todas as metas foram excluídas com sucesso!", "success");
    }

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
     * @param {string} type Tipo da mensagem: "none" | "default" | "info" | "success" | "danger" | "warning."
     * 
     * @returns {JSX.Element} Elemento de exibição de mensagem.
     */
    async function showInfo(message, description, type) {
        window.alert(description);
    };

    /**
     * Realiza consulta dos dados cadastrados e o atribui para o state vinculado a renderização dos componentes.
     */
    async function fetchData() {
        try {
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
        id != undefined ? setEditId(id) : null;

        setFormDisplay(!formDisplay);
        await fetchData();
    };

    /**
     * Verifica a quantidade de itens no state dos elementos a serem renderizados e define a tela a ser exibida
     * 
     * @returns {JSX.Element}
     */
    function currentUserView() {
        if (goals.length > 0 && formDisplay == false) {
            return (
                <View>
                    <TitleAdvice>METAS</TitleAdvice>
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
            if (!formDisplay) {
                return (
                    <GoalView>
                        <Feather
                            name='info'
                            size={RFPercentage(5)}
                            color={THEME.COLORS.BACKGROUND}
                            style={{ marginBottom: RFPercentage(1) }}
                        />
                        <TitleAdvice>
                            <Text>
                                Nenhum registro encontrado!
                            </Text>
                        </TitleAdvice>
                    </GoalView>
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
                                setMessageConfirmation(`Deseja excluir todas as metas cadastradas? (${goals.length})`);
                                displayConfirmation();
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
                        showMessage={() => showInfo("SUCESSO", "Meta cadastrada!", "success")}
                        showMessageNotFound={() => showInfo("ID não encontrado!", "Se o item selecionado existir e esse erro persistir, contacte o desenvolvedor!", "danger")}
                        showConfirmation={() => {
                            setMessageConfirmation(`Tem certeza que deseja excluir essa meta?`);
                            displayConfirmation();
                        }}
                    />
                )}

            </CenterAdvice>
            {showingConfirmation && (
                <ConfirmDelete
                    hide={displayConfirmation}
                    yes={typeof (editId) == 'string' ? () => deleteItem() : () => deleteAll()}
                    title='CONFIRMAÇÃO'
                    message={messageConfirmation}
                />
            )}

        </Bg >

    );
}