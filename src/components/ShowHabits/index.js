import { BgView, HorizontalView, FrameDataView, FrameLabel, FrameDataText, ScrollView, MultiplyItensView } from './styles';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { useEffect } from 'react';

export default function ShowHabits(item) {
    useEffect(() => {
        console.log(item);
    }, [])

    return (
        <BgView>
            <HorizontalView>
                <FrameDataView>
                    <Feather
                        name='book-open'
                        size={20}
                        color={THEME.COLORS.BACKGROUND}
                    />
                    <FrameLabel>{item.habit}</FrameLabel>
                </FrameDataView>

                <FrameDataView>
                    <Feather
                        name='watch'
                        size={20}
                        color={THEME.COLORS.BACKGROUND}
                    />
                    <FrameLabel>{item.time}</FrameLabel>
                </FrameDataView>

                <FrameDataView>
                    <HorizontalView>
                        <FrameLabel>Metas vinculadas</FrameLabel>
                    </HorizontalView>
                    <ScrollView>
                        {item.linkeds.length > 0 && item.linkeds.map((item, index) => (
                            <MultiplyItensView key={index}>
                                <Feather
                                    name='paperclip'
                                    size={20}
                                    color={THEME.COLORS.BACKGROUND}
                                />
                                <FrameLabel>{item}</FrameLabel>
                            </MultiplyItensView>
                        ))}
                    </ScrollView>
                </FrameDataView>

                <FrameDataView>
                    <HorizontalView>
                        <FrameLabel>Metas vinculadas</FrameLabel>
                    </HorizontalView>
                    <ScrollView>
                        {item.linkeds.length > 0 && item.linkeds.map((item, index) => (
                            <MultiplyItensView key={index}>
                                <Feather
                                    name='paperclip'
                                    size={20}
                                    color={THEME.COLORS.BACKGROUND}
                                />
                                <FrameLabel>{item}</FrameLabel>
                            </MultiplyItensView>
                        ))}
                    </ScrollView>
                </FrameDataView>

            </HorizontalView>



        </BgView>
    );

}