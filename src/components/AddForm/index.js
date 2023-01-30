import { Container, Frame, Label, ButtonsView, VerticalButtonsView } from "./styles";
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
import { LayoutAnimation } from 'react-native';

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
export default function AddForm({ hideForm, showMessage, showMessageNotFound, showConfirmation, id }) {
    // quantidade de indicadores
    const [numIndicators, setNumIndicators] = useState(1);

    // texto do botão de cadastro/edit ['EDITAR' || 'CADASTRAR']
    const [submitButtonText, setSubmitButtonText] = useState("");

    //visibilidade do botão DELETE ['flex' || 'none']
    const [deleteButton, setDeleteButton] = useState(undefined);

    // states dos inputs
    const [goal, setGoal] = useState("");
    const [time, setTime] = useState("");
    const [indicators, setIndicators] = useState([]);

    // referência a scrollView
    const scrollViewRef = useRef(null);

    // Realiza a verificação se é edição ou cadastro de metas ao carregar a tela
    useEffect(() => {
        if (typeof (id) == "string") {
            setSubmitButtonText("EDITAR");
            setDeleteButton("flex");
            loadEditItem();
        } else {
            setSubmitButtonText("CADASTRAR");
            setDeleteButton("none");
        }
    }, [])

    /**
     * Carrega as informações do item a ser editado.
     */
    async function loadEditItem() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        const previousData = response ? JSON.parse(response) : [];

        let found = false;

        previousData.map((data, index) => {
            if (data.id == id) {
                setGoal(data.goal);
                setTime(data.time);
                setNumIndicators(data.indicators.length);
                setIndicators(data.indicators);
                found = true;
            } else {
                if (index >= previousData.length - 1 && found == false) {
                    showMessageNotFound();
                    hideForm();
                }
            }
        })
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
    async function showInfo(message, description, type) {
        window.alert(description);
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
    }

    /** 
     *  Incrementa o state dos indicadores e roda a scrollView para o final.
    */
    function handleAddIndicator() {
        LayoutAnimation.configureNext({
            duration: 100,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        setNumIndicators(numIndicators + 1)
        scrollViewRef.current.scrollToEnd({ animated: true });
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
                        linked: item.linked,
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

    }

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
            linked: false,
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


    }

    return (
        <Container
            onPress={Keyboard.dismiss}
            animation='fadeIn'
        >
            <Input
                style={{ focused: true }}
                placeholder="Ex.: Perder 10kg"
                icon="target"
                label="META"
                onChangeText={setGoal}
                returnKeyType="next"
                value={goal}
                infoShowFunction={() => showInfo("DICA", "Busque sempre estabelecer metas mensuráveis e detalhadas!", "info")}
            />
            <Input
                icon="watch"
                placeholder="Ex.: 1 ano"
                label="TEMPO"
                onChangeText={setTime}
                returnKeyType="next"
                infoShowFunction={() => showInfo("DICA", "Defina um tempo de conclusão realista e dentro do possível!", "info")}
                value={time}
            />

            <Label>INDICADORES {numIndicators > 1 ? '(' + numIndicators + ')' : null}</Label>

            <Frame onPress={Keyboard.dismiss} ref={scrollViewRef} contentContainerStyle={{ alignItems: "center", padding: 10 }}>
                <KeyboardAvoidingView behavior="position" enabled>
                    {Array.from(Array(numIndicators).keys()).map(index => (
                        <Input
                            key={index}
                            icon="flag"
                            placeholder="Ex.: Treino Diário"
                            onChangeText={(text) => handleIndicatorUpdated(index, text)}
                            returnKeyType={indicators.length > index + 1 ? "next" : "done"}
                            value={indicators[index]}
                        />

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