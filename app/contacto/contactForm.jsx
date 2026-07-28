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
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEnviando(true);
    setMensaje("");

    // Guardar en Supabase
    const { error } = await supabase
      .from("contacto")
      .insert([
        {
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
          origen: "pagppal",
        },
      ]);

    if (error) {
      console.error(error);
      setTipoMensaje("error");
      setMensaje("❌ Ha ocurrido un error al enviar el mensaje.");
      setEnviando(false);
      return;
    }

    // Enviar correo
    try {
      await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error(err);
    }

    setTipoMensaje("success");
    setMensaje("✅ Mensaje enviado correctamente. Gracias por contactar con nosotros.");

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

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <textarea
        name="mensaje"
        placeholder="Escribe tu mensaje"
        value={form.mensaje}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar"}
      </button>

      {mensaje && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor:
              tipoMensaje === "success" ? "#d4edda" : "#f8d7da",
            color:
              tipoMensaje === "success" ? "#155724" : "#721c24",
            border:
              tipoMensaje === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
          }}
        >
          {mensaje}
        </div>
      )}
    </form>
  );
}