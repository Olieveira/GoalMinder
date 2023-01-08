import { AddButton, Add } from "./styles"
import { MaterialIcons } from "@expo/vector-icons"
import { RFPercentage } from "react-native-responsive-fontsize";
import THEME from '../../../theme';


const plus = () => { return <MaterialIcons name="add-circle-outline" size={100} color={'#fff'} /> }

export default function CircleAdd({AddFunction}) {
    return (
        <AddButton onPress={AddFunction}>
            <MaterialIcons name="add-circle-outline" size={RFPercentage(4)} color={THEME.COLORS.BACKGROUND} />
        </AddButton>

    );
}