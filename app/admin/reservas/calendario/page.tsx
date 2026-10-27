"use client";

import { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import themePlugin from "@fullcalendar/react/themes/classic";

import { supabase } from "@/lib/supabase";
import "./calendario.css";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

type Reserva = {
  id: string;
  fecha: string;
  hora: string;
  servicio: string;
  profesional: string;
  nombre: string;
  estado: string;
};

type HorarioFijo = {
  id: string;
  alumno_id: string;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  activo: boolean;
  profesional: string;
  servicio: string | null;
};

type EventoCalendario = {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps: {
    tipo: "reserva" | "horario_fijo";
    profesional: string;
    servicio: string | null;
    estado?: string;
    alumno_id?: string;
    nombre?: string;
  };
};

const COLORES: Record<string, string> = {
  Eduardo: "#2563eb",
  Sheila: "#9333ea",
};

const NOMBRES_SERVICIOS: Record<string, string> = {
  quimicaorganica: "Química orgánica",
  quimicainorganica: "Química inorgánica",
  quimicageneral: "Química general",
  quimicaanalitica: "Química analítica",
  quimicafisica: "Química física",
  matematicas1: "Matemáticas",
  matematicas2: "Matemáticas",
  fisica1: "Física",
  fisica2: "Física",
  nee: "NEE",
  neurodesarrollo: "Neurodesarrollo",
  estimulacioncognitiva: "Estimulación cognitiva",
  rehabilitacionfisica: "Rehabilitación física",
  escuelaespalda: "Escuela de espalda",
  asesoramientoafamilias: "Asesoramiento a familias",
  adaptacioneshogar: "Adaptaciones del hogar",
};

function nombreServicio(servicio: string | null) {
  if (!servicio) return "Sin servicio";

  const clave = servicio.toLowerCase().replace(/[\s_-]/g, "");

  return (
    NOMBRES_SERVICIOS[clave] ??
    servicio.charAt(0).toUpperCase() + servicio.slice(1)
  );
}

function fechaLocal(fecha: Date) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function horaCompleta(hora: string) {
  return hora.length === 5 ? `${hora}:00` : hora;
}

function numeroDia(fecha: Date) {
  const dia = fecha.getDay();
  return dia === 0 ? 7 : dia;
}

function sumarUnaHora(fecha: string, hora: string) {
  const [horas, minutos, segundos = 0] = horaCompleta(hora)
    .split(":")
    .map(Number);

  const resultado = new Date(`${fecha}T00:00:00`);

  resultado.setHours(horas, minutos, segundos, 0);
  resultado.setTime(resultado.getTime() + 60 * 60 * 1000);

  return `${fechaLocal(resultado)}T${String(
    resultado.getHours(),
  ).padStart(2, "0")}:${String(
    resultado.getMinutes(),
  ).padStart(2, "0")}:${String(
    resultado.getSeconds(),
  ).padStart(2, "0")}`;
}

export default function CalendarioPage() {
  const [eventos, setEventos] = useState<EventoCalendario[]>([]);
  const [profesionalFiltro, setProfesionalFiltro] = useState("Todos");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarEventos = useCallback(
    async (info: { start: Date; end: Date }) => {
      setCargando(true);
      setError("");

      try {
        const desde = fechaLocal(info.start);
        const hasta = fechaLocal(
          new Date(info.end.getTime() - 1),
        );

        const [
          { data: reservas, error: errorReservas },
          { data: horarios, error: errorHorarios },
        ] = await Promise.all([
          supabase
            .from("reservas")
            .select(
              "id,fecha,hora,servicio,profesional,nombre,estado",
            )
            .gte("fecha", desde)
            .lte("fecha", hasta)
            .order("fecha", { ascending: true })
            .order("hora", { ascending: true }),

          supabase
            .from("horarios_fijos")
            .select(
              "id,alumno_id,dia_semana,hora_inicio,hora_fin,activo,profesional,servicio",
            )
            .eq("activo", true),
        ]);

        if (errorReservas) throw errorReservas;
        if (errorHorarios) throw errorHorarios;

        const nuevosEventos: EventoCalendario[] = [];

        // Horarios fijos recurrentes.
        for (const horario of (horarios ?? []) as HorarioFijo[]) {
          if (
            profesionalFiltro !== "Todos" &&
            horario.profesional !== profesionalFiltro
          ) {
            continue;
          }

          const inicio = new Date(info.start);
          inicio.setHours(0, 0, 0, 0);

          for (
            const fecha = new Date(inicio);
            fecha < info.end;
            fecha.setDate(fecha.getDate() + 1)
          ) {
            if (numeroDia(fecha) !== horario.dia_semana) {
              continue;
            }

            const fechaTexto = fechaLocal(fecha);
            const color =
              COLORES[horario.profesional] ?? "#64748b";

            nuevosEventos.push({
              id: `fijo-${horario.id}-${fechaTexto}`,
              title: `Horario fijo · ${horario.profesional} · ${nombreServicio(
                horario.servicio,
              )}`,
              start: `${fechaTexto}T${horaCompleta(
                horario.hora_inicio,
              )}`,
              end: `${fechaTexto}T${horaCompleta(
                horario.hora_fin,
              )}`,
              backgroundColor: `${color}22`,
              borderColor: color,
              textColor: "#1f2937",
              extendedProps: {
                tipo: "horario_fijo",
                profesional: horario.profesional,
                servicio: horario.servicio,
                alumno_id: horario.alumno_id,
              },
            });
          }
        }

        // Reservas reales.
        for (const reserva of (reservas ?? []) as Reserva[]) {
          if (
            profesionalFiltro !== "Todos" &&
            reserva.profesional !== profesionalFiltro
          ) {
            continue;
          }

          const color =
            COLORES[reserva.profesional] ?? "#64748b";

          nuevosEventos.push({
            id: `reserva-${reserva.id}`,
            title: `${reserva.nombre} · ${nombreServicio(
              reserva.servicio,
            )}`,
            start: `${reserva.fecha}T${horaCompleta(
              reserva.hora,
            )}`,
            end: sumarUnaHora(reserva.fecha, reserva.hora),
            backgroundColor: color,
            borderColor: color,
            textColor: "#ffffff",
            extendedProps: {
              tipo: "reserva",
              profesional: reserva.profesional,
              servicio: reserva.servicio,
              estado: reserva.estado,
              nombre: reserva.nombre,
            },
          });
        }

        setEventos(nuevosEventos);
      } catch (e) {
        console.error("Error cargando calendario:", e);

        setError(
          "No se pudieron cargar las reservas y los horarios fijos. Comprueba la conexión y los permisos de Supabase.",
        );
      } finally {
        setCargando(false);
      }
    },
    [profesionalFiltro],
  );

  return (
    <main className="calendario-pagina mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <header className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between md:p-7">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Administración
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Calendario de reservas
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Consulta las citas y los horarios fijos de cada profesional.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="profesional"
            className="text-sm font-semibold text-gray-700"
          >
            Filtrar por profesional
          </label>

          <select
            id="profesional"
            value={profesionalFiltro}
            onChange={(e) => setProfesionalFiltro(e.target.value)}
            className="min-w-48 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Todos">Todos los profesionales</option>
            <option value="Eduardo">Eduardo</option>
            <option value="Sheila">Sheila</option>
          </select>
        </div>
      </header>

      <section className="flex flex-wrap gap-x-6 gap-y-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="h-3 w-3 rounded-full bg-blue-600" />
          <span>Eduardo · Reservas</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="h-3 w-3 rounded-full bg-purple-600" />
          <span>Sheila · Reservas</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="h-3 w-3 rounded-sm border-2 border-indigo-400 bg-indigo-100" />
          <span>Horarios fijos</span>
        </div>
      </section>

      {cargando && (
        <div className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          Actualizando calendario…
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <section className="calendario-contenedor min-w-0 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm md:p-6">
        <FullCalendar
          key={profesionalFiltro}
          plugins={[
            themePlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="timeGridWeek"
          locale="es"
          firstDay={1}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttons={{
            today: { text: "Hoy" },
            dayGridMonth: { text: "Mes" },
            timeGridWeek: { text: "Semana" },
            timeGridDay: { text: "Día" },
          }}
          allDayText="Todo el día"
          slotMinTime="08:00:00"
          slotMaxTime="23:00:00"
          slotDuration="00:15:00"
          allDaySlot={false}
          nowIndicator
          height="auto"
          expandRows
          events={eventos}
          datesSet={(info) => {
            void cargarEventos(info);
          }}
          eventContent={(info) => {
            const props = info.event.extendedProps;
            const esFijo = props.tipo === "horario_fijo";
            const color =
              COLORES[props.profesional] ?? "#64748b";

            const formatoHora = (fecha: Date | null) =>
              fecha
                ? fecha.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                : "";

            const horaInicio = formatoHora(info.event.start);
            const horaFin = formatoHora(info.event.end);

            return (
              <div
                className={`calendario-evento ${
                  esFijo
                    ? "calendario-evento-fijo"
                    : "calendario-evento-reserva"
                }`}
                style={{
                  backgroundColor: esFijo ? `${color}22` : color,
                  border: `1px solid ${color}`,
                  color: esFijo ? "#1f2937" : "#ffffff",
                  boxSizing: "border-box",
                  width: "100%",
                  height: "100%",
                  minWidth: 0,
                  padding: "3px 5px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  overflowWrap: "anywhere",
                }}
                title={`${info.event.title} (${horaInicio}–${horaFin})`}
              >
                <div
                  className="calendario-evento-hora"
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: "3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {horaInicio}–{horaFin}
                </div>

                {esFijo ? (
                  <div
                    className="calendario-evento-titulo"
                    style={{
                      fontSize: "10px",
                      lineHeight: 1.3,
                      fontWeight: 600,
                      overflowWrap: "anywhere",
                    }}
                  >
                    Horario fijo · {props.profesional}
                  </div>
                ) : (
                  <>
                    <div
                      className="calendario-evento-titulo"
                      style={{
                        fontSize: "11px",
                        lineHeight: 1.3,
                        fontWeight: 700,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {props.nombre ?? info.event.title}
                    </div>

                    <div
                      className="calendario-evento-servicio"
                      style={{
                        fontSize: "10px",
                        lineHeight: 1.25,
                        marginTop: "2px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {nombreServicio(props.servicio)}
                    </div>
                  </>
                )}
              </div>
            );
          }}
          eventClick={(info) => {
            const props = info.event.extendedProps;

            const detalles = [
              info.event.title,
              `Profesional: ${props.profesional}`,
              `Servicio: ${nombreServicio(props.servicio)}`,
              `Inicio: ${
                info.event.start?.toLocaleString("es-ES") ?? ""
              }`,
              `Fin: ${
                info.event.end?.toLocaleString("es-ES") ?? ""
              }`,
            ];

            if (props.tipo === "reserva") {
              detalles.push(`Estado: ${props.estado ?? "Sin estado"}`);
            } else {
              detalles.push("Tipo: Horario fijo recurrente");
            }

            alert(detalles.join("\n"));
          }}
        />
      </section>

      <p className="text-xs leading-5 text-gray-500">
        Las reservas duran una hora. Los horarios fijos se muestran con un
        fondo más suave y se repiten según el día de la semana configurado.
        Pulsa un evento para consultar sus detalles.
      </p>
    </main>
  );
}