const express = require("express");
const connection = require("./database");

const app = express();
app.use(express.json());
const PORT = 3000;
//TODAS LAS NOTAS
app.get("/notes", (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const query = `SELECT * FROM notas LIMIT ${pageSize} OFFSET ${offset}`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener las notas:", error.message);
      res.status(500).json({ error: "Error" });
      return;
    }

    res.json({ notes: results });
  });
});

//NOTA X ID
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM notas WHERE ID = ${id}`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener la nota por ID:", error.message);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Nota no encontrada" });
    } else {
      res.json({ note: results[0] });
    }
  });
});
//NUEVA NOTA
app.post("/notes", (req, res) => {
  const { id, title, description } = req.body;
  const currentDate = new Date().toISOString();

  const query = `INSERT INTO notas ( ID, TITLE, DESCRIPTION, CREATED_AT, UPDATED_AT) 
  VALUES ( '${id}', '${title}', '${description}', '${CDate}', '${CDate}')`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al crear", error.message);
      res.status(500).json({ error: "Error" });
      return;
    }
  });
});
//ACTUALIZAR NOTA
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const CDate = new Date().toISOString();
  const query = `UPDATE notas SET TITLE = '${title}', DESCRIPTION = '${description}', UPDATED_AT = '${CDate}'  WHERE ID = ${id}`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al actualizar", error.message);
      res.status(500).json({ error: "Error" });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Nota no encontrada" });
    } else {
      res.json({ message: "Nota actualizada" });
    }
  });
});
//ELIMINAR NOTA
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM notas WHERE ID = ${id}`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al eliminar:", error.message);
      res.status(500).json({ error: "Error" });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Nota no encontrada" });
    } else {
      res.json({ message: "Nota eliminada exitosamente" });
    }
  });
});

app.listen(PORT, () => {});
