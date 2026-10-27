"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Alumno = {
  id: string;
  nombre: string | null;
  email: string;
};

type HorarioFijo = {
  id: string;
  alumno_id: string;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  activo: boolean;
  profesional: string;
};

const DIAS = [
  { valor: 1, nombre: "Lunes" },
  { valor: 2, nombre: "Martes" },
  { valor: 3, nombre: "Miércoles" },
  { valor: 4, nombre: "Jueves" },
  { valor: 5, nombre: "Viernes" },
  { valor: 6, nombre: "Sábado" },
  { valor: 7, nombre: "Domingo" },
];

const PROFESIONALES = ["Sheila", "Eduardo"];

export default function HorariosFijosPage() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [horarios, setHorarios] = useState<HorarioFijo[]>([]);

  const [alumnoId, setAlumnoId] = useState("");
  const [profesional, setProfesional] = useState("Eduardo");
  const [diaSemana, setDiaSemana] = useState(1);
  const [horaInicio, setHoraInicio] = useState("16:00");
  const [horaFin, setHoraFin] = useState("18:00");

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorMensaje, setErrorMensaje] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    setCargando(true);
    setErrorMensaje("");

    const [resultadoAlumnos, resultadoHorarios] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, nombre, email")
        .eq("role", "alumno")
        .order("nombre"),

      supabase
        .from("horarios_fijos")
        .select(
          "id, alumno_id, dia_semana, hora_inicio, hora_fin, activo, profesional"
        )
        .order("dia_semana")
        .order("hora_inicio"),
    ]);

    if (resultadoAlumnos.error) {
      setErrorMensaje(
        "No se pudieron cargar los alumnos: " +
          resultadoAlumnos.error.message
      );
    } else {
      setAlumnos((resultadoAlumnos.data ?? []) as Alumno[]);
    }

    if (resultadoHorarios.error) {
      setErrorMensaje(
        "No se pudieron cargar los horarios: " +
          resultadoHorarios.error.message
      );
    } else {
      setHorarios((resultadoHorarios.data ?? []) as HorarioFijo[]);
    }

    setCargando(false);
  }

  function limpiarFormulario() {
    setAlumnoId("");
    setProfesional("Eduardo");
    setDiaSemana(1);
    setHoraInicio("16:00");
    setHoraFin("18:00");
    setEditandoId(null);
    setMensaje("");
    setErrorMensaje("");
  }

  function nombreAlumno(id: string) {
    const alumno = alumnos.find((a) => a.id === id);

    if (!alumno) {
      return "Alumno no encontrado";
    }

    return alumno.nombre || alumno.email;
  }

  function nombreDia(dia: number) {
    return DIAS.find((d) => d.valor === dia)?.nombre ?? "Desconocido";
  }

  function formatoHora(hora: string) {
    return hora.slice(0, 5);
  }

  function editarHorario(horario: HorarioFijo) {
    setAlumnoId(horario.alumno_id);
    setProfesional(horario.profesional);
    setDiaSemana(horario.dia_semana);
    setHoraInicio(formatoHora(horario.hora_inicio));
    setHoraFin(formatoHora(horario.hora_fin));
    setEditandoId(horario.id);
    setMensaje("");
    setErrorMensaje("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function guardarHorario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensaje("");
    setErrorMensaje("");

    if (!alumnoId) {
      setErrorMensaje("Selecciona un alumno.");
      return;
    }

    if (!profesional) {
      setErrorMensaje("Selecciona un profesional.");
      return;
    }

    if (horaInicio >= horaFin) {
      setErrorMensaje(
        "La hora de fin debe ser posterior a la hora de inicio."
      );
      return;
    }

    // Evitar solapamientos con otros horarios fijos activos
    // del mismo profesional y día de la semana.
    const conflicto = horarios.find((h) => {
      if (!h.activo || h.id === editandoId) {
        return false;
      }

      if (
        h.dia_semana !== diaSemana ||
        h.profesional.toLowerCase() !== profesional.toLowerCase()
      ) {
        return false;
      }

      const inicioExistente = formatoHora(h.hora_inicio);
      const finExistente = formatoHora(h.hora_fin);

      return (
        horaInicio < finExistente &&
        horaFin > inicioExistente
      );
    });

    if (conflicto) {
      setErrorMensaje(
        `Este horario se solapa con una asignación existente de ${nombreAlumno(
          conflicto.alumno_id
        )} para ${profesional} el ${nombreDia(diaSemana)} ` +
          `(${formatoHora(conflicto.hora_inicio)}–${formatoHora(
            conflicto.hora_fin
          )}).`
      );
      return;
    }

    setGuardando(true);

    const datos = {
      alumno_id: alumnoId,
      profesional,
      dia_semana: diaSemana,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      activo: true,
    };

    const resultado = editandoId
      ? await supabase
          .from("horarios_fijos")
          .update(datos)
          .eq("id", editandoId)
      : await supabase.from("horarios_fijos").insert(datos);

    setGuardando(false);

    if (resultado.error) {
      setErrorMensaje(
        "No se pudo guardar el horario: " + resultado.error.message
      );
      return;
    }

    setMensaje(
      editandoId
        ? "Horario actualizado correctamente."
        : "Horario asignado correctamente."
    );

    limpiarFormulario();
    await cargarDatos();
  }

  async function cambiarEstado(horario: HorarioFijo) {
    setMensaje("");
    setErrorMensaje("");

    const nuevoEstado = !horario.activo;

    // Al activar, comprobar que no se solape con otro horario activo.
    if (nuevoEstado) {
      const conflicto = horarios.find((h) => {
        if (h.id === horario.id || !h.activo) {
          return false;
        }

        if (
          h.dia_semana !== horario.dia_semana ||
          h.profesional.toLowerCase() !==
            horario.profesional.toLowerCase()
        ) {
          return false;
        }

        return (
          formatoHora(h.hora_inicio) < formatoHora(horario.hora_fin) &&
          formatoHora(h.hora_fin) > formatoHora(horario.hora_inicio)
        );
      });

      if (conflicto) {
        setErrorMensaje(
          `No se puede activar: se solapa con el horario de ${nombreAlumno(
            conflicto.alumno_id
          )}.`
        );
        return;
      }
    }

    const { error } = await supabase
      .from("horarios_fijos")
      .update({ activo: nuevoEstado })
      .eq("id", horario.id);

    if (error) {
      setErrorMensaje(
        "No se pudo cambiar el estado: " + error.message
      );
      return;
    }

    setMensaje(
      nuevoEstado ? "Horario activado." : "Horario desactivado."
    );

    await cargarDatos();
  }

  async function eliminarHorario(horario: HorarioFijo) {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el horario de ${nombreAlumno(
        horario.alumno_id
      )} para ${horario.profesional}, el ${nombreDia(
        horario.dia_semana
      )}, de ${formatoHora(horario.hora_inicio)} a ${formatoHora(
        horario.hora_fin
      )}?`
    );

    if (!confirmar) return;

    setMensaje("");
    setErrorMensaje("");

    const { error } = await supabase
      .from("horarios_fijos")
      .delete()
      .eq("id", horario.id);

    if (error) {
      setErrorMensaje(
        "No se pudo eliminar el horario: " + error.message
      );
      return;
    }

    if (editandoId === horario.id) {
      limpiarFormulario();
    }

    setMensaje("Horario eliminado correctamente.");
    await cargarDatos();
  }

  return (
    <main className="pagina">
      <style jsx>{`
        .pagina {
          max-width: 1150px;
          margin: 0 auto;
          padding: 32px 20px 60px;
          color: #172033;
        }

        .cabecera {
          margin-bottom: 28px;
        }

        .cabecera h1 {
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 8px;
        }

        .cabecera p {
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        .tarjeta {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 25px;
          margin-bottom: 28px;
          box-shadow: 0 5px 20px rgba(15, 23, 42, 0.04);
        }

        .tarjeta h2 {
          font-size: 21px;
          margin: 0 0 22px;
        }

        .formulario {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .campo {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .campo label {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
        }

        .campo input,
        .campo select {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 13px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: white;
          color: #172033;
          font-size: 14px;
        }

        .campo input:focus,
        .campo select:focus {
          outline: 2px solid #bfdbfe;
          border-color: #2563eb;
        }

        .acciones {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .boton {
          padding: 12px 17px;
          border: 0;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .principal {
          background: #2563eb;
          color: white;
        }

        .secundario {
          background: #e2e8f0;
          color: #334155;
        }

        .boton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mensaje {
          padding: 13px 15px;
          margin-bottom: 18px;
          border-radius: 9px;
          background: #dcfce7;
          color: #166534;
          font-size: 14px;
        }

        .error {
          padding: 13px 15px;
          margin-bottom: 18px;
          border-radius: 9px;
          background: #fee2e2;
          color: #991b1b;
          font-size: 14px;
          overflow-wrap: anywhere;
        }

        .tabla-contenedor {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          text-align: left;
        }

        th {
          padding: 13px 12px;
          background: #f8fafc;
          color: #64748b;
          font-size: 12px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        td {
          padding: 15px 12px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
        }

        .estado {
          display: inline-block;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
        }

        .activo {
          background: #dcfce7;
          color: #166534;
        }

        .inactivo {
          background: #f1f5f9;
          color: #475569;
        }

        .acciones-tabla {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .boton-pequeno {
          padding: 7px 9px;
          border: 0;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .editar {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .activar {
          background: #fef3c7;
          color: #92400e;
        }

        .eliminar {
          background: #fee2e2;
          color: #b91c1c;
        }

        .vacio {
          padding: 28px 10px;
          text-align: center;
          color: #64748b;
        }

        @media (max-width: 650px) {
          .pagina {
            padding: 22px 12px 40px;
          }

          .cabecera h1 {
            font-size: 26px;
          }

          .tarjeta {
            padding: 17px;
          }

          .formulario {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="cabecera">
        <h1>📅 Horarios fijos</h1>
        <p>
          Asigna sesiones recurrentes a cada alumno y profesional.
          Los horarios activos bloquearán esas horas para otros alumnos.
        </p>
      </header>

      {mensaje && <div className="mensaje">{mensaje}</div>}
      {errorMensaje && <div className="error">{errorMensaje}</div>}

      <section className="tarjeta">
        <h2>
          {editandoId ? "✏️ Editar horario fijo" : "➕ Asignar nuevo horario"}
        </h2>

        <form onSubmit={guardarHorario}>
          <div className="formulario">
            <div className="campo">
              <label htmlFor="alumno">Alumno</label>

              <select
                id="alumno"
                value={alumnoId}
                onChange={(e) => setAlumnoId(e.target.value)}
                required
              >
                <option value="">Selecciona un alumno</option>

                {alumnos.map((alumno) => (
                  <option key={alumno.id} value={alumno.id}>
                    {alumno.nombre || alumno.email} — {alumno.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="profesional">Profesional</label>

              <select
                id="profesional"
                value={profesional}
                onChange={(e) => setProfesional(e.target.value)}
                required
              >
                {PROFESIONALES.map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="dia">Día de la semana</label>

              <select
                id="dia"
                value={diaSemana}
                onChange={(e) => setDiaSemana(Number(e.target.value))}
                required
              >
                {DIAS.map((dia) => (
                  <option key={dia.valor} value={dia.valor}>
                    {dia.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="inicio">Hora de inicio</label>

              <input
                id="inicio"
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="fin">Hora de fin</label>

              <input
                id="fin"
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="acciones">
            <button
              className="boton principal"
              type="submit"
              disabled={guardando || cargando}
            >
              {guardando
                ? "Guardando..."
                : editandoId
                  ? "Guardar cambios"
                  : "Asignar horario"}
            </button>

            {editandoId && (
              <button
                className="boton secundario"
                type="button"
                onClick={limpiarFormulario}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="tarjeta">
        <h2>📋 Horarios asignados</h2>

        {cargando ? (
          <p>Cargando horarios...</p>
        ) : horarios.length === 0 ? (
          <div className="vacio">
            Todavía no hay horarios fijos asignados.
          </div>
        ) : (
          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Profesional</th>
                  <th>Día</th>
                  <th>Horario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {horarios.map((horario) => (
                  <tr key={horario.id}>
                    <td>{nombreAlumno(horario.alumno_id)}</td>
                    <td>{horario.profesional}</td>
                    <td>{nombreDia(horario.dia_semana)}</td>
                    <td>
                      {formatoHora(horario.hora_inicio)} –{" "}
                      {formatoHora(horario.hora_fin)}
                    </td>
                    <td>
                      <span
                        className={`estado ${
                          horario.activo ? "activo" : "inactivo"
                        }`}
                      >
                        {horario.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <div className="acciones-tabla">
                        <button
                          type="button"
                          className="boton-pequeno editar"
                          onClick={() => editarHorario(horario)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="boton-pequeno activar"
                          onClick={() => cambiarEstado(horario)}
                        >
                          {horario.activo ? "Desactivar" : "Activar"}
                        </button>

                        <button
                          type="button"
                          className="boton-pequeno eliminar"
                          onClick={() => eliminarHorario(horario)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}