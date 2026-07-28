"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    origen: "cursosnee",
  });

  const handleChange = (

  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (

  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("contacto")
      .insert([
        {
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
          origen: "cursosautismo",
        },
      ]);

    if (error) {
      console.error(error);
    } else {
      alert("Mensaje enviado");
      setForm({
        nombre: "",
        email: "",
        mensaje: "",
        origen: "cursosnee",
      });
    }
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