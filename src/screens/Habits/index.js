import { RootView, HabitsImage, ImageView, FooterLicenseView, LicenseText, CenterView, HeaderView, HeaderTitle, DefaultView, DefaultHorizontalView, BodyText, HabitsView, HabitFrame, HabitTitle, HabitsScrollView, SuggestionTextView } from './styles';
import habitsBg from '../../assets/habitsBg.png'
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ShowMore from '../../components/ShowMore';
import GenericButton from '../../components/Buttons/Generic';

export default function Habits() {
    const [habits, setHabits] = useState([]);

    /**
     * Cadastra um novo hábito
     */
    function addHabit() {
        setHabits(...habits, 'x');
    }

    /**
     * 
     * @param {object} suggestions Objeto contendo title, array de icones e array de respectivos body text a serem gerados.
     *  
     * @returns {JSX.Element}
     */
    function suggetionsComponent(suggestions) {
        return (
            <DefaultView>
                <BodyText style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: RFPercentage(2.5)
                }}>
                    {suggestions.title}
                </BodyText>
                {suggestions.icon.map((item, index) => (
                    <DefaultHorizontalView
                        key={index}
                        style={{
                            backgroundColor: THEME.COLORS.ALERT900,
                            width: RFPercentage(35)
                        }}>
                        <Feather
                            name={item}
                            size={20}
                            color={THEME.COLORS.SUCCESS}
                        />
                        <SuggestionTextView>
                            <BodyText
                                style={{
                                    color: THEME.COLORS.SUCCESS,
                                    marginTop: 0,
                                    textAlign: 'right',
                                    fontSize: RFPercentage(2)
                                }}>
                                {suggestions.body[index]}
                            </BodyText>
                        </SuggestionTextView>
                    </DefaultHorizontalView>
                ))}
            </DefaultView>
        )
    }

    function setScreen() {
        if (habits.length <= 0) {
            return (
                <CenterView
                    animation={'fadeIn'}
                    duration={1000}
                    delay={800}
                >
                    <HeaderView>
                        <DefaultView>
                            <Feather
                                name='award'
                                size={24}
                                color={THEME.COLORS.PRIMARY900}
                            />
                        </DefaultView>
                        <HeaderTitle style={{ marginLeft: RFPercentage(2) }}>
                            Hábitos
                        </HeaderTitle>
                    </HeaderView>
                    <DefaultView style={{ backgroundColor: THEME.COLORS.ALERT800 }}>
                        <Feather
                            name='info'
                            size={30}
                            color={THEME.COLORS.PRIMARY900}
                        />
                        <BodyText style={{ color: THEME.COLORS.PRIMARY900, marginBottom: RFPercentage(2) }}>
                            Nenhum hábito cadastrado!
                        </BodyText>

                        <GenericButton
                            handleFunction={addHabit}
                            icon='plus-circle'
                            iconColor={THEME.COLORS.BACKGROUND}
                            iconSize={24}
                            text="Novo Hábito"
                            height={RFPercentage(5)}
                            width={RFPercentage(20)}
                            backgroundColor={THEME.COLORS.ALERT900}
                            borderRadius={5}
                            txtColor={THEME.COLORS.BACKGROUND}
                            fontFamily={THEME.FONTS.BOLD}
                        />

                    </DefaultView>
                    <HabitsView>
                        <BodyText style={{ textAlign: 'left', alignSelf: 'flex-start', marginBottom: RFPercentage(1), marginLeft: RFPercentage(1) }}>
                            Algumas sugestões:
                        </BodyText>

                        <HabitsScrollView>
                            <ShowMore
                                icon='book-open'
                                title='Leitura'
                                bodyComponent={suggetionsComponent(
                                    {
                                        title: 'Benefícios da leitura:',
                                        icon: [
                                            'trending-up',
                                            'users',
                                            'smile',
                                            'heart',
                                        ],
                                        body: [
                                            'Aumenta a capacidade cognitiva',
                                            'Aumento da empatia',
                                            'Melhora o bem-estar emocional além de ajudar a combater a ansiedade e melhorar o sono',
                                            'Ajuda a reduzir a pressão arterial e risco de doenças cardíacas',
                                        ]
                                    }
                                )}
                            />

                            <ShowMore
                                icon='pause'
                                title='Parar de fumar'
                                bodyComponent={suggetionsComponent(
                                    {
                                        title: 'Parar de fumar traz uma série de benefícios, visto que é uma das principais causas de morte no mundo.',
                                        icon: [
                                            'activity',
                                            'wind',
                                            'smile',
                                            'shield',
                                        ],
                                        body: [
                                            'Melhoria da saúde cardiovascular',
                                            'Melhoria da saúde respiratória',
                                            'Benefícios estéticos além de economia financeira',
                                            'Proteção para as pessoas ao redor',
                                        ]
                                    }
                                )}
                            />

                            <ShowMore
                                icon='shopping-cart'
                                title='Dieta equiibrada'
                                bodyComponent={suggetionsComponent(
                                    {
                                        icon: [
                                            'activity',
                                            'umbrella',
                                            'shield',
                                            'smile',
                                            'moon'
                                        ],
                                        body: [
                                            'Controle de peso',
                                            'Prevenção de doenças crônicas',
                                            'Melhoria do sistema imunológico',
                                            'Melhoria do humor e do bem-estar geral',
                                            'Melhoria da saúde mental e do sono'
                                        ]
                                    }
                                )}
                            />

                        </HabitsScrollView>


                    </HabitsView>

                </CenterView>);
        } else {
            return (
                <DefaultView>
                    <HeaderView style={{ top: 0 }}>
                        <HeaderTitle>
                            HÁBITOS CADASTRADOS
                        </HeaderTitle>
                    </HeaderView>
                </DefaultView>
            );
        }
    }
    return (
        <RootView>
            <ImageView
                animation='fadeInDownBig'
                duration={1000}
            >
                <HabitsImage
                    source={habitsBg}
                    resizeMode={'center'}
                />
                <FooterLicenseView>
                    <LicenseText>
                        Designed by rawpixel.com / Freepik
                    </LicenseText>
                </FooterLicenseView>
            </ImageView>

            {setScreen()}

        </RootView>
    );
}