import { BgView, HorizontalView, FrameDataView, FrameLabel, MultiplyItensView, SimpleHorizontalView, SimpleView, InputTitle, OptionView, OptionSelectedText, OptionText, OptionsSection } from './styles';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { useEffect } from 'react';

export default function ShowChecks({ placeholder, item, onChangeText, onSelectValue }) {
    const [notifications, setNotifications] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [showingOptionsRepeat, setShowingOptionsRepeat] = useState(false);
    const [selectedValueRepeat, setSelectedValueRepeat] = useState('Selecione');
    const [showingOptionsNotifications, setShowingOptionsNotifications] = useState(false);
    const [selectedValueNotifications, setSelectedValueNotifications] = useState('Selecione');

    const repeatOptions = ['Diário', 'Semanal', 'Mensal', 'Nenhum'];

    const notificationsOptions = ['Diário', 'Semanal', 'Mensal', 'Nenhum'];

    useEffect(() => {
        setNotifications(item.notifications);
        setRepeat(item.repeat);
    }, [])

    const [expandChecksDisplay, setExpandCheckDisplay] = useState(false);



    function handleSelectValue(repeat, notifications) {
        if (repeat !== undefined) {
            setSelectedValueRepeat(repeat);
            onSelectValue(repeat);
        } else if (notifications !== undefined) {
            setSelectedValueNotifications(notifications);
            onSelectValue(undefined, notifications);
        };
    };

    /**
     * Expande as opções dos listBox's
     * 
     * @param {string} opt Indica qual das opções serão expandidas. ['repeat' | 'notifications']
     * 
     */
    function handleExpandList(opt) {
        LayoutAnimation.configureNext({
            duration: 500,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        if (opt == 'repeat') {
            setRepeat(!repeat);
        } else if (opt == 'notifications') {
            setNotifications(!notifications);
        };
    };

    /**
     * Expande a view dos checkList's
     * 
     * @param {string} opt Indica qual das opções serão expandidas. ['repeat' | 'notifications']
     * 
     */
    function handleExpandOptions(opt) {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,

            },
        });

        if (opt == 'repeat') {
            setShowingOptionsRepeat(!showingOptionsRepeat);
        } else if (opt == 'notifications') {
            setShowingOptionsNotifications(!showingOptionsNotifications);
        }
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
                        <MultiplyItensView
                            animation={'fadeIn'}
                        >
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
                                    onPress={() => handleExpandList('repeat')}
                                />

                                {repeat && (
                                    <OptionsSection
                                        animation={'fadeIn'}
                                        delay={100}
                                    >
                                        <SimpleHorizontalView>
                                            <OptionSelectedText>{selectedValueRepeat}</OptionSelectedText>
                                            <Feather
                                                name={showingOptionsRepeat ? 'chevrons-up' : 'chevrons-down'}
                                                size={24}
                                                color={THEME.COLORS.ALERT900}
                                                onPress={() => handleExpandOptions('repeat')}
                                            />
                                        </SimpleHorizontalView>
                                        {showingOptionsRepeat && (
                                            <OptionView
                                                animation={'fadeIn'}
                                                delay={80}
                                            >
                                                {repeatOptions.map((item, index) => (
                                                    <OptionText
                                                        key={index}
                                                        onPress={() => handleSelectValue(item)}>
                                                        {item}
                                                    </OptionText>
                                                ))}
                                            </OptionView>
                                        )}

                                    </OptionsSection>
                                )}

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
                                    onPress={() => handleExpandList('notifications')}
                                />

                                {notifications && (
                                    <OptionsSection
                                        animation={'fadeIn'}
                                    >
                                        <SimpleHorizontalView>
                                            <OptionSelectedText>{selectedValueNotifications}</OptionSelectedText>
                                            <Feather
                                                name={showingOptionsNotifications ? 'chevrons-up' : 'chevrons-down'}
                                                size={24}
                                                color={THEME.COLORS.ALERT900}
                                                onPress={() => handleExpandOptions('notifications')}
                                            />
                                        </SimpleHorizontalView>
                                        {showingOptionsNotifications && (
                                            <OptionView
                                                animation={'fadeIn'}
                                                delay={80}
                                            >
                                                {notificationsOptions.map((item, index) => (
                                                    <OptionText
                                                        key={index}
                                                        onPress={() => handleSelectValue(undefined, item)}>
                                                        {item}
                                                    </OptionText>
                                                ))}
                                            </OptionView>
                                        )}

                                    </OptionsSection>
                                )}

                            </SimpleView>
                        </MultiplyItensView>
                    )}
                </FrameDataView>
            </HorizontalView>

        </BgView>
    );

}