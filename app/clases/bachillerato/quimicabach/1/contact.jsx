"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    origen: "quimicabach",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { error } = await supabase
    .from("contacto")
    .insert([
      {
        nombre: form.nombre,
        email: form.email,
        mensaje: form.mensaje,
      },
    ]);

  if (error) {
    console.error(error);
    alert("Error al enviar el mensaje");
    return;
  }

  alert("Gracias por contactar con nosotros.");

  setForm({
    nombre: "",
    email: "",
    mensaje: "",
    origen: "quimica1",
  });
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

      <button type="submit">Enviar</button>
    </form>
  );
}