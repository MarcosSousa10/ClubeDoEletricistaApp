/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { returnLogin } from '../../types/returnLogin';
import { RequestLogin } from '../../types/requestLogin';
import ConnectionAPI, { MetgoType, connectionAPIGet, connectionAPIPost } from '../functions/connection/connectionAPI';
import { setAuthorizationToken, setCodCnpj, setCodProf } from '../functions/connection/auth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MenuUrl } from '../components/enums/MenuUrl.enum';
import { InfoType } from '../../types/infoType';
import { useGlobalRducer } from '../../story/reducers/globalReducer/useGlobalReducer';
export const useRequest = () => {
  
  interface requestProps<T, B = unknown> {
    url: string;
    method: MetgoType;
    saveGlobal?: (object: T) => void;
    body?: B;
    message?: string;
  }
  const { reset } = useNavigation<NavigationProp<ParamListBase>>();
  // const Navigation  = useNavigation<NavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [grafico, setGrafico] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {setModal} = useGlobalRducer();

  const request = async <T, B = unknown>({ url, method, saveGlobal, body,message }: requestProps<T, B>): Promise<T | undefined> => {
    setLoading(true);
    const returnObject: T | undefined = await ConnectionAPI.connect<T, B>(url, method, body).then(
      (result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        if (message){
          setModal({
            visible:true,
            title:'Sucesso',
            text: message,
          });
        }
        return result;
      }
    ).catch(()=>{
      return undefined;
    });
    setLoading(false);
    setGrafico(true);
    return returnObject;
  };

  const authRequest = async (body: RequestLogin) => {
    setLoading(true);
    await connectionAPIPost<returnLogin>('https://www.othondecarvalho.com.br:5555/auth/login', body)
      .then(result => {
        setAuthorizationToken(result.token);
        reset({
          index: 0,
          routes: [{ name: MenuUrl.HOME }],
        });
        connectionAPIGet<InfoType>(`https://othondecarvalho.com.br:5555/pc/codprof/${body.login}`)
          .then(resulta => {
            const valorString = JSON.stringify(resulta.codprofissional);
            setCodProf(valorString);
            const valorString1 = JSON.stringify(resulta.cnpj);
            setCodCnpj(valorString1);

          }).catch((error) => { console.log('teste', error); });

      })
      .catch(() => { setModal({visible:true,title:'Erro',text:'Usuario ou senha invalidos'});
      });

    setLoading(false);
  };
  return {
    loading,
    authRequest,
    setErrorMessage,
    errorMessage,
    request,
    grafico,
  };
};
