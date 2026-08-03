"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Curso = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  video: string;
  publicado: boolean;
};

export default function AdminCursos() {
  const [curso, setCurso] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    imagen: "",
    video: "",
  });

  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    cargarCursos();
  }, []);

  async function cargarCursos() {
    const { data, error } = await supabase
      .from("cursos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setCursos((data as Curso[]) || []);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCurso({
      ...curso,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await supabase.from("cursos").insert({
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      precio: Number(curso.precio),
      imagen: curso.imagen,
      video: curso.video,
      publicado: false,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Curso guardado correctamente");

    setCurso({
      titulo: "",
      descripcion: "",
      precio: "",
      imagen: "",
      video: "",
    });

    cargarCursos();
  }

  async function cambiarEstado(id: string, publicado: boolean) {
    const { error } = await supabase
      .from("cursos")
      .update({
        publicado: !publicado,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarCursos();
  }

  async function borrarCurso(id: string) {
    if (!confirm("¿Seguro que deseas borrar este curso?")) return;

    const { error } = await supabase
      .from("cursos")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Curso eliminado");

    cargarCursos();
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Administración de cursos</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="titulo"
          placeholder="Título"
          value={curso.titulo}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={curso.descripcion}
          onChange={handleChange}
        />

        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={curso.precio}
          onChange={handleChange}
        />

        <input
          name="imagen"
          placeholder="URL Imagen"
          value={curso.imagen}
          onChange={handleChange}
        />

        <input
          name="video"
          placeholder="URL Vídeo"
          value={curso.video}
          onChange={handleChange}
        />

        <button type="submit">
          Guardar curso
        </button>
      </form>

      <h2 style={{ marginTop: 40 }}>
        Cursos creados
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            <th>Título</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
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

              <td>
                <button
                  type="button"
                  onClick={() =>
                    cambiarEstado(curso.id, curso.publicado)
                  }
                  style={{
                    marginRight: 10,
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 6,
                  }}
                >
                  {curso.publicado ? "Ocultar" : "Publicar"}
                </button>

                <button
                  type="button"
                  onClick={() => borrarCurso(curso.id)}
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 6,
                  }}
                >
                  🗑️ Borrar
                </button>
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
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        textarea {
          min-height: 120px;
        }

        table,
        td,
        th {
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