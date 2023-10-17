/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
  const larguraDaTela = Dimensions.get('window').width; 
   
  const Grafico =
  ()=> {
      
          const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
   
          const contentInset = { top: 20, bottom: 20 };
   
          return (
              <View style={{ height: 200, flexDirection: 'row', width: larguraDaTela -20, alignItems:'center' }}>
                  <YAxis
                      data={data}
                      contentInset={contentInset}
                      svg={{
                          fill: 'grey',
                          fontSize: 10,
                      }}
                      numberOfTicks={10}
                      formatLabel={(value) => `${value}$`}
                  />
                  <LineChart
                      style={{ flex: 1, marginLeft: 16 }}
                      data={data}
                      svg={{ stroke: 'rgb(134, 65, 244)' }}
                      contentInset={contentInset}
                  >
                      <Grid />
                  </LineChart>
              </View>
          )
  }
  export default Grafico;