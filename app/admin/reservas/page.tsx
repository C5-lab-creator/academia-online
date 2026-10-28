"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Reserva = {
  id: string;
  nombre: string;
  email: string;
  servicio: string;
  profesional: string;
  fecha: string;
  hora: string;
  estado: string;
  estado_pago: string;
  enlace_meet: string;
};

type DisponibilidadHora = {
  fecha: string;
  profesional: string;
  hora: string;
  disponible: boolean;
};

const HORAS_INICIALES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const th: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
};

const td: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
};

function obtenerFechaLocal(fecha: Date): string {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function minutos(hora: string): number {
  const [h, m] = (hora || "00:00").slice(0, 5).split(":").map(Number);
  return h * 60 + m;
}

function reservaCancelada(estado: string): boolean {
  return (estado || "").toLocaleLowerCase("es").includes("cancel");
}

function horaSolapada(hora: string, reservasDia: Reserva[]): boolean {
  const inicio = minutos(hora);
  const fin = inicio + 60;

  return reservasDia.some((reserva) => {
    if (reservaCancelada(reserva.estado)) return false;
    const inicioExistente = minutos(reserva.hora);
    const finExistente = inicioExistente + 60;
    return inicio < finExistente && fin > inicioExistente;
  });
}

export default function AdminReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [fecha, setFecha] = useState<Date>(new Date());
  const [profesional, setProfesional] = useState("Sheila");
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [cargandoHoras, setCargandoHoras] = useState(false);
  const [guardandoHora, setGuardandoHora] = useState<string | null>(null);

  const fechaTexto = obtenerFechaLocal(fecha);

  const cargarReservas = useCallback(async () => {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true });

    if (error) {
      console.error("Error cargando reservas:", error.message);
      alert("No se pudieron cargar las reservas.");
      return;
    }

    setReservas((data ?? []) as Reserva[]);
  }, []);

  const cargarHoras = useCallback(async () => {
    setCargandoHoras(true);

    try {
      const { data, error } = await supabase
        .from("disponibilidad_horas")
        .select("fecha, profesional, hora, disponible")
        .eq("fecha", fechaTexto)
        .eq("profesional", profesional);

      if (error) {
        console.error("Error cargando disponibilidad:", error.message);
        alert("No se pudo cargar la disponibilidad: " + error.message);
        setHorasDisponibles([]);
        return;
      }

      const registros = (data ?? []) as DisponibilidadHora[];

      const mapaDisponibilidad = new Map(
        registros.map((registro) => [
          registro.hora.slice(0, 5),
          registro.disponible,
        ])
      );

      setHorasDisponibles(
        HORAS_INICIALES.filter(
          (hora) => mapaDisponibilidad.get(hora) ?? true
        )
      );
    } finally {
      setCargandoHoras(false);
    }
  }, [fechaTexto, profesional]);

  useEffect(() => {
    void cargarReservas();
  }, [cargarReservas]);

  useEffect(() => {
    void cargarHoras();
  }, [cargarHoras]);

  async function cambiarHora(hora: string) {
    if (guardandoHora !== null || cargandoHoras) return;

    const reservasDia = reservas.filter(
      (r) => r.fecha === fechaTexto && r.profesional === profesional
    );
    if (horaSolapada(hora, reservasDia)) {
      alert("Esta hora se solapa con una reserva activa. No se puede activar ni modificar desde aquí.");
      return;
    }

    setGuardandoHora(hora);

    const estabaDisponible = horasDisponibles.includes(hora);
    const nuevaDisponibilidad = !estabaDisponible;

    setHorasDisponibles((actuales) =>
      nuevaDisponibilidad
        ? [...actuales, hora].sort()
        : actuales.filter((h) => h !== hora)
    );

    try {
      const { error } = await supabase
        .from("disponibilidad_horas")
        .upsert(
          {
            fecha: fechaTexto,
            profesional,
            hora,
            disponible: nuevaDisponibilidad,
          },
          {
            onConflict: "fecha,profesional,hora",
          }
        );

      if (error) {
        console.error("Error guardando disponibilidad:", error);
        alert("No se pudo guardar la hora: " + error.message);

        setHorasDisponibles((actuales) =>
          estabaDisponible
            ? [...new Set([...actuales, hora])].sort()
            : actuales.filter((h) => h !== hora)
        );

        return;
      }
    } finally {
      setGuardandoHora(null);
    }
  }

  async function confirmarReserva(id: string) {
    try {
      const res = await fetch("/api/admin/confirmar-reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al confirmar la reserva");
        return;
      }

      await cargarReservas();
    } catch {
      alert("No se pudo conectar para confirmar la reserva.");
    }
  }

  async function cancelarReserva(id: string) {
    if (!confirm("¿Cancelar esta reserva?")) return;

    try {
      const res = await fetch("/api/admin/cancelar-reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al cancelar la reserva");
        return;
      }

      await cargarReservas();
    } catch {
      alert("No se pudo conectar para cancelar la reserva.");
    }
  }

  async function eliminarReserva(id: string) {
    if (!confirm("¿Eliminar esta reserva?")) return;

    const { error } = await supabase
      .from("reservas")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await cargarReservas();
  }

