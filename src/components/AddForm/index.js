import { Container, Frame, Label } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState, useRef } from "react";
import { Button, Keyboard, KeyboardAvoidingView } from "react-native";

export default function AddForm({ hideForm }) {
    const [numIndicators, setNumIndicators] = useState(0);

    const scrollViewRef = useRef(null);

    function handleAddIndicator() {
        setNumIndicators(numIndicators + 1)
        scrollViewRef.current.scrollToEnd({ animated: true, });
    }

    return (
        <Container onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="position" enabled>
                <Input
                    placeholder="Ex.: Perder 10kg"
                    icon="target"
                    label="META"
                />
                <Input
                    icon="watch"
                    placeholder="Ex.: 1 ano"
                    label="TEMPO"
                />

                <Label>INDICADORES {numIndicators > 1 ? '(' + (numIndicators + 1) + ')' : null}</Label>

                <Frame ref={scrollViewRef} contentContainerStyle={{ alignItems: "center", padding: 10 }}>
                    <Input
                        icon="flag"
                        placeholder="Ex.: Treino Diário"
                    />
                    {Array.from(Array(numIndicators).keys()).map(index => (
                        <Input
                            key={index}
                            icon="flag"
                            placeholder="Ex.: Treino Diário"
                        />

                    ))}

                    <CircleAdd AddFunction={handleAddIndicator} />
                </Frame>

                <Button title="OK" onPress={hideForm} />

            </KeyboardAvoidingView>

        </Container>
    );
}