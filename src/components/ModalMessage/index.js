import { InactiveBG, CenterView, TitleView, TitleMessage, BodyMessage, ButtonsView } from "./styles";
import GenericButton from "../Buttons/Generic";
import THEME from '../../theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons'
import { useState } from 'react';
import { useEffect } from 'react';

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
 * @param {string} type Tipo da exibição da mensagem. ["info", "warning", "success"]
 * 
 * @param {string} closeOnEnd Boolean que define se o modal fecha ao executar a função.
 * 
 * @returns {JSX.Element} 
 */
export default function ModalMessage({ hide, yes, no, title, message, type, closeOnEnd }) {

    const [animation, setAnimation] = useState("fadeIn");
    const [typeIcon, setTypeIcon] = useState('');
    const [colorTheme, setColorTheme] = useState('');


    useEffect(() => {
        type == "info" && setTypeIcon("info");
        type == "warning" && setTypeIcon("alert-circle");
        type == "success" && setTypeIcon("smile");

        type == "info" && setColorTheme(THEME.COLORS.BACKGROUND);
        type == "warning" && setColorTheme(THEME.COLORS.GOALS);
        type == "success" && setColorTheme(THEME.COLORS.SUCCESS);
    }, []);

    return (
        <InactiveBG
            animation={animation}
            duration={300}
            onAnimationEnd={animation == 'fadeOut' ? () => hide() : () => { }}
        >
            <CenterView>
                <TitleView>

                    {type !== undefined && (
                        <Feather
                            name={typeIcon}
                            size={24}
                            color={colorTheme}
                        />
                    )}

                    <TitleMessage style={{ color: colorTheme }}>
                        {title}
                    </TitleMessage>

                    <Feather
                        onPress={() => setAnimation("fadeOut")}
                        name='x-square'
                        size={24}
                        color={colorTheme}
                    />
                </TitleView>
                <BodyMessage>
                    {message}
                </BodyMessage>

                <ButtonsView>

                    <GenericButton
                        icon={no !== undefined && 'x-circle'}
                        text={yes == undefined && no == undefined ? 'Fechar' : 'Não'}
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

                    {yes !== undefined && (

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
                                closeOnEnd ? setAnimation("fadeOut") : null;
                            }}
                            width={RFPercentage(17)}
                            height={RFPercentage(5)}
                        />
                    )}

                </ButtonsView>
            </CenterView>
        </InactiveBG>

    );
}