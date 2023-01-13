import { Button, BtnText } from './styles';
import { Feather } from '@expo/vector-icons'

/**
 * 
 * @param width Largura do botão.
 * 
 * @param icon Nome do icone a ser exibido ao lado do texto. (Utilizado biblioteca Feather) {@link https://expo.github.io/vector-icons/}.
 *
 * @param iconColor Cor do icone.
 * 
 * @param iconSize Tamanho do icone.
 * 
 * @param text Texto do botão.
 * 
 * @param backgroundColor Cor do botão.
 * 
 * @param txtColor Cor do texto do botão.
 * 
 * @param borderWidth Largura da borda do botão.
 * 
 * @param borderRadius Curvatura da borda.
 * 
 * @param borderColor Cor da borda.
 * 
 * @param fontSize Tamanho da fonte do texto do botão.
 * 
 * @param fontFamily Fonte do texto do botão.
 * 
 * @param handleFunction Function chamada ao pressionar botão.
 * 
 * @returns Componente de função.
 * 
 */
export default function GenericButton({ width, icon, iconColor, iconSize, text, backgroundColor, txtColor, borderWidth, borderRadius, borderColor, fontSize, fontFamily, handleFunction }) {
    return (
        <Button
            onPress={handleFunction}
            style={{
                backgroundColor,
                borderWidth,
                borderRadius,
                borderColor,
                width
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