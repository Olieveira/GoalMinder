import { InformationsFrame, HabitTitle, ExpandedContent, HabitFrame } from './styles';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { LayoutAnimation } from 'react-native';
import { TouchableOpacity } from 'react-native';

/**
 * Componente expandivel para exibição de informações.
 * 
 * @param {string} icon Nome do ícone baseado na biblioteca vector-icons/Feather - https://icons.expo.fyi/.
 * 
 * @param {string} title Título exibido ao lado do icone horizontalmente.
 * 
 * @param {JSX.Element} bodyComponent Elemento exibido ao expandir componente.
 * 
 * @returns 
 */
export default function ShowMore({ icon, title, bodyComponent }) {
    const [expandDisplay, setExpandDisplay] = useState(false);

    /**
     * Define a expansão do componente e sua respectiva animação.
     */
    function handleExpandDisplay() {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,

            },
        });
        setExpandDisplay(!expandDisplay);
    };

    return (
        <InformationsFrame
            animation={'slideInDown'}
        >
            <HabitFrame>
                <Feather
                    name={icon}
                    size={24}
                    color={THEME.COLORS.ALERT900}
                />
                <HabitTitle>{title}</HabitTitle>
                <TouchableOpacity
                    onPress={handleExpandDisplay}
                >
                    <Feather
                        name={expandDisplay ? 'chevrons-up' : 'chevrons-down'}
                        size={20}
                        color={THEME.COLORS.ALERT800}
                    />
                </TouchableOpacity>
            </HabitFrame>
            {expandDisplay && (
                <ExpandedContent
                    animation={'fadeIn'}
                    duration={1000}
                >
                    {bodyComponent}
                </ExpandedContent>
            )}
        </InformationsFrame>
    )
}