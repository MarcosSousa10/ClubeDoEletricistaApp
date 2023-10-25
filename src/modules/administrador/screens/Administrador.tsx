/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns'; // Importe a função de formatação de data
import Button from '../../../shared/components/button/Button';
import {theme} from '../../../shared/themes/theme';
import {useRequest} from '../../../shared/hooks/useRequest';
import {gettCodProf} from '../../../shared/functions/connection/auth';
import {URL_CONSULTA_VENDAS} from '../../../shared/constants/url';
import {MethodEnum} from '../../../enums/methods.enum';
import {ConsultaVendasType} from '../../../types/ConsultaVendasType';
import { TextBold, TextBoldBlue, TextMarginColor, VendasIcon, VendasText, VendasTouchableOpacity, VendasViewAling, VendasViewCenter, VendasViewRow, VendasViewp } from '../styles/administrador.styles';

const Administrador = () => {
  const [dataEnt, setDataEnt] = useState<Date | undefined>(new Date());
  const [dataSaida, setDataSaida] = useState<Date | undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [data, setData] = useState<ConsultaVendasType[]>([]);

  const {request} = useRequest();

  const verifyLogin = async () => {
      dataEnt &&
        dataSaida &&
        request<ConsultaVendasType[]>({
          url: `${URL_CONSULTA_VENDAS}/${await gettCodProf()}/${formatData(
            dataEnt,
          )}/${formatData(dataSaida)}`,
          method: MethodEnum.GET,
        }).then(Response => {
          if (Response) {
            setData(Response);
          }
        });
  };
  // Função para formatar a data no formato 'dd/MM/yyyy'
  const formatData = (date: number | Date) => {
    return format(date, 'dd-MM-yyyy');
  };
  function formatarMoeda(valor: number | bigint) {
    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatoMoeda.format(valor);
  }
  return (
    <ScrollView>
      <VendasViewAling>
        <VendasViewRow>
          <VendasTouchableOpacity
            onPress={() => setShowDatePicker(true)}
            >
            <VendasIcon
              name="calendar"
              size={20}
              color="black"
            />
            {dataEnt && <TextInput value={formatData(dataEnt)} />}
          </VendasTouchableOpacity>
          <VendasText>Até</VendasText>
          <VendasTouchableOpacity
            onPress={() => setShowDatePicker1(true)}
          >
            <VendasIcon
              name="calendar"
              size={20}
              color="black"
            />
            {dataSaida && <TextInput value={formatData(dataSaida)} />}
          </VendasTouchableOpacity>
        </VendasViewRow>
        {showDatePicker && dataEnt && (
          <DateTimePicker
            value={dataEnt}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => (
              // eslint-disable-next-line no-sequences
              setDataEnt(selectedDate),
              setShowDatePicker(false),
              setShowDatePicker1(false)
            )}
          />
        )}
        {showDatePicker1 && dataSaida && (
          <DateTimePicker
            value={dataSaida}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => (
              // eslint-disable-next-line no-sequences
              setDataSaida(selectedDate),
              setShowDatePicker1(false),
              setShowDatePicker(false)
            )}
          />
        )}
        <Button
          title="Buscar"
          type={theme.buttons.buttonsTheme.primary}
          onPress={verifyLogin}
        />
        <ScrollView>
          {data.map(
            (item: ConsultaVendasType, index: React.Key | null | undefined) => (
              <View key={index}>
                {item.cliente !== '' ? (
                  <View key={item.numnota}>
                    <VendasViewCenter>
                      <View>
                        <VendasViewAling>
                          <TextBoldBlue >
                            {item.cliente}
                          </TextBoldBlue>
                        </VendasViewAling>
                        <VendasViewp >
                          <TextBold >
                            Numero Da Nota :
                          </TextBold>
                          <TextMarginColor >
                            {item.numnota}
                          </TextMarginColor>
                        </VendasViewp>
                        <VendasViewp >
                          <TextBold >
                            Codigo Cliente :
                          </TextBold>
                          <TextMarginColor>
                            {item.codcli}
                          </TextMarginColor>
                        </VendasViewp>
                        <VendasViewp >
                          <TextBold >
                            Valor Total :
                          </TextBold>
                          <TextMarginColor >
                            {' '}
                            {formatarMoeda(parseInt(item.vltotal, 10))}
                          </TextMarginColor>
                        </VendasViewp>
                        <VendasViewp >
                          <TextBold >
                            Data de Saida Da Nota :
                          </TextBold>
                          <TextMarginColor >
                            {formatData(new Date(item.dtsaida))}
                          </TextMarginColor>
                        </VendasViewp>
                        <VendasViewp>
                          <TextBold >
                            Vendedor :
                          </TextBold>
                          <TextMarginColor >
                            {item.vendedor}
                          </TextMarginColor>
                        </VendasViewp>
                      </View>
                    </VendasViewCenter>
                  </View>
                ) : null}
              </View>
            ),
          )}
        </ScrollView>
      </VendasViewAling>
    </ScrollView>
  );
};

export default Administrador;
