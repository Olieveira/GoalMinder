import { MainContainer, Title, StatusBar, VerticalContainer, HorizontalContainer } from "./styles";

export default function Home() {
    return (
        <MainContainer>
            <StatusBar animated backgroundColor={"#2596be"} barStyle={"dark-content"} />
            <VerticalContainer>
                <Title>GERENCIADOR DE METAS</Title>
            </VerticalContainer>
        </MainContainer>
    );
}