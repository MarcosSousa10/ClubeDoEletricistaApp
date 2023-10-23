/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import { CreateUserType } from '../../../types/createUserType';
import { NativeSyntheticEvent,  TextInputChangeEventData } from 'react-native';
import { useRequest } from '../../../shared/hooks/useRequest';
import { MethodEnum } from '../../../enums/methods.enum';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { validatePhone } from '../../../shared/functions/phone';
import { validateEmail } from '../../../shared/functions/email';
import { removeSpacialCharacters } from '../../../shared/functions/caracteres';
import { URL_CADASTRO } from '../../../shared/constants/url';
import { MenuUrl } from '../../../shared/components/enums/MenuUrl.enum';


export const useCreateUser = () => {
  const { reset } = useNavigation<NavigationProp<ParamListBase>>();
  const {request, loading} = useRequest();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [valorSelecionado, setValorSelecionado] = useState('');
  const [createUser, setCreateUser] = useState<CreateUserType>({
    confirmPassword: '',
    cpf: '',
    email:'',
    name:'' ,
    password:'',
    phone: '',
    uf: '',
    endereco: '',
    cidade: '',
    rg: '',
    cep: '',
    datanasc: '',
    bairro: '',
    valorSelecionado: '',
  });
  useEffect(()=>{
    if (
      createUser.name !== '' &&
      createUser.bairro !== '' &&
      createUser.cep !== '' &&
      createUser.cidade !== '' &&
      createUser.datanasc !== '' &&
      createUser.endereco !== '' &&
      createUser.rg !== '' &&
      createUser.uf !== '' &&
      valorSelecionado !== '' &&
      createUser.password === createUser.confirmPassword &&
        createUser.cpf !== '' &&
        validatePhone(createUser.phone) &&
        validateEmail(createUser.email) &&
        createUser.email !== '' &&
        createUser.password !== '' &&
        createUser.phone !== ''
    ){
 setDisabled(false);
    } else {
        setDisabled(true);
    }
  },[createUser, valorSelecionado]);
  const handleCreateUser = async () => {
    console.log(`${URL_CADASTRO}/${createUser.password}/${createUser.email}/${createUser.uf}/${createUser.datanasc}/${createUser.rg}/'0000000000'/${valorSelecionado}/${createUser.bairro}/${createUser.phone}/${createUser.cep}/${createUser.cidade}/${createUser.name}/${createUser.endereco}/${createUser.cpf}/1`);
    const resultCreateUser = await request({
        url: `${URL_CADASTRO}/${createUser.password}/${createUser.email}/${createUser.uf}/${createUser.datanasc}/${createUser.rg}/'0000000000'/${valorSelecionado}/${createUser.bairro}/${createUser.phone}/${createUser.cep}/${createUser.cidade}/${createUser.name}/${createUser.endereco}/${createUser.cpf}/1`,
        method: MethodEnum.GET,
        body:{
            ...createUser,
            phone: removeSpacialCharacters(createUser.phone),
            cpf: removeSpacialCharacters(createUser.cpf),
        },
        message: 'Usuario cadastrado com sucesso!',
    });
    if (resultCreateUser){
        reset({
            index:0,
            routes: [{name: MenuUrl.LOGIN}],
        });
    }
  };
  const handleOnChangeInput = ( event: NativeSyntheticEvent<TextInputChangeEventData>, name: string)=>{
    setCreateUser((currentCreateUser) =>({
      ...currentCreateUser,
      [name]: event.nativeEvent?.text,
}));
  };
  return {
    createUser,
    loading,
    disabled,
    handleOnChangeInput,
    setValorSelecionado,
    handleCreateUser,
  };
};
