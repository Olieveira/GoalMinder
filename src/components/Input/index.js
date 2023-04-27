import { TextInput, HContainer, VContainer, LabelText } from "./styles"
import { Feather } from "@expo/vector-icons"
import { useState } from "react";
import THEME from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";

/**
 * Retorna um input com seu respectivo label configurado com base nos parâmetros.
 * 
 * @param {string} [keyboardType='default'] - Tipo do teclado do input = 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
 * 
 * @param {string} placeholder Placeholder do input.
 * 
 * @param {boolean} [secureTextEntry=false] Esconde o texto inserido.
 * 
 * @param {string} showOption Display tag que define a visibilidade do input.
 * 
 * @param {string} label Label do input.
 * 
 * @param {string} icon Nome do icone a ser exibido ao lado do texto. (Utilizado biblioteca Feather) {@link https://expo.github.io/vector-icons/}.
 * 
 * @param {function} onChangeText Função vinculada ao evento onChangeText do input.
 * 
 * @param {string} value Valor do input.
 * 
 * @param {string} returnKeyType Determina a tecla return: 'done' | 'go' | 'next' | 'search' | 'send'.
 * 
 * @param {function} infoShowFunction Função que exibe detalhes sobre o input.
 * 
 * @returns {JSX.Element}
 */
export default function Input({ keyboardType, placeholder, secureTextEntry, showOption, label, icon, onChangeText, value, returnKeyType, infoShowFunction }) {
    const [isFocused, setIsFocused] = useState(false);
    const [isShowed, setIsShowed] = useState(false);

    /**
     * Controla o foco do campo
     */
    function HandleInputFocus() {
        setIsFocused(!isFocused);
    }

    return (
        <VContainer
            animation={'fadeIn'}
            style={{
                height: label == undefined ? RFPercentage(7.2) : RFPercentage(10.7)
            }}>
            <HContainer style={{ display: infoShowFunction == undefined && label == undefined ? 'none' : 'flex' }}>
                <LabelText style={{
                    display: label == undefined ? 'none' : 'flex',
                    color: isFocused ? THEME.COLORS.PRIMARY600 : THEME.COLORS.BACKGROUND,
                }}>
                    {label}
                </LabelText>
                <Feather
                    style={{ display: infoShowFunction == undefined ? 'none' : 'flex', marginTop: RFPercentage(-1.5), marginLeft: RFPercentage(1) }}
                    name='info'
                    size={16}
                    color={isFocused ? THEME.COLORS.PRIMARY600 : THEME.COLORS.BACKGROUND}
                    onPress={infoShowFunction}
                />
            </HContainer>
            <HContainer>
                <Feather
                    name={icon}
                    size={22}
                    color={isFocused ? THEME.COLORS.PRIMARY600 : THEME.COLORS.BACKGROUND}
                />
                <TextInput
                    style={{ borderColor: isFocused ? THEME.COLORS.PRIMARY600 : THEME.COLORS.BACKGROUND }}
                    onFocus={HandleInputFocus}
                    onBlur={HandleInputFocus}
                    keyboardType={keyboardType}
                    autoCapitalize={keyboardType == "email-address" ? 'none' : null}
                    placeholder={placeholder}
                    returnKeyType={returnKeyType}
                    secureTextEntry={isShowed ? false : secureTextEntry}
                    onChangeText={onChangeText}
                    value={value}
                    multiline={true}
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