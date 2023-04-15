# Projeto - Oportunidade Forte Security
## Sistema de gerenciamento de estacionamento desenvolvido com React e MySQL

O projeto se divide em duas partes, sendo a primeira uma API conectada a um banco de dados MySQL para persistência dos dados (backend), e a segunda uma aplicação em react que utiliza a API (frontend). 

## Como rodar

### Configurar o banco de dados e a conexão com ele
Primeiro certifique-se de que você possui um banco de dados MySQL rodando com um schema chamado "estacionamento". Esse schema deve conter uma tabela "veiculos" com os seguintes atributos:
- placa (notnull)
- entrada (notnull)
- saida
- valor
- id (notnull, primary key, auto incremental)

Se preferir, pode gerar o banco a partir do arquivo **bancoEstacionamento.sql** na raíz do projeto.

Após isso, será necessário alterar o arquivo **db.js** na pasta api, colocando as informações necessárias para conexão com o sgdb (host, user e password).

### Iniciar a aplicação
Inicialmente, precisamos instalar os pacotes tanto do backend (api) quanto do frontend. Para isso comece executando os comandos abaixo para instalar os pacotes da api. 
```sh
cd api
npm install
```
Quando terminar, volte à pasta desafioForte e faça o mesmo para o frontend.
```sh
cd ../
cd frontend
npm install
```
Com os packages instalados e com o banco de dados funcionando, será possível iniciar as duas aplicações. Abra dois terminais, um na pasta api e outro em frontend, e execute o comando abaixo nos dois.
```sh
npm start
```
Pronto, a aplicação já estará rodando em http://localhost:3000/.
