"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Alumno = {
  id: string;
  email: string;
  role: string | null;
  nombre: string | null;
  classroom_url: string | null;
  telefono: string | null;
  nivel_estudios: string | null;
  estudios_actuales: string | null;
  universidad: string | null;
  notas: string | null;
};

const campos: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 14,
  marginTop: 6,
  background: "#fff",
};

const boton: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};

const tarjeta: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState<Alumno | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarAlumnos = useCallback(async () => {
    setCargando(true);
    setError("");

    const { data, error } = await supabase
      .from("profiles")
      .select(`
        id,
        email,
        role,
        nombre,
        classroom_url,
        telefono,
        nivel_estudios,
        estudios_actuales,
        universidad,
        notas
      `)
      .eq("role", "alumno")
      .order("nombre", { ascending: true });

    if (error) {
      console.error("Error cargando perfiles:", error);
      setError(
        `No se pudieron cargar los alumnos: ${error.message} (${error.code ?? "sin código"})`
      );
      setAlumnos([]);
    } else {
      setAlumnos((data ?? []) as Alumno[]);
    }

    setCargando(false);
  }, []);

  useEffect(() => {
    void cargarAlumnos();
  }, [cargarAlumnos]);

  const actualizarCampo = (
    campo: keyof Alumno,
    valor: string
  ) => {
    setSeleccionado((actual) =>
      actual ? { ...actual, [campo]: valor } : actual
    );
    setMensaje("");
    setError("");
  };

  const guardarFicha = async () => {
    if (!seleccionado) return;

    if (!seleccionado.nombre?.trim() || !seleccionado.email?.trim()) {
      setError("El nombre y el email son obligatorios.");
      return;
    }

    if (
      seleccionado.classroom_url?.trim() &&
      !/^https?:\/\//i.test(seleccionado.classroom_url.trim())
    ) {
      setError("El enlace de Classroom debe comenzar por https:// o http://.");
      return;
    }

    setGuardando(true);
    setError("");
    setMensaje("");

    const cambios = {
      nombre: seleccionado.nombre.trim(),
      email: seleccionado.email.trim(),
      telefono: seleccionado.telefono?.trim() || null,
      nivel_estudios: seleccionado.nivel_estudios || null,
      estudios_actuales: seleccionado.estudios_actuales?.trim() || null,
      universidad: seleccionado.universidad?.trim() || null,
      classroom_url: seleccionado.classroom_url?.trim() || null,
      notas: seleccionado.notas?.trim() || null,
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(cambios)
      .eq("id", seleccionado.id)
      .eq("role", "alumno")
      .select(`
        id,
        email,
        role,
        nombre,
        classroom_url,
        telefono,
        nivel_estudios,
        estudios_actuales,
        universidad,
        notas
      `)
      .maybeSingle();

    if (error) {
      console.error("Error guardando ficha:", error);
      setError(
        `No se pudo guardar la ficha: ${error.message} (${error.code ?? "sin código"}). Comprueba los permisos de actualización de profiles.`
      );
      setGuardando(false);
      return;
    }

    if (!data) {
      setError(
        "Supabase no ha actualizado ningún registro. Comprueba que tu sesión tiene permisos para editar este perfil."
      );
      setGuardando(false);
      return;
    }

    const alumnoActualizado = data as Alumno;

    setAlumnos((actuales) =>
      actuales
        .map((alumno) =>
          alumno.id === alumnoActualizado.id ? alumnoActualizado : alumno
        )
        .sort((a, b) =>
          (a.nombre ?? "").localeCompare(b.nombre ?? "", "es")
        )
    );

    setSeleccionado(alumnoActualizado);
    setMensaje("¡Ficha guardada correctamente!");
    setGuardando(false);
  };

  const alumnosFiltrados = alumnos.filter((alumno) => {
    const termino = busqueda.toLowerCase().trim();

    return (
      (alumno.nombre ?? "").toLowerCase().includes(termino) ||
      alumno.email.toLowerCase().includes(termino) ||
      (alumno.telefono ?? "").toLowerCase().includes(termino) ||
      (alumno.universidad ?? "").toLowerCase().includes(termino)
    );
  });

  const inicial = (nombre: string | null) =>
    nombre?.trim().charAt(0).toUpperCase() || "A";

  const cerrarFicha = () => {
    setSeleccionado(null);
    setError("");
    setMensaje("");
  };

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "35px auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        color: "#111827",
      }}
    >
      <Link
        href="/admin/configuracion"
        style={{
          color: "#2563eb",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        ← Volver a configuración
      </Link>

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          flexWrap: "wrap",
          margin: "25px 0",
        }}
      >
        <div>
          <h1 style={{ fontSize: 30, margin: "0 0 8px" }}>
            CRM de alumnos
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Gestiona los datos personales y académicos de tus alumnos.
          </p>
        </div>

        <button onClick={() => void cargarAlumnos()} style={boton}>
          Actualizar lista
        </button>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 15,
          marginBottom: 25,
        }}
      >
        <div style={tarjeta}>
          <span style={{ color: "#6b7280" }}>Total de alumnos</span>
          <h2 style={{ fontSize: 30, marginBottom: 0 }}>
            {alumnos.length}
          </h2>
        </div>

        <div style={tarjeta}>
          <span style={{ color: "#6b7280" }}>Primaria</span>
          <h2 style={{ fontSize: 30, marginBottom: 0 }}>
            {alumnos.filter((a) => a.nivel_estudios?.trim() === "Primaria").length}
          </h2>
        </div>

        <div style={tarjeta}>
          <span style={{ color: "#6b7280" }}>Bachillerato</span>
          <h2 style={{ fontSize: 30, marginBottom: 0 }}>
            {alumnos.filter((a) => a.nivel_estudios?.trim() === "Bachillerato").length}
          </h2>
        </div>

        <div style={tarjeta}>
          <span style={{ color: "#6b7280" }}>Universitarios</span>
          <h2 style={{ fontSize: 30, marginBottom: 0 }}>
            {alumnos.filter(
              (a) => a.nivel_estudios === "Universidad"
            ).length}
          </h2>
        </div>

      </section>

      <section style={tarjeta}>
        <h2 style={{ marginTop: 0 }}>Directorio de alumnos</h2>

        <input
          style={campos}
          placeholder="Buscar por nombre, email, teléfono o universidad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {cargando ? (
          <p>Cargando alumnos...</p>
        ) : error && alumnos.length === 0 ? (
          <div style={{ color: "#b91c1c", marginTop: 20 }}>
            <p>{error}</p>
            <button onClick={() => void cargarAlumnos()} style={boton}>
              Reintentar
            </button>
          </div>
        ) : alumnosFiltrados.length === 0 ? (
          <p style={{ color: "#6b7280", marginTop: 20 }}>
            No se han encontrado alumnos.
          </p>
        ) : (
          <div style={{ overflowX: "auto", marginTop: 20 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 650,
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {["Alumno", "Email", "Estudios", "Ficha"].map((titulo) => (
                    <th
                      key={titulo}
                      style={{
                        padding: 13,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {titulo}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {alumnosFiltrados.map((alumno) => (
                  <tr key={alumno.id}>
                    <td style={{ padding: 13, borderBottom: "1px solid #e5e7eb" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            flexShrink: 0,
                            borderRadius: "50%",
                            background: "#dbeafe",
                            color: "#1d4ed8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {inicial(alumno.nombre)}
                        </div>
                        <strong>{alumno.nombre || "Sin nombre"}</strong>
                      </div>
                    </td>

                    <td style={{ padding: 13, borderBottom: "1px solid #e5e7eb" }}>
                      {alumno.email}
                    </td>

                    <td style={{ padding: 13, borderBottom: "1px solid #e5e7eb" }}>
                      {alumno.nivel_estudios || "Sin especificar"}
                    </td>

                    <td style={{ padding: 13, borderBottom: "1px solid #e5e7eb" }}>
                      <button
                        onClick={() => {
                          setSeleccionado({ ...alumno });
                          setError("");
                          setMensaje("");
                        }}
                        style={boton}
                      >
                        Abrir ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {seleccionado && (
        <div
          onClick={cerrarFicha}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(17,24,39,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
          }}
        >
          <section
            onClick={(e) => e.stopPropagation()}
            style={{
              ...tarjeta,
              width: "100%",
              maxWidth: 700,
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div>
                <h2 style={{ margin: "0 0 5px" }}>Ficha del alumno</h2>
                <span style={{ color: "#6b7280", fontSize: 13 }}>
                  Edita los datos y pulsa Guardar cambios.
                </span>
              </div>

              <button
                onClick={cerrarFicha}
                aria-label="Cerrar ficha"
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  borderRadius: 8,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                padding: 18,
                background: "#eff6ff",
                borderRadius: 10,
                marginBottom: 25,
              }}
            >
              <div
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  background: "#2563eb",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {inicial(seleccionado.nombre)}
              </div>
              <div>
                <strong style={{ fontSize: 20 }}>
                  {seleccionado.nombre || "Nuevo nombre"}
                </strong>
                <div style={{ color: "#6b7280", fontSize: 13 }}>
                  Perfil de alumno
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void guardarFicha();
              }}
            >
              <h3>Datos personales</h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: 16,
                }}
              >
                <label>
                  Nombre *
                  <input
                    required
                    style={campos}
                    value={seleccionado.nombre ?? ""}
                    onChange={(e) => actualizarCampo("nombre", e.target.value)}
                  />
                </label>

                <label>
                  Email *
                  <input
                    required
                    type="email"
                    style={campos}
                    value={seleccionado.email}
                    onChange={(e) => actualizarCampo("email", e.target.value)}
                  />
                </label>

                <label>
                  Teléfono
                  <input
                    type="tel"
                    style={campos}
                    placeholder="Ej. 600 123 456"
                    value={seleccionado.telefono ?? ""}
                    onChange={(e) => actualizarCampo("telefono", e.target.value)}
                  />
                </label>

                <label>
                  Google Classroom
                  <input
                    type="url"
                    style={campos}
                    placeholder="https://classroom.google.com/..."
                    value={seleccionado.classroom_url ?? ""}
                    onChange={(e) =>
                      actualizarCampo("classroom_url", e.target.value)
                    }
                  />
                </label>
              </div>

              <h3 style={{ marginTop: 28 }}>Información académica</h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: 16,
                }}
              >
                <label>
                  Nivel de estudios
                  <select
                    style={campos}
                    value={seleccionado.nivel_estudios ?? ""}
                    onChange={(e) =>
                      actualizarCampo("nivel_estudios", e.target.value)
                    }
                  >
                    <option value="">Seleccionar nivel</option>
                    <option value="Primaria">Primaria</option>
                    <option value="ESO">ESO</option>
                    <option value="Bachillerato">Bachillerato</option>
                    <option value="FP Básica">FP Básica</option>
                    <option value="Grado Medio">FP Grado Medio</option>
                    <option value="Grado Superior">FP Grado Superior</option>
                    <option value="Universidad">Universidad</option>
                    <option value="Máster">Máster</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Oposiciones">Oposiciones</option>
                    <option value="Otros">Otros</option>
                  </select>
                </label>

                <label>
                  Estudios actuales
                  <input
                    style={campos}
                    placeholder="Ej. 2.º Bachillerato de Ciencias"
                    value={seleccionado.estudios_actuales ?? ""}
                    onChange={(e) =>
                      actualizarCampo("estudios_actuales", e.target.value)
                    }
                  />
                </label>

                <label style={{ gridColumn: "1 / -1" }}>
                  Universidad
                  <input
                    style={campos}
                    placeholder="Ej. Universidad de Málaga"
                    value={seleccionado.universidad ?? ""}
                    onChange={(e) =>
                      actualizarCampo("universidad", e.target.value)
                    }
                  />
                </label>
              </div>

              <h3 style={{ marginTop: 28 }}>Seguimiento interno</h3>

              <label>
                Notas privadas del alumno
                <textarea
                  style={{ ...campos, minHeight: 130, resize: "vertical" }}
                  placeholder="Añade observaciones, objetivos, seguimiento o información relevante..."
                  value={seleccionado.notas ?? ""}
                  onChange={(e) => actualizarCampo("notas", e.target.value)}
                />
              </label>

              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 8,
                  background: "#f9fafb",
                  fontSize: 12,
                  color: "#6b7280",
                  overflowWrap: "anywhere",
                }}
              >
                ID del perfil: {seleccionado.id}
              </div>

              {error && (
                <p
                  role="alert"
                  style={{
                    padding: 12,
                    background: "#fef2f2",
                    color: "#b91c1c",
                    borderRadius: 8,
                    marginTop: 16,
                  }}
                >
                  {error}
                </p>
              )}

              {mensaje && (
                <p
                  role="status"
                  style={{
                    padding: 12,
                    background: "#ecfdf5",
                    color: "#047857",
                    borderRadius: 8,
                    marginTop: 16,
                  }}
                >
                  {mensaje}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 22,
                }}
              >
                <button
                  type="button"
                  onClick={cerrarFicha}
                  disabled={guardando}
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Cerrar
                </button>

                <button
                  type="submit"
                  disabled={guardando}
                  style={{
                    ...boton,
                    opacity: guardando ? 0.6 : 1,
                  }}
                >
                  {guardando ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>

            <div
              style={{
                marginTop: 25,
                borderTop: "1px solid #e5e7eb",
                paddingTop: 20,
              }}
            >
              <strong>Reservas</strong>
              <p style={{ color: "#6b7280", fontSize: 14 }}>
                Puedes acceder a la gestión de citas desde aquí. El historial
                individual se podrá incorporar cuando confirmemos cómo se
                relaciona tu tabla de reservas con los perfiles.
              </p>
              <Link
                href="/admin/configuracion/reservas"
                style={{
                  ...boton,
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                Ir a reservas
              </Link>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}