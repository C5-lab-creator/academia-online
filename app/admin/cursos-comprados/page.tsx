"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCursosComprados() {
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [listaCursos, setListaCursos] = useState<any[]>([]);

  const [alumnoId, setAlumnoId] = useState("");
  const [curso, setCurso] = useState("");
  const [cursoManual, setCursoManual] = useState("");
  const [classroom, setClassroom] = useState("");

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarAlumnos();
    cargarCursos();
  }, []);

  // ==========================================
  // CARGAR ALUMNOS
  // ==========================================

  async function cargarAlumnos() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id,nombre,email")
      .eq("role", "alumno")
      .order("nombre");

    if (error) {
      alert(error.message);
      return;
    }

    setAlumnos(data || []);
  }

  // ==========================================
  // CARGAR CURSOS
  // ==========================================

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

  // ==========================================
  // AÑADIR CURSO
  // ==========================================

  async function añadirCurso() {
    const cursoFinal =
      curso === "manual"
        ? cursoManual.trim()
        : curso;

    if (!alumnoId || !cursoFinal) {
      alert("Selecciona un alumno y un curso.");
      return;
    }

    if (!classroom.trim()) {
      alert("Introduce el enlace de Google Classroom.");
      return;
    }

    setGuardando(true);

    try {
      // ========================================
      // OBTENER SESIÓN ACTUAL
      // ========================================

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "Error obteniendo sesión:",
          sessionError
        );

        alert(
          "No se pudo comprobar tu sesión."
        );

        return;
      }

      if (!session) {
        alert(
          "No estás autenticado. Cierra sesión y vuelve a entrar."
        );

        return;
      }

      console.log(
        "Administrador autenticado:",
        session.user.email
      );

      // ========================================
      // LLAMAR A LA API
      // ========================================

      const response = await fetch(
        "/api/admin/cursos-comprados",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            // IMPORTANTE:
            // Enviamos el token de Supabase
            // al servidor.
            Authorization: `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            user_id: alumnoId,
            curso: cursoFinal,
            classroom_url: classroom.trim(),
          }),
        }
      );

      const resultado = await response.json();

      // ========================================
      // ERROR
      // ========================================

      if (!response.ok) {
        console.error(
          "Error API:",
          resultado
        );

        alert(
          resultado.error ||
            "No se pudo asignar el curso."
        );

        return;
      }

      // ========================================
      // CORRECTO
      // ========================================

      alert(
        "✅ Curso asignado correctamente"
      );

      // Limpiar formulario

      setAlumnoId("");
      setCurso("");
      setCursoManual("");
      setClassroom("");

    } catch (error) {
      console.error(
        "Error asignando curso:",
        error
      );

      alert(
        "Error conectando con el servidor."
      );

    } finally {
      setGuardando(false);
    }
  }

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
      }}
    >
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
        {/* ==================================
            ALUMNO
        ================================== */}

        <select
          value={alumnoId}
          onChange={(e) =>
            setAlumnoId(e.target.value)
          }
        >
          <option value="">
            Selecciona un alumno
          </option>

          {alumnos.map((a) => (
            <option
              key={a.id}
              value={a.id}
            >
              {a.nombre} ({a.email})
            </option>
          ))}
        </select>

        {/* ==================================
            CURSO
        ================================== */}

        <select
          value={curso}
          onChange={(e) =>
            setCurso(e.target.value)
          }
        >
          <option value="">
            Selecciona un curso
          </option>

          {listaCursos.map((c) => (
            <option
              key={c.id}
              value={c.titulo}
            >
              {c.titulo}
            </option>
          ))}

          <option value="manual">
            ✏️ Otro curso (escribir manualmente)
          </option>
        </select>

        {/* ==================================
            CURSO MANUAL
        ================================== */}

        {curso === "manual" && (
          <input
            type="text"
            placeholder="Escribe el nombre del curso"
            value={cursoManual}
            onChange={(e) =>
              setCursoManual(e.target.value)
            }
          />
        )}

        {/* ==================================
            CLASSROOM
        ================================== */}

        <input
          type="text"
          placeholder="https://classroom.google.com/..."
          value={classroom}
          onChange={(e) =>
            setClassroom(e.target.value)
          }
        />

        {/* ==================================
            BOTÓN
        ================================== */}

        <button
          onClick={añadirCurso}
          disabled={guardando}
          style={{
            background: guardando
              ? "#94a3b8"
              : "#16a34a",

            color: "white",

            border: "none",

            borderRadius: "8px",

            padding: "12px",

            cursor: guardando
              ? "not-allowed"
              : "pointer",
          }}
        >
          {guardando
            ? "Guardando..."
            : "➕ Asignar curso"}
        </button>
      </div>
    </main>
  );
}