"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Alumno = {
  id: string;
  nombre: string;
  email: string;
};

type Curso = {
  id: string;
  titulo: string;
};

export default function AdminCursosComprados() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [listaCursos, setListaCursos] = useState<Curso[]>([]);

  const [alumnoId, setAlumnoId] = useState("");
  const [curso, setCurso] = useState("");
  const [cursoManual, setCursoManual] = useState("");
  const [classroom, setClassroom] = useState("");

  const [guardando, setGuardando] = useState(false);

  // ==========================================
  // CARGAR DATOS
  // ==========================================

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
      console.error("Error cargando alumnos:", error);
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
      .select("id,titulo")
      .order("titulo");

    if (error) {
      console.error("Error cargando cursos:", error);
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

    // ========================================
    // VALIDACIONES
    // ========================================

    if (!alumnoId) {
      alert("Selecciona un alumno.");
      return;
    }

    if (!cursoFinal) {
      alert("Selecciona un curso.");
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

      console.log("========== SUPABASE AUTH ==========");
      console.log("Sesión:", session);
      console.log(
        "Usuario:",
        session?.user?.email
      );
      console.log(
        "Auth error:",
        sessionError
      );
      console.log("====================================");

      // ========================================
      // ERROR SESIÓN
      // ========================================

      if (sessionError) {
        console.error(
          "Error obteniendo sesión:",
          sessionError
        );

        alert(
          "No se pudo comprobar tu sesión de Supabase."
        );

        return;
      }

      // ========================================
      // NO HAY SESIÓN
      // ========================================

      if (!session) {
        console.error(
          "SUPABASE NO ENCUENTRA LA SESIÓN"
        );

        alert(
          "No estás autenticado. Cierra sesión y vuelve a entrar."
        );

        return;
      }

      // ========================================
      // COMPROBAR ACCESS TOKEN
      // ========================================

      if (!session.access_token) {
        console.error(
          "No existe access_token."
        );

        alert(
          "Tu sesión no tiene un token válido. Vuelve a iniciar sesión."
        );

        return;
      }

      console.log(
        "✅ Administrador autenticado:",
        session.user.email
      );

      console.log(
        "✅ Access token encontrado"
      );

      // ========================================
      // ENVIAR PETICIÓN A LA API
      // ========================================

      const response = await fetch(
        "/api/admin/cursos-comprados",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            user_id: alumnoId,
            curso: cursoFinal,
            classroom_url: classroom.trim(),
          }),
        }
      );

      // ========================================
      // LEER RESPUESTA
      // ========================================

      let resultado: any = {};

      try {
        resultado = await response.json();
      } catch {
        resultado = {
          error:
            "El servidor no devolvió una respuesta válida.",
        };
      }

      console.log(
        "========== RESPUESTA API =========="
      );

      console.log(
        "Status:",
        response.status
      );

      console.log(
        "Resultado:",
        resultado
      );

      console.log(
        "===================================="
      );

      // ========================================
      // ERROR API
      // ========================================

      if (!response.ok) {
        console.error(
          "Error API:",
          resultado
        );

        alert(
          resultado.error ||
            `Error ${response.status} al asignar el curso.`
        );

        return;
      }

      // ========================================
      // CORRECTO
      // ========================================

      console.log(
        "✅ CURSO ASIGNADO CORRECTAMENTE"
      );

      alert(
        "✅ Curso asignado correctamente"
      );

      // ========================================
      // LIMPIAR FORMULARIO
      // ========================================

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
      <h1>
        📚 Cursos comprados
      </h1>

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
          disabled={guardando}
        >
          <option value="">
            Selecciona un alumno
          </option>

          {alumnos.map((alumno) => (
            <option
              key={alumno.id}
              value={alumno.id}
            >
              {alumno.nombre} ({alumno.email})
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
          disabled={guardando}
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
            ✏️ Otro curso
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
            disabled={guardando}
          />
        )}

        {/* ==================================
            CLASSROOM
        ================================== */}

        <input
          type="url"
          placeholder="https://classroom.google.com/..."
          value={classroom}
          onChange={(e) =>
            setClassroom(e.target.value)
          }
          disabled={guardando}
        />

        {/* ==================================
            BOTÓN
        ================================== */}

        <button
          type="button"
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
            fontSize: "16px",
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