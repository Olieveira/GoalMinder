import { Container, Frame, Label } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState, useRef } from "react";
import { Button, Keyboard, KeyboardAvoidingView } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddForm({ hideForm }) {
    // quantidade de indicadores
    const [numIndicators, setNumIndicators] = useState(1);

    // states dos inputs
    const [goal, setGoal] = useState("");
    const [time, setTime] = useState("");
    const [indicators, setIndicators] = useState([]);

    // referência a scrollView
    const scrollViewRef = useRef(null);

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
        }

        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        const previousData = response ? JSON.parse(response) : [];

        const data = [...previousData, newData]

        await AsyncStorage.setItem("@goalsmanagement:goals", JSON.stringify(data));
        hideForm();
    }

    return (
        <Container onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="position" enabled>
                <Input
                    placeholder="Ex.: Perder 10kg"
                    icon="target"
                    label="META"
                    onChangeText={setGoal}
                    value={goal}
                />
                <Input
                    icon="watch"
                    placeholder="Ex.: 1 ano"
                    label="TEMPO"
                    onChangeText={setTime}
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
                            value={indicators[index]}
                        />

                    ))}

                    <CircleAdd AddFunction={handleAddIndicator} />
                </Frame>

                <Button title="OK" onPress={handleSubmit} />

            </KeyboardAvoidingView>

        </Container>
    );
}