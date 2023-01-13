import { useState, useEffect } from 'react';
import { Bg, Clouds, CenterAdvice, TitleAdvice, GoalView, GoalsScrollView, GoalHorizontalView, ViewAnimated, IndicatorsView, DataText, Frame, IndicatorHeader, HeaderIndicatorTitle, IndicatorFrame, EditButton } from './styles';
import { Keyboard, View, Text, Button } from 'react-native';
import cloudsBg from '../../assets/cloudsBg.png';
import CircleAdd from '../../components/Buttons/CircleAdd';
import AddForm from '../../components/AddForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize';
import THEME from '../../theme';
import * as FlashMessage from "react-native-flash-message";

export default function Goals() {
    const [formDisplay, setFormDisplay] = useState(false);
    const [goals, setGoals] = useState([]);
    const [editId, setEditId] = useState("");

    useEffect(() => {
        fetchData();
    }, []);


    /**
     * 
     * @param {string} message Título da mensagem. 
     * @param {string} description Mensagem central.
     * @param {string} type Tipo da mensagem: "none" | "default" | "info" | "success" | "danger" | "warning."
     * 
     * @returns {JSX.Element} Elemento de exibição de mensagem.
     */
    function showInfo(message, description, type) {
        FlashMessage.showMessage({
            message,
            type,
            description
        });
    };

    /**
     * Realiza consulta dos dados cadastrados e o atribui para o state vinculado a renderização dos componentes.
     */
    async function fetchData() {
        try {
            const response = await AsyncStorage.getItem("@goalsmanagement:goals");
            response == null ? null : setGoals(JSON.parse(response));
        } catch (err) {
            console.log("Erro: ", err);
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
                        <GoalView key={i}>
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

            <CenterAdvice >

                <GoalsScrollView >
                    {currentUserView()}
                </GoalsScrollView>

                <ViewAnimated
                    style={{ display: formDisplay ? 'none' : 'flex' }}
                    animation={"tada"}
                    iterationCount="infinite"
                    duration={1000}
                    iterationDelay={800}
                >
                    <CircleAdd AddFunction={handleShowForm} />
                </ViewAnimated>

                <View
                    style={{ display: formDisplay ? 'none' : 'flex', width: '30%', alignSelf: 'center', borderRadius: '50%', marginTop: 10 }}
                >
                    <Button
                        color={'red'}
                        title='Delete'
                        onPress={() => {
                            AsyncStorage.removeItem("@goalsmanagement:goals");
                            setGoals([]);
                            console.log('deleted');
                        }}
                    />
                </View>

                {formDisplay ? <AddForm
                    id={editId}
                    hideForm={handleShowForm}
                    showMessage={() => showInfo("SUCESSO", "Meta cadastrada!", "success")}
                    showMessageNotFound={() => showInfo("ID não encontrado!", "Se o item selecionado existir e esse erro persistir, contacte o desenvolvedor!", "danger")}
                    showMessageDeleted={() => showInfo("META EXCLUIDA COM SUCESSO!", "", "success")}
                /> : null}

                <FlashMessage.default
                    position={'center'}
                    duration={4500}
                    hideOnPress={true}
                    animated={true}
                    icon={"info"}
                    style={{ width: RFPercentage(40), padding: RFPercentage(1.5) }} />

            </CenterAdvice>

        </Bg >

    );
}