"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Opinion = {
  id: string;
  nombre: string;
  opinion: string;
  valoracion: number;
};
export const metadata = {
  title: "Mente Abierta | Academia y Terapia Ocupacional",
  description:
    "Academia especializada en química, matemáticas y selectividad. Terapia ocupacional y estimulación cognitiva. Trastorno del espectro autista, integración sensorial, rehabilitación física y asesoramiento a familias. Cursos, clases y atención personalizada.",
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
    <main className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        ⭐ Opiniones
      </h1>


      <div className="curso mb-8">

        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Déjanos tu opinión
        </h2>


        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />


        <select
          className="w-full border rounded-lg p-3 mb-4"
          value={valoracion}
          onChange={(e) => setValoracion(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>


        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          rows={5}
          placeholder="Escribe tu opinión..."
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        />


        <button
          onClick={enviarOpinion}
          className="boton-reservar"
        >
          Enviar opinión
        </button>


        {mensaje && (
          <p className="mt-4 text-gray-700">
            {mensaje}
          </p>
        )}

      </div>



      <section>

        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Opiniones de nuestros alumnos
        </h2>


        {opiniones.length === 0 ? (
          <div className="curso">
            <p className="text-gray-700">
              Todavía no hay opiniones.
            </p>
          </div>
        ) : (

          <div className="space-y-6">

            {opiniones.map((o) => (

              <div
                key={o.id}
                className="curso"
              >

                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {o.nombre}
                </h3>

                <p className="mb-2">
                  {"⭐".repeat(o.valoracion)}
                </p>

                <p className="text-gray-700">
                  {o.opinion}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>


    </main>
  );
}