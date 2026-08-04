"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCursosComprados() {
    const [alumnos, setAlumnos] = useState<any[]>([]);
    const [listaCursos, setListaCursos] = useState<any[]>([]);
    const [alumnoId, setAlumnoId] = useState("");
    const [curso, setCurso] = useState("");
    const [classroom, setClassroom] = useState("");
useEffect(() => {
  cargarAlumnos();
  cargarCursos();
}, []);

async function cargarAlumnos() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,nombre,email")
    .eq ("role", "alumno")
    .order("nombre");

  if (error) {
    alert(error.message);
    return;
  }

  setAlumnos(data || []);
}
async function cargarCursos() {
  const { data, error } = await supabase
    .from("cursos")
    .select("id, titulo")
    .order("titulo");

  if (error) {
    alert(error.message);
    return;
  }

  setListaCursos(data || []);
}
async function añadirCurso() {
  if (!alumnoId || !curso) {
    alert("Selecciona un alumno y escribe el curso.");
    return;
  }

  const { error } = await supabase
    .from("cursos_comprados")
    .insert({
      user_id: alumnoId,
      curso,
      classroom_url: classroom,
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Curso asignado correctamente");

  setCurso("");
  setClassroom("");
}
  return (
    <main style={{ maxWidth: 1200, margin: "40px auto", padding: 20 }}>
      <h1>📚 Cursos comprados</h1>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "600px",
    marginTop: "30px",
  }}
>
  <select
    value={alumnoId}
    onChange={(e) => setAlumnoId(e.target.value)}
  >
    <option value="">Selecciona un alumno</option>

    {alumnos.map((a) => (
      <option key={a.id} value={a.id}>
        {a.nombre} ({a.email})
      </option>
    ))}
  </select>

<select
  value={curso}
  onChange={(e) => setCurso(e.target.value)}
>
  <option value="">Selecciona un curso</option>

  {listaCursos.map((c) => (
    <option key={c.id} value={c.titulo}>
      {c.titulo}
    </option>
  ))}
</select>

  <input
    type="text"
    placeholder="https://classroom.google.com/..."
    value={classroom}
    onChange={(e) => setClassroom(e.target.value)}
  />

  <button
    onClick={añadirCurso}
    style={{
      background: "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "12px",
      cursor: "pointer",
    }}
  >
    ➕ Asignar curso
  </button>
</div>
    </main>
  );
}