import { BgView, HorizontalView, FrameDataView, FrameLabel, MultiplyItensView, SimpleHorizontalView, SimpleView, InputTitle } from './styles';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { useEffect } from 'react';

export default function ShowChecks({ placeholder, item, onChangeText }) {
    const [notifications, setNotifications] = useState(false);
    const [repeat, setRepeat] = useState(false);

    useEffect(() => {
        console.log(item);
        setNotifications(item.notifications);
        setRepeat(item.repeat);
    }, [])

    const [expandChecksDisplay, setExpandCheckDisplay] = useState(false);

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
                    <HorizontalView style>
                        <Feather
                            name='check-square'
                            size={20}
                            color={THEME.COLORS.ALERT900}
                        />

                        <InputTitle
                            multiline={true}
                            placeholder={placeholder}
                            value={item.title}
                            onChangeText={onChangeText}
                        />
                        <Feather
                            name={expandChecksDisplay ? 'chevrons-up' : 'chevrons-down'}
                            size={24}
                            color={THEME.COLORS.ALERT900}
                            onPress={handleExpandChecks}
                        />
                    </HorizontalView>
                    {expandChecksDisplay && (
                        <MultiplyItensView>
                            <SimpleView>
                                <SimpleHorizontalView>
                                    <Feather
                                        name={repeat ? 'repeat' : 'shuffle'}
                                        size={20}
                                        color={THEME.COLORS.ALERT900}
                                    />
                                    <FrameLabel>Repetições</FrameLabel>
                                </SimpleHorizontalView>
                                <Feather
                                    name={repeat ? 'toggle-right' : 'toggle-left'}
                                    size={25}
                                    color={repeat ? THEME.COLORS.SUCCESS : THEME.COLORS.GOALS}
                                    onPress={() => setRepeat(!repeat)}
                                />
                            </SimpleView>

                            <SimpleView>
                                <SimpleHorizontalView>
                                    <Feather
                                        name={notifications ? 'bell' : 'bell-off'}
                                        size={20}
                                        color={THEME.COLORS.ALERT900}
                                    />
                                    <FrameLabel>Lembrete</FrameLabel>
                                </SimpleHorizontalView>
                                <Feather
                                    name={notifications ? 'toggle-right' : 'toggle-left'}
                                    size={25}
                                    color={notifications ? THEME.COLORS.SUCCESS : THEME.COLORS.GOALS}
                                    onPress={() => setNotifications(!notifications)}
                                />
                            </SimpleView>
                        </MultiplyItensView>
                    )}

                </FrameDataView>
            </HorizontalView>

        </BgView>
    );

}