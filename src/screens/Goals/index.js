import { Bg, Clouds, CenterAdvice, TitleAdvice } from './styles';
import cloudsBg from '../../assets/cloudsBg.png';
import CircleAdd from '../../components/Buttons/CircleAdd';
import AddForm from '../../components/AddForm';
import { useState } from 'react';
import { View } from 'react-native';

export default function Goals() {
    const [centerAdviceDisplay, setCenterAdviceDisplay] = useState(false);

    function handleShowForm() {
        setCenterAdviceDisplay(!centerAdviceDisplay);
    }

    return (
        <Bg>
            <Clouds source={cloudsBg} resizeMode="center" iterationCount={'infinite'} duration={30000} direction={'alternate-reverse'} animation={'pulse'} />

            <CenterAdvice >
                <View style={{ display: centerAdviceDisplay ? "none" : "flex" }}>
                    <TitleAdvice>
                        Nenhum registro!
                    </TitleAdvice>

                    <CircleAdd AddFunction={handleShowForm} />
                </View>

                {centerAdviceDisplay ? <AddForm hideForm={handleShowForm} /> : null}

            </CenterAdvice>

        </Bg>

    );
}