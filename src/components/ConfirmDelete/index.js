import { InactiveBG, BodyMessage, TitleView, ButtonsView, CenterView, TitleMessage } from './styles'
import GenericButton from "../Buttons/Generic";
import THEME from '../../theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons'
import { useState } from 'react';

/**
 * Componente que exibe mensagens com opções
 * 
 * @param {string} display Define o display atual do componente.
 * 
 * @param {function} hide Função que define a visibilidade do componente.
 * 
 * @param {function} yes Função chamada ao pressionar botão de confirmação.
 * 
 * @param {function} no Função chamada ao pressionar botão de negação.
 *  
 * @returns {JSX.Element} 
 */
export default function ConfirmDelete({ hide, yes, no }) {
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
                        CONFIRMAÇÃO
                    </TitleMessage>

                    <Feather
                        onPress={() => setAnimation("fadeOut")}
                        name='x-square'
                        size={24}
                        color={THEME.COLORS.GOALS}
                    />
                </TitleView>
                <BodyMessage>
                    Tem certeza que deseja excluir todas as metas cadastradas?
                </BodyMessage>
                <ButtonsView>
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
                        width={RFPercentage(5)}
                    />

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
                        width={RFPercentage(20)}
                    />
                </ButtonsView>
            </CenterView>
        </InactiveBG>

    );
}