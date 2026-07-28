"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Mensaje {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  origen: string | null;
  created_at: string;
  leido: boolean;
}

export default function AdminContacto() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMensajes();
  }, []);

  async function cargarMensajes() {
    setLoading(true);

    const { data, error } = await supabase
      .from("contacto")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al cargar mensajes:", error);
      alert("No se pudieron cargar los mensajes.");
      setLoading(false);
      return;
    }

    setMensajes(data || []);
    setLoading(false);
  }

  async function eliminar(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este mensaje?")) return;

    const { error } = await supabase
      .from("contacto")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar:", error);
      alert(error.message);
      return;
    }

    setMensajes((prev) => prev.filter((m) => m.id !== id));
  }

  if (loading) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h2>Cargando mensajes...</h2>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <h1>📩 Mensajes de contacto</h1>

      {mensajes.length === 0 ? (
        <p>No hay mensajes todavía.</p>
      ) : (
        mensajes.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: m.leido ? "#f5f5f5" : "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3>{m.nombre}</h3>

            <p>
              <strong>Email:</strong> {m.email}
            </p>

            {m.origen && (
              <p>
                <strong>Origen:</strong> {m.origen}
              </p>
            )}

            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(m.created_at).toLocaleString()}
            </p>

            <p>{m.mensaje}</p>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => eliminar(m.id)}
                style={{
                  padding: "8px 14px",
                  cursor: "pointer",
                }}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}