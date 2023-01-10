import { useState, useEffect } from 'react';
import { Bg, Clouds, CenterAdvice, TitleAdvice, GoalView, GoalsScrollView, GoalHorizontalView, ViewAnimated, IndicatorsView, DataText, Frame, IndicatorHeader, HeaderIndicatorTitle, IndicatorFrame } from './styles';
import { Keyboard, View, Text, Button } from 'react-native';
import cloudsBg from '../../assets/cloudsBg.png';
import CircleAdd from '../../components/Buttons/CircleAdd';
import AddForm from '../../components/AddForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize';
import THEME from '../../theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Goals() {
    const [formDisplay, setFormDisplay] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        async function startFetchData() {
            await fetchData();
        };
        startFetchData();
    }, []);

    async function fetchData() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");
        response == null ? null : setGoals(JSON.parse(response));
        console.log(response);
    }

    async function handleShowForm() {
        setFormDisplay(!formDisplay);
        await fetchData();
    }


    function currentUserView() {
        if (goals.length > 0 && formDisplay == false) {
            return (
                <View>
                    <TitleAdvice>METAS</TitleAdvice>
                    {goals.map((item, i) => (
                        <GoalView key={i}>
                            <Frame>
                                <IndicatorHeader>
                                    <Feather
                                        style={{
                                            marginRight: RFPercentage(3),
                                            borderRightColor: THEME.COLORS.BACKGROUND,
                                            borderRightWidth: 2,
                                            borderBottomRightRadius: 5,
                                            paddingRight: RFPercentage(1),
                                        }}
                                        name='target'
                                        size={25}
                                        color={THEME.COLORS.BACKGROUND}
                                    />
                                    <HeaderIndicatorTitle>{item.goal.toUpperCase()}</HeaderIndicatorTitle>
                                </IndicatorHeader>
                                <GoalHorizontalView>
                                    <GoalView>
                                        <Feather
                                            style={{ marginRight: RFPercentage(1.2) }}
                                            name="target"
                                            size={RFPercentage(3.5)}
                                            color={THEME.COLORS.BACKGROUND}
                                        />
                                        <DataText>
                                            {item.goal}
                                        </DataText>
                                    </GoalView>
                                    <GoalView>
                                        <Feather
                                            style={{ marginRight: RFPercentage(1.2) }}
                                            name="clock"
                                            size={RFPercentage(3.5)}
                                            color={THEME.COLORS.BACKGROUND}
                                        />
                                        <DataText>
                                            {item.time}
                                        </DataText>
                                    </GoalView>

                                </GoalHorizontalView>
                                <GoalView>
                                    <Feather
                                        style={{ marginRight: RFPercentage(1.2) }}
                                        name="flag"
                                        size={RFPercentage(3)}
                                        color={THEME.COLORS.BACKGROUND}
                                    />
                                    <IndicatorsView>
                                        {item.indicators.map((indicator, index) => (
                                            <IndicatorFrame>
                                                <DataText
                                                    key={`ind${index}`}
                                                >
                                                    {indicator}
                                                </DataText>
                                            </IndicatorFrame>
                                        ))}
                                    </IndicatorsView>
                                </GoalView>
                            </Frame>
                        </GoalView>
                    ))}
                </View>
            );
        } else {
            if (!formDisplay) {
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
            } else {
                return <></>
            }
        };
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

                <GoalsScrollView >
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

                <View
                    style={{ display: formDisplay ? 'none' : 'flex', width: '50%', alignSelf: createNativeStackNavigator }}
                >
                    <Button
                        color={'red'}
                        title='Delete'
                        onPress={() => {
                            AsyncStorage.removeItem("@goalsmanagement:goals");
                            setGoals([]);
                            console.log('deleted');
                        }}
                    />
                </View>

                {formDisplay ? <AddForm hideForm={handleShowForm} /> : null}

            </CenterAdvice>

        </Bg >

    );
}