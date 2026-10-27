"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

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

const HORAS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

function fechaLocal() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

const tarjeta: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
};

const campo: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 10,
  border: "1px solid #d1d5db",
  borderRadius: 7,
  marginTop: 5,
};

const boton: React.CSSProperties = {
  padding: "10px 15px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 7,
  cursor: "pointer",
  fontWeight: "bold",
};

const th: React.CSSProperties = {
  padding: 10,
  border: "1px solid #e5e7eb",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: 10,
  border: "1px solid #e5e7eb",
  verticalAlign: "top",
};

export default function ConfiguracionCRM() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  // Buscador y filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroProfesional, setFiltroProfesional] = useState("Todos");
  const [filtroServicio, setFiltroServicio] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroPago, setFiltroPago] = useState("Todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // Formulario para crear reservas manualmente
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    servicio: "",
    profesional: "Sheila",
    fecha: fechaLocal(),
    hora: "09:00",
    estado: "Pendiente",
    estado_pago: "Pendiente",
    enlace_meet: "",
  });

  const cargarReservas = useCallback(async () => {
    setCargando(true);

    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .order("fecha", { ascending: false })
      .order("hora", { ascending: false });

    if (error) {
      console.error("Error cargando reservas:", error);
      alert("No se pudieron cargar las reservas.");
    } else {
      setReservas((data ?? []) as Reserva[]);
    }

    setCargando(false);
  }, []);

  useEffect(() => {
    void cargarReservas();
  }, [cargarReservas]);

  const servicios = useMemo(
    () =>
      [...new Set(reservas.map((r) => r.servicio).filter(Boolean))].sort(),
    [reservas]
  );

  const profesionales = useMemo(
    () =>
      [...new Set(reservas.map((r) => r.profesional).filter(Boolean))].sort(),
    [reservas]
  );

  const estados = useMemo(
    () =>
      [...new Set(reservas.map((r) => r.estado).filter(Boolean))].sort(),
    [reservas]
  );

  // Buscador y filtros
  const reservasFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase("es");

    return reservas.filter((r) => {
      const coincideTexto =
        !texto ||
        [
          r.nombre,
          r.email,
          r.servicio,
          r.profesional,
          r.estado,
          r.estado_pago,
          r.fecha,
          r.hora,
        ].some((valor) =>
          (valor || "").toLocaleLowerCase("es").includes(texto)
        );

      return (
        coincideTexto &&
        (filtroProfesional === "Todos" ||
          r.profesional === filtroProfesional) &&
        (filtroServicio === "Todos" || r.servicio === filtroServicio) &&
        (filtroEstado === "Todos" || r.estado === filtroEstado) &&
        (filtroPago === "Todos" ||
          (r.estado_pago || "Pendiente") === filtroPago) &&
        (!fechaDesde || r.fecha >= fechaDesde) &&
        (!fechaHasta || r.fecha <= fechaHasta)
      );
    });
  }, [
    reservas,
    busqueda,
    filtroProfesional,
    filtroServicio,
    filtroEstado,
    filtroPago,
    fechaDesde,
    fechaHasta,
  ]);

  // Agrupar reservas por cliente
  const clientes = useMemo(() => {
    const mapa = new Map<string, Reserva[]>();

    reservas.forEach((r) => {
      const clave = (r.email || r.nombre || "")
        .trim()
        .toLocaleLowerCase("es");

      if (!clave) return;

      mapa.set(clave, [...(mapa.get(clave) ?? []), r]);
    });

    return Array.from(mapa.entries()).map(([clave, lista]) => ({
      clave,
      lista: [...lista].sort((a, b) =>
        `${b.fecha} ${b.hora}`.localeCompare(`${a.fecha} ${a.hora}`)
      ),
    }));
  }, [reservas]);

  const clienteActual = clientes.find(
    (cliente) => cliente.clave === clienteSeleccionado
  );

  // Estadísticas
  const hoy = fechaLocal();
  const inicioMes = `${hoy.slice(0, 7)}-01`;

  const totalPagadas = reservas.filter(
    (r) => (r.estado_pago || "Pendiente") === "Pagado"
  ).length;

  const totalPendientesPago = reservas.filter(
    (r) => (r.estado_pago || "Pendiente") !== "Pagado"
  ).length;

  const totalCanceladas = reservas.filter((r) =>
    (r.estado || "").toLocaleLowerCase("es").includes("cancel")
  ).length;

  const totalActivasFuturas = reservas.filter(
    (r) =>
      r.fecha >= hoy &&
      !(r.estado || "").toLocaleLowerCase("es").includes("cancel")
  ).length;

  const totalCompletadas = reservas.filter((r) =>
    (r.estado || "").toLocaleLowerCase("es").includes("complet")
  ).length;

  const reservasEsteMes = reservas.filter(
    (r) => r.fecha >= inicioMes && r.fecha <= hoy
  ).length;

  const porcentajeCancelacion = reservas.length
    ? Math.round((totalCanceladas / reservas.length) * 100)
    : 0;

  const reservasPorServicio = servicios
    .map((servicio) => ({
      servicio,
      total: reservas.filter((r) => r.servicio === servicio).length,
    }))
    .sort((a, b) => b.total - a.total);

  // Crear reserva manual
  async function crearReserva(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.nombre.trim() ||
      !form.email.trim() ||
      !form.servicio.trim() ||
      !form.fecha ||
      !form.hora
    ) {
      alert("Completa el nombre, email, servicio, fecha y hora.");
      return;
    }

    if (form.fecha < hoy) {
      const continuar = confirm(
        "La fecha elegida ya ha pasado. ¿Quieres crear la reserva igualmente?"
      );

      if (!continuar) return;
    }

    setGuardando(true);

    try {
      // Evitar duplicar una reserva activa en la misma hora.
      const { data: existentes, error: errorConsulta } = await supabase
        .from("reservas")
        .select("id, hora, estado")
        .eq("fecha", form.fecha)
        .eq("profesional", form.profesional);

      if (errorConsulta) throw errorConsulta;

      const conflicto = (existentes ?? []).some((r) => {
        const mismaHora = (r.hora || "").slice(0, 5) === form.hora;
        const cancelada = (r.estado || "")
          .toLocaleLowerCase("es")
          .includes("cancel");

        return mismaHora && !cancelada;
      });

      if (conflicto) {
        alert(
          "Ya hay una reserva activa para ese profesional, fecha y hora."
        );
        return;
      }

      const { error } = await supabase.from("reservas").insert({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        servicio: form.servicio.trim(),
        profesional: form.profesional,
        fecha: form.fecha,
        hora: form.hora,
        estado: form.estado,
        estado_pago: form.estado_pago,
        enlace_meet: form.enlace_meet.trim(),
      });

      if (error) throw error;

      await cargarReservas();

      setForm({
        ...form,
        nombre: "",
        email: "",
        servicio: "",
        enlace_meet: "",
      });

      setMostrarFormulario(false);
      alert("Reserva creada correctamente.");
    } catch (error) {
      console.error("Error creando reserva:", error);
      alert(
        "No se pudo crear la reserva. Comprueba los permisos de Supabase y los campos de la tabla."
      );
    } finally {
      setGuardando(false);
    }
  }

  function limpiarFiltros() {
    setBusqueda("");
    setFiltroProfesional("Todos");
    setFiltroServicio("Todos");
    setFiltroEstado("Todos");
    setFiltroPago("Todos");
    setFechaDesde("");
    setFechaHasta("");
  }

  return (
    <main
      style={{
        maxWidth: 1400,
        margin: "30px auto",
        padding: 20,
        color: "#111827",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 15,
          marginBottom: 25,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 5 }}>Configuración del CRM</h1>
          <p style={{ color: "#6b7280", marginTop: 0 }}>
            Buscador, historial de clientes, estadísticas y reservas manuales.
          </p>
        </div>

        <button
          type="button"
          style={boton}
          onClick={() => setMostrarFormulario((actual) => !actual)}
        >
          {mostrarFormulario ? "Cerrar formulario" : "+ Crear reserva"}
        </button>
      </header>

      {/* FORMULARIO DE RESERVA MANUAL */}
      {mostrarFormulario && (
        <section style={{ ...tarjeta, marginBottom: 25 }}>
          <h2>Nueva reserva manual</h2>

          <form
            onSubmit={(e) => void crearReserva(e)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 15,
            }}
          >
            <label>
              Nombre del cliente *
              <input
                required
                style={campo}
                value={form.nombre}
                onChange={(e) =>
                  setForm({ ...form, nombre: e.target.value })
                }
              />
            </label>

            <label>
              Email *
              <input
                required
                type="email"
                style={campo}
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </label>

            <label>
              Servicio *
              <input
                required
                list="servicios-crm"
                style={campo}
                value={form.servicio}
                onChange={(e) =>
                  setForm({ ...form, servicio: e.target.value })
                }
              />
              <datalist id="servicios-crm">
                {servicios.map((servicio) => (
                  <option key={servicio} value={servicio} />
                ))}
              </datalist>
            </label>

            <label>
              Profesional
              <select
                style={campo}
                value={form.profesional}
                onChange={(e) =>
                  setForm({ ...form, profesional: e.target.value })
                }
              >
                <option value="Sheila">Sheila</option>
                <option value="Eduardo">Eduardo</option>
              </select>
            </label>

            <label>
              Fecha *
              <input
                required
                type="date"
                style={campo}
                value={form.fecha}
                onChange={(e) =>
                  setForm({ ...form, fecha: e.target.value })
                }
              />
            </label>

            <label>
              Hora *
              <select
                required
                style={campo}
                value={form.hora}
                onChange={(e) =>
                  setForm({ ...form, hora: e.target.value })
                }
              >
                {HORAS.map((hora) => (
                  <option key={hora} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Estado de la reserva
              <select
                style={campo}
                value={form.estado}
                onChange={(e) =>
                  setForm({ ...form, estado: e.target.value })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
              </select>
            </label>

            <label>
              Estado del pago
              <select
                style={campo}
                value={form.estado_pago}
                onChange={(e) =>
                  setForm({ ...form, estado_pago: e.target.value })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
              </select>
            </label>

            <label style={{ gridColumn: "1 / -1" }}>
              Enlace de Google Meet (opcional)
              <input
                type="url"
                style={campo}
                placeholder="https://meet.google.com/..."
                value={form.enlace_meet}
                onChange={(e) =>
                  setForm({ ...form, enlace_meet: e.target.value })
                }
              />
            </label>

            <div style={{ gridColumn: "1 / -1" }}>
              <button type="submit" style={boton} disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar reserva"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ESTADÍSTICAS */}
      <h2>Estadísticas</h2>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 15,
          marginBottom: 25,
        }}
      >
        {[
          ["Total de reservas", reservas.length],
          ["Reservas de este mes", reservasEsteMes],
          ["Reservas futuras activas", totalActivasFuturas],
          ["Clientes identificados", clientes.length],
          ["Pagos realizados", totalPagadas],
          ["Pagos pendientes", totalPendientesPago],
          ["Reservas completadas", totalCompletadas],
          ["Reservas canceladas", totalCanceladas],
        ].map(([titulo, valor]) => (
          <div key={titulo} style={tarjeta}>
            <div style={{ color: "#6b7280", fontSize: 14 }}>{titulo}</div>
            <p style={{ fontSize: 30, fontWeight: "bold", margin: "8px 0" }}>
              {valor}
            </p>

            {titulo === "Reservas canceladas" && (
              <small>{porcentajeCancelacion}% del total</small>
            )}
          </div>
        ))}
      </section>

      {/* RESERVAS POR SERVICIO */}
      <section style={{ ...tarjeta, marginBottom: 25 }}>
        <h2>Reservas por servicio</h2>

        {reservasPorServicio.length === 0 ? (
          <p>No hay datos disponibles.</p>
        ) : (
          reservasPorServicio.map(({ servicio, total }) => {
            const maximo = Math.max(
              ...reservasPorServicio.map((r) => r.total),
              1
            );

            return (
              <div key={servicio} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span>{servicio}</span>
                  <strong>{total}</strong>
                </div>

                <div
                  style={{
                    height: 12,
                    background: "#e5e7eb",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(total / maximo) * 100}%`,
                      background: "#2563eb",
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* BUSCADOR Y FILTROS */}
      <h2>Buscar y filtrar reservas</h2>

      <section style={{ ...tarjeta, marginBottom: 25 }}>
        <label style={{ display: "block", marginBottom: 15 }}>
          Buscar por nombre, email, servicio, profesional, fecha u hora
          <input
            type="search"
            style={campo}
            value={busqueda}
            placeholder="Escribe para buscar..."
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 15,
          }}
        >
          <label>
            Profesional
            <select
              style={campo}
              value={filtroProfesional}
              onChange={(e) => setFiltroProfesional(e.target.value)}
            >
              <option value="Todos">Todos</option>
              {profesionales.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label>
            Servicio
            <select
              style={campo}
              value={filtroServicio}
              onChange={(e) => setFiltroServicio(e.target.value)}
            >
              <option value="Todos">Todos</option>
              {servicios.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label>
            Estado de reserva
            <select
              style={campo}
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="Todos">Todos</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </label>

          <label>
            Estado del pago
            <select
              style={campo}
              value={filtroPago}
              onChange={(e) => setFiltroPago(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Pagado">Pagado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </label>

          <label>
            Fecha desde
            <input
              type="date"
              style={campo}
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
            />
          </label>

          <label>
            Fecha hasta
            <input
              type="date"
              style={campo}
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 15,
            marginTop: 18,
          }}
        >
          <button
            type="button"
            style={{ ...boton, background: "#d97706" }}
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>

          <strong>
            {reservasFiltradas.length} de {reservas.length} reservas
          </strong>
        </div>
      </section>

      {/* HISTORIAL DE CLIENTES */}
      <h2>Historial de clientes</h2>

      <section style={{ ...tarjeta, marginBottom: 25 }}>
        <label style={{ display: "block", maxWidth: 500 }}>
          Seleccionar cliente
          <select
            style={campo}
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un cliente...</option>

            {clientes.map(({ clave, lista }) => (
              <option key={clave} value={clave}>
                {lista[0].nombre} — {lista[0].email}
              </option>
            ))}
          </select>
        </label>

        {clienteActual && (
          <div style={{ marginTop: 20 }}>
            <h3>{clienteActual.lista[0].nombre}</h3>

            <p>
              <strong>Email:</strong> {clienteActual.lista[0].email}
            </p>

            <p>
              <strong>Total de reservas:</strong> {clienteActual.lista.length}
            </p>

            <p>
              <strong>Primera reserva:</strong>{" "}
              {clienteActual.lista[clienteActual.lista.length - 1].fecha}
            </p>

            <p>
              <strong>Última reserva:</strong> {clienteActual.lista[0].fecha}
            </p>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 15,
                }}
              >
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th style={th}>Fecha</th>
                    <th style={th}>Hora</th>
                    <th style={th}>Servicio</th>
                    <th style={th}>Profesional</th>
                    <th style={th}>Estado</th>
                    <th style={th}>Pago</th>
                  </tr>
                </thead>

                <tbody>
                  {clienteActual.lista.map((r) => (
                    <tr key={r.id}>
                      <td style={td}>{r.fecha}</td>
                      <td style={td}>{r.hora}</td>
                      <td style={td}>{r.servicio}</td>
                      <td style={td}>{r.profesional}</td>
                      <td style={td}>{r.estado}</td>
                      <td style={td}>{r.estado_pago || "Pendiente"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* LISTADO DE RESERVAS FILTRADAS */}
      <h2>Reservas encontradas</h2>

      {cargando ? (
        <p>Cargando reservas...</p>
      ) : (
        <div style={{ ...tarjeta, overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={th}>Nombre</th>
                <th style={th}>Email</th>
                <th style={th}>Servicio</th>
                <th style={th}>Profesional</th>
                <th style={th}>Fecha</th>
                <th style={th}>Hora</th>
                <th style={th}>Estado</th>
                <th style={th}>Pago</th>
              </tr>
            </thead>

            <tbody>
              {reservasFiltradas.map((r) => (
                <tr key={r.id}>
                  <td style={td}>{r.nombre}</td>
                  <td style={td}>{r.email}</td>
                  <td style={td}>{r.servicio}</td>
                  <td style={td}>{r.profesional}</td>
                  <td style={td}>{r.fecha}</td>
                  <td style={td}>{r.hora}</td>
                  <td style={td}>{r.estado}</td>
                  <td style={td}>{r.estado_pago || "Pendiente"}</td>
                </tr>
              ))}

              {reservasFiltradas.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ ...td, textAlign: "center" }}>
                    No se encontraron reservas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}