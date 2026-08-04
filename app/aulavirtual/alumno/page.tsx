"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function Alumno() {
  const [nombre, setNombre] = useState("");
const [classroom, setClassroom] = useState("");
const [reservas, setReservas] = useState<any[]>([]);
const [cursos, setCursos] = useState<any[]>([]);
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
    const { data: reservasData } = await supabase
  .from("reservas")
  .select("*")
  .eq("email", user.email)
  .order("fecha", { ascending: true });

setReservas(reservasData || []);
const { data: cursosData } = await supabase
  .from("cursos_comprados")
  .select("*")
  .eq("user_id", user.id);

setCursos(cursosData || []);
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

{cursos.length === 0 ? (
  <p>No has comprado ningún curso todavía.</p>
) : (
  cursos.map((curso) => (
    <div
      key={curso.id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h3>{curso.curso}</h3>

      {curso.classroom_url ? (
        <a
          href={curso.classroom_url}
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
            📚 Entrar al Classroom del curso
          </button>
        </a>
      ) : (
        <p>Este curso todavía no tiene Classroom asignado.</p>
      )}
    </div>
  ))
)}
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
  <h2>📅 Mis clases</h2>

  {reservas.length === 0 ? (
    <p>No tienes clases reservadas.</p>
  ) : (
    reservas.map((r) => (
      <div
        key={r.id}
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "15px",
        }}
      >
        <h3>{r.servicio}</h3>

        <p>
          <strong>Profesor:</strong> {r.profesional}
        </p>

        <p>
          <strong>Fecha:</strong> {r.fecha}
        </p>

        <p>
          <strong>Hora:</strong> {r.hora}
        </p>

        <p>
          <strong>Estado del pago:</strong> {r.estado_pago}
        </p>

        {r.estado_pago === "Pagado" && r.enlace_meet ? (
          <a
            href={r.enlace_meet}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#16a34a",
                color: "white",
                cursor: "pointer",
              }}
            >
              🎥 Entrar a Google Meet
            </button>
          </a>
        ) : (
          <p>El enlace aparecerá cuando el pago esté confirmado.</p>
        )}
      </div>
    ))
  )}
</section>
    </main>
  );
}