import { BgView, HorizontalView, FrameDataView, FrameLabel, HeaderLabel, MultiplyItensView, SimpleHorizontalView, SimpleView, CheckValues, CheckHeaders, CheckVerticalView, CheckHorizontalView, EditButton, DeleteButton, MarkCheckView } from './styles';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { View } from 'react-native-animatable';

export default function ShowHabits({ item, handleEdit, handleDelete, handleChangeBox }) {
    const [expandGoalsDisplay, setExpandGoalsDisplay] = useState(false);
    const [expandChecksDisplay, setExpandCheckDisplay] = useState(false);

    const [linkedGoals, setLinkedGoals] = useState([]); // Informações das metas vinculadas

    useEffect(() => {
        /**
         * Busca as metas vinculadas
         */
        async function fetchGoalsLinked() {

            LayoutAnimation.configureNext({
                duration: 3000,
            });

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
            };

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
        <View
            animation={'fadeIn'}
        >
            <EditButton onPress={handleEdit}>
                <Feather
                    name='edit'
                    size={17}
                    color={THEME.COLORS.ALERT900}
                />
            </EditButton>
            <DeleteButton onPress={handleDelete}>
                <Feather
                    name='x-octagon'
                    size={17}
                    color={THEME.COLORS.ALERT900}
                />
            </DeleteButton>

            <BgView>
                <HorizontalView>
                    <FrameDataView>
                        <HorizontalView style={{ justifyContent: 'center' }}>
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
                            {expandChecksDisplay && item.checklists.map((check, index) => (
                                <CheckValues
                                    key={index}
                                    animation={'fadeIn'}
                                >

                                    <CheckHeaders>
                                        <HeaderLabel>{check.title}</HeaderLabel>

                                        <MarkCheckView
                                            onPress={() => handleChangeBox(index)}
                                        >
                                            <SimpleView
                                                animation={'jello'}
                                                iterationCount={'infinite'}
                                                duration={800}
                                                iterationDelay={1500}
                                            >
                                                <Feather
                                                    name={check.done ? 'check-square' : 'square'}
                                                    size={20}
                                                    color={THEME.COLORS.ALERT900}
                                                />
                                            </SimpleView>
                                        </MarkCheckView>

                                    </CheckHeaders>

                                    <CheckHorizontalView>

                                        <CheckVerticalView>
                                            <HeaderLabel>{check.repeat != false && check.repeat != 'Nenhum' ? check.repeat : 'Desativado'}</HeaderLabel>
                                            <Feather
                                                name={check.repeat != false && check.repeat != 'Nenhum' ? 'repeat' : 'shuffle'}
                                                size={20}
                                                color={THEME.COLORS.ALERT900}
                                            />
                                        </CheckVerticalView>

                                        <CheckVerticalView>
                                            <HeaderLabel>{check.notifications != false && check.notifications != 'Nenhum' ? check.notifications : 'Desativado'}</HeaderLabel>
                                            <Feather
                                                name={check.notifications != false && check.notifications != 'Nenhum' ? 'bell' : 'bell-off'}
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
        </View>
    );

}