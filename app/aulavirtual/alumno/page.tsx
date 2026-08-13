"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type CursoComprado = {
  id: string;
  user_id: string;
  curso: string;
  modalidad: string;
  classroom_url: string | null;
  fecha_inicio: string | null;
  fecha_expiracion: string | null;
};

type Reserva = {
  id: string;
  servicio: string;
  profesional: string;
  fecha: string;
  hora: string;
  estado_pago: string;
  enlace_meet: string | null;
};

export default function Alumno() {
  const [nombre, setNombre] = useState("");
  const [classroom, setClassroom] = useState("");

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cursos, setCursos] = useState<CursoComprado[]>([]);

  const [cargando, setCargando] = useState(true);
  const [errorCursos, setErrorCursos] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    setCargando(true);
    setErrorCursos("");

    try {
      // ==========================================
      // USUARIO AUTENTICADO
      // ==========================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("========== ALUMNO ==========");
      console.log("Usuario:", user);
      console.log("Error usuario:", userError);

      if (userError) {
        console.error(
          "Error obteniendo usuario:",
          userError
        );

        setErrorCursos(
          "No se pudo comprobar tu sesión."
        );

        return;
      }

      if (!user) {
        console.error(
          "No hay usuario autenticado."
        );

        setErrorCursos(
          "No estás autenticado."
        );

        return;
      }

      console.log(
        "Usuario autenticado:",
        user.email
      );

      console.log(
        "ID usuario:",
        user.id
      );

      // ==========================================
      // PERFIL
      // ==========================================

      const {
        data: perfil,
        error: perfilError,
      } = await supabase
        .from("profiles")
        .select("nombre, classroom_url")
        .eq("id", user.id)
        .maybeSingle();

      if (perfilError) {
        console.error(
          "Error cargando perfil:",
          perfilError
        );
      }

      if (perfil) {
        setNombre(
          perfil.nombre || ""
        );

        setClassroom(
          perfil.classroom_url || ""
        );
      }

      // ==========================================
      // CURSOS COMPRADOS
      // ==========================================

      console.log(
        "Buscando cursos para:",
        user.id
      );

      const {
        data: cursosData,
        error: cursosError,
      } = await supabase
        .from("cursos_comprados")
        .select(
          `
          id,
          user_id,
          curso,
          modalidad,
          classroom_url,
          fecha_inicio,
          fecha_expiracion
          `
        )
        .eq("user_id", user.id);

      console.log(
        "Cursos encontrados:",
        cursosData
      );

      console.log(
        "Error cursos:",
        cursosError
      );

      if (cursosError) {
        console.error(
          "ERROR CARGANDO CURSOS:",
          cursosError
        );

        setErrorCursos(
          cursosError.message
        );

        setCursos([]);
      } else {
        setCursos(
          cursosData || []
        );
      }

      // ==========================================
      // RESERVAS
      // ==========================================

      const {
        data: reservasData,
        error: reservasError,
      } = await supabase
        .from("reservas")
        .select("*")
        .eq("email", user.email);

      console.log(
        "Reservas:",
        reservasData
      );

      console.log(
        "Error reservas:",
        reservasError
      );

      if (!reservasError) {
        setReservas(
          reservasData || []
        );
      } else {
        console.error(
          "Error cargando reservas:",
          reservasError
        );

        setReservas([]);
      }

    } catch (error) {
      console.error(
        "ERROR GENERAL ÁREA ALUMNO:",
        error
      );

      setErrorCursos(
        "Ha ocurrido un error cargando tus datos."
      );

    } finally {
      setCargando(false);
    }
  }

  // ==========================================
  // COMPROBAR SI EL CURSO ESTÁ ACTIVO
  // ==========================================

  function cursoActivo(
    curso: CursoComprado
  ) {
    // PREMIUM → SIEMPRE ACTIVO
    if (curso.modalidad === "premium") {
      return true;
    }

    // CURSOS SIN MODALIDAD
    // Se mantienen activos como antes
    if (!curso.modalidad) {
      return true;
    }

    // ESTÁNDAR
    if (
      curso.modalidad === "estandar"
    ) {
      // Si no tiene fecha de expiración,
      // por seguridad NO damos acceso.
      if (!curso.fecha_expiracion) {
        return false;
      }

      const ahora = new Date();
      const expiracion =
        new Date(
          curso.fecha_expiracion
        );

      return expiracion > ahora;
    }

    // Cualquier otra modalidad
    return true;
  }

  // ==========================================
  // FORMATEAR FECHA
  // ==========================================

  function formatearFecha(
    fecha: string | null
  ) {
    if (!fecha) {
      return "";
    }

    return new Date(
      fecha
    ).toLocaleDateString(
      "es-ES",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  }

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>
        🎓 Área del alumno
      </h1>

      <p>
        ¡Bienvenid@{" "}
        {nombre || "alumno"}!
      </p>

      <hr
        style={{
          margin: "30px 0",
        }}
      />

      {/* ======================================
          CURSOS
      ====================================== */}

      <section>
        <h2>
          📚 Mis cursos
        </h2>

        {cargando ? (
          <p>
            Cargando tus cursos...
          </p>
        ) : errorCursos ? (
          <div
            style={{
              background:
                "#fee2e2",
              border:
                "1px solid #ef4444",
              borderRadius:
                "10px",
              padding:
                "15px",
              color:
                "#991b1b",
            }}
          >
            <strong>
              Error cargando los cursos:
            </strong>

            <p>
              {errorCursos}
            </p>
          </div>
        ) : cursos.length === 0 ? (
          <p>
            No tienes cursos asignados
            todavía.
          </p>
        ) : (
          cursos.map((curso) => {
            const activo =
              cursoActivo(curso);

            const esPremium =
              curso.modalidad ===
              "premium";

            const esEstandar =
              curso.modalidad ===
              "estandar";

            return (
              <div
                key={curso.id}
                style={{
                  border:
                    "1px solid #ddd",
                  borderRadius:
                    "10px",
                  padding:
                    "20px",
                  marginBottom:
                    "15px",
                  background:
                    activo
                      ? "white"
                      : "#f8fafc",
                }}
              >
                {/* ==================================
                    NOMBRE CURSO
                ================================== */}

                <h3>
                  📖 {curso.curso}
                </h3>

                {/* ==================================
                    MODALIDAD
                ================================== */}

                {esPremium ? (
                  <p
                    style={{
                      color:
                        "#16a34a",
                      fontWeight:
                        "bold",
                    }}
                  >
                    ⭐ Premium · Acceso
                    permanente
                  </p>
                ) : esEstandar ? (
                  <p
                    style={{
                      color:
                        activo
                          ? "#2563eb"
                          : "#dc2626",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {activo
                      ? "🟢 Estándar · Acceso durante 6 meses"
                      : "🔒 Estándar · Acceso caducado"}
                  </p>
                ) : null}

                {/* ==================================
                    FECHAS ESTÁNDAR
                ================================== */}

                {esEstandar &&
                  curso.fecha_inicio && (
                    <p
                      style={{
                        fontSize:
                          "14px",
                        color:
                          "#64748b",
                      }}
                    >
                      Inicio:{" "}
                      {formatearFecha(
                        curso.fecha_inicio
                      )}
                    </p>
                  )}

                {esEstandar &&
                  curso.fecha_expiracion && (
                    <p
                      style={{
                        fontSize:
                          "14px",
                        color:
                          activo
                            ? "#64748b"
                            : "#dc2626",
                      }}
                    >
                      {activo
                        ? `Acceso hasta: ${formatearFecha(
                            curso.fecha_expiracion
                          )}`
                        : `Acceso finalizado el: ${formatearFecha(
                            curso.fecha_expiracion
                          )}`}
                    </p>
                  )}

                {/* ==================================
                    ACCESO ACTIVO
                ================================== */}

                {activo ? (
                  curso.classroom_url ? (
                    <a
                      href={
                        curso.classroom_url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        type="button"
                        style={{
                          padding:
                            "12px 20px",
                          borderRadius:
                            "8px",
                          border:
                            "none",
                          background:
                            "#2563eb",
                          color:
                            "white",
                          cursor:
                            "pointer",
                          fontSize:
                            "15px",
                        }}
                      >
                        📚 Entrar al
                        Classroom
                      </button>
                    </a>
                  ) : (
                    <p>
                      Este curso todavía
                      no tiene Classroom
                      asignado.
                    </p>
                  )
                ) : (
                  /* ==================================
                     ACCESO CADUCADO
                  ================================== */

                  <div
                    style={{
                      marginTop:
                        "15px",
                      padding:
                        "15px",
                      borderRadius:
                        "8px",
                      background:
                        "#fee2e2",
                      border:
                        "1px solid #fecaca",
                      color:
                        "#991b1b",
                    }}
                  >
                    <strong>
                      🔒 Acceso caducado
                    </strong>

                    <p
                      style={{
                        marginBottom:
                          0,
                      }}
                    >
                      Tu acceso estándar
                      a este curso ha
                      finalizado.
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* ======================================
          CLASSROOM GENERAL
      ====================================== */}

      <section
        style={{
          marginTop: "30px",
        }}
      >
        <h2>
          🎓 Mi Classroom
        </h2>

        {classroom ? (
          <a
            href={classroom}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              style={{
                padding:
                  "12px 20px",
                borderRadius:
                  "8px",
                border:
                  "none",
                background:
                  "#2563eb",
                color:
                  "white",
                cursor:
                  "pointer",
              }}
            >
              Entrar a mi Classroom
            </button>
          </a>
        ) : (
          <p>
            Tu Classroom general
            todavía no ha sido asignado.
          </p>
        )}
      </section>

      {/* ======================================
          RESERVAS
      ====================================== */}

      <section
        style={{
          marginTop: "30px",
        }}
      >
        <h2>
          📅 Mis clases
        </h2>

        {reservas.length === 0 ? (
          <p>
            No tienes clases
            reservadas.
          </p>
        ) : (
          reservas.map((r) => (
            <div
              key={r.id}
              style={{
                border:
                  "1px solid #ddd",
                borderRadius:
                  "10px",
                padding:
                  "15px",
                marginBottom:
                  "15px",
              }}
            >
              <h3>
                {r.servicio}
              </h3>

              <p>
                <strong>
                  Profesor:
                </strong>{" "}
                {r.profesional}
              </p>

              <p>
                <strong>
                  Fecha:
                </strong>{" "}
                {r.fecha}
              </p>

              <p>
                <strong>
                  Hora:
                </strong>{" "}
                {r.hora}
              </p>

              <p>
                <strong>
                  Estado del pago:
                </strong>{" "}
                {r.estado_pago}
              </p>

              {r.estado_pago ===
                "Pagado" &&
              r.enlace_meet ? (
                <a
                  href={
                    r.enlace_meet
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    type="button"
                    style={{
                      padding:
                        "12px 20px",
                      border:
                        "none",
                      borderRadius:
                        "8px",
                      background:
                        "#16a34a",
                      color:
                        "white",
                      cursor:
                        "pointer",
                    }}
                  >
                    🎥 Entrar a Google
                    Meet
                  </button>
                </a>
              ) : (
                <p>
                  El enlace aparecerá
                  cuando el pago esté
                  confirmado.
                </p>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}