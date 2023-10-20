/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier *//* eslint-disable no-lone-blocks *//* eslint-disable no-sequences */
import React, {  useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';  // Importe a função de formatação de data
import { Icon } from '../../../shared/icon/Icon';
import Button from '../../../shared/components/button/Button';
import { theme } from '../../../shared/themes/theme';
import { useRequest } from '../../../shared/hooks/useRequest';
import { gettCodProf } from '../../../shared/functions/connection/auth';
import { URL_CONSULTA_VENDAS } from '../../../shared/constants/url';
import { MethodEnum } from '../../../enums/methods.enum';
import { ConsultaVendasType } from '../../../types/ConsultaVendasType';

const Administrador = () => {
  const [dataEnt, setDataEnt] = useState<Date| undefined>(new Date());
  const [dataSaida,setDataSaida ] = useState<Date| undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [data, setData] = useState<ConsultaVendasType[]>([]);

  const { request } = useRequest();

  const verifyLogin = async () => {
    {dataEnt && dataSaida &&
    request<ConsultaVendasType[]>({
        url: `${URL_CONSULTA_VENDAS}/${await gettCodProf()}/${formatData(dataEnt)}/${formatData(dataSaida)}`,
        method: MethodEnum.GET,
    }).then(Response=>{if (Response) {setData(Response);}});
  }

};
  // Função para formatar a data no formato 'dd/MM/yyyy'
  const formatData = (date: number | Date) => {
    return format(date, 'dd-MM-yyyy');
  };
  function formatarMoeda(valor:  number | bigint) {
    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatoMoeda.format(valor);
  }  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{flexDirection:'row' ,  borderWidth: 1,borderColor: `${theme.colors.mainTheme.primary}`, alignItems:'center',justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{flexDirection: 'row', marginLeft:20, paddingLeft:20,flex:1, alignItems:'center',justifyContent: 'center' }}>
          <Icon name="calendar" size={20} color="black" style={{paddingRight:10}} />
          {dataEnt && <TextInput value={formatData(dataEnt)} />}
        </TouchableOpacity>
        <Text style={{flexDirection: 'column', paddingLeft:20}}>Até</Text>
        <TouchableOpacity onPress={() => setShowDatePicker1(true)} style={{flexDirection: 'row', marginLeft:20, paddingLeft:20,flex:1, alignItems:'center',justifyContent: 'center'  }} >
          <Icon name="calendar" size={20} color="black" style={{paddingRight:10}}/>
          {dataSaida && <TextInput value={formatData(dataSaida)} />}
        </TouchableOpacity>
      </View>
      {showDatePicker && dataEnt && (
        <DateTimePicker
          value={dataEnt}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => (setDataEnt(selectedDate),
              setShowDatePicker(false),  setShowDatePicker1(false))}
        />
      )}
      {showDatePicker1 && dataSaida && (
        <DateTimePicker
          value={dataSaida}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => (setDataSaida(selectedDate),  setShowDatePicker1(false),setShowDatePicker(false))}
        />
      )}
      <Button title="Buscar" type={theme.buttons.buttonsTheme.primary} onPress={verifyLogin}/>
      <View>
      <View>
    {data.map((item:ConsultaVendasType , index: React.Key | null | undefined) => (
      <View key={index}>
        {item.cliente !== '' ? (
          <View key={item.numnota}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,borderWidth:1,margin:20, padding:15}}>
              <View style={{ marginLeft: 10 }}>
                <View  style={{alignItems:'center' }}>
                <Text style={{ fontWeight: 'bold',color:'blue' }}>{item.cliente}</Text>

                </View>

                <View style={{ flexDirection: 'row',padding:2 }}>
                  <Text style={{ fontWeight: 'bold' }}>Numero Da Nota :</Text>
                  <Text style={{ marginLeft: 10, color: 'purple' }}>{item.numnota}</Text>
                </View>
                <View style={{ flexDirection: 'row',padding:2 }}>
                  <Text style={{ fontWeight: 'bold' }}>Codigo Cliente :</Text>
                  <Text style={{ marginLeft: 10, color: 'purple' }}>{item.codcli}</Text>
                </View>
                <View style={{ flexDirection: 'row',padding:2 }}>
                  <Text style={{ fontWeight: 'bold' }}>Valor Total :</Text>
                  <Text style={{ marginLeft: 10, color: 'purple' }}> {formatarMoeda(parseInt(item.vltotal, 10))}</Text>
                </View>
                <View style={{ flexDirection: 'row',padding:2 }}>
                  <Text style={{ fontWeight: 'bold' }}>Data de Saida Da Nota :</Text>
                  <Text style={{ marginLeft: 10, color: 'purple' }}>{formatData( new Date(item.dtsaida))}</Text>
                </View>
                <View style={{ flexDirection: 'row',padding:2 }}>
                  <Text style={{ fontWeight: 'bold' }}>Vendedor :</Text>
                  <Text style={{ marginLeft: 10, color: 'purple' }}>{item.vendedor}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    ))}
  </View>
  </View>
    </View>
  );
};

export default Administrador;
