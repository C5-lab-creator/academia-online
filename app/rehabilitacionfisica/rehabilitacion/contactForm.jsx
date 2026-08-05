"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    origen: "cursodemencias",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("contacto")
      .insert([form]);

    console.log("DATA:", data);
    console.log("ERROR:", error);

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
      origen: "cursodemencias",
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

      <button type="submit">
        Enviar
      </button>
    </form>
  );
}