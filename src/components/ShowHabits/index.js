import { BgView, HorizontalView, FrameDataView, FrameLabel, MultiplyItensView, SimpleHorizontalView, SimpleView } from './styles';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    <Feather
                        name='book-open'
                        size={20}
                        color={THEME.COLORS.ALERT900}
                    />
                    <FrameLabel>{item.habit}</FrameLabel>
                </FrameDataView>

                <FrameDataView>
                    <Feather
                        name='watch'
                        size={20}
                        color={THEME.COLORS.ALERT900}
                    />
                    <FrameLabel>{item.time}</FrameLabel>
                </FrameDataView>
            </HorizontalView>

            <HorizontalView>
                <FrameDataView>
                    <HorizontalView>

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

                    {expandGoalsDisplay && linkedGoals.length > 0 && linkedGoals.map((item, index) => (
                        <MultiplyItensView key={index}>

                            <SimpleHorizontalView>
                                <Feather
                                    name='target'
                                    size={20}
                                    color={THEME.COLORS.ALERT900}
                                />
                                <FrameLabel>{item.goal}</FrameLabel>
                            </SimpleHorizontalView>

                            <SimpleHorizontalView>
                                <Feather
                                    name='watch'
                                    size={20}
                                    color={THEME.COLORS.ALERT900}
                                />
                                <FrameLabel>{item.time}</FrameLabel>
                            </SimpleHorizontalView>

                            <SimpleView>
                                <Feather
                                    name='calendar'
                                    size={20}
                                    color={THEME.COLORS.ALERT900}
                                />
                                <FrameLabel>{item.createdAt}</FrameLabel>
                            </SimpleView>

                        </MultiplyItensView>
                    ))}

                </FrameDataView>
            </HorizontalView>

            <HorizontalView>
                <FrameDataView>
                    <HorizontalView>
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
                    {expandChecksDisplay && item.checklists.length > 0 && item.checklists.map((item, index) => (
                        <MultiplyItensView key={index}>
                            <Feather
                                name='check-square'
                                size={20}
                                color={THEME.COLORS.ALERT900}
                            />
                            <FrameLabel>{item.checklist}</FrameLabel>
                        </MultiplyItensView>
                    ))}

                </FrameDataView>
            </HorizontalView>

        </BgView>
    );

}