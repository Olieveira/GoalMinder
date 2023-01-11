import { Container, Frame, Label, ButtonsView, CadastroBtn, CadastroTxt } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState, useRef, useEffect } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FlashMessage from "react-native-flash-message";
import { RFPercentage } from "react-native-responsive-fontsize";
import GenericButton from "../Buttons/Generic";
import THEME from "../../theme";

export default function AddForm({ hideForm, showMessage, showMessageNotFound, id }) {
    // quantidade de indicadores
    const [numIndicators, setNumIndicators] = useState(1);

    // states dos inputs
    const [goal, setGoal] = useState("");
    const [time, setTime] = useState("");
    const [indicators, setIndicators] = useState([]);

    useEffect(() => {
        if (typeof (id) == "string") {
            console.log("Entrou na condition: ", id);
            editItem();
        }
    }, [])

    // referência a scrollView
    const scrollViewRef = useRef(null);

    async function editItem() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        const previousData = response ? JSON.parse(response) : [];

        let found = false;

        previousData.map((data, index) => {
            if (data.id == id) {
                console.log("Encontrado!");
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

    function showInfo(message, description, type) {

        FlashMessage.showMessage({
            message,
            type,
            description
        });
    }

    // Handle que controla o valor do state de todos indicadores
    function handleIndicatorUpdated(index, value) {
        setIndicators(previous => {
            const newIndicators = [...previous];

            newIndicators[index] = value;

            return newIndicators;
        })
    }

    // Incrementa o state dos indicadores e roda a scroll para o final da view
    function handleAddIndicator() {
        setNumIndicators(numIndicators + 1)
        scrollViewRef.current.scrollToEnd({ animated: true, });
    }

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
        };

        showMessage();
        hideForm();
    }

    return (
        <Container onPress={Keyboard.dismiss}>

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

                    <CircleAdd AddFunction={handleAddIndicator} />
                </KeyboardAvoidingView>
            </Frame>

            {/* <CadastroBtn
                onPress={handleSubmit}
            >
                <CadastroTxt>CADASTRAR</CadastroTxt>
            </CadastroBtn> */}
            <ButtonsView>
                <GenericButton
                    icon='skip-back'
                    text='VOLTAR'
                    backgroundColor={THEME.COLORS.ALERT800}
                    iconColor={THEME.COLORS.SUCCESS}
                    txtColor={THEME.COLORS.SUCCESS}
                    borders={false}
                    borderRadius={5}
                    fontSize={RFPercentage(2.3)}
                    fontFamily={THEME.FONTS.MEDIUM}
                    handleFunction={hideForm}
                />

                <GenericButton
                    icon='check-circle'
                    text='CADASTRAR'
                    backgroundColor={THEME.COLORS.SUCCESS}
                    iconColor={THEME.COLORS.TEXT}
                    txtColor={THEME.COLORS.TEXT}
                    borderRadius={5}
                    fontSize={RFPercentage(2.3)}
                    fontFamily={THEME.FONTS.MEDIUM}
                    handleFunction={handleSubmit}
                    width={RFPercentage(4)}
                />
            </ButtonsView>

            <FlashMessage.default
                position={'center'}
                duration={4500}
                hideOnPress={true}
                animated={true}
                icon={"info"}
                style={{ width: RFPercentage(40), padding: RFPercentage(1.5) }} />

        </Container>
    );
}