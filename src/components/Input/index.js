import { TextInput, HContainer, VContainer, LabelText } from "./styles"
import { Feather } from "@expo/vector-icons"
import { useState, useEffect } from "react";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Input(props) {
    const [isFilled, setIsFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isShowed, setIsShowed] = useState(false);

    const keyboardType = props.type || "default";
    const placeholder = props.placeholder || "";
    const secureTextEntry = props.secureTextEntry == true ? true : null
    const showOption = props.showOption;

    function HandleInputFocus() {
        setIsFocused(!isFocused);
    }

    return (
        <VContainer style={{ height: props.label == undefined ? RFPercentage(7.2) : RFPercentage(10.7) }}>
            <LabelText style={{ display: props.label == undefined ? 'none' : 'flex' }}>
                {props.label}
            </LabelText>
            <HContainer>
                <Feather
                    name={props.icon}
                    size={22}
                    color={isFilled || isFocused ? THEME.COLORS.PRIMARY600 : THEME.COLORS.BACKGROUND}
                />
                <TextInput
                    onFocus={HandleInputFocus}
                    onBlur={HandleInputFocus}
                    keyboardType={keyboardType}
                    autoCapitalize={keyboardType == "email-address" ? 'none' : null}
                    placeholder={placeholder}
                    secureTextEntry={isShowed ? false : secureTextEntry}
                />
                <Feather
                    style={{ display: showOption == true ? "flex" : "none" }}
                    name={isShowed ? "eye" : "eye-off"}
                    size={20}
                    color={THEME.COLORS.BACKGROUND}
                    onPress={() => { isShowed ? setIsShowed(false) : setIsShowed(true) }}
                />

            </HContainer>
        </VContainer>
    )
}