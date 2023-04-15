import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]); // Array de usuários
  const [onEdit, setOnEdit] = useState(null); // Se onEdit for diferente de null, ele vai editar o usuário, se não, ele vai criar um novo usuário

  const getUsers = async () => { // Função que vai pegar todos os usuários
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => { 
    getUsers();
  }, [setUsers]); // qdo o setUsers mudar vai executar a função getUsers

  return (
    <>
      <Container>
        <Title>Inserir carro</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} /> {/* Passando a getUsers pro Form*/}
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} /> {/* Passando pro grid*/}
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} /> {/* notificação do Toastify*/}
      <GlobalStyle />
    </>
  );
}

export default App;
