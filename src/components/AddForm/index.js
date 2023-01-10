import { Container, Frame, Label } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState, useRef } from "react";
import { Alert, Button, Keyboard, KeyboardAvoidingView } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FlashMessage from "react-native-flash-message";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function AddForm({ hideForm }) {
    // quantidade de indicadores
    const [numIndicators, setNumIndicators] = useState(1);

    // states dos inputs
    const [goal, setGoal] = useState("");
    const [time, setTime] = useState("");
    const [indicators, setIndicators] = useState([]);

    // referência a scrollView
    const scrollViewRef = useRef(null);

    function showInfo(info) {
        let description = info;

        FlashMessage.showMessage({
            message: "DICA",
            type: "info",
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

        const newData = {
            id,
            goal,
            time,
            indicators: indicators.filter(item => item !== undefined)
        };

        if (goal != "" && time != "") {

            const response = await AsyncStorage.getItem("@goalsmanagement:goals");
            const previousData = response ? JSON.parse(response) : [];

            const data = [...previousData, newData]

            await AsyncStorage.setItem("@goalsmanagement:goals", JSON.stringify(data));
            Alert.alert(`Campo cadastrado com sucesso!`)
        };

        hideForm();
    }

    return (
        <Container onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="position" enabled>
                <Input
                    style={{ focused: true }}
                    placeholder="Ex.: Perder 10kg"
                    icon="target"
                    label="META"
                    onChangeText={setGoal}
                    returnKeyType="next"
                    value={goal}
                    infoShowFunction={() => showInfo("Busque sempre estabelecer metas mensuráveis e detalhadas!")}
                />
                <Input
                    icon="watch"
                    placeholder="Ex.: 1 ano"
                    label="TEMPO"
                    onChangeText={setTime}
                    returnKeyType="next"
                    infoShowFunction={() => showInfo("Defina um tempo de conclusão realista e dentro do possível!")}
                    value={time}
                />

                <Label>INDICADORES {numIndicators > 1 ? '(' + numIndicators + ')' : null}</Label>

                <Frame onPress={Keyboard.dismiss} ref={scrollViewRef} contentContainerStyle={{ alignItems: "center", padding: 10 }}>
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
                </Frame>

                <Button title="OK" onPress={handleSubmit} />

            </KeyboardAvoidingView>

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