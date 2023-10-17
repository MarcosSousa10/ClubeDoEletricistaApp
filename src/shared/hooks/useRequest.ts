/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {returnLogin} from '../../types/returnLogin';
import { RequestLogin } from '../../types/requestLogin';
import  ConnectionAPI, {  MetgoType, connectionAPIGet, connectionAPIPost } from '../functions/connection/connectionAPI';
import {  setAuthorizationToken } from '../functions/connection/auth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MenuUrl } from '../components/enums/MenuUrl.enum';
import { InfoType } from '../../types/infoType';
export const useRequest = () => {

  interface requestProps<T, B = unknown> {
    url: string;
    method: MetgoType;
    saveGlobal?: (object: T ) => void;
    body?: B;
  }
  const {reset} = useNavigation<NavigationProp<ParamListBase>>();
  // const Navigation  = useNavigation<NavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setinfo] = useState<InfoType>();
const request = async <T, B = unknown>({ url, method, saveGlobal, body }: requestProps<T, B>): Promise<T | undefined> =>{
  setLoading(true);
  const returnObject: T| undefined = await ConnectionAPI.connect<T, B>(url, method, body).then(
    (result)=>{
      if (saveGlobal){
        saveGlobal(result);
      }
      return result;
    }
  ).catch(()=>{
    return undefined;
  });
  setLoading(false);
return returnObject;
};
const authRequest = async (body: RequestLogin) => {
  setLoading(true);
  await connectionAPIPost<returnLogin>('https://www.othondecarvalho.com.br:3333/auth/login', body)
    .then(result => {
      setAuthorizationToken(result.token);
      reset({
        index: 0,
        routes: [{name: MenuUrl.HOME}],
      });


      connectionAPIGet<InfoType>(`https://othondecarvalho.com.br:3333/pc/codprof/${body.login}`)
      .then(resulta => {setinfo(resulta)}).catch((error)=>{console.log("teste",error)});

    })
    .catch((error) => {
        console.log("testes",error);

    });

  setLoading(false);
};
const InfoRequests = async (body: RequestLogin) => {
  setLoading(true);
  // const tokens = await getAuthorizationToken();
  console.log(body.login);
  await connectionAPIGet<InfoType>(`https://othondecarvalho.com.br:3333/pc/codprof/${body.login}`)
    .then(result => {return result;
    })
    .catch((error) => {
        console.log(error);

    });

  setLoading(false);
};
return {
    loading,
    authRequest,
    request,
    InfoRequests,
    info,
  };
};
