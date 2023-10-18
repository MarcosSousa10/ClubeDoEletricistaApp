/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart, YAxis, Grid, XAxis } from 'react-native-svg-charts';
import { useRequest } from '../../hooks/useRequest';
import { MethodEnum } from '../../../enums/methods.enum';
import { GraficoType } from '../../../types/GraficoType';
import { gettCodProf } from '../../functions/connection/auth';

const larguraDaTela = Dimensions.get('window').width;
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const Grafico = () => {
    const { request } = useRequest();

    const data = [0, 0, 4, 95, 4, 24, 85, 91, 35, 53, -53, 24];
    const contentInset = { top: 20, bottom: 20 };

    const [monthsData, setMonthsData] = useState([0]);
 useEffect(() => {
      const fetchImages = () => {
        const requests = Array.from({ length: 12 }, async (_, index) =>
          request<GraficoType>({
            url: `https://othondecarvalho.com.br:5555/pc/dashboard/${await gettCodProf()}/${index + 1}`,
            method: MethodEnum.GET,
          })
        );
        return Promise.all(requests).then((responses) => {
          const updatedMonthsData = [...monthsData];
           updatedMonthsData.pop();
          responses.forEach((responsess: GraficoType | undefined ) => {
            if (responsess?.codbrinde != null) {
              updatedMonthsData.push(responsess.codbrinde);
            } else if (responsess){

                for (let i = 0; i < 1; i++) {
                    updatedMonthsData.push(0);
                  }
            }
          });
          setMonthsData(updatedMonthsData);
        });
      };
      fetchImages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

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


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 210, width: larguraDaTela - 20, flexDirection: 'row' }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={monthsData}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                    <XAxis data={data} formatLabel={(value, index) => meses[index]} style={{ margin: 10 }} />
                </LineChart>
                <YAxis
                    data={monthsData}
                    contentInset={contentInset}
                    svg={{ fill: 'grey', fontSize: 10 }}
                    numberOfTicks={10}
                />
            </View>
        </View>
    );
};

export default Grafico;
