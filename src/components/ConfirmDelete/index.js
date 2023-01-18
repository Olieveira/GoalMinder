import { InactiveBG, BodyMessage, TitleView, ButtonsView, CenterView, TitleMessage } from './styles'
import GenericButton from "../Buttons/Generic";
import THEME from '../../theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons'
import { useState } from 'react';

/**
 * Componente que exibe mensagens com opções
 * 
 * @param {function} hide Função que define a visibilidade do componente.
 * 
 * @param {function} yes Função chamada ao pressionar botão de confirmação.
 * 
 * @param {function} no Função chamada ao pressionar botão de negação.
 *  
 * @param {string} title Título do componente.
 * 
 * @param {string} message Texto do componente.
 * 
 * @returns {JSX.Element} 
 */
export default function ConfirmDelete({ hide, yes, no, title, message }) {
    const [animation, setAnimation] = useState("fadeIn");
    return (
        <InactiveBG
            animation={animation}
            duration={500}
            onAnimationEnd={animation == 'fadeOut' ? () => hide() : () => { }}
        >
            <CenterView>
                <TitleView>
                    <TitleMessage>
                        {title}
                    </TitleMessage>

                    <Feather
                        onPress={() => setAnimation("fadeOut")}
                        name='x-square'
                        size={24}
                        color={THEME.COLORS.GOALS}
                    />
                </TitleView>
                <BodyMessage>
                    {message}
                </BodyMessage>
                <ButtonsView>
                    <GenericButton
                        icon='x-circle'
                        text='Não'
                        backgroundColor={THEME.COLORS.GOALS}
                        iconColor={THEME.COLORS.TEXT}
                        txtColor={THEME.COLORS.TEXT}
                        borderRadius={5}
                        fontSize={RFPercentage(2.3)}
                        fontFamily={THEME.FONTS.MEDIUM}
                        handleFunction={no !== undefined ? no() : () => setAnimation("fadeOut")}
                        width={RFPercentage(17)}
                        height={RFPercentage(5)}
                    />

                    <GenericButton
                        icon='check-circle'
                        text='Sim'
                        backgroundColor={THEME.COLORS.SUCCESS}
                        iconColor={THEME.COLORS.TEXT}
                        txtColor={THEME.COLORS.TEXT}
                        borderRadius={5}
                        fontSize={RFPercentage(2.3)}
                        fontFamily={THEME.FONTS.MEDIUM}
                        handleFunction={() => {
                            yes();
                            setAnimation("fadeOut")
                        }}
                        width={RFPercentage(17)}
                        height={RFPercentage(5)}
                    />
                </ButtonsView>
            </CenterView>
        </InactiveBG>

    );
}