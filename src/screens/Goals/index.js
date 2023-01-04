import {Bg, Clouds} from './styles';
import cloudsBg from '../../assets/cloudsBg.png';

export default function Goals() {
    return (
        <Bg>
            <Clouds source={cloudsBg} resizeMode="center" iterationCount={'infinite'}  duration={30000} direction={'alternate-reverse'} animation={'pulse'}/>
        </Bg>
       
    );
}