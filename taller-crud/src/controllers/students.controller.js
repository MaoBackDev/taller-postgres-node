import { request, response} from 'express';
import pool from '../database/connectionDB.js';

export const getStudents = async(req=request, res=response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM students'
    )
    return res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}


export const createStudent = async(req=request, res=response) => {
  const { name, age } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO students (name, age) values ($1, $2) RETURNING *",
      [name, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

    if (result.rows.length <= 0)
      return res.status(404).json({ message: "User not found!" });
    return res.status(200).json(result.rows[0]);
    
  } catch (error) {
    return res.status(500).json({ message: error.message});
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    const result = await pool.query(
      "UPDATE students SET name = $1, age = $2 WHERE id = $3 RETURNING *",
      [name, age, id]
    );
    return res.status(200).json({
      message: `El usuario con id ${id} ha sido actualizado!`,
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);
    return res
      .status(200)
      .json({ message: `El usuario con id ${id} ha sido eliminado!` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};