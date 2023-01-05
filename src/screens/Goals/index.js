import { Bg, Clouds, CenterAdvice, TitleAdvice } from './styles';
import cloudsBg from '../../assets/cloudsBg.png';
import CircleAdd from '../../components/Buttons/CircleAdd';

import { useState } from 'react';

export default function Goals() {
    const [centerAdviceDisplay, setCenterAdviceDisplay] = useState("flex");

    return (
        <Bg>
            <Clouds source={cloudsBg} resizeMode="center" iterationCount={'infinite'} duration={30000} direction={'alternate-reverse'} animation={'pulse'} />

            <CenterAdvice style={{ display: centerAdviceDisplay }} >
                <TitleAdvice>
                    Nenhum registro!
                </TitleAdvice>

                <CircleAdd />

            </CenterAdvice>




        </Bg>

    );
}