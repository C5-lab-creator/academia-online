"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  padding: "10px 9px",
  textAlign: "left",
  whiteSpace: "nowrap",
  background: "#f3f4f6",
};

const td: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "9px",
  verticalAlign: "middle",
  overflowWrap: "normal",
  wordBreak: "normal",
};

const estiloFiltro: React.CSSProperties = {
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  padding: "9px",
  marginTop: 5,
  border: "1px solid #d1d5db",
  borderRadius: 7,
  background: "#fff",
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

  // Buscador y filtros de reservas
  const [busqueda, setBusqueda] = useState("");
  const [filtroProfesional, setFiltroProfesional] = useState("Todos");
  const [filtroServicio, setFiltroServicio] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroPago, setFiltroPago] = useState("Todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const fechaTexto = obtenerFechaLocal(fecha);

  const servicios = useMemo(
    () => [...new Set(reservas.map((r) => r.servicio).filter(Boolean))].sort(),
    [reservas]
  );

  const profesionales = useMemo(
    () => [...new Set(reservas.map((r) => r.profesional).filter(Boolean))].sort(),
    [reservas]
  );

  const estados = useMemo(
    () => [...new Set(reservas.map((r) => r.estado).filter(Boolean))].sort(),
    [reservas]
  );

  const reservasFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase("es");
    return reservas.filter((r) => {
      const coincideTexto =
        !texto ||
        [r.nombre, r.email, r.servicio, r.profesional, r.estado,
          r.estado_pago, r.fecha, r.hora]
          .some((valor) => (valor || "").toLocaleLowerCase("es").includes(texto));

      return (
        coincideTexto &&
        (filtroProfesional === "Todos" || r.profesional === filtroProfesional) &&
        (filtroServicio === "Todos" || r.servicio === filtroServicio) &&
        (filtroEstado === "Todos" || r.estado === filtroEstado) &&
        (filtroPago === "Todos" || (r.estado_pago || "Pendiente") === filtroPago) &&
        (!fechaDesde || r.fecha >= fechaDesde) &&
        (!fechaHasta || r.fecha <= fechaHasta)
      );
    });
  }, [reservas, busqueda, filtroProfesional, filtroServicio, filtroEstado, filtroPago, fechaDesde, fechaHasta]);

  function limpiarFiltros() {
    setBusqueda("");
    setFiltroProfesional("Todos");
    setFiltroServicio("Todos");
    setFiltroEstado("Todos");
    setFiltroPago("Todos");
    setFechaDesde("");
    setFechaHasta("");
  }

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
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: 0,
    marginBottom: 0,
    padding: "6px 8px",
    fontSize: 12,
  };

  const botonNaranja: React.CSSProperties = {
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: 0,
    marginBottom: 0,
    padding: "6px 8px",
    fontSize: 12,
  };

  const botonRojo: React.CSSProperties = {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: 0,
    padding: "6px 8px",
    fontSize: 12,
  };

return (
  <main
    style={{
      maxWidth: 1600,
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

      <section style={{ margin: "15px 0 20px", padding: 16, border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff", color: "#111827" }}>
        <h3 style={{ marginTop: 0 }}>Buscar y filtrar reservas</h3>
        <label style={{ display: "block", marginBottom: 12 }}>
          Buscar por nombre, email, servicio, profesional, fecha u hora
          <input
            type="search"
            value={busqueda}
            placeholder="Escribe para buscar..."
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ display: "block", boxSizing: "border-box", width: "100%", padding: 10, marginTop: 5, border: "1px solid #d1d5db", borderRadius: 7 }}
          />
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
          <label>Profesional
            <select value={filtroProfesional} onChange={(e) => setFiltroProfesional(e.target.value)} style={estiloFiltro}>
              <option value="Todos">Todos</option>
              {profesionales.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Servicio
            <select value={filtroServicio} onChange={(e) => setFiltroServicio(e.target.value)} style={estiloFiltro}>
              <option value="Todos">Todos</option>
              {servicios.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <label>Estado de reserva
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={estiloFiltro}>
              <option value="Todos">Todos</option>
              {estados.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <label>Estado del pago
            <select value={filtroPago} onChange={(e) => setFiltroPago(e.target.value)} style={estiloFiltro}>
              <option value="Todos">Todos</option><option value="Pagado">Pagado</option><option value="Pendiente">Pendiente</option>
            </select>
          </label>
          <label>Fecha desde
            <input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} style={estiloFiltro} />
          </label>
          <label>Fecha hasta
            <input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} style={estiloFiltro} />
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 14, marginTop: 15 }}>
          <button type="button" onClick={limpiarFiltros} style={{ padding: "9px 13px", border: 0, borderRadius: 6, background: "#d97706", color: "#fff", cursor: "pointer" }}>Limpiar filtros</button>
          <strong>{reservasFiltradas.length} de {reservas.length} reservas</strong>
        </div>
      </section>

      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "auto",
          marginTop: 15,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          background: "#fff",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: 1180,
            tableLayout: "auto",
            borderCollapse: "collapse",
            fontSize: 14,
            color: "#1f2937",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f3f3" }}>
              <th style={{...th, minWidth: 135}}>Nombre</th>
              <th style={{...th, minWidth: 190}}>Email</th>
              <th style={{...th, minWidth: 145}}>Servicio</th>
              <th style={{...th, minWidth: 115}}>Profesional</th>
              <th style={{...th, minWidth: 105}}>Fecha</th>
              <th style={{...th, minWidth: 75}}>Hora</th>
              <th style={{...th, minWidth: 110}}>Estado</th>
              <th style={{...th, minWidth: 115}}>Estado de pago</th>
              <th style={{...th, minWidth: 250}}>Enlace de Meet</th>
              <th style={{...th, minWidth: 170}}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservasFiltradas.map((r) => (
              <tr key={r.id}>
                <td style={td}>{r.nombre}</td>
                <td style={td}>{r.email}</td>
                <td style={td}>{r.servicio}</td>
                <td style={td}>{r.profesional}</td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>{r.fecha}</td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>{r.hora}</td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>{r.estado}</td>

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
                      width: "100%",
                      minWidth: 230,
                      boxSizing: "border-box",
                      padding: "7px",
                      border: "1px solid #d1d5db",
                      borderRadius: 5,
                    }}
                    onBlur={(e) =>
                      void actualizarMeet(r.id, e.target.value)
                    }
                  />
                </td>

                <td style={{ ...td, minWidth: 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
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
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: 0,
    marginBottom: 0,
    padding: "6px 8px",
    fontSize: 12,
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
                  </div>
                </td>
              </tr>
            ))}
            {reservasFiltradas.length === 0 && (
              <tr><td colSpan={10} style={{...td, textAlign:"center", padding:20}}>No se encontraron reservas con estos filtros.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
  
}