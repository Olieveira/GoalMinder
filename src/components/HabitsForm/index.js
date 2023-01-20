import { Container, CenterView, Frame, Label, ButtonsView, VerticalButtonsView, GoalsLabelView, DefaultView, HorizontalGoalsView, GoalsText, DefaultHorizontalView, ShowMoreCheckView, CheckText } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState, useEffect } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFPercentage } from "react-native-responsive-fontsize";
import GenericButton from "../Buttons/Generic";
import THEME from "../../theme";
import { Feather } from '@expo/vector-icons';
import ShowMore from "../ShowMore";

/**
 * 
 * @param {function} hideForm Function que destroi ou torna invisível o form.
 * 
 * @param {function} showMessage Function que exibe mensagens de sucesso na tela do componente pai.
 * 
 * @param {function} showMessageNotFound Function que exibe mensagens de erro/imprevistos na tela do componente pai.
 * 
 * @param {function} showConfirmation Function que exibe componente de confirmação de exclusão na tela do componente pai.
 * 
 * @param {string} id ID referente a um item específico (quando chamado para edição).
 */
export default function HabitsForm({ hideForm, showMessage, showMessageNotFound, showConfirmation, id }) {

    // texto do botão de cadastro/edit ['EDITAR' || 'CADASTRAR']
    const [submitButtonText, setSubmitButtonText] = useState("");

    //visibilidade do botão DELETE ['flex' || 'none']
    const [deleteButton, setDeleteButton] = useState(undefined);

    // states dos inputs
    const [habit, setHabit] = useState("");
    const [time, setTime] = useState("");

    // states dos dados armazenados
    const [checklists, setCheckLists] = useState([]);
    const [links, setLinks] = useState([{}]);

    // Realiza a verificação se é edição ou cadastro de metas ao carregar a tela
    useEffect(() => {
        fetchData();

        if (typeof (id) == "string") {
            setSubmitButtonText("EDITAR");
            setDeleteButton("flex");
        } else {
            setSubmitButtonText("CADASTRAR");
            setDeleteButton("none");
        }
    }, []);

    /**
     * Retorna um componente passado como parâmetro para outro componente que exibe informações dos checkLists.
     */
    function showMoreChecklistComponent() {
        return (
            <DefaultHorizontalView style={{
                marginTop: RFPercentage(1),
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <ShowMoreCheckView style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Feather
                        name='repeat'
                        size={15}
                        color={THEME.COLORS.TEXT}
                    />
                    <CheckText>
                        Repetição
                    </CheckText>

                </ShowMoreCheckView>


                <ShowMoreCheckView style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Feather
                        name='bell'
                        size={15}
                        color={THEME.COLORS.TEXT}
                    />
                    <CheckText>
                        Notificações
                    </CheckText>
                </ShowMoreCheckView>

            </DefaultHorizontalView>
        );
    }

    /**
     *  Adiciona um index no state utilizado para renderizar os checkLists 
     */
    function handleAddCheckList() {
        setCheckLists([...checklists, { 'checklist': 'teste', 'time': '1 ano' }]);
    };

    /**
     * Vincula ou desvincula metas com o objetivo.
     * 
     * @param {number} i Posição da meta a ser vinculada. 
     */
    function handleChangeLinks(i) {
        setLinks(links.map((item, index) => {
            if (i == index) {
                return {
                    'linked': !item.linked,
                    'id': item.id,
                    'goal': item.goal,
                    'time': item.time
                };
            } else {
                return item;
            };
        }))
    };

    async function fetchData() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        if (response != null) {
            const data = JSON.parse(response);

            setLinks(data.map((item) => {
                return {
                    'linked': item.linked,
                    'id': item.id,
                    'goal': item.goal,
                    'time': item.time
                };
            }).filter((item) => item !== undefined)
            );
        };
    };

    /**
     * Exibe mensagens no centro da tela.
     * 
     * @param message Titulo da mensagem.
     * 
     * @param description Mensagem a ser exibida.
     * 
     * @param type Tipo da mensagem: "none" | "default" | "info" | "success" | "danger" | "warning."
     */
    function showInfo(message, description, type) {
        window.alert(description);
    }

    /**
     * Realiza a edição da meta atual
     */
    async function handleSubmitEdit() {
        if (goal != "" && time != "") {

            const response = await AsyncStorage.getItem("@goalsmanagement:goals");
            const previousData = response ? JSON.parse(response) : [];

            const newData = previousData.map((item) => {
                if (item.id == id) {
                    return {
                        id: item.id,
                        goal,
                        time,
                        indicators: indicators.filter(item => item !== undefined && item !== ""),
                        createdAt: item.createdAt
                    };
                } else {
                    return item;
                }
            })

            await AsyncStorage.setItem("@goalsmanagement:goals", JSON.stringify(newData.filter(item => item !== undefined)));
            showMessage();
            hideForm();
        } else {
            showInfo("OPS!", "Preencha os campos para editar uma meta!", "danger");
        };

    };

    /**
     * Realiza a validação dos campos e cadastro dos dados.
     */
    async function handleSubmit() {
        const id = uuidv4();

        const now = new Date();
        const dia = toString(now.getDate()).length > 1 ? now.getDate() : `0${now.getDate()}`;
        const mes = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
        const ano = now.getFullYear();

        const createdAt = `${dia}/${mes}/${ano}`;

        const newData = {
            id,
            habit,
            time,
            linked: links.map(item => item.linked ? item.id : null).filter(item => item !== undefined && item !== null),
            checklists,
            createdAt
        };

        if (habit != "" && time != "") {

            const response = await AsyncStorage.getItem("@goalsmanagement:habits");
            const previousData = response ? JSON.parse(response) : [];

            const data = [...previousData, newData]

            await AsyncStorage.setItem("@goalsmanagement:habits", JSON.stringify(data));

            showMessage('teste', 'teste2');
            hideForm();
        } else {
            showInfo("OPS!", "Preencha os campos para cadastrar uma meta!", "danger");
        };


    };

    return (
        <Container
            onPress={Keyboard.dismiss}
            animation='fadeIn'
        >
            <CenterView nestedScrollEnabled={true} shouldCancelWhenOutside={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <Input
                    style={{ focused: true }}
                    placeholder="Ex.: Parar de fumar."
                    icon="repeat"
                    label="HÁBITO"
                    onChangeText={setHabit}
                    returnKeyType="next"
                    value={habit}
                    infoShowFunction={() => showInfo("DICA", "Estabeleça um hábito que possa ser alcançado e periódicamente mensurado para o acompanhamento de seu progresso!.", "info")}
                />
                <Input
                    icon="watch"
                    placeholder="Ex.: 6 meses"
                    label="TEMPO"
                    onChangeText={setTime}
                    returnKeyType="next"
                    infoShowFunction={() => showInfo("DICA", "Defina um tempo realista!\n\nPesquisas sugerem que pode levar de 21 a 66 dias para habituar algo.\n\nO fator predominante é sua determinação!", "info")}
                    value={time}
                />
                <GoalsLabelView>
                    <Feather
                        name='shuffle'
                        size={18}
                        color={THEME.COLORS.BACKGROUND}
                    />
                    <DefaultView>
                        <Label>VINCULAR METAS</Label>
                        <Feather
                            style={{ position: 'absolute', right: -RFPercentage(3), top: -RFPercentage(1) }}
                            name='info'
                            size={17}
                            color={THEME.COLORS.BACKGROUND}
                            onPress={() =>
                                showInfo("RELACIONAR METAS", "\nVincule seu hábito com as metas cadastradas!\n\nIsso facilitará a vizualização e o acompanhamento de seu progresso!\n\nObs.: Isso também pode ser feito depois.", "info")
                            }
                        />
                    </DefaultView>
                </GoalsLabelView>

                <Frame contentContainerStyle={{ alignItems: "center", justifyContent: "center", padding: RFPercentage(1) }}>
                    <KeyboardAvoidingView behavior="position" enabled>
                        {links.map((item, index) => (
                            <DefaultView key={index}>
                                <HorizontalGoalsView>
                                    <Feather
                                        name="target"
                                        size={20}
                                        color={THEME.COLORS.ALERT900}
                                    />
                                    <GoalsText>
                                        {item.goal + ' em ' + item.time}
                                    </GoalsText>
                                    <DefaultView
                                        animation={item.linked ? 'fadeIn' : 'fadeOut'}
                                        duration={item.linked ? 700 : 300}
                                        direction={item.linked ? null : "alternate-reverse"}
                                    >
                                        <Feather
                                            name={item.linked ? "shuffle" : "refresh-cw"}
                                            size={18}
                                            color={item.linked ? THEME.COLORS.TEXT : THEME.COLORS.ALERT900}
                                            onPress={() => { handleChangeLinks(index) }}
                                        />
                                    </DefaultView>
                                </HorizontalGoalsView>

                            </DefaultView>
                        ))}
                    </KeyboardAvoidingView>
                </Frame>


                <GoalsLabelView>
                    <Feather
                        name='check-square'
                        size={18}
                        color={THEME.COLORS.BACKGROUND}
                    />
                    <DefaultView>
                        <Label>CHECKLIST'S</Label>
                        <Feather
                            style={{ position: 'absolute', right: -RFPercentage(3), top: -RFPercentage(1) }}
                            name='info'
                            size={17}
                            color={THEME.COLORS.BACKGROUND}
                            onPress={() =>
                                showInfo("CHECKLISTS", "\nCrie atividades frequentes e fortaleça sua caminhada para a habituação!\n\nIsso ajuda a proporcionar recompensas ao seu cérebro sempre que uma atividade é realizada.\n\nIsso proporciona uma maior percepção no aumento do progresso!\n", "info")
                            }
                        />
                    </DefaultView>
                </GoalsLabelView>

                <DefaultView style={{ flex: 1, width: RFPercentage(40), maxHeight: RFPercentage(35) }}>
                    <Frame nestedScrollEnabled={true} contentContainerStyle={{ alignItems: "center", padding: RFPercentage(1) }}>
                        <KeyboardAvoidingView behavior="position" enabled>

                            {checklists.length > 0 && checklists.map((item, index) => (
                                <DefaultView key={index}>
                                    <ShowMore
                                        icon='check-circle'
                                        title='Teste'
                                        bodyComponent={showMoreChecklistComponent()}
                                    />
                                </DefaultView>
                            ))}

                        </KeyboardAvoidingView>

                        <CircleAdd AddFunction={() => handleAddCheckList()} />

                    </Frame>
                </DefaultView>


                <VerticalButtonsView>
                    <ButtonsView>
                        <GenericButton
                            icon='skip-back'
                            text='VOLTAR'
                            backgroundColor={THEME.COLORS.ALERT800}
                            iconColor={THEME.COLORS.SUCCESS}
                            txtColor={THEME.COLORS.SUCCESS}
                            borders={false}
                            height={RFPercentage(5)}
                            width={RFPercentage(20)}
                            borderRadius={5}
                            fontSize={RFPercentage(2.3)}
                            fontFamily={THEME.FONTS.MEDIUM}
                            handleFunction={hideForm}
                        />

                        <GenericButton
                            icon='check-circle'
                            text={submitButtonText}
                            backgroundColor={THEME.COLORS.SUCCESS}
                            iconColor={THEME.COLORS.TEXT}
                            txtColor={THEME.COLORS.TEXT}
                            height={RFPercentage(5)}
                            width={RFPercentage(20)}
                            borderRadius={5}
                            fontSize={RFPercentage(2.3)}
                            fontFamily={THEME.FONTS.MEDIUM}
                            handleFunction={typeof (id) == "string" ? handleSubmitEdit : handleSubmit}
                        />
                    </ButtonsView>
                    <GenericButton
                        icon='x-octagon'
                        text='EXCLUIR'
                        backgroundColor={THEME.COLORS.GOALS}
                        iconColor={THEME.COLORS.TEXT}
                        txtColor={THEME.COLORS.TEXT}
                        borderRadius={5}
                        fontSize={RFPercentage(2.3)}
                        fontFamily={THEME.FONTS.MEDIUM}
                        handleFunction={showConfirmation}
                        width={RFPercentage(20)}
                        display={deleteButton}
                    />
                </VerticalButtonsView>
            </CenterView>

        </Container>
    );
}