"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Opinion = {
  id: string;
  nombre: string;
  opinion: string;
  valoracion: number;
};

export default function Opiniones() {
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [nombre, setNombre] = useState("");
  const [opinion, setOpinion] = useState("");
  const [valoracion, setValoracion] = useState(5);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarOpiniones();
  }, []);

  async function cargarOpiniones() {
    const { data, error } = await supabase
      .from("opiniones")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setOpiniones(data ?? []);
  }

  async function enviarOpinion() {
    if (!nombre.trim() || !opinion.trim()) {
      setMensaje("Completa todos los campos.");
      return;
    }

    const { error } = await supabase
      .from("opiniones")
      .insert([
        {
          nombre,
          opinion,
          valoracion,
          aprobada: true,
        },
      ]);

    if (error) {
      console.error(error);
      setMensaje(error.message);
      return;
    }

    setNombre("");
    setOpinion("");
    setValoracion(5);
    setMensaje("¡Gracias por tu opinión!");

    cargarOpiniones();
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto" }}>
      <h1>Opiniones</h1>

      <h2>Déjanos tu opinión</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br />
      <br />

      <select
        value={valoracion}
        onChange={(e) => setValoracion(Number(e.target.value))}
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <br />
      <br />

      <textarea
        rows={5}
        placeholder="Escribe tu opinión..."
        value={opinion}
        onChange={(e) => setOpinion(e.target.value)}
      />

      <br />
      <br />

      <button onClick={enviarOpinion}>
        Enviar opinión
      </button>

      <p>{mensaje}</p>

      <hr />

      <h2>Opiniones de nuestros alumnos</h2>

      {opiniones.length === 0 ? (
        <p>Todavía no hay opiniones.</p>
      ) : (
        opiniones.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              marginBottom: 20,
              borderRadius: 10,
            }}
          >
            <h3>{o.nombre}</h3>
            <p>{"⭐".repeat(o.valoracion)}</p>
            <p>{o.opinion}</p>
          </div>
        ))
      )}
    </main>
  );
}