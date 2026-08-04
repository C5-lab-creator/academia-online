"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Opinion = {
  id: number;
  nombre: string;
  opinion: string;
};

export default function OpinionesFlotantes() {
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);
  const [indice, setIndice] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const [expandido, setExpandido] = useState(false);
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase
        .from("opiniones")
        .select("id,nombre,opinion")
        .order("created_at", { ascending: false });

      if (data) setOpiniones(data);
    }

    cargar();
  }, []);

  // Detectar móvil
  useEffect(() => {
    const comprobar = () => {
      setEsMovil(window.innerWidth < 768);
    };

    comprobar();
    window.addEventListener("resize", comprobar);

    return () => window.removeEventListener("resize", comprobar);
  }, []);

  // Cambio automático de opiniones
  useEffect(() => {
    if (!opiniones.length) return;

    setMostrar(true);

    const intervalo = setInterval(() => {
      setMostrar(false);

      setTimeout(() => {
        setIndice((i) => (i + 1) % opiniones.length);
        setMostrar(true);
      }, 700);
    }, 10000);

    return () => clearInterval(intervalo);
  }, [opiniones]);

  // En móvil cerrar automáticamente tras abrir
  useEffect(() => {
    if (!expandido) return;

    const t = setTimeout(() => {
      setExpandido(false);
    }, 8000);

    return () => clearTimeout(t);
  }, [expandido]);

  if (!opiniones.length) return null;

  const opinion = opiniones[indice];

  return (
    <div
      className={`
        fixed
        bottom-20
        right-5
        md: bottom-5
        z-50
        transition-all
        duration-500
        ${
          mostrar
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }
      `}
    >
      {esMovil ? (
        expandido ? (
          <div className="relative w-[260px] rounded-2xl bg-white shadow-2xl border border-gray-200 p-4 animate-in fade-in slide-in-from-bottom-2">

            <div className="text-yellow-400 mb-2 text-lg">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="italic text-gray-700 text-sm">
              "{opinion.opinion}"
            </p>

            <p className="mt-3 font-semibold text-[#2C6E49]">
              {opinion.nombre}
            </p>

          </div>
        ) : (
          <button
            onClick={() => setExpandido(true)}
            className="rounded-full bg-[#2C6E49] text-white shadow-xl px-4 py-3 font-semibold flex items-center gap-2 hover:scale-105 transition"
          >
            ⭐ 4,9
          </button>
        )
      ) : (
        <div className="max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 px-6 py-5">

          <div className="text-yellow-400 text-lg mb-2">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="italic text-gray-700">
            "{opinion.opinion}"
          </p>

          <p className="mt-3 font-semibold text-[#2C6E49]">
            {opinion.nombre}
          </p>

        </div>
      )}
    </div>
  );
}