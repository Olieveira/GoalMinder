import { Container, Frame } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Button } from "react-native";

export default function AddForm({ hideForm }) {

    function handleAddIndicator() {
        Toast.show({
            autoHide: true,
            position: "top",
            text1: "SUCESSO!",
            text2: "Indicador adicionado!"
        });
    }

    return (
        <Container>
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

            <Frame contentContainerStyle={{ alignItems: "center", padding: 10 }}>
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                    label="INDICADORES"
                />
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                />
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                />
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                />
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                />
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                />
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                />
                <Input
                    icon="flag"
                    placeholder="Ex.: Treino Diário"
                />

                <CircleAdd AddFunction={handleAddIndicator} />
            </Frame>

            <Button title="OK" onPress={hideForm} />

            <Toast />

        </Container>
    );
}