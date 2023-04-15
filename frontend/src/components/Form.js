import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;



const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => { // Se onEdit for diferente de null, ele vai preencher os campos com os dados do usuário
    if (onEdit) {
      const user = ref.current;

      user.placa.value = onEdit.placa;
      user.entrada.value = onEdit.entrada;
      user.saida.value = onEdit.saida;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => { // Se onEdit for diferente de null, ele vai editar o usuário, se não, ele vai criar um novo usuário
    e.preventDefault();

    const user = ref.current;

    if ( //MUDAR PARA DEIXAR O USUÁRIO EDITAR APENAS A SAÍDA
      !user.placa.value ||
      !user.entrada.value ||
      !user.saida.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) { //editando
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          placa: user.placa.value,
          entrada: user.entrada.value,
          saida: user.saida.value,
        })
        .then(({ data }) => toast.success(data)) //data é a mensagem de sucesso que vem do backend 
        .catch(({ data }) => toast.error(data));
    } else { //criando
      await axios
        .post("http://localhost:8800", {
          placa: user.placa.value,
          entrada: user.entrada.value,
          saida: user.saida.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    //limpando os campos do formulário após o submit do formulário
    user.placa.value = ""; 
    user.entrada.value = "";
    user.saida.value = "";

    setOnEdit(null);
    getUsers(); //atualizando a lista de usuários
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Placa</Label>
        <Input name="placa"/>
      </InputArea>
      <InputArea>
        <Label>Entrada</Label>
        <Input name="entrada" placeholder="h:min-dia/mês"/>
      </InputArea>
      <InputArea>
        <Label>Saída</Label> 
        <Input name="saida" placeholder="h:min-dia/mês"/>
      </InputArea>
   
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
