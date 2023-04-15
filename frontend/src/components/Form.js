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

  useEffect(() => { // Se onEdit for diferente de null, ele vai preencher os campos da inserção com os dados que estão sendo editados
    if (onEdit) {
      const user = ref.current;

      user.placa.value = onEdit.placa;
      user.entrada.value = onEdit.entrada;
      user.saida.value = onEdit.saida;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => { // Função que vai salvar o usuário
    e.preventDefault();

    const user = ref.current;

    if ( //verificando se os campos estão preenchidos
      !user.placa.value || !user.entrada.value
    ) {
      return toast.warn("Preencha a Placa e a Entrada");
    }


    //UPDATE
    if (onEdit) { // Se onEdit estiver ligado, ele vai fazer um PUT, senão, um POST
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          placa: user.placa.value,
          entrada: user.entrada.value,
          saida: user.saida.value,
        })
        .then(({ data }) => toast.success(data)) //data é a mensagem de sucesso que vem do backend 
        .catch(({ data }) => toast.error(data));

    } else { 
    
      let preço;
      if (user.saida.value) { //se o usuário preencher o campo de saída, ele vai calcular o preço
        //data no fomato "hora:min-dia/mês"
        //5 reais por hora
        try{
          //separando hora:min e dia/mês
          let entrada = user.entrada.value.split("-");
          let saida = user.saida.value.split("-");

          let entradaHora = entrada[0].split(":");
          let saidaHora = saida[0].split(":");

          let entradaDia = entrada[1].split("/");
          let saidaDia = saida[1].split("/");

          //separando hora e min
          let entradaMin = entradaHora[1];
          let saidaMin = saidaHora[1];
          entradaHora = entradaHora[0];
          saidaHora = saidaHora[0];

          //separando dia e mês
          let entradaMes = entradaDia[1];
          let saidaMes = saidaDia[1];
          entradaDia = entradaDia[0];
          saidaDia = saidaDia[0];


          //calculando a diferença entre a entrada e a saída
          let diferençaDias = saidaDia - entradaDia;
          let diferençaMeses = saidaMes - entradaMes;
          let diferençaHoras = saidaHora - entradaHora;
          let diferençaMinutos = saidaMin - entradaMin;
          if (diferençaMinutos < 0) {
            diferençaMinutos += 60;
            diferençaHoras--;
          }
          if (diferençaHoras < 0) {
            diferençaHoras += 24;
            diferençaDias--;
          }
          if (diferençaDias < 0) {
            diferençaDias += 30;
            diferençaMeses--;
          }

          //arredondar os minutos para cima conforme solicitado
          if (diferençaMinutos > 0) 
            diferençaHoras++;
          
          preço = diferençaMeses * 30 * 24 * 5 + diferençaDias * 24 * 5 + diferençaHoras * 5 + diferençaMinutos * 5 / 60;

          
          preço = "R$ " + preço.toFixed(2);
        }
        catch{
          return toast.warn("Preencha corretamente os campos de entrada e saída ");
        }
        
      }

      //CREATE
      await axios
      .post("http://localhost:8800", {
        placa: user.placa.value,
        entrada: user.entrada.value,
        saida: user.saida.value,
        valor: preço // passando o valor aqui
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
