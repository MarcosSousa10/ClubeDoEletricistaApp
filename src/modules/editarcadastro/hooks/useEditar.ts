/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import { NativeSyntheticEvent,  TextInputChangeEventData } from 'react-native';
import { useRequest } from '../../../shared/hooks/useRequest';
import { MethodEnum } from '../../../enums/methods.enum';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { removeSpacialCharacters } from '../../../shared/functions/caracteres';
import { URL_EDITAR_CADASTRO, URL_INFORMACAO } from '../../../shared/constants/url';
import { MenuUrl } from '../../../shared/components/enums/MenuUrl.enum';
import { EditarUserType } from '../../../types/EditarUserType';
import { gettCodProf } from '../../../shared/functions/connection/auth';


export const useEditar = () => {
  const { reset } = useNavigation<NavigationProp<ParamListBase>>();
  const {request, loading} = useRequest();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [info, setInfo] = useState<EditarUserType>();
  const [editeeUser, setEditeUser] = useState<EditarUserType>({
    email:'',
    descricao:'' ,
    senha:'',
    fone: '',
    cnpj:'',
    celular:'',
    tipoprof: '',
    percomprof: '',
    uf: '',
    dtnasc: '',
    rg_ie: '',
    profissao: '',
    bairro: '',
    cep: '',
    cidade: '',
    endereco: '',
    dtcadastro: '',
  });
  useEffect(()=>{
 setDisabled(false);
  },[editeeUser]);
  useEffect(() => {
    handleEditeInfo();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const handleEditeUser = async () => {
    console.log(`${URL_EDITAR_CADASTRO}/${await gettCodProf()} ${info?.descricao}`);
    const resultCreateUser = await request({
        url: `${URL_EDITAR_CADASTRO}/${await gettCodProf()}`,
        method: MethodEnum.PUT,
        body:{
            descricao: info?.descricao,
            senha:info?.senha,
            cnpj:info?.cnpj,
            email:info?.email,
            celular:removeSpacialCharacters(editeeUser?.fone),
            fone: removeSpacialCharacters(editeeUser?.fone),
            tipoprof: 'PC',
            percomprof: '2',
            uf: info?.uf,
            dtnasc: info?.dtnasc,
            rg_ie: info?.rg_ie,
            profissao: info?.profissao,
            bairro: info?.bairro,
            cep: info?.cep,
            cidade: info?.cidade,
            endereco: info?.endereco,
            dtcadastro: info?.dtcadastro,
        },
        message: 'Usuario Editado com sucesso!',
    });
    if (resultCreateUser){
        reset({
            index:0,
            routes: [{name: MenuUrl.HOME}],
        });
    }
  };

  const handleEditeInfo = async () => {
    await request<EditarUserType>({
        url: `${URL_INFORMACAO}/${await gettCodProf()}`,
        method: MethodEnum.GET,
    }).then(Response=>setInfo(Response));
  };
  const handleOnChangeInput = ( event: NativeSyntheticEvent<TextInputChangeEventData>, name: string)=>{
    setEditeUser((currentEditeUser) =>({
      ...currentEditeUser,
      [name]: event.nativeEvent?.text,
}));
  };
  return {
    editeeUser,
    loading,
    info,
    disabled,
    handleOnChangeInput,
    handleEditeInfo,
    handleEditeUser,
  };
};
