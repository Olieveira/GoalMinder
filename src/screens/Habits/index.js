import { RootView, HabitsImage, ImageView, FooterLicenseView, LicenseText, CenterView, HeaderView, HeaderTitle, DefaultView, DefaultHorizontalView, BodyText, HabitsView, HabitFrame, HabitTitle, HabitsScrollView, SuggestionTextView } from './styles';
import habitsBg from '../../assets/habitsBg.png'
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ShowMore from '../../components/ShowMore';
import GenericButton from '../../components/Buttons/Generic';
import HabitsForm from '../../components/HabitsForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowHabits from '../../components/ShowHabits';
import ModalMessage from '../../components/ModalMessage';
import { LayoutAnimation } from 'react-native';

export default function Habits({ navigation }) {
    // controla visibilidade do formulario de hábitos
    const [formDisplay, setFormDisplay] = useState(false);
    // hábitos
    const [habits, setHabits] = useState([]);
    // visibilidade do botão de exclusão
    const [deleteButton, setDeleteButton] = useState(true);
    // ID de um item passado para edição
    const [editId, setEditId] = useState(undefined);

    // Controla a visibilidade do componente de confirmação
    const [showingConfirmation, setShowingConfirmation] = useState(false);
    // Componente de exibição de mensagens
    const [modalTitle, setModalTitle] = useState('');
    const [messageConfirmation, setMessageConfirmation] = useState('');
    const [modalType, setModalType] = useState('');
    const [modalYes, setModalYes] = useState(); // function executada ao confirmar mensagem

    // restaura os estados quando a tela é desfocada
    useEffect(() => {
        const reset = navigation.addListener('blur', () => {
            setFormDisplay(false);
            setEditId(undefined);
            setShowingConfirmation(false);
        });

        return reset;
    }, [navigation]);

    useEffect(() => {
        fetchData();
    }, []);

    /**
     * Busca informações dos hábitos cadastrados
     */
    async function fetchData() {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        const response = await AsyncStorage.getItem("@goalsmanagement:habits");

        if (response != null) {
            setHabits(JSON.parse(response));
        };
    };

    /**
    * Marca/Desmarca o checkBox do respectivo hábito e insere no histórico de alterações.
    * 
    * @param {string} id ID do hábito que contém o checkBox a ser marcado/desmarcado.
    * 
    * @param {number} i Index do check a ser alterado.
    */
    async function changeChecks(id, i) {
        const response = await AsyncStorage.getItem('@goalsmanagement:habits');
        const data = response ? JSON.parse(response) : [];

        const now = new Date();
        const dia = now.getDate().toString().padStart(2, '0');
        const mes = (now.getMonth() + 1).toString().padStart(2, '0');
        const ano = now.getFullYear().toString();

        const editedAt = `${dia}/${mes}/${ano}`;

        const changed = data.map((habit) => {
            if (habit.id === id) {
                return {
                    createdAt: habit.createdAt,
                    habit: habit.habit,
                    id: habit.id,
                    linked: habit.linked,
                    checklists: habit.checklists.map((check, index) => {
                        if (index === i) {
                            return {
                                done: !check.done,
                                historic: !check.historic.includes(editedAt) && !check.done == true ? [...check.historic, editedAt] : check.historic.filter(item => item !== editedAt),
                                notifications: check.notifications,
                                repeat: check.repeat,
                                title: check.title,
                            };
                        } else {
                            return check;
                        };
                    })
                };
            } else {
                return habit;
            };
        });

        console.log('Check alterado: ', changed)

        await AsyncStorage.setItem('@goalsmanagement:habits', JSON.stringify(changed));
        fetchData();
    };

    /**
     * Exibe uma mensagem no centro da tela.
     * 
     * @param {string} message Título da mensagem. 
     * @param {string} description Mensagem central.
     * @param {string} type Tipo da mensagem: "info" | "success" | "warning."
     * @param {function} yes Função executada ao confirmar a mensagem.
     * 
     */
    function showInfo(title, message, type, yes) {
        setModalTitle(title);

        setMessageConfirmation(message);

        setModalType(type);

        setModalYes(() => yes);

        displayConfirmation();
    };

    /**
     * Altera a exibição da mensagem de confirmação
     */
    function displayConfirmation() {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        setShowingConfirmation(!showingConfirmation);
    };

    /**
     * Muda o display do formulario
     */
    async function changeDisplayForm(toEditId) {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        toEditId != undefined ? setEditId(toEditId) : null;

        await fetchData();

        setFormDisplay(!formDisplay);
    };

    /**
     * Remove um hábito específico
     */
    async function deleteItem(id) {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        const response = await AsyncStorage.getItem('@goalsmanagement:habits');
        const data = response ? JSON.parse(response) : [];

        await AsyncStorage.setItem(
            '@goalsmanagement:habits',
            JSON.stringify(data.filter((item) => item.id !== id))
        );

        await fetchData();
        showInfo('SUCESSO', 'Item excluído com sucesso!', 'success');
    };
    /**
     * Remove todos os hábitos cadastrados
     */
    async function deleteAll() {
        LayoutAnimation.configureNext({
            duration: 300,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });

        await AsyncStorage.removeItem('@goalsmanagement:habits');

        await fetchData();
        setHabits([]);
        showInfo('SUCESSO', 'Todos os hábitos foram excluídos com sucesso!', 'success');
    };

    /**
     * 
     * @param {object} suggestions Objeto contendo title, array de icones e array de respectivos body text a serem gerados.
     *  
     * @returns {JSX.Element}
     */
    function suggetionsComponent(suggestions) {
        return (
            <DefaultView>
                {suggestions.title !== undefined ? (
                    <BodyText style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: RFPercentage(2.5)
                    }}>
                        {suggestions.title}
                    </BodyText>
                ) : null}
                {suggestions.icon.map((item, index) => (
                    <DefaultHorizontalView
                        key={index}
                        style={{
                            backgroundColor: THEME.COLORS.ALERT900,
                            width: RFPercentage(35)
                        }}>
                        <Feather
                            name={item}
                            size={20}
                            color={THEME.COLORS.SUCCESS}
                        />
                        <SuggestionTextView>
                            <BodyText
                                style={{
                                    color: THEME.COLORS.SUCCESS,
                                    marginTop: 0,
                                    textAlign: 'right',
                                    fontSize: RFPercentage(2)
                                }}>
                                {suggestions.body[index]}
                            </BodyText>
                        </SuggestionTextView>
                    </DefaultHorizontalView>
                ))}
            </DefaultView>
        )
    }

    return (
        <RootView>
            <ImageView
                animation='fadeInDownBig'
                duration={1000}
            >
                <HabitsImage
                    source={habitsBg}
                    resizeMode={'center'}
                />
                <FooterLicenseView>
                    <LicenseText>
                        Designed by rawpixel.com / Freepik
                    </LicenseText>
                </FooterLicenseView>
            </ImageView>

            {/* Tela quando não houver itens cadastrados */}
            {!formDisplay && habits.length <= 0 && (
                <CenterView
                    animation={'fadeIn'}
                    duration={1000}
                    delay={800}
                >
                    <HeaderView>
                        <DefaultView>
                            <Feather
                                name='award'
                                size={24}
                                color={THEME.COLORS.PRIMARY900}
                            />
                        </DefaultView>
                        <HeaderTitle style={{ marginLeft: RFPercentage(2) }}>
                            Hábitos
                        </HeaderTitle>
                    </HeaderView>
                    <DefaultView style={{ backgroundColor: THEME.COLORS.ALERT800 }}>
                        <Feather
                            name='info'
                            size={30}
                            color={THEME.COLORS.PRIMARY900}
                        />
                        <BodyText style={{ color: THEME.COLORS.PRIMARY900, marginBottom: RFPercentage(2) }}>
                            Nenhum hábito cadastrado!
                        </BodyText>

                        <GenericButton
                            handleFunction={changeDisplayForm}
                            icon='plus-circle'
                            iconColor={THEME.COLORS.BACKGROUND}
                            iconSize={24}
                            text="Novo Hábito"
                            height={RFPercentage(5)}
                            width={RFPercentage(20)}
                            backgroundColor={THEME.COLORS.ALERT900}
                            borderRadius={5}
                            txtColor={THEME.COLORS.BACKGROUND}
                            fontFamily={THEME.FONTS.BOLD}
                        />

                    </DefaultView>
                    <HabitsView>
                        <BodyText style={{
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                            marginBottom: RFPercentage(1),
                            marginLeft: RFPercentage(1)
                        }}>
                            Algumas sugestões:
                        </BodyText>

                        <HabitsScrollView style={{ maxHeight: RFPercentage(50) }}>
                            <ShowMore
                                icon='book-open'
                                title='Leitura'
                                bodyComponent={suggetionsComponent(
                                    {
                                        icon: [
                                            'trending-up',
                                            'users',
                                            'smile',
                                            'heart',
                                        ],
                                        body: [
                                            'Aumenta a capacidade cognitiva',
                                            'Aumento da empatia',
                                            'Melhora o bem-estar emocional além de ajudar a combater a ansiedade e melhorar o sono',
                                            'Ajuda a reduzir a pressão arterial e risco de doenças cardíacas',
                                        ]
                                    }
                                )}
                            />

                            <ShowMore
                                icon='pause'
                                title='Parar de fumar'
                                bodyComponent={suggetionsComponent(
                                    {
                                        icon: [
                                            'activity',
                                            'wind',
                                            'smile',
                                            'shield',
                                        ],
                                        body: [
                                            'Melhoria da saúde cardiovascular',
                                            'Melhoria da saúde respiratória',
                                            'Benefícios estéticos além de economia financeira',
                                            'Proteção para as pessoas ao redor',
                                        ]
                                    }
                                )}
                            />

                            <ShowMore
                                icon='shopping-cart'
                                title='Dieta equilibrada'
                                bodyComponent={suggetionsComponent(
                                    {
                                        icon: [
                                            'activity',
                                            'umbrella',
                                            'shield',
                                            'smile',
                                            'moon'
                                        ],
                                        body: [
                                            'Controle de peso',
                                            'Prevenção de doenças crônicas',
                                            'Melhoria do sistema imunológico',
                                            'Melhoria do humor e do bem-estar geral',
                                            'Melhoria da saúde mental e do sono'
                                        ]
                                    }
                                )}
                            />

                        </HabitsScrollView>


                    </HabitsView>

                </CenterView>
            )
            }

            {/* Tela quando houver item(s) cadastrado(s) */}
            {!formDisplay && habits.length > 0 && (
                <CenterView
                    animation={'fadeIn'}
                    duration={1000}
                >
                    <HeaderView>
                        <DefaultView>
                            <Feather
                                name='award'
                                size={24}
                                color={THEME.COLORS.BACKGROUND}
                            />
                        </DefaultView>
                        <HeaderTitle style={{ marginLeft: RFPercentage(2) }}>
                            Hábitos
                        </HeaderTitle>
                    </HeaderView>

                    <HabitsView>
                        <HabitsScrollView>
                            {habits.map((habito, index) => (
                                <DefaultView key={index}>
                                    <ShowHabits
                                        item={habito}
                                        handleEdit={() => {
                                            changeDisplayForm(habito.id);
                                        }}
                                        handleDelete={() =>
                                            showInfo(
                                                'CONFIRMAÇÃO',
                                                `Deseja excluir o item (${habito.habit}) ?`,
                                                'warning',
                                                () => deleteItem(habito.id)
                                            )}
                                        handleChangeBox={(checkIndex) => {
                                            changeChecks(habito.id, checkIndex);
                                        }}
                                    />
                                </DefaultView>
                            ))}
                        </HabitsScrollView>
                    </HabitsView>

                    {deleteButton && (
                        <DefaultHorizontalView
                            style={{ justifyContent: 'center' }}
                        >
                            <GenericButton
                                handleFunction={async () => showInfo("CONFIRMAÇÃO", `Tem certeza que deseja excluir todos os hábitos cadastrados (${habits.length}) ?`, 'warning', async () => await deleteAll())}
                                icon='plus-circle'
                                iconColor={THEME.COLORS.GOALS}
                                iconSize={24}
                                text="Excluir tudo"
                                height={RFPercentage(5)}
                                width={RFPercentage(20)}
                                borderRadius={5}
                                txtColor={THEME.COLORS.GOALS}
                                fontFamily={THEME.FONTS.BOLD}
                            />

                            <GenericButton
                                handleFunction={changeDisplayForm}
                                icon='plus-circle'
                                iconColor={THEME.COLORS.SUCCESS}
                                iconSize={24}
                                text="Novo Hábito"
                                height={RFPercentage(5)}
                                width={RFPercentage(20)}
                                borderRadius={5}
                                txtColor={THEME.COLORS.SUCCESS}
                                fontFamily={THEME.FONTS.BOLD}
                            />

                        </DefaultHorizontalView>
                    )}

                </CenterView>
            )}


            {formDisplay && (
                <HabitsForm
                    id={editId}
                    hideForm={changeDisplayForm}
                    showMessage={(title, msg, type, yes) => showInfo(title, msg, type, yes)}
                    handleDelete={(id) => deleteItem(id)}
                />
            )}

            {showingConfirmation && (
                <ModalMessage
                    hide={displayConfirmation}
                    yes={modalYes}
                    title={modalTitle}
                    message={messageConfirmation}
                    type={modalType}
                    closeOnEnd={false}
                />
            )}

        </RootView>
    );
}