/* eslint-disable prettier/prettier */
import {
  BoldNumber,
  HomeContainer,
  HomeContainerInfo,
  HomeLineChart,
  HomeView,
  HomeViewMonthData,
  WhiteSquare,
} from '../styles/home.styles';
import {useRequest} from '../../../shared/hooks/useRequest';
import {Pontuacaotype} from '../../../types/PontuacaoType';
import {URL_CAMPANHA, URL_PONTUACAO} from '../../../shared/constants/url';
import {MethodEnum} from '../../../enums/methods.enum';
import {CampanhaType} from '../../../types/CampanhaType';
import {theme} from '../../../shared/themes/theme';
import {textTypes} from '../../../shared/components/text/textTypes';
import {Icon} from '../../../shared/icon/Icon';
import Carrossel from '../../../shared/components/carousel/Carousel';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  RefreshControl,
  ScrollView,
  RefreshControlBase,
} from 'react-native';
import { YAxis, Grid, XAxis} from 'react-native-svg-charts';
import {GraficoType} from '../../../types/GraficoType';
import {gettCodCnpj} from '../../../shared/functions/connection/auth';
import {URL_GRAFICO} from '../../../shared/constants/url';
import Text from '../../../shared/components/text/Text';
import {gettCodProf} from '../../../shared/functions/connection/auth';
// import Overlay from 'react-native-loading-spinner-overlay';
// const SLIDER_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = SLIDER_WIDTH * 0.88;
const larguraDaTela = Dimensions.get('window').width;
const meses = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];
const Home = () => {
  const {request, loading} = useRequest();
  const [nome, setNome] = useState<string>();
  const [campanha, setCampanha] = useState<string>();
  const [pontuacao, SetPontuacao] = useState<Pontuacaotype>();

  const contentInset = {top: 20, bottom: 20};
  // monthsData.splice(0, monthsData.length);
  const [monthsData, setMonthsData] = useState([0]);
  const [carregar, setCarregar] = useState(false);

  const fetchImages = async () => {
    setCarregar(true);
    const a = await gettCodCnpj();
    const cnpj = a?.replace(/"/g, '');
    const requests = Array.from(
      {length: 12},
      async (_, index) =>
        await request<GraficoType>({
          url: `${URL_GRAFICO}/${cnpj}/${index + 1}`,
          method: MethodEnum.GET,
        }),
    );
    RefreshControlBase;

    return Promise.all(requests).then(responses => {
      const updatedMonthsData = [...monthsData];
      updatedMonthsData.pop();
      updatedMonthsData.splice(0, updatedMonthsData.length);
      responses.forEach((responsess: GraficoType | undefined) => {
        if (responsess?.codbrinde != null) {
          updatedMonthsData.push(responsess.codbrinde);
        } else if (responsess) {
          for (let i = 0; i < 1; i++) {
            updatedMonthsData.push(0);
          }
        }
      });
      setMonthsData(updatedMonthsData);
      if (monthsData[updatedMonthsData.length] !== null) {
        setCarregar(false);
      }
    });
  };
  const onRefresh = () => {
    verifyLogin();
    fetchImages();
  };
  const verifyLogin = async () => {
    setCarregar(true);
    request<Pontuacaotype>({
      url: `${URL_PONTUACAO}${await gettCodProf()}`,
      method: MethodEnum.GET,
    }).then(Response => {
      SetPontuacao(Response);
    });
  };
  useEffect(() => {
    verifyLogin();
    fetchImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    request<CampanhaType>({
      url: `${URL_CAMPANHA}`,
      method: MethodEnum.GET,
    }).then(Response => {
      setCampanha(Response?.periodo);
      setNome(Response?.nome);
      verifyLogin();
      fetchImages();
    });
    verifyLogin();
    fetchImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campanha, Carrossel, nome, larguraDaTela]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading || carregar}
          onRefresh={onRefresh}
        />
      }>
      {/* <Overlay visible={loading} /> */}
      <HomeContainerInfo>
        <Text
          color={theme.colors.pupleTheme.purple80}
          type={textTypes.PARAGRAPH_SEMI_BOLD}>
          Campanha vigente :{nome}
        </Text>
        <Text
          color={theme.colors.pupleTheme.purple80}
          type={textTypes.PARAGRAPH_SEMI_BOLD}>
          Período da campanha :{campanha}
        </Text>
      </HomeContainerInfo>
      <Carrossel />
      <HomeContainer>
        <WhiteSquare>
          <Text type={textTypes.PARAGRAPH_BOLD}>Pontuação</Text>
          <BoldNumber>
            {pontuacao?.pontuacao ? pontuacao?.pontuacao : 0}
          </BoldNumber>
          <Icon
            name="coin-dollar"
            size={70}
            color={theme.colors.neutraTheme.black}
          />
        </WhiteSquare>
      </HomeContainer>

      <View>
        <HomeView >
          <Text>{campanha}</Text>
          {monthsData && (
            <HomeViewMonthData
             >
              <HomeLineChart
                data={monthsData}
                svg={{stroke: 'rgb(134, 65, 244)'}}
                contentInset={contentInset}>
                <Grid />
                <XAxis
                  data={monthsData}
                  formatLabel={(value, index) => meses[index]}
                />
              </HomeLineChart>
              <YAxis
                data={monthsData}
                contentInset={contentInset}
                svg={{fill: 'grey', fontSize: 10}}
                numberOfTicks={10}
              />
            </HomeViewMonthData>
          )}
        </HomeView>
      </View>
    </ScrollView>
  );
};

export default Home;
