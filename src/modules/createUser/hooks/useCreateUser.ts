/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import { CreateUserType } from '../../../types/createUserType';
import { Alert, NativeSyntheticEvent,  TextInputChangeEventData } from 'react-native';
import { useRequest } from '../../../shared/hooks/useRequest';
import { MethodEnum } from '../../../enums/methods.enum';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { validatePhone } from '../../../shared/functions/phone';
import { validateEmail } from '../../../shared/functions/email';
import { removeSpacialCharacters } from '../../../shared/functions/caracteres';
import { URL_CADASTRO, URL_VALIDA_CADASTRO } from '../../../shared/constants/url';
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
    const resultCreateUser = await request({
        url: `${URL_CADASTRO}/${createUser.password}/${createUser.email}/${createUser.uf}/${removeSpacialCharacters(createUser.datanasc)}/${createUser.rg}/'0000000000'/${valorSelecionado}/${createUser.bairro}/${removeSpacialCharacters(createUser.phone)}/${removeSpacialCharacters(createUser.cep)}/${createUser.cidade}/${createUser.name}/${createUser.endereco}/${createUser.cpf}/1`,
        method: MethodEnum.GET,
        body:{
            ...createUser,
            phone: removeSpacialCharacters(createUser.phone),
            datanasc: removeSpacialCharacters(createUser.datanasc),
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
  const handleValidarUser = async () => {
     await request({
        url: `${URL_VALIDA_CADASTRO}/${createUser.cpf}`,
        method: MethodEnum.GET,
    }).then((Response)=>{
      if (Response !== 'Achei') {
        handleCreateUser();

    } else {
Alert.alert('Usuario Já Existe no Banco de Dados!');
}

      
    });

  };
  const handleOnChangeInput = ( event: NativeSyntheticEvent<TextInputChangeEventData>, name: string)=>{
    if (name === 'email'){
      setCreateUser((currentCreateUser) =>({

        ...currentCreateUser,
        [name]: event.nativeEvent?.text.toUpperCase(),
  }));
      } else {
        setCreateUser((currentCreateUser) =>({

      ...currentCreateUser,
      [name]: event.nativeEvent?.text,
}));
      }

  };
  return {
    createUser,
    loading,
    disabled,
    handleOnChangeInput,
    setValorSelecionado,
    handleValidarUser,
  };
};
