/* eslint-disable prettier/prettier */
import { useRef } from 'react';
import Button from '../../../shared/components/button/Button';
import { useCreateUser } from '../hooks/useCreateUser';
import { CreateUserContainer, CreateUserIcon, CreateUserText, CreateUserView } from '../styles/createUser.style';
import { TextInput } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Input from '../../../shared/components/input/input';
import { theme } from '../../../shared/themes/theme';
import { textTypes } from '../../../shared/components/text/textTypes';

const CreateUser = () => {
  const { createUser, disabled, loading, handleOnChangeInput, setValorSelecionado,handleValidarUser } = useCreateUser();
  const phoneInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const dateNascInput = useRef<TextInput>(null);
  const ufInput = useRef<TextInput>(null);
  const enderecoInput = useRef<TextInput>(null);
  const cidadeInput = useRef<TextInput>(null);
  const rgInput = useRef<TextInput>(null);
  const cpfInput = useRef<TextInput>(null);
  const cepInput = useRef<TextInput>(null);
  const bairroInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const confirmePasswordInput = useRef<TextInput>(null);
  const countries = ['Decorador(A)', 'Arquiteto(A)', 'Designer'];

  return (
    <CreateUserContainer>
      <Input
        value={createUser.name}
        onChange={(event) => handleOnChangeInput(event, 'name')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        title="Nome completo :"
        onSubmitEditing={() => phoneInput.current?.focus()}
      />
      <Input
        value={createUser.phone}
        onChange={(event) => handleOnChangeInput(event, 'phone')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        type="cel-phone"
        maxLength={15}
        title="Telefone :"
        ref={phoneInput}
        onSubmitEditing={() => emailInput.current?.focus()}
        keyboardType="number-pad"

      />
      <Input
        value={createUser.email.toUpperCase()}
        onChange={(event) => handleOnChangeInput(event, 'email')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        title="Email :"
        ref={emailInput}
        onSubmitEditing={() => cpfInput.current?.focus()}
        keyboardType="email-address"

      />
      <Input
        value={createUser.cpf}
        onChange={(event) => handleOnChangeInput(event, 'cpf')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        title="CPF Ou CNPJ:"
        ref={cpfInput}
        onSubmitEditing={() => rgInput.current?.focus()}
        keyboardType="number-pad"
      />

      <Input
        value={createUser.rg}
        onChange={(event) => handleOnChangeInput(event, 'rg')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        ref={rgInput}
        title="RG :"
        onSubmitEditing={() => ufInput.current?.focus()}
      />
      <Input
        value={createUser.uf}
        onChange={(event) => handleOnChangeInput(event, 'uf')}
        margin="0px 0px 16px 0px"
        maxLength={2}
        placeholder="Digite"
        ref={ufInput}
        title="UF :"
        onSubmitEditing={() => dateNascInput.current?.focus()}
      />
      <Input
        value={createUser.datanasc}
        onChange={(event) => handleOnChangeInput(event, 'datanasc')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        type="datanasc"
        maxLength={10}
        ref={dateNascInput}
        title="Data de nascimento :"
        onSubmitEditing={() => enderecoInput.current?.focus()}
      />
      <Input
        value={createUser.endereco}
        onChange={(event) => handleOnChangeInput(event, 'endereco')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        ref={enderecoInput}
        title="Endereço :"
        onSubmitEditing={() => cidadeInput.current?.focus()}
      />
      <Input
        value={createUser.cidade}
        onChange={(event) => handleOnChangeInput(event, 'cidade')}
        margin="0px 0px 16px 0px"
        ref={cidadeInput}
        placeholder="Digite"
        title="Cidade :"
        onSubmitEditing={() => bairroInput.current?.focus()}
      />
      <Input
      value={createUser.bairro}
      onChange={(event) => handleOnChangeInput(event, 'bairro')}
      margin="0px 0px 16px 0px"
      ref={bairroInput}
      placeholder="Digite"
      title="Bairro :"
      onSubmitEditing={() => cepInput.current?.focus()}
    />
      <Input
        value={createUser.cep}
        onChange={(event) => handleOnChangeInput(event, 'cep')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        type="cep"
        maxLength={9}
        ref={cepInput}
        title="CEP :"
        onSubmitEditing={() => passwordInput.current?.focus()}
      />
      <Input
        value={createUser.password}
        onChange={(event) => handleOnChangeInput(event, 'password')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        title="Senha :"
        secureTextEntry
        ref={passwordInput}
        onSubmitEditing={() => confirmePasswordInput.current?.focus()}
      />
      <Input
        value={createUser.confirmPassword}
        onChange={(event) => handleOnChangeInput(event, 'confirmPassword')}
        margin="0px 0px 16px 0px"
        placeholder="Digite"
        title="Confirme senha :"
        secureTextEntry
        ref={confirmePasswordInput}
      />
      <CreateUserView>
        <SelectDropdown
      buttonStyle={{width:'70%',borderColor:'black',borderWidth:1, height:20, alignItems: 'center'}}
         defaultButtonText="selecione uma Profissão "
         buttonTextStyle={{fontSize:12}}
        data={countries}
        onSelect={(selectedItem) => {
          setValorSelecionado(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
      />
      <CreateUserIcon name="arrow-down"/>
      </CreateUserView>
      <Button
        disabled={disabled}
        onPress={handleValidarUser}
        loading={loading}
        margin="0px 0px 0px 0px"
        title="Criar usúario"
      />
      <CreateUserText
      color={theme.colors.orangeTheme.orange80}
      type={textTypes.PARAGRAPH_SMALL_SEMI_BOLD}
      margin="0px 0px 40px 0px"
      >
        O botão só será ativado quando todos os campos estiverem preenchidos de maneira correta.
      </CreateUserText>
    </CreateUserContainer>
  );
};
export default CreateUser;
