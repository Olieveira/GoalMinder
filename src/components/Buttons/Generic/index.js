import { Button, BtnText } from './styles';
import { Feather } from '@expo/vector-icons'


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