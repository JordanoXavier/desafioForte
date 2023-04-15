import { db } from "../db.js";

//read
export const getUsers = (_, res) => { // nao precisa de req
  const q = "SELECT * FROM veiculos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


//create
export const addUser = (req, res) => {
  const q =
    "INSERT INTO veiculos(`placa`, `entrada`, `saida`, `valor`) VALUES(?)";

  const values = [
    req.body.placa,
    req.body.entrada,
    req.body.saida,
    req.body.valor,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Registrado com sucesso.");
  });
};

//update
export const updateUser = (req, res) => {
  const q =
    "UPDATE veiculos SET `placa` = ?, `entrada` = ?, `saida` = ?, `valor` = ? WHERE `id` = ?";

  const values = [
    req.body.placa,
    req.body.entrada,
    req.body.saida,
    req.body.valor,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Atualizado com sucesso.");
  });
};

//delete
export const deleteUser = (req, res) => {
  const q = "DELETE FROM veiculos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Deletado com sucesso.");
  });
};
