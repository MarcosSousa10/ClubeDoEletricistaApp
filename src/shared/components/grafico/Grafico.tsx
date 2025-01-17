/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier *//* eslint-disable @typescript-eslint/no-shadow */
import React, {  useEffect, useState } from 'react';
import { Dimensions, View, RefreshControl, ScrollView } from 'react-native';
import { LineChart, YAxis, Grid, XAxis } from 'react-native-svg-charts';
import { useRequest } from '../../hooks/useRequest';
import { MethodEnum } from '../../../enums/methods.enum';
import { GraficoType } from '../../../types/GraficoType';
import { gettCodCnpj } from '../../functions/connection/auth';
import { CampanhaType } from '../../../types/CampanhaType';
import { URL_CAMPANHA, URL_GRAFICO } from '../../constants/url';
import Text from '../text/Text';

const larguraDaTela = Dimensions.get('window').width;
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const Grafico = () => {
    const { request } = useRequest();
    const contentInset = { top: 20, bottom: 20 };
    // monthsData.splice(0, monthsData.length);
    const [monthsData, setMonthsData] = useState([0]);
    const [campanha, setCampanha] = useState<string>();
    const [value, setValue] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      request<CampanhaType>({
        url: `${URL_CAMPANHA}`,
        method: MethodEnum.GET,

    }).then((Response) => {setCampanha(Response?.periodo);
fetchImages();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campanha]);
    const fetchImages = async () => {
      setRefreshing(true);
      const a = await gettCodCnpj();
      const cnpj = a?.replace(/"/g, '');
        const requests = Array.from({ length: 12 }, async (_, index) =>
        await request<GraficoType>({
          url: `${URL_GRAFICO}/${cnpj}/${index + 1}`,
          method: MethodEnum.GET,
        })
      );

    return Promise.all(requests).then(responses => {
        const updatedMonthsData = [...monthsData];
         updatedMonthsData.pop();
         updatedMonthsData.splice(0, updatedMonthsData.length);
        responses.forEach((responsess: GraficoType | undefined ) => {
          if (responsess?.codbrinde != null) {
            updatedMonthsData.push(responsess.codbrinde);
            setRefreshing(false);

          } else if (responsess){

              for (let i = 0; i < 1; i++) {
                  updatedMonthsData.push(0);
                }
          }
        });
        setMonthsData(updatedMonthsData);
      });

    };
    if (value){
      if (typeof monthsData[0] === 'number' ){
        setValue(false);
        setRefreshing(false);
      }
      fetchImages();
    }



    //   const fetchImages =  () => {
    //     Array.from({ length: 12 }, (_, index) =>
    //      request<GraficoType>({
    //        url: `https://othondecarvalho.com.br:5555/pc/dashboard/11482703610/${index + 1}`,
    //        method: MethodEnum.GET,
    //      }).then((responsess) => {
    //        if (responsess) {
    //          const updatedMonthsData = [...monthsData];
    //          updatedMonthsData.push(responsess.codbrinde);
    //          setMonthsData(updatedMonthsData);
    //        }
    //      })
    //    );
    //  };
    const onRefresh = () => {
      fetchImages();
    };

    return (
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{campanha}</Text>
            <View style={{ height: 210, width: larguraDaTela - 20, flexDirection: 'row' }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={monthsData}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                    <XAxis  data={monthsData} formatLabel={(value, index) => meses[index]} />
                </LineChart>
                <YAxis
                    data={monthsData}
                    contentInset={contentInset}
                    svg={{ fill: 'grey', fontSize: 10 }}
                    numberOfTicks={10}
                />
            </View>
            </View>
        </ScrollView>
    );
};

export default Grafico;
