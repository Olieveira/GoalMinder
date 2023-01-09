import { Bg, Clouds, CenterAdvice, TitleAdvice, GoalView, GoalsScrollView, GoalHorizontalView, GoalsText, ViewAnimated } from './styles';
import cloudsBg from '../../assets/cloudsBg.png';
import CircleAdd from '../../components/Buttons/CircleAdd';
import AddForm from '../../components/AddForm';
import { useState, useEffect } from 'react';
import { Keyboard, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize';
import THEME from '../../theme';

export default function Goals() {
    const [formDisplay, setFormDisplay] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    function currentUserView() {
        if (goals.length > 0 && formDisplay == false) {
            return (
                <View>
                    <TitleAdvice>METAS</TitleAdvice>
                    {goals.map((item, i) => (
                        <GoalView key={i}>
                            <GoalHorizontalView>
                                <GoalView>
                                    <Feather
                                        style={{ marginRight: RFPercentage(1.2) }}
                                        name="target"
                                        size={RFPercentage(3.5)}
                                        color={THEME.COLORS.BACKGROUND}
                                    />
                                    <GoalsText>
                                        {item.goal}
                                    </GoalsText>
                                </GoalView>
                                <GoalView>
                                    <Feather
                                        style={{ marginRight: RFPercentage(1.2) }}
                                        name="clock"
                                        size={RFPercentage(3.5)}
                                        color={THEME.COLORS.BACKGROUND}
                                    />
                                    <GoalsText>
                                        {item.time}
                                    </GoalsText>
                                </GoalView>

                            </GoalHorizontalView>
                            <GoalView>
                                <Feather
                                    style={{ marginRight: RFPercentage(1.2) }}
                                    name="flag"
                                    size={RFPercentage(3)}
                                    color={THEME.COLORS.BACKGROUND}
                                />
                                <GoalsText>
                                    {item.indicators}
                                </GoalsText>
                            </GoalView>
                        </GoalView>
                    ))}
                </View>
            );
        } else {
            return (
                <GoalView>
                    <Feather
                        name='info'
                        size={RFPercentage(5)}
                        color={THEME.COLORS.BACKGROUND}
                        style={{ marginBottom: RFPercentage(1) }}
                    />
                    <TitleAdvice>
                        <Text>
                            Nenhum registro encontrado!
                        </Text>
                    </TitleAdvice>
                </GoalView>
            );
        };
    }

    async function fetchData() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        response == null ? null : setGoals(JSON.parse(response));
    }

    function handleShowForm() {
        setFormDisplay(!formDisplay);
        formDisplay ? null : fetchData();
    }

    return (
        <Bg>
            <Clouds
                onPress={Keyboard.dismiss}
                source={cloudsBg}
                resizeMode="center"
                iterationCount={'infinite'}
                duration={30000}
                direction={'alternate-reverse'}
                animation={'pulse'}
            />

            <CenterAdvice >

                <GoalsScrollView>
                    {currentUserView()}
                </GoalsScrollView>

                <ViewAnimated
                    style={{ display: formDisplay ? 'none' : 'flex' }}
                    animation={"tada"}
                    iterationCount="infinite"
                    duration={1000}
                    iterationDelay={800}
                >
                    <CircleAdd AddFunction={handleShowForm} />
                </ViewAnimated>

                {formDisplay ? <AddForm hideForm={handleShowForm} /> : null}

            </CenterAdvice>

        </Bg>

    );
}