"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEnviando(true);
    setStatus("");

    const { error } = await supabase
      .from("contacto")
      .insert([
        {
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
          origen: "mates1",
        },
      ]);

    if (error) {
      console.error(error);
      setStatusType("error");
      setStatus("❌ No se pudo enviar el mensaje. Inténtalo de nuevo.");
      setEnviando(false);
      return;
    }

    setStatusType("success");
    setStatus(
      "✅ Gracias por contactar con nosotros. Tu mensaje se ha enviado correctamente."
    );

    setForm({
      nombre: "",
      email: "",
      mensaje: "",
    });

    setEnviando(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />

      <br /><br />

      <textarea
        name="mensaje"
        placeholder="Escribe tu mensaje"
        value={form.mensaje}
        onChange={handleChange}
        required
      />

      <br /><br />

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar"}
      </button>

      {status && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor:
              statusType === "success" ? "#d4edda" : "#f8d7da",
            color:
              statusType === "success" ? "#155724" : "#721c24",
            border:
              statusType === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
          }}
        >
          {status}
        </div>
      )}
    </form>
  );
}