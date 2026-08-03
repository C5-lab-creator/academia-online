"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function Alumno() {
  const [nombre, setNombre] = useState("");
const [classroom, setClassroom] = useState("");
useEffect(() => {
  async function cargarPerfil() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("nombre, classroom_url")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setNombre(data.nombre || "");
      setClassroom(data.classroom_url || "");
    }
  }

  cargarPerfil();
}, []);
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>🎓 Área del alumno</h1>

       <p>¡Bienvenid@ {nombre || "alumno"}!</p> 

      <hr style={{ margin: "30px 0" }} />

      <section>
        <h2>📚 Mis cursos</h2>
        <ul>
           <li>Pruebas de acceso mayores de 25 años</li>
           <li>Matemáticas 2º bachillerato</li>
           <li>Química 2º bachillerato</li>
           <li>Aprueba matemáticas de selectividad en 4 semanas</li>
           <li>Aprueba química de selectividad en 4 semanas</li>
           <li>Familiares-autismo</li>
           <li>Familiares-demencia</li>
           <li>Profesionales-demencia</li>
           <li>Escuela de espalda</li>
        </ul>
      </section>

<section style={{ marginTop: "30px" }}>
  <h2>🎓 Mi Classroom</h2>

  {classroom ? (
    <a
      href={classroom}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        Entrar a mi Classroom
      </button>
    </a>
  ) : (
    <p>Tu Classroom aún no ha sido asignado.</p>
  )}
</section>

      <section style={{ marginTop: "30px" }}>
        <h2>📅 Próximas clases</h2>
        <p>Aquí podrás ver tus próximas clases programadas.</p>
        <p>Aquí tendrás los enlaces a tus próximas clases programadas.</p>
      </section>
    </main>
  );
}