import { Button, BtnText } from './styles';
import { Feather } from '@expo/vector-icons'

/**
 * 
 * @param {number} width Largura do botão.
 * 
 * @param {string} icon Nome do icone a ser exibido ao lado do texto. (Utilizado biblioteca Feather) {@link https://expo.github.io/vector-icons/}.
 *
 * @param {string} iconColor Cor do icone.
 * 
 * @param {number} iconSize Tamanho do icone.
 * 
 * @param {string} text Texto do botão.
 * 
 * @param {string} backgroundColor Cor do botão.
 * 
 * @param {string} txtColor Cor do texto do botão.
 * 
 * @param {number} borderWidth Largura da borda do botão.
 * 
 * @param {number} borderRadius Curvatura da borda.
 * 
 * @param {string} borderColor Cor da borda.
 * 
 * @param {number} fontSize Tamanho da fonte do texto do botão.
 * 
 * @param {string} fontFamily Fonte do texto do botão.
 * 
 * @param {function} handleFunction Function chamada ao pressionar botão.
 * 
 * @param {string} display Display tag que define a visibilidade do elemento!
 * 
 * @returns {JSX.Element} Componente de função.
 * 
 */
export default function GenericButton({ width, icon, iconColor, iconSize, text, backgroundColor, txtColor, borderWidth, borderRadius, borderColor, fontSize, fontFamily, handleFunction, display }) {
    return (
        <Button
            onPress={handleFunction}
            style={{
                backgroundColor,
                borderWidth,
                borderRadius,
                borderColor,
                width,
                display
            }}>
            <Feather
                style={{ display: icon != undefined ? "flex" : "none", marginRight: text != undefined ? 5 : null }}
                name={icon}
                color={iconColor}
                size={iconSize != undefined ? iconSize : 20}
            />
            <BtnText style={{
                display: text != undefined ? "flex" : "none",
                color: txtColor,
                fontSize,
                fontFamily
            }}>
                {text}
            </BtnText>
        </Button>

    )
}