async function marcarReservaRealizada(id: string) {
  if (!confirm("¿Marcar esta reserva como realizada?")) return;

  const { error } = await supabase
    .from("reservas")
    .update({ estado: "Realizada" })
    .eq("id", id);

  if (error) {
    alert("No se pudo actualizar el estado: " + error.message);
    return;
  }

  await cargarReservas();
}

  async function actualizarPago(id: string, estado_pago: string) {
    const { error } = await supabase
      .from("reservas")
      .update({ estado_pago })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await cargarReservas();
  }

  async function actualizarMeet(id: string, enlace_meet: string) {
    const { error } = await supabase
      .from("reservas")
      .update({ enlace_meet })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await cargarReservas();
  }

  const botonVerde: React.CSSProperties = {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
    marginBottom: "6px",
  };

  const botonNaranja: React.CSSProperties = {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
    marginBottom: "6px",
  };

  const botonRojo: React.CSSProperties = {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "6px",
  };

return (
  <main
    style={{
      maxWidth: 1300,
      margin: "40px auto",
      padding: 20,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 15,
        marginBottom: 25,
      }}
    >
      <h2 style={{ margin: 0 }}>Gestionar disponibilidad</h2>

      <Link
        href="/admin/reservas/calendario"
        style={{
          display: "inline-block",
          background: "#2563eb",
          color: "#fff",
          padding: "12px 18px",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        📅 Ver calendario de reservas
      </Link>
    </div>

      <h3>Profesional</h3>

      <select
        value={profesional}
        onChange={(e) => setProfesional(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <option value="Sheila">Sheila</option>
        <option value="Eduardo">Eduardo</option>
      </select>

      <Calendar
        value={fecha}
        onChange={(value) => {
          if (value instanceof Date) {
            setFecha(value);
          }
        }}
      />

      <h3 style={{ marginTop: 30 }}>
        Horas disponibles — {fechaTexto}
      </h3>

      <p style={{ marginTop: 8, marginBottom: 15, color: "#555" }}>
        Verde: disponible. Rojo: no disponible.
      </p>

      {cargandoHoras && <p>Cargando disponibilidad...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: 10,
          marginTop: 15,
          marginBottom: 30,
        }}
      >
        {HORAS_INICIALES.map((hora) => {
          const reservasDia = reservas.filter(
            (r) => r.fecha === fechaTexto && r.profesional === profesional
          );
          const ocupada = horaSolapada(hora, reservasDia);
          const disponible = horasDisponibles.includes(hora) && !ocupada;
          const guardando = guardandoHora === hora;

          return (
            <button
              key={hora}
              type="button"
              disabled={cargandoHoras || guardandoHora !== null || ocupada}
              onClick={() => void cambiarHora(hora)}
              aria-pressed={disponible}
              title={
                ocupada
                  ? `No disponible: se solapa con una reserva activa (${hora})`
                  : disponible
                    ? `Desactivar hora ${hora}`
                    : `Activar hora ${hora}`
              }
              style={{
                padding: "12px",
                border: guardando ? "3px solid #1d4ed8" : "none",
                borderRadius: "8px",
                cursor:
                  cargandoHoras || guardandoHora !== null
                    ? "wait"
                    : "pointer",
                fontWeight: "bold",
                background: ocupada ? "#6b7280" : disponible ? "#22c55e" : "#ef4444",
                color: "white",
                opacity:
                  cargandoHoras || guardandoHora !== null ? 0.7 : ocupada ? 0.85 : 1,
              }}
            >
              {guardando ? "Guardando..." : hora}
              {!guardando && (ocupada ? " 🔒" : disponible ? " ✓" : " ✕")}
            </button>
          );
        })}
      </div>

      <h1>Reservas recibidas</h1>

      <div style={{ overflowX: "auto", marginTop: 15 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f3f3" }}>
              <th style={th}>Nombre</th>
              <th style={th}>Email</th>
              <th style={th}>Servicio</th>
              <th style={th}>Profesional</th>
              <th style={th}>Fecha</th>
              <th style={th}>Hora</th>
              <th style={th}>Estado</th>
              <th style={th}>Estado de pago</th>
              <th style={th}>Enlace de Meet</th>
              <th style={th}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map((r) => (
              <tr key={r.id}>
                <td style={td}>{r.nombre}</td>
                <td style={td}>{r.email}</td>
                <td style={td}>{r.servicio}</td>
                <td style={td}>{r.profesional}</td>
                <td style={td}>{r.fecha}</td>
                <td style={td}>{r.hora}</td>
                <td style={td}>{r.estado}</td>

                <td style={td}>
                  <select
                    value={r.estado_pago || "Pendiente"}
                    onChange={(e) =>
                      void actualizarPago(r.id, e.target.value)
                    }
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                  </select>
                </td>

                <td style={td}>
                  <input
                    type="url"
                    defaultValue={r.enlace_meet || ""}
                    placeholder="https://meet.google.com/..."
                    style={{
                      width: "250px",
                      padding: "6px",
                    }}
                    onBlur={(e) =>
                      void actualizarMeet(r.id, e.target.value)
                    }
                  />
                </td>

                <td style={td}>
                  <button
                    type="button"
                    style={botonVerde}
                    onClick={() => void confirmarReserva(r.id)}
                  >
                    Confirmar
                  </button>

                  <button
                    type="button"
                    style={botonNaranja}
                    onClick={() => void cancelarReserva(r.id)}
                  >
                    Cancelar
                  </button>
<button
  type="button"
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
    marginBottom: "6px",
  }}
  onClick={() => void marcarReservaRealizada(r.id)}
>
  Realizada
</button>
                  <button
                    type="button"
                    style={botonRojo}
                    onClick={() => void eliminarReserva(r.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
  
}
