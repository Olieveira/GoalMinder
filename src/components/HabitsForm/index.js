import { Container, CenterView, Frame, Label, ButtonsView, VerticalButtonsView, GoalsLabelView, DefaultView, HorizontalGoalsView, GoalsText, BgCenterView, HeaderView, HeaderTitle } from "./styles";
import Input from "../Input";
import CircleAdd from '../Buttons/CircleAdd'
import { useState, useEffect } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFPercentage } from "react-native-responsive-fontsize";
import GenericButton from "../Buttons/Generic";
import THEME from "../../theme";
import { Feather } from '@expo/vector-icons';
import ShowChecks from "../ShowChecks";
import { useRef } from "react";
import { LayoutAnimation } from "react-native";
import { View } from "react-native-animatable";

/**
 * 
 * @param {function} hideForm Function que destrói ou torna o form invisível.
 * 
 * @param {function} showMessage Function que exibe mensagens de sucesso na tela do componente pai.
 * 
 * @param {string} id ID referente a um item específico (quando chamado para edição).
 */
export default function HabitsForm({ hideForm, showMessage, id, handleDelete }) {

    // texto do botão de cadastro/edit ['EDITAR' || 'CADASTRAR']
    const [submitButtonText, setSubmitButtonText] = useState("");

    //visibilidade do botão DELETE ['flex' || 'none']
    const [deleteButton, setDeleteButton] = useState(undefined);

    // states dos inputs
    const [habit, setHabit] = useState("");

    // states dos dados armazenados
    const [checklists, setCheckLists] = useState([]);
    const [links, setLinks] = useState([{}]);
    const [linksLoaded, setLinksLoaded] = useState(false); // diz se o state do link ja recebeu os dados do fetch

    // referência aos scrollView's para manipulá-los
    const checkListsScroll = useRef(null);
    const centerViewScroll = useRef(null);

    // Busca as informações cadastradas quando a tela é iniciada
    useEffect(() => {
        fetchData();
    }, []);

    // Verifica quando os links são carregados
    useEffect(() => {
        if (linksLoaded) {
            if (typeof (id) == "string") {
                loadItemToEdit(id);
                setSubmitButtonText("EDITAR");
                setDeleteButton("flex");
            } else {
                setSubmitButtonText("CADASTRAR");
                setDeleteButton("none");
            };
        };

    }, [linksLoaded]);

    /**
     * Carrega as informações do item clicado para edição.
     * 
     * @param {number} id Id do item a ser carregado. 
     */
    async function loadItemToEdit(id) {
        const response = await AsyncStorage.getItem('@goalsmanagement:habits');
        const data = response ? JSON.parse(response) : [];

        // busca em todo o cadastro o item procurado 
        data.map((item) => {
            if (item.id === id) {
                setHabit(item.habit);

                // verifica se o item possui metas vinculadas
                const linkados = links.map((link, index) => {
                    if (item.linked.includes(link.id)) {
                        return index;
                    }
                }).filter(item => item !== undefined);

                handleChangeLinks(undefined, linkados); // chama função que define o vinculo das metas com o habito

                const checks = item.checklists.map((check) => {
                    return {
                        title: check.title,
                        repeat: check.repeat,
                        done: check.done,
                        historic: check.historic,
                        created: check.created
                    };
                });

                setCheckLists(checks);
            };
        });

    };

    /**
     * Faz a edição do titulo do checkBox na respectiva posição no array.
     * 
     * @param {number} i Posição no array do checklist a ser editado. 
     * 
     * @param {string} text Titulo do checkBox a ser editado.
     * 
     * @param {string} repeat Texto que define a repetição do checkBox.
     */
    function editCheckList(i, text, repeat) {
        setCheckLists(current => {
            const edited = [...current];

            text !== undefined ? edited[i].title = text : null;

            repeat !== undefined ? edited[i].repeat = repeat : null;

            return edited;
        });
    };

    /**
     *  Adiciona um checkBox no useState utilizado para armazenar todos os check's 
     */
    function handleAddCheckList() {
        LayoutAnimation.configureNext({
            duration: 100,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            }
        });

        // pega a data atual e converte para "dd/mm/yyyy"
        const now = new Date();
        const dia = now.getDate().toString().padStart(2, '0');
        const mes = (now.getMonth() + 1).toString().padStart(2, '0');
        const ano = now.getFullYear().toString();

        const created = `${dia}/${mes}/${ano}`;


        setCheckLists([...checklists, { title: '', repeat: false, done: false, historic: [], created: created }]);

        // usa os Ref's para rodar as scrolls para final.
        checkListsScroll.current.scrollToEnd({ animated: true });
        centerViewScroll.current.scrollToEnd({ animated: true });
    };

    /**
     * Deleta um checkBox no useState utilizado para armazenar todos os checkBox's
     * 
     * @param {number} index Index do checkBox a ser deletado no useState.
     */
    function deleteCheck(index) {
        // filtra o useState com todos os checks retirando o do index informado
        const filtered = checklists.filter((check, i) => i !== index);

        setCheckLists(filtered);
    };

    /**
     * Vincula ou desvincula as metas do item aberto.
     * 
     * @param {number} i Posição da meta a ser vinculada.
     * 
     * @param {Array} array Array com mais de uma posição para alteração em conjunto. 
     */
    function handleChangeLinks(i, array) {

        // se foi informado o index do item
        if (i !== undefined) {
            setLinks(links.map((item, index) => {
                if (i == index) {
                    return {
                        'linked': !item.linked,
                        'id': item.id,
                        'goal': item.goal,
                        'time': item.time
                    };
                } else {
                    return item;
                };
            }))
            // se foi informado o array e possui pelo menos uma posição
        } else if (array !== undefined && array.length > 0) {
            setLinks(links.map((item, index) => {
                if (array.includes(index)) {
                    return {
                        'linked': !item.linked,
                        'id': item.id,
                        'goal': item.goal,
                        'time': item.time
                    };
                } else {
                    return item;
                };
            }))
        }
    };

    /**
     * Busca todas as metas cadastradas.
     */
    async function fetchData() {
        const response = await AsyncStorage.getItem("@goalsmanagement:goals");

        if (response != null) {
            const data = JSON.parse(response);

            setLinks(data.map((item) => {
                return {
                    'linked': item.linked,
                    'id': item.id,
                    'goal': item.goal,
                    'time': item.time
                };
            }).filter((item) => item !== undefined)
            );

            setLinksLoaded(true);
        } else {
            setLinks([]);
            setLinksLoaded(true);
        };
    };

    /**
     * Define as alterações do item aberto no cadastro dos HÁBITOS
     */
    async function submitHabitsChanges() {
        const response = await AsyncStorage.getItem("@goalsmanagement:habits");
        const previousData = response ? JSON.parse(response) : [];

        // busca o item aberto no cadastro e realiza as alterações dos HÁBITOS.
        const newData = previousData.map((item) => {
            if (item.id == id) {
                return {
                    id: item.id,
                    habit,
                    createdAt: item.createdAt,
                    checklists,
                    linked: links.map(item => item.linked ? item.id : null).filter(item => item != undefined && item != null)
                };
            } else {
                return item;
            };
        });

        await AsyncStorage.setItem("@goalsmanagement:habits", JSON.stringify(newData.filter(item => item !== undefined)));
    };

    /**
     * Define as alterações do item aberto no modo edição.
     */
    async function handleSubmitEdit() {

        // Se o campo "HÁBITO" e todos os checkBox's estão preenchidos. 
        if (habit != "" && !checklists.find(item => item.title == "" || item.title == undefined)) {

            await submitHabitsChanges(); // realiza as alterações nos hábitos

            showMessage('SUCESSO!', 'Hábito editado com sucesso!', 'success');
            hideForm();
        } else {
            showMessage("OPS!", "Preencha os campos para editar uma meta!", "warning");
        };

    };

    /**
     * Realiza a validação dos campos e cadastra o item se validado.
     */
    async function handleSubmit() {

        const id = uuidv4(); // id gerado para o item aberto.

        // pega a data atual e converte para "dd/mm/yyyy"
        const now = new Date();
        const dia = toString(now.getDate()).length > 1 ? now.getDate() : `0${now.getDate()}`;
        const mes = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
        const ano = now.getFullYear();

        const createdAt = `${dia}/${mes}/${ano}`;

        const newData = {
            id,
            habit,
            linked: links.map(item => item.linked ? item.id : null).filter(item => item !== undefined && item !== null),
            checklists: checklists.filter(item => item.title != ''),
            createdAt
        };

        // Se o campo "Hábito" estiver preenchido realiza o cadastro.
        if (habit != "") {

            const response = await AsyncStorage.getItem("@goalsmanagement:habits");
            const previousData = response ? JSON.parse(response) : [];

            const data = [...previousData, newData]

            await AsyncStorage.setItem("@goalsmanagement:habits", JSON.stringify(data));

            showMessage('SUCESSO', 'Hábito cadastrado com sucesso!', 'success');

            hideForm();
        } else {
            showMessage("OPS!", "Preencha os campos para cadastrar uma meta!", "warning");
        };
    };

    return (
        <Container
            onPress={Keyboard.dismiss}
            animation='fadeIn'
            delay={200}
        >
            <BgCenterView>
                <HeaderView><HeaderTitle>{typeof (id) == "string" ? 'EDITAR' : 'NOVO HÁBITO'}</HeaderTitle></HeaderView>
                <CenterView
                    ref={centerViewScroll}
                    shouldCancelWhenOutside={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: "center",
                    }}>

                    <DefaultView style={{ margin: RFPercentage(1.8) }}>
                        <Input
                            style={{ focused: true }}
                            placeholder="Ex.: Parar de fumar."
                            icon="repeat"
                            label="HÁBITO"
                            onChangeText={setHabit}
                            returnKeyType="next"
                            value={habit}
                            infoShowFunction={() => showMessage("DICA", "Estabeleça um hábito que possa ser alcançado e periódicamente mensurado para o acompanhamento de seu progresso!", "info")}
                        />
                    </DefaultView>
                    <GoalsLabelView>
                        <Feather
                            name='shuffle'
                            size={18}
                            color={THEME.COLORS.BACKGROUND}
                        />
                        <DefaultView>
                            <Label>VINCULAR METAS</Label>
                            <Feather
                                style={{ position: 'absolute', right: -RFPercentage(3), top: -RFPercentage(1) }}
                                name='info'
                                size={17}
                                color={THEME.COLORS.BACKGROUND}
                                onPress={() =>
                                    showMessage("RELACIONAR METAS", "Vincule seu hábito com as metas cadastradas!\n\nIsso facilitará a vizualização e o acompanhamento de seu progresso!", "info")
                                }
                            />
                        </DefaultView>
                    </GoalsLabelView>

                    <DefaultView style={{ flex: 1, width: RFPercentage(46), maxHeight: RFPercentage(45), justifyContent: 'center', alignItems: 'center' }}>
                        <Frame
                            nestedScrollEnabled={true}
                            style={{ padding: RFPercentage(1) }}
                            contentContainerStyle={{
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <KeyboardAvoidingView behavior="position" enabled>
                                {links.length > 0 && links.map((item, index) => (
                                    <DefaultView key={index}>
                                        <HorizontalGoalsView>
                                            <Feather
                                                name="target"
                                                size={20}
                                                color={THEME.COLORS.ALERT900}
                                            />
                                            <GoalsText>
                                                {item.goal + ' em ' + item.time}
                                            </GoalsText>
                                            <DefaultView
                                                animation={item.linked ? 'fadeIn' : 'fadeOut'}
                                                duration={item.linked ? 700 : 300}
                                                direction={item.linked ? null : "alternate-reverse"}
                                            >
                                                <Feather
                                                    name={item.linked ? "shuffle" : "refresh-cw"}
                                                    size={18}
                                                    color={item.linked ? THEME.COLORS.TEXT : THEME.COLORS.ALERT900}
                                                    onPress={() => { handleChangeLinks(index) }}
                                                />
                                            </DefaultView>
                                        </HorizontalGoalsView>
                                    </DefaultView>
                                ))}
                                {links.length <= 0 && (
                                    <DefaultView
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: THEME.COLORS.PRIMARY800,
                                            padding: RFPercentage(1),
                                            borderRadius: 5,
                                            borderColor: THEME.COLORS.BACKGROUND,
                                            borderWidth: 2
                                        }}
                                    >
                                        <Feather
                                            style={{ marginBottom: RFPercentage(0.8) }}
                                            name="info"
                                            size={24}
                                            color={THEME.COLORS.ALERT900}
                                        />
                                        <GoalsText style={{ textAlign: "center" }}>
                                            {'Nenhuma meta cadastrada!\n\nCrie novas METAS para vinculá-las com seus hábitos.\n'}
                                        </GoalsText>
                                    </DefaultView>
                                )}

                            </KeyboardAvoidingView>
                        </Frame>
                    </DefaultView>

                    <GoalsLabelView>
                        <Feather
                            name='check-square'
                            size={18}
                            color={THEME.COLORS.BACKGROUND}
                        />
                        <DefaultView>
                            <Label>CHECKLIST'S</Label>
                            <Feather
                                style={{ position: 'absolute', right: -RFPercentage(3), top: -RFPercentage(1) }}
                                name='info'
                                size={17}
                                color={THEME.COLORS.BACKGROUND}
                                onPress={() =>
                                    showMessage("CHECKLISTS", "Crie atividades frequentes e fortaleça sua caminhada para a habituação!\n\nIsso ajuda a proporcionar recompensas ao seu cérebro sempre que uma atividade é realizada.", "info")
                                }
                            />
                        </DefaultView>
                    </GoalsLabelView>

                    <DefaultView style={{ flex: 1, width: RFPercentage(46), maxHeight: RFPercentage(53) }}>
                        <Frame
                            ref={checkListsScroll}
                            nestedScrollEnabled={true}
                            style={{ marginBottom: RFPercentage(1) }}
                            contentContainerStyle={{
                                alignItems: "center",
                                padding: RFPercentage(1),
                            }}>
                            <KeyboardAvoidingView behavior="position" enabled>

                                {checklists.length > 0 && checklists.map((item, index) => (
                                    <DefaultView
                                        key={index}
                                        animation={'fadeIn'}
                                        duration={350}
                                    >
                                        <ShowChecks
                                            placeholder={'Ex.: Ler 10 páginas.'}
                                            item={checklists[index]}
                                            onChangeText={(text) => { editCheckList(index, text) }}
                                            onSelectValue={(repeat) => { editCheckList(index, undefined, repeat) }}
                                            onDeleteCheck={() => {
                                                showMessage(
                                                    "CONFIRMAÇÃO",
                                                    "Tem certeza que deseja excluir essa atividade?",
                                                    "warning",
                                                    () => deleteCheck(index) // deleta o check
                                                    ,
                                                    true // fechar ao pressionar sim
                                                )
                                            }}
                                        />
                                    </DefaultView>
                                ))}

                                {checklists.length < 1 && (
                                    <DefaultView
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: THEME.COLORS.PRIMARY800,
                                            padding: RFPercentage(1),
                                            borderRadius: 5,
                                            borderColor: THEME.COLORS.BACKGROUND,
                                            borderWidth: 2
                                        }}
                                    >
                                        <Feather
                                            style={{ marginBottom: RFPercentage(0.8) }}
                                            name="activity"
                                            size={24}
                                            color={THEME.COLORS.ALERT900}
                                        />
                                        <GoalsText style={{ textAlign: "center" }}>
                                            {'Cadastre atividades e realize durante seu caminho à habituação!\n'}
                                        </GoalsText>
                                    </DefaultView>
                                )}

                            </KeyboardAvoidingView>

                            <DefaultView
                                animation={"tada"}
                                iterationCount="infinite"
                                duration={1000}
                                iterationDelay={800}
                            >
                                <CircleAdd AddFunction={() => handleAddCheckList()} />
                            </DefaultView>
                        </Frame>
                    </DefaultView>

                </CenterView>
                <VerticalButtonsView>
                    <ButtonsView>
                        <GenericButton
                            icon='skip-back'
                            text='VOLTAR'
                            backgroundColor={THEME.COLORS.ALERT800}
                            iconColor={THEME.COLORS.SUCCESS}
                            txtColor={THEME.COLORS.SUCCESS}
                            borders={false}
                            height={RFPercentage(5)}
                            width={RFPercentage(20)}
                            borderRadius={5}
                            fontSize={RFPercentage(2.3)}
                            fontFamily={THEME.FONTS.MEDIUM}
                            handleFunction={hideForm}
                        />

                        <GenericButton
                            icon='check-circle'
                            text={submitButtonText}
                            backgroundColor={THEME.COLORS.SUCCESS}
                            iconColor={THEME.COLORS.TEXT}
                            txtColor={THEME.COLORS.TEXT}
                            height={RFPercentage(5)}
                            width={RFPercentage(20)}
                            borderRadius={5}
                            fontSize={RFPercentage(2.3)}
                            fontFamily={THEME.FONTS.MEDIUM}
                            handleFunction={typeof (id) == "string" ? handleSubmitEdit : handleSubmit}
                        />
                    </ButtonsView>

                    {deleteButton == 'flex' && (
                        <View style={{ paddingBottom: RFPercentage(1) }}>
                            <GenericButton
                                icon='x-octagon'
                                text='EXCLUIR'
                                backgroundColor={THEME.COLORS.GOALS}
                                iconColor={THEME.COLORS.TEXT}
                                txtColor={THEME.COLORS.TEXT}
                                borderRadius={5}
                                fontSize={RFPercentage(2.3)}
                                fontFamily={THEME.FONTS.MEDIUM}
                                handleFunction={() => {
                                    showMessage(
                                        "CONFIRMAÇÃO",
                                        "Tem certeza que deseja excluir essa meta?",
                                        "warning",
                                        () => {
                                            handleDelete(id);
                                            hideForm();
                                        })
                                }}
                                width={RFPercentage(20)}
                            />
                        </View>
                    )}

                </VerticalButtonsView>
            </BgCenterView>

        </Container>
    );
}