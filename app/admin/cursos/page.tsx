"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCursos() {
  const [curso, setCurso] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    imagen: "",
    video: "",
  });

  const [cursos, setCursos] = useState<any[]>([]);

  useEffect(() => {
    cargarCursos();
  }, []);

  async function cargarCursos() {
    const { data, error } = await supabase
      .from("cursos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCursos(data);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurso({
      ...curso,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("cursos")
      .insert([
        {
          titulo: curso.titulo,
          descripcion: curso.descripcion,
          precio: Number(curso.precio),
          imagen: curso.imagen,
          video: curso.video,
          publicado: false,
        },
      ])
      .select();

    console.log(data);
    console.log(error);

    if (error) {
      console.error(error);
      alert(JSON.stringify(error));
      return;
    }

    alert("Curso guardado correctamente");

    cargarCursos();

    setCurso({
      titulo: "",
      descripcion: "",
      precio: "",
      imagen: "",
      video: "",
    });
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Administración de Cursos</h1>

      <form onSubmit={handleSubmit}>
        <label>Título del curso</label>

        <input
          name="titulo"
          value={curso.titulo}
          onChange={handleChange}
          placeholder="Ej: Química PAU Intensivo"
        />

        <label>Descripción</label>

        <textarea
          name="descripcion"
          value={curso.descripcion}
          onChange={handleChange}
          placeholder="Describe el curso..."
        />

        <label>Precio (€)</label>

        <input
          name="precio"
          value={curso.precio}
          onChange={handleChange}
          placeholder="Ej: 49"
        />

        <label>Imagen</label>

        <input
          name="imagen"
          value={curso.imagen}
          onChange={handleChange}
          placeholder="URL de la imagen"
        />

        <label>Vídeo del curso</label>

        <input
          name="video"
          value={curso.video}
          onChange={handleChange}
          placeholder="URL del vídeo"
        />

        <button type="submit">
          Guardar curso
        </button>
      </form>

      <h2 style={{ marginTop: 50 }}>Cursos creados</h2>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Título</th>
            <th>Precio</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.titulo}</td>
              <td>{curso.precio} €</td>
              <td>
                {curso.publicado ? "🟢 Publicado" : "🟡 Borrador"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 500px;
          margin-top: 30px;
        }

        input,
        textarea {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        textarea {
          min-height: 120px;
        }

        button {
          padding: 12px;
          background: #333;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        table,
        th,
        td {
          border: 1px solid #ddd;
          padding: 10px;
        }

        th {
          background: #f3f4f6;
        }
      `}</style>
    </main>
  );
}