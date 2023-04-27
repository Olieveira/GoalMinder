import { BgView, HorizontalView, FrameDataView, FrameLabel, MultiplyItensView, SimpleHorizontalView, SimpleView, InputTitle, OptionView, OptionSelectedText, OptionText, OptionsSection } from './styles';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { useEffect } from 'react';

/**
 * Retorna o componente para exibição dos checkBox's
 * 
 * @param {string} placeholder Placeholder do titulo da atividade.
 * 
 * @param {object} item Objeto contendo todas informações do checkBox.
 * 
 * @param {function} onChangeText Função chamada ao alterar texto do input do titulo da atividade.
 * 
 * @param {function} onSelectValue Função chamada ao selecionar opção da lista de opções de repetição da atividade.
 * 
 * @returns {JSX.Element} 
 */
export default function ShowChecks({ placeholder, item, onChangeText, onSelectValue }) {
    const [repeat, setRepeat] = useState(false);

    // states que armazenam se as opções de repetição esta expandida e se possui alguma selecionada.
    const [showingOptionsRepeat, setShowingOptionsRepeat] = useState(false);
    const [selectedValueRepeat, setSelectedValueRepeat] = useState('Selecione');

    // define se o display do check esta expandido ou não
    const [expandChecksDisplay, setExpandCheckDisplay] = useState(false);

    // opções da lista de opções de repetição da atividade
    const repeatOptions = ['Diário', 'Semanal', 'Mensal', 'Nenhum'];

    // executado ao iniciar o componente
    useEffect(() => {
        item.repeat != false && setSelectedValueRepeat(item.repeat);
        setRepeat(item.repeat);
    }, [])

    /**
     * Handle chamda quando uma opção da lista de opções é selecionada.
     * 
     * @param {string} repeat valor selecionado
     */
    function handleSelectValue(repeat) {

        if (repeat !== undefined) {
            setSelectedValueRepeat(repeat);
            onSelectValue(repeat);
            setShowingOptionsRepeat(!showingOptionsRepeat);
        };
    };

    /**
    * Expande a view da atividade e exibe a ListBox da repetição da atividade.
     * 
     * @param {string} opt Indica qual das opções serão expandidas. ['repeat']
     * 
     */
    function handleExpandList(opt) {
        // animação
        LayoutAnimation.configureNext({
            duration: 500,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        if (opt == 'repeat') {
            setRepeat(!repeat);
            setSelectedValueRepeat('Selecione');
            onSelectValue(false);
            setShowingOptionsRepeat(false);
        }
    };

    /**
     * Expande as opções do listBox de repetição
     * 
     * @param {string} opt Indica qual das opções serão expandidas. ['repeat']
     * 
     */
    function handleExpandOptions(opt) {
        // animação
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,

            },
        });

        if (opt == 'repeat') {
            setShowingOptionsRepeat(!showingOptionsRepeat);
        }
    };

    /**
     * Expande a view do CheckBox
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
                    <HorizontalView>
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

                        </MultiplyItensView>
                    )}
                </FrameDataView>
            </HorizontalView>

        </BgView>
    );

}