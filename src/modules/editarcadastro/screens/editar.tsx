/* eslint-disable prettier/prettier */
import { useRef } from 'react';
import Button from '../../../shared/components/button/Button';
import { TextInput } from 'react-native';
import React from 'react';
import Input from '../../../shared/components/input/input';
import { CreateUserContainer } from '../../createUser/styles/createUser.style';
import { useEditar } from '../hooks/useEditar';
const Editar = () => {
    const { editeeUser, disabled, loading, handleOnChangeInput, handleEditeUser,info } = useEditar();
    const phoneInput = useRef<TextInput>(null);
    const emailInput = useRef<TextInput>(null);
    const cpfInput = useRef<TextInput>(null);
    const passwordInput = useRef<TextInput>(null);
    const confirmePasswordInput = useRef<TextInput>(null);

return (
    <CreateUserContainer>
      <Input
        value={editeeUser.descricao}
        onChange={(event) => handleOnChangeInput(event, 'descricao')}
        margin="0px 0px 16px 0px"
        placeholder={info?.descricao}
        title="Nome completo :"
        onSubmitEditing={() => phoneInput.current?.focus()}
      />
      <Input
        value={editeeUser.fone}
        onChange={(event) => handleOnChangeInput(event, 'fone')}
        margin="0px 0px 16px 0px"
        placeholder={info?.fone}
        type="cel-phone"
        maxLength={15}
        title="Telefone :"
        ref={phoneInput}
        onSubmitEditing={() => emailInput.current?.focus()}
        keyboardType="number-pad"

      />
      <Input
        value={editeeUser.email}
        onChange={(event) => handleOnChangeInput(event, 'email')}
        margin="0px 0px 16px 0px"
        placeholder={info?.email}
        title="Email :"
        ref={emailInput}
        onSubmitEditing={() => cpfInput.current?.focus()}
        keyboardType="email-address"
      />

      <Input
        value={editeeUser.senha}
        onChange={(event) => handleOnChangeInput(event, 'senha')}
        margin="0px 0px 16px 0px"
        placeholder={info?.senha}
        title="Senha :"
        secureTextEntry
        ref={passwordInput}
        onSubmitEditing={() => confirmePasswordInput.current?.focus()}
      />
      <Button
        disabled={disabled}
        onPress={handleEditeUser}
        loading={loading}
        margin="0px 0px 0px 0px"
        title="Alterar Informações"
      />
    </CreateUserContainer>
);
};
export default Editar;
