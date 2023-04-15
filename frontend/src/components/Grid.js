import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";



const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;


export const Thead = styled.thead``; //table head

export const Tbody = styled.tbody``; //table body

export const Tr = styled.tr``; //table row

//table header
export const Th = styled.th` 
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

//table data
export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;



const Grid = ({ users, setUsers, setOnEdit }) => { 
  const handleEdit = (item) => { // Função para editar
    setOnEdit(item); //atualiza o estado do item com OnEdit pra que lá no Form ele atualize com as novas informações
  };

  //DELETE
  const handleDelete = async (id) => { 
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id); // Filtra o array de veiculos e retorna um novo array sem o usuário que foi deletado

        setUsers(newArray); 
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Placa</Th>
          <Th>Entrada</Th>
          <Th>Saída</Th>
          <Th>Valor</Th>
          <Th></Th> {/* Coluna vazia para o botão de editar */}
          <Th></Th> {/* Coluna vazia para o botão de deletar */}
        </Tr>
      </Thead>

      <Tbody>
        {users.map((item, i) => ( // Percorre o array de veiculos e retorna uma linha para cada veiculo
          <Tr key={i}>
            <Td >{item.placa}</Td>
            <Td >{item.entrada}</Td>
            <Td >{item.saida}</Td>
            <Td >{item.valor}</Td>
            <Td alignCenter >
              <FaEdit onClick={() => handleEdit(item)} /> {/* Chama a função handleEdit passando o veiculo que quer editar como parâmetro */}
            </Td>
            <Td alignCenter >
              <FaTrash onClick={() => handleDelete(item.id)} /> {/* Chama a função handleDelete passando o id do veiculo que quer deletar como parâmetro */}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
