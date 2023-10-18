/* eslint-disable prettier/prettier */ /* eslint-disable react-hooks/exhaustive-deps */
import React = require('react');
import { ScrollView  } from 'react-native';
import { BoldNumber, HomeContainer, HomeContainerInfo,WhiteSquare } from '../styles/home.styles';
import Text from '../../../shared/components/text/Text';
import { useEffect, useState } from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { Pontuacaotype } from '../../../types/PontuacaoType';
import { URL_CAMPANHA, URL_PONTUACAO } from '../../../shared/constants/url';
import { MethodEnum } from '../../../enums/methods.enum';
import { CampanhaType } from '../../../types/CampanhaType';
import { theme } from '../../../shared/themes/theme';
import { textTypes } from '../../../shared/components/text/textTypes';
import { Icon } from '../../../shared/icon/Icon';
import Carrossel from '../../../shared/components/carousel/Carousel';
import Grafico from '../../../shared/components/grafico/Grafico';
import { gettCodProf } from '../../../shared/functions/connection/auth';
import Overlay from 'react-native-loading-spinner-overlay';
// const SLIDER_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = SLIDER_WIDTH * 0.88;
const Home = () => {
    const { request,loading } = useRequest();
    const [nome, setNome] = useState<string>();
    const [campanha, setCampanha] = useState<string>();
    const [pontuacao, SetPontuacao] = useState<Pontuacaotype>();
    useEffect(()  => {
        const verifyLogin = async () => {

        request<Pontuacaotype>({
            url: `${URL_PONTUACAO}${await gettCodProf()}`,
            method: MethodEnum.GET,
        }).then((Response) => { return SetPontuacao(Response);
        });
        request<CampanhaType>({
            url: `${URL_CAMPANHA}`,
            method: MethodEnum.GET,
        }).then((Response) => {
            return setCampanha(Response?.periodo),
                setNome(Response?.nome);
        });
    };
        verifyLogin();
    }, []);
    return (
        <ScrollView >
      <Overlay visible={loading} />
        <HomeContainerInfo>
                    <Text color={theme.colors.pupleTheme.purple80} type={textTypes.PARAGRAPH_SMALL_SEMI_BOLD}>Campanha vigente :{nome}</Text>
                    <Text color={theme.colors.pupleTheme.purple80} type={textTypes.PARAGRAPH_SMALL_SEMI_BOLD}>Período da campanha :{campanha}</Text>
                </HomeContainerInfo><Carrossel /><HomeContainer>
                        <WhiteSquare>
                            <Text>Pontuação</Text>
                            <BoldNumber>
                                {pontuacao?.pontuacao ? pontuacao?.pontuacao : 0}
                            </BoldNumber>
                            <Icon name="coin-dollar" size={60} color={theme.colors.neutraTheme.black} />
                        </WhiteSquare>
                    </HomeContainer><Grafico />
    </ScrollView>
    );
};


export default Home;
