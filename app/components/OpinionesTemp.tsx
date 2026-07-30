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

  useEffect(() => {
    if (!opiniones.length) return;

    setMostrar(true);

    const intervalo = setInterval(() => {
      setMostrar(false);

      setTimeout(() => {
        setIndice((i) => (i + 1) % opiniones.length);
        setMostrar(true);
      }, 800);
    }, 6000);

    return () => clearInterval(intervalo);
  }, [opiniones]);

  if (!opiniones.length) return null;

  const opinion = opiniones[indice];

  return (
    <div
      className={`
      fixed
      left-1/2
      -translate-x-1/2
      bottom-10
      z-50
      transition-all
      duration-700
      ${
        mostrar
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }
      `}
    >
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
    </div>
  );
}