import { TextInput, HContainer, VContainer, LabelText } from "./styles"
import { Feather } from "@expo/vector-icons"
import { useState, useEffect } from "react";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Input({ keyboardType, placeholder, secureTextEntry, showOption, label, icon, onChangeText, value }) {
    const [isFilled, setIsFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isShowed, setIsShowed] = useState(false);

    function HandleInputFocus() {
        setIsFocused(!isFocused);
    }

    return (
        <VContainer style={{ height: label == undefined ? RFPercentage(7.2) : RFPercentage(10.7) }}>
            <LabelText style={{ display: label == undefined ? 'none' : 'flex' }}>
                {label}
            </LabelText>
            <HContainer>
                <Feather
                    name={icon}
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
                    onChangeText={onChangeText}
                    value={value}
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