import { AddButton } from "./styles"
import { MaterialIcons } from "@expo/vector-icons"
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../../theme';

/**
 * Retorna um botão de adicionar.
 * 
 * @param AddFunction Função executada ao pressionar button.
 *  
 * @returns {JSX.Element} Componente de função.
 */
export default function CircleAdd({ AddFunction }) {
    return (
        <AddButton onPress={AddFunction}>
            <MaterialIcons name="add-circle-outline" size={RFPercentage(4)} color={THEME.COLORS.BACKGROUND} />
        </AddButton>

    );
}