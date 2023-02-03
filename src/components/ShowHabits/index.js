import { BgView, HorizontalView, FrameDataView, FrameLabel, HeaderLabel, MultiplyItensView, SimpleHorizontalView, SimpleView, CheckValues, CheckHeaders, CheckVerticalView, CheckHorizontalView } from './styles';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function ShowHabits({ item }) {
    const [expandGoalsDisplay, setExpandGoalsDisplay] = useState(false);
    const [expandChecksDisplay, setExpandCheckDisplay] = useState(false);

    const [linkedGoals, setLinkedGoals] = useState([]);

    useEffect(() => {
        async function fetchGoalsLinked() {
            const response = await AsyncStorage.getItem('@goalsmanagement:goals');

            if (response) {
                const data = JSON.parse(response);
                const linkeds = data.map((goal) => {

                    if (item.linked.includes(goal.id)) {
                        return {
                            goal: goal.goal,
                            time: goal.time,
                            createdAt: goal.createdAt
                        };
                    };
                });
                setLinkedGoals(linkeds.filter((linked) => linked !== undefined));
            }

        };

        fetchGoalsLinked();
    }, [])

    /**
     * Expande a view das metas vinculadas
     */
    function handleExpandGoals() {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,

            },
        });

        setExpandGoalsDisplay(!expandGoalsDisplay);
    };

    /**
     * Expande a view dos checkList's
     */
    function handleExpandChecks() {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,

            },
        });

        setExpandCheckDisplay(!expandChecksDisplay);
    };

    return (
        <BgView>
            <HorizontalView>
                <FrameDataView>
                    <HorizontalView style={{ justifyContent: 'center'}}>
                        <FrameLabel >{item.habit}</FrameLabel>
                    </HorizontalView>
                </FrameDataView>
            </HorizontalView>

            {linkedGoals.length > 0 && (
                <HorizontalView>
                    <FrameDataView style={{
                        paddingTop: expandGoalsDisplay ? null : RFPercentage(0.5),
                    }}>
                        <HorizontalView style={{
                            backgroundColor: expandGoalsDisplay ? THEME.COLORS.PRIMARY900 : null
                        }}>

                            <Feather
                                name='paperclip'
                                size={20}
                                color={THEME.COLORS.ALERT900}
                            />
                            <FrameLabel>Metas vinculadas</FrameLabel>
                            <Feather
                                name={expandGoalsDisplay ? 'chevrons-up' : 'chevrons-down'}
                                size={24}
                                color={THEME.COLORS.ALERT900}
                                onPress={handleExpandGoals}
                            />

                        </HorizontalView>

                        {expandGoalsDisplay && linkedGoals.map((item, index) => (
                            <MultiplyItensView
                                key={index}
                                animation={'fadeIn'}
                            >

                                <SimpleView
                                    style={{
                                        marginBottom: RFPercentage(2.5),
                                        marginHorizontal: RFPercentage(0.5),
                                    }}
                                >
                                    <Feather
                                        name='target'
                                        size={20}
                                        color={THEME.COLORS.ALERT900}
                                    />
                                    <FrameLabel>{item.goal}</FrameLabel>
                                </SimpleView>

                                <SimpleHorizontalView
                                    style={{
                                        borderStyle: 'solid',
                                        borderTopColor: THEME.COLORS.PRIMARY800,
                                        borderTopWidth: 3,
                                        paddingHorizontal: RFPercentage(1),
                                        paddingTop: RFPercentage(1),
                                    }}
                                >
                                    <SimpleView>
                                        <Feather
                                            name='watch'
                                            size={20}
                                            color={THEME.COLORS.ALERT900}
                                        />
                                        <FrameLabel>{item.time}</FrameLabel>
                                    </SimpleView>
                                    <SimpleView>
                                        <Feather
                                            name='calendar'
                                            size={20}
                                            color={THEME.COLORS.ALERT900}
                                        />
                                        <FrameLabel>{item.createdAt}</FrameLabel>
                                    </SimpleView>
                                </SimpleHorizontalView>

                            </MultiplyItensView>
                        ))}

                    </FrameDataView>
                </HorizontalView>
            )}

            {item.checklists.length > 0 && (
                <HorizontalView>
                    <FrameDataView style={{
                        paddingTop: expandChecksDisplay ? null : RFPercentage(0.5),
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10
                    }}>
                        <HorizontalView style={{
                            backgroundColor: expandChecksDisplay ? THEME.COLORS.PRIMARY900 : null
                        }}>
                            <Feather
                                name='check-square'
                                size={20}
                                color={THEME.COLORS.ALERT900}
                            />

                            <FrameLabel>checklists</FrameLabel>

                            <Feather
                                name={expandChecksDisplay ? 'chevrons-up' : 'chevrons-down'}
                                size={24}
                                color={THEME.COLORS.ALERT900}
                                onPress={handleExpandChecks}
                            />
                        </HorizontalView>
                        {expandChecksDisplay && item.checklists.map((item, index) => (
                            <CheckValues key={index}>

                                <CheckHeaders>
                                    <HeaderLabel>{item.title}</HeaderLabel>
                                    <Feather
                                        name='check-square'
                                        size={20}
                                        color={THEME.COLORS.ALERT900}
                                    />
                                </CheckHeaders>

                                <CheckHorizontalView>
                                    <CheckVerticalView>
                                        <HeaderLabel>{item.notifications != false && item.notifications != 'Nenhum' ? item.notifications : 'Desativado'}</HeaderLabel>
                                        <Feather
                                            name={item.notifications != false && item.notifications != 'Nenhum' ? 'bell' : 'bell-off'}
                                            size={20}
                                            color={THEME.COLORS.ALERT900}
                                        />
                                    </CheckVerticalView>

                                    <CheckVerticalView>
                                        <HeaderLabel>{item.repeat != false && item.repeat != 'Nenhum' ? item.repeat : 'Desativado'}</HeaderLabel>
                                        <Feather
                                            name={item.repeat != false && item.repeat != 'Nenhum' ? 'repeat' : 'shuffle'}
                                            size={20}
                                            color={THEME.COLORS.ALERT900}
                                        />
                                    </CheckVerticalView>
                                </CheckHorizontalView>

                            </CheckValues>
                        ))}

                    </FrameDataView>
                </HorizontalView>
            )}
        </BgView>
    );

}