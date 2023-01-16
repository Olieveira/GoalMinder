import { RootView, HabitsImage, ImageView, FooterLicenseView, LicenseText, CenterView, HeaderView, HeaderTitle, DefaultView, BodyText } from './styles';
import habitsBg from '../../assets/habitsBg.png'
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';

export default function Habits() {
    const [habits, setHabits] = useState([]);

    function setScreen() {
        if (habits.length <= 0) {
            return (
                <CenterView>
                    <HeaderView>
                        <DefaultView>
                            <Feather
                                name='award'
                                size={24}
                                color={THEME.COLORS.PRIMARY900}
                            />
                        </DefaultView>
                        <HeaderTitle>
                            Habits
                        </HeaderTitle>
                    </HeaderView>
                    <DefaultView style={{backgroundColor: THEME.COLORS.ALERT800}}>
                        <Feather
                            name='info'
                            size={30}
                            color={THEME.COLORS.BACKGROUND}
                        />
                        <BodyText>
                            Nenhum hábito cadastrado!
                        </BodyText>

                    </DefaultView>
                </CenterView>);
        } else {
            return (<></>);
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