import { Container, CenterView, Frame, Label, ButtonsView, VerticalButtonsView, GoalsLabelView, DefaultView, HorizontalGoalsView, GoalsText } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState, useRef, useEffect } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FlashMessage from "react-native-flash-message";
import { RFPercentage } from "react-native-responsive-fontsize";
import GenericButton from "../Buttons/Generic";
import THEME from "../../theme";
import { Feather } from '@expo/vector-icons';

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
    // quantidade de indicadores
    const [numMetas, setNumMetas] = useState(0);

    // texto do botão de cadastro/edit ['EDITAR' || 'CADASTRAR']
    const [submitButtonText, setSubmitButtonText] = useState("");

    //visibilidade do botão DELETE ['flex' || 'none']
    const [deleteButton, setDeleteButton] = useState(undefined);

    // states dos inputs
    const [habit, setHabit] = useState("");
    const [time, setTime] = useState("");
    const [goals, setGoals] = useState([]);

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
    }, [])

    async function fetchData() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        response == null ? null : setGoals(JSON.parse(response));
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
        FlashMessage.showMessage({
            message,
            description,
            type,
            duration: 5000,
            style: {
                width: RFPercentage(42),
                alignContent: 'center',
                justifyContent: 'center'
            }
        });
    };

    /** 
     * Handle que controla o valor do state de todos indicadores
     * 
     * @param index Number referente ao index do array dos indicadores.
     * 
     * @param value Valor do indicador.
    */
    function handleIndicatorUpdated(index, value) {
        setIndicators(previous => {
            const newIndicators = [...previous];

            newIndicators[index] = value;

            return newIndicators;
        })
    };

    /** 
     *  Incrementa o state dos indicadores e roda a scrollView para o final.
    */
    function handleAddIndicator() {
        setNumMetas(numMetas + 1)
    };

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
            goal,
            time,
            indicators: indicators.filter(item => item !== undefined),
            createdAt
        };

        if (goal != "" && time != "") {

            const response = await AsyncStorage.getItem("@goalsmanagement:goals");
            const previousData = response ? JSON.parse(response) : [];

            const data = [...previousData, newData]

            await AsyncStorage.setItem("@goalsmanagement:goals", JSON.stringify(data));

            showMessage();
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
            <CenterView>
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

                <Frame contentContainerStyle={{ alignItems: "center", padding: RFPercentage(1) }}>
                    <KeyboardAvoidingView behavior="position" enabled>
                        {goals.map((item, index) => (
                            <DefaultView key={index}>
                                <HorizontalGoalsView>
                                    <Feather
                                        name="target"
                                        size={20}
                                        color={THEME.COLORS.ALERT900}
                                    />
                                    <GoalsText>
                                        {item.goal}
                                    </GoalsText>
                                    <DefaultView
                                        animation={'rotate'}
                                        duration={2000}
                                        iterationCount='infinite'
                                        iterationDelay={5000}
                                    >
                                        <Feather
                                            name="refresh-cw"
                                            size={18}
                                            color={THEME.COLORS.ALERT900}
                                        />
                                    </DefaultView>
                                </HorizontalGoalsView>

                            </DefaultView>
                        ))}
                    </KeyboardAvoidingView>
                    <CircleAdd AddFunction={handleAddIndicator} />
                </Frame>

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

            <FlashMessage.default
                position={'center'}
                duration={4500}
                hideOnPress={true}
                animated={true}
                icon={"info"}
            />

        </Container>
    );
}