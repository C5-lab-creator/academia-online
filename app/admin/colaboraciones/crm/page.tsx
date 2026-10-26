"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ESTADOS = [
  "Pendiente de contactar",
  "Primer contacto",
  "Correo enviado",
  "Esperando respuesta",
  "Reunión concertada",
  "Propuesta enviada",
  "Colaborando",
  "Descartada",
];

const TIPOS = [
  "Residencia de mayores",
  "Asociación",
  "Centro de atención temprana",
  "Ayuntamiento",
  "Centro educativo / AMPA",
  "Centro sanitario",
  "Centro de participación activa",
  "Empresa",
  "Otro",
];

const TIPOS_HISTORIAL = ["Llamada", "Correo", "Reunión", "Propuesta", "Nota", "Otro"];

type Entidad = {
  id: string;
  nombre: string;
  tipo: string | null;
  localidad: string | null;
  provincia: string | null;
  persona_contacto: string | null;
  email: string | null;
  telefono: string | null;
  web: string | null;
  servicios_interes: string | null;
  estado: string;
  ultimo_contacto: string | null;
  proxima_accion: string | null;
  proxima_fecha: string | null;
  notas: string | null;
  created_at: string;
  updated_at: string;
};

type Interaccion = {
  id: string;
  entity_id: string;
  tipo: string;
  fecha: string;
  resumen: string;
  proxima_accion: string | null;
  proxima_fecha: string | null;
  created_at: string;
};

type FormularioEntidad = {
  nombre: string;
  tipo: string;
  localidad: string;
  provincia: string;
  persona_contacto: string;
  email: string;
  telefono: string;
  web: string;
  servicios_interes: string;
  estado: string;
  ultimo_contacto: string;
  proxima_accion: string;
  proxima_fecha: string;
  notas: string;
};

const VACIO: FormularioEntidad = {
  nombre: "",
  tipo: "Otro",
  localidad: "",
  provincia: "Málaga",
  persona_contacto: "",
  email: "",
  telefono: "",
  web: "",
  servicios_interes: "",
  estado: "Pendiente de contactar",
  ultimo_contacto: "",
  proxima_accion: "",
  proxima_fecha: "",
  notas: "",
};

function fechaCorta(fecha: string | null | undefined): string {
  if (!fecha) return "—";
  const parsed = new Date(`${fecha}T12:00:00`);
  return Number.isNaN(parsed.getTime())
    ? fecha
    : parsed.toLocaleDateString("es-ES");
}

export default function ColaboracionesCRMPage() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [entidades, setEntidades] = useState<Entidad[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<FormularioEntidad>({ ...VACIO });
  const [guardando, setGuardando] = useState(false);
  const [seleccionada, setSeleccionada] = useState<Entidad | null>(null);
  const [interacciones, setInteracciones] = useState<Interaccion[]>([]);
  const [tipoInteraccion, setTipoInteraccion] = useState("Nota");
  const [resumenInteraccion, setResumenInteraccion] = useState("");
  const [proximaAccionInteraccion, setProximaAccionInteraccion] = useState("");
  const [proximaFechaInteraccion, setProximaFechaInteraccion] = useState("");
  const [guardandoInteraccion, setGuardandoInteraccion] = useState(false);

  const cargarEntidades = useCallback(async () => {
    const { data, error } = await supabase
      .from("crm_entities")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error cargando entidades CRM:", error);
      alert("No se pudieron cargar las entidades.\n\n" + error.message +
        "\n\nComprueba que has ejecutado el archivo SQL del CRM en Supabase.");
      return;
    }
    setEntidades(data || []);
  }, []);

  useEffect(() => {
    let activo = true;
    async function iniciar() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (!activo) return;
        if (sessionError || !session) {
          router.replace("/admin/login");
          return;
        }

        const { data: perfil, error: perfilError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (!activo) return;
        if (perfilError || perfil?.role !== "admin") {
          await supabase.auth.signOut();
          router.replace("/admin/login");
          return;
        }
        await cargarEntidades();
        if (activo) setCargando(false);
      } catch (error) {
        console.error("Error comprobando acceso al CRM:", error);
        if (activo) {
          alert("No se pudo iniciar el CRM. " + (error instanceof Error ? error.message : ""));
          setCargando(false);
        }
      }
    }
    iniciar();
    return () => { activo = false; };
  }, [router, cargarEntidades]);

  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase("es");
    return entidades.filter((e) => {
      const coincideEstado = filtroEstado === "Todos" || e.estado === filtroEstado;
      const texto = [
        e.nombre, e.tipo, e.localidad, e.provincia, e.persona_contacto,
        e.email, e.telefono, e.servicios_interes,
      ].filter(Boolean).join(" ").toLocaleLowerCase("es");
      return coincideEstado && (!termino || texto.includes(termino));
    });
  }, [entidades, busqueda, filtroEstado]);

  const resumen = useMemo(() => ({
    total: entidades.length,
    pendientes: entidades.filter((e) =>
      ["Pendiente de contactar", "Primer contacto", "Correo enviado", "Esperando respuesta"].includes(e.estado)
    ).length,
    propuestas: entidades.filter((e) => e.estado === "Propuesta enviada").length,
    colaborando: entidades.filter((e) => e.estado === "Colaborando").length,
  }), [entidades]);

  function cambiarCampo(campo: keyof FormularioEntidad, valor: string) {
    setForm((actual) => ({ ...actual, [campo]: valor }));
  }

  function nuevoRegistro() {
    setEditandoId(null);
    setForm({ ...VACIO });
    setMostrarFormulario(true);
    setSeleccionada(null);
  }

  function editarRegistro(entidad: Entidad) {
    setEditandoId(entidad.id);
    setForm({
      nombre: entidad.nombre ?? "",
      tipo: entidad.tipo ?? "Otro",
      localidad: entidad.localidad ?? "",
      provincia: entidad.provincia ?? "Málaga",
      persona_contacto: entidad.persona_contacto ?? "",
      email: entidad.email ?? "",
      telefono: entidad.telefono ?? "",
      web: entidad.web ?? "",
      servicios_interes: entidad.servicios_interes ?? "",
      estado: entidad.estado ?? "Pendiente de contactar",
      ultimo_contacto: entidad.ultimo_contacto ?? "",
      proxima_accion: entidad.proxima_accion ?? "",
      proxima_fecha: entidad.proxima_fecha ?? "",
      notas: entidad.notas ?? "",
    });
    setMostrarFormulario(true);
    setSeleccionada(null);
  }

  async function guardarEntidad(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.nombre.trim()) {
      alert("Escribe el nombre de la entidad.");
      return;
    }
    setGuardando(true);
    const payload = {
      ...form,
      nombre: form.nombre.trim(),
      localidad: form.localidad.trim() || null,
      provincia: form.provincia.trim() || null,
      persona_contacto: form.persona_contacto.trim() || null,
      email: form.email.trim() || null,
      telefono: form.telefono.trim() || null,
      web: form.web.trim() || null,
      servicios_interes: form.servicios_interes.trim() || null,
      ultimo_contacto: form.ultimo_contacto || null,
      proxima_accion: form.proxima_accion.trim() || null,
      proxima_fecha: form.proxima_fecha || null,
      notas: form.notas.trim() || null,
    };
    try {
      const consulta = editandoId
        ? supabase.from("crm_entities").update(payload).eq("id", editandoId).select().single()
        : supabase.from("crm_entities").insert(payload).select().single();
      const { data, error } = await consulta;
      if (error) throw error;
      if (editandoId) {
        setEntidades((actuales) => actuales.map((e) => e.id === editandoId ? data : e));
      } else {
        setEntidades((actuales) => [data, ...actuales]);
      }
      setMostrarFormulario(false);
      setForm({ ...VACIO });
      setEditandoId(null);
    } catch (error) {
      console.error("Error guardando entidad:", error);
      alert("No se pudo guardar la entidad.\n\n" + (error instanceof Error ? error.message : "Error desconocido"));
    } finally {
      setGuardando(false);
    }
  }

  async function eliminarEntidad(entidad: Entidad) {
    if (!window.confirm(`¿Eliminar la ficha de "${entidad.nombre}" y su historial?`)) return;
    const { error } = await supabase.from("crm_entities").delete().eq("id", entidad.id);
    if (error) {
      alert("No se pudo eliminar.\n\n" + error.message);
      return;
    }
    setEntidades((actuales) => actuales.filter((e) => e.id !== entidad.id));
    if (seleccionada?.id === entidad.id) setSeleccionada(null);
  }

  async function abrirHistorial(entidad: Entidad) {
    setSeleccionada(entidad);
    setResumenInteraccion("");
    const { data, error } = await supabase
      .from("crm_interactions")
      .select("*")
      .eq("entity_id", entidad.id)
      .order("fecha", { ascending: false });
    if (error) {
      alert("No se pudo cargar el historial.\n\n" + error.message);
      setInteracciones([]);
      return;
    }
    setInteracciones(data || []);
  }

  async function guardarInteraccion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!seleccionada || !resumenInteraccion.trim()) {
      alert("Escribe un resumen del contacto.");
      return;
    }
    setGuardandoInteraccion(true);
    try {
      const fechaAhora = new Date().toISOString().slice(0, 10);
      const payload = {
        entity_id: seleccionada.id,
        tipo: tipoInteraccion,
        fecha: fechaAhora,
        resumen: resumenInteraccion.trim(),
        proxima_accion: proximaAccionInteraccion.trim() || null,
        proxima_fecha: proximaFechaInteraccion || null,
      };
      const { data, error } = await supabase
        .from("crm_interactions").insert(payload).select().single();
      if (error) throw error;

      const actualizacion = {
        ultimo_contacto: fechaAhora,
        ...(proximaAccionInteraccion.trim() ? { proxima_accion: proximaAccionInteraccion.trim() } : {}),
        ...(proximaFechaInteraccion ? { proxima_fecha: proximaFechaInteraccion } : {}),
      };
      const { data: entidadActualizada, error: errorEntidad } = await supabase
        .from("crm_entities").update(actualizacion).eq("id", seleccionada.id).select().single();
      if (errorEntidad) throw errorEntidad;

      setInteracciones((actuales) => [data, ...actuales]);
      setSeleccionada(entidadActualizada);
      setEntidades((actuales) => actuales.map((e) => e.id === entidadActualizada.id ? entidadActualizada : e));
      setResumenInteraccion("");
      setProximaAccionInteraccion("");
      setProximaFechaInteraccion("");
    } catch (error) {
      console.error("Error guardando interacción:", error);
      alert("No se pudo guardar el seguimiento.\n\n" + (error instanceof Error ? error.message : "Error desconocido"));
    } finally {
      setGuardandoInteraccion(false);
    }
  }

  if (cargando) {
    return <main className="crm-shell"><p>Comprobando acceso...</p></main>;
  }

  return (
    <main className="crm-shell">
      <header className="crm-header">
        <div>
          <p className="eyebrow">MENTE ABIERTA · ADMINISTRACIÓN</p>
          <h1>CRM de colaboraciones</h1>
          <p className="subtitulo">Gestiona entidades, contactos y oportunidades de colaboración desde un único lugar.</p>
        </div>
        <button className="btn btn-light" onClick={() => router.push("/admin/colaboraciones")}>← Colaboraciones actuales</button>
      </header>

      <section className="stats">
        <article className="stat"><span>Entidades registradas</span><strong>{resumen.total}</strong></article>
        <article className="stat"><span>En seguimiento</span><strong>{resumen.pendientes}</strong></article>
        <article className="stat"><span>Propuestas enviadas</span><strong>{resumen.propuestas}</strong></article>
        <article className="stat"><span>Colaboraciones activas</span><strong>{resumen.colaborando}</strong></article>
      </section>

      <section className="toolbar">
        <div className="search-wrap">
          <span aria-hidden="true">⌕</span>
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar entidad, localidad, contacto..." aria-label="Buscar entidades"/>
        </div>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} aria-label="Filtrar por estado">
          <option value="Todos">Todos los estados</option>
          {ESTADOS.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
        </select>
        <button className="btn btn-primary" onClick={nuevoRegistro}>＋ Nueva entidad</button>
      </section>

      {mostrarFormulario && (
        <form className="panel formulario" onSubmit={guardarEntidad}>
          <div className="panel-title">
            <div><h2>{editandoId ? "Editar entidad" : "Añadir entidad"}</h2><p>Completa los datos que tengas; podrás ampliarlos más adelante.</p></div>
            <button type="button" className="btn btn-light" onClick={() => setMostrarFormulario(false)}>Cerrar</button>
          </div>
          <div className="form-grid">
            <label>Nombre de la entidad *<input required value={form.nombre} onChange={(e) => cambiarCampo("nombre", e.target.value)} placeholder="Ej. Asociación o residencia"/></label>
            <label>Tipo de entidad<select value={form.tipo} onChange={(e) => cambiarCampo("tipo", e.target.value)}>{TIPOS.map((tipo) => <option key={tipo}>{tipo}</option>)}</select></label>
            <label>Localidad<input value={form.localidad || ""} onChange={(e) => cambiarCampo("localidad", e.target.value)} placeholder="Ej. Vélez-Málaga"/></label>
            <label>Provincia<input value={form.provincia || ""} onChange={(e) => cambiarCampo("provincia", e.target.value)} placeholder="Málaga o Granada"/></label>
            <label>Persona de contacto<input value={form.persona_contacto || ""} onChange={(e) => cambiarCampo("persona_contacto", e.target.value)} placeholder="Nombre y cargo"/></label>
            <label>Correo electrónico<input type="email" value={form.email || ""} onChange={(e) => cambiarCampo("email", e.target.value)} placeholder="contacto@entidad.es"/></label>
            <label>Teléfono<input value={form.telefono || ""} onChange={(e) => cambiarCampo("telefono", e.target.value)} placeholder="Teléfono de contacto"/></label>
            <label>Web<input type="url" value={form.web || ""} onChange={(e) => cambiarCampo("web", e.target.value)} placeholder="https://..."/></label>
            <label>Estado comercial<select value={form.estado} onChange={(e) => cambiarCampo("estado", e.target.value)}>{ESTADOS.map((estado) => <option key={estado}>{estado}</option>)}</select></label>
            <label>Servicios de interés<input value={form.servicios_interes || ""} onChange={(e) => cambiarCampo("servicios_interes", e.target.value)} placeholder="Terapia ocupacional, talleres..."/></label>
            <label>Último contacto<input type="date" value={form.ultimo_contacto || ""} onChange={(e) => cambiarCampo("ultimo_contacto", e.target.value)}/></label>
            <label>Próxima fecha de seguimiento<input type="date" value={form.proxima_fecha || ""} onChange={(e) => cambiarCampo("proxima_fecha", e.target.value)}/></label>
            <label className="span-2">Próxima acción<input value={form.proxima_accion || ""} onChange={(e) => cambiarCampo("proxima_accion", e.target.value)} placeholder="Ej. Llamar el martes para confirmar recepción"/></label>
            <label className="span-2">Notas<textarea rows={4} value={form.notas || ""} onChange={(e) => cambiarCampo("notas", e.target.value)} placeholder="Conversaciones, necesidades detectadas, acuerdos..."/></label>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-light" onClick={() => { setMostrarFormulario(false); setForm({ ...VACIO }); setEditandoId(null); }}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={guardando}>{guardando ? "Guardando..." : "Guardar entidad"}</button>
          </div>
        </form>
      )}

      <section className="panel">
        <div className="panel-title"><div><h2>Entidades y oportunidades</h2><p>{filtradas.length} resultado(s)</p></div><button className="btn btn-light" onClick={cargarEntidades}>↻ Actualizar</button></div>
        {filtradas.length === 0 ? (
          <div className="empty"><span>◎</span><h3>No hay entidades que mostrar</h3><p>Añade tu primer centro o cambia los filtros de búsqueda.</p><button className="btn btn-primary" onClick={nuevoRegistro}>＋ Añadir primera entidad</button></div>
        ) : (
          <div className="table-wrap"><table><thead><tr><th>Entidad</th><th>Localidad</th><th>Contacto</th><th>Estado</th><th>Seguimiento</th><th>Acciones</th></tr></thead><tbody>
            {filtradas.map((entidad) => (
              <tr key={entidad.id}>
                <td><strong>{entidad.nombre}</strong><small>{entidad.tipo}</small></td>
                <td>{[entidad.localidad, entidad.provincia].filter(Boolean).join(", ") || "—"}</td>
                <td>{entidad.persona_contacto || "—"}<small>{entidad.email || entidad.telefono || ""}</small></td>
                <td><span className={`estado estado-${ESTADOS.indexOf(entidad.estado)}`}>{entidad.estado}</span></td>
                <td>{entidad.proxima_accion || "—"}<small>{fechaCorta(entidad.proxima_fecha)}</small></td>
                <td><div className="row-actions"><button onClick={() => abrirHistorial(entidad)}>Historial</button><button onClick={() => editarRegistro(entidad)}>Editar</button><button className="danger" onClick={() => eliminarEntidad(entidad)}>Eliminar</button></div></td>
              </tr>
            ))}
          </tbody></table></div>
        )}
      </section>

      {seleccionada && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSeleccionada(null); }}>
          <section className="modal" role="dialog" aria-modal="true" aria-label={`Historial de ${seleccionada.nombre}`}>
            <div className="panel-title"><div><h2>Seguimiento: {seleccionada.nombre}</h2><p>Registra llamadas, correos, reuniones y próximas acciones.</p></div><button className="btn btn-light" onClick={() => setSeleccionada(null)}>Cerrar</button></div>
            <form className="interaction-form" onSubmit={guardarInteraccion}>
              <label>Tipo de contacto<select value={tipoInteraccion} onChange={(e) => setTipoInteraccion(e.target.value)}>{TIPOS_HISTORIAL.map((tipo) => <option key={tipo}>{tipo}</option>)}</select></label>
              <label>Resumen del contacto *<textarea required rows={3} value={resumenInteraccion} onChange={(e) => setResumenInteraccion(e.target.value)} placeholder="¿Qué se habló o qué respuesta recibiste?"/></label>
              <label>Próxima acción<input value={proximaAccionInteraccion} onChange={(e) => setProximaAccionInteraccion(e.target.value)} placeholder="Ej. Volver a llamar"/></label>
              <label>Fecha de seguimiento<input type="date" value={proximaFechaInteraccion} onChange={(e) => setProximaFechaInteraccion(e.target.value)}/></label>
              <button className="btn btn-primary" type="submit" disabled={guardandoInteraccion}>{guardandoInteraccion ? "Guardando..." : "Guardar contacto"}</button>
            </form>
            <h3 className="history-heading">Historial de actividad</h3>
            {interacciones.length === 0 ? <p className="muted">Todavía no hay contactos registrados.</p> : <div className="history-list">{interacciones.map((item) => <article className="history-item" key={item.id}><div className="history-meta"><strong>{item.tipo}</strong><span>{new Date(item.fecha).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}</span></div><p>{item.resumen}</p>{item.proxima_accion && <small>Próxima acción: {item.proxima_accion}{item.proxima_fecha ? ` · ${fechaCorta(item.proxima_fecha)}` : ""}</small>}</article>)}</div>}
          </section>
        </div>
      )}

      <style jsx>{`
        .crm-shell{max-width:1450px;margin:0 auto;padding:36px 28px 60px;color:#202923}
        .crm-header{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;margin-bottom:28px}
        .eyebrow{font-size:11px;letter-spacing:.16em;font-weight:800;color:#47735b;margin:0 0 10px}
        h1{font-size:clamp(28px,4vw,38px);line-height:1.12;margin:0 0 10px;color:#1e3528}
        .subtitulo{color:#66736a;margin:0;max-width:720px;line-height:1.6}
        .stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:22px}
        .stat,.panel{background:#fff;border:1px solid #e2e9e3;border-radius:16px;box-shadow:0 4px 18px #183c2410}
        .stat{padding:19px}.stat span{display:block;font-size:13px;color:#69756d;margin-bottom:8px}.stat strong{font-size:27px;color:#234c35}
        .toolbar{display:flex;gap:12px;margin-bottom:22px;flex-wrap:wrap}
        .search-wrap{display:flex;align-items:center;gap:9px;flex:1;min-width:240px;border:1px solid #dbe3dc;border-radius:10px;padding:0 12px;background:#fff}
        .search-wrap span{font-size:24px;color:#748278}.search-wrap input{border:0!important;box-shadow:none!important;padding-left:0!important}
        input,select,textarea{width:100%;box-sizing:border-box;border:1px solid #d6dfd8;border-radius:9px;padding:11px 12px;font:inherit;color:#26352b;background:#fff;min-width:0}
        input:focus,select:focus,textarea:focus{outline:2px solid #b6d8c0;outline-offset:1px}
        .btn{border:0;border-radius:9px;padding:11px 15px;font-weight:650;font-size:13px;cursor:pointer;white-space:nowrap}
        .btn:disabled{opacity:.6;cursor:not-allowed}.btn-primary{background:#285c3c;color:white}.btn-primary:hover{background:#204a30}.btn-light{background:#edf2ee;color:#344b3a}
        .panel{padding:22px;margin-bottom:22px}.panel-title{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:20px}
        .panel-title h2{margin:0 0 5px;font-size:20px;color:#243d2c}.panel-title p{margin:0;color:#78847b;font-size:13px}
        .formulario{background:#fbfdfb}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        .form-grid label,.interaction-form label{display:flex;flex-direction:column;gap:7px;font-size:13px;font-weight:650;color:#435449}
        .span-2{grid-column:span 2}.form-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}
        .table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:13px;text-align:left}th{color:#778279;font-weight:650;background:#f7faf7}th,td{padding:13px 12px;border-bottom:1px solid #edf1ed;vertical-align:top}td strong,td small{display:block}td small{font-size:11px;color:#7b867e;margin-top:5px;max-width:220px;overflow-wrap:anywhere}
        .estado{display:inline-block;padding:6px 9px;border-radius:20px;font-size:11px;font-weight:700;background:#edf1ee;color:#4f6054;max-width:180px}
        .estado-0{background:#fff0d8;color:#85530b}.estado-1,.estado-2{background:#e8f1ff;color:#28538a}.estado-3{background:#fff2d7;color:#875b12}.estado-4{background:#e9e4ff;color:#58439a}.estado-5{background:#e5edff;color:#3558a5}.estado-6{background:#dff3e5;color:#23643a}.estado-7{background:#f5e7e7;color:#8d4545}
        .row-actions{display:flex;flex-wrap:wrap;gap:6px}.row-actions button{border:1px solid #dce5dd;background:#f7faf7;border-radius:7px;padding:7px 9px;cursor:pointer;font-size:11px;color:#344b3a}.row-actions .danger{color:#a52e2e;background:#fff5f5;border-color:#f0d9d9}
        .empty{text-align:center;padding:45px 15px;color:#748078}.empty>span{font-size:32px}.empty h3{margin:10px 0 6px;color:#344b3a}.empty p{margin:0 0 18px;font-size:13px}
        .modal-backdrop{position:fixed;inset:0;background:#1423198a;z-index:1000;display:flex;justify-content:center;align-items:center;padding:20px}.modal{background:#fff;border-radius:18px;padding:24px;width:min(760px,100%);max-height:90vh;overflow:auto;box-shadow:0 20px 80px #0003}
        .interaction-form{display:grid;grid-template-columns:1fr 1fr;gap:14px}.interaction-form label:nth-child(2){grid-column:span 2}.interaction-form button{justify-self:start}
        .history-heading{font-size:16px;margin:25px 0 12px;color:#294331}.muted{color:#7a857d;font-size:13px}.history-list{display:grid;gap:10px}.history-item{border:1px solid #e5ebe6;border-radius:11px;padding:13px 15px}.history-meta{display:flex;justify-content:space-between;gap:12px;font-size:12px;color:#53685a}.history-meta span{color:#849087}.history-item p{white-space:pre-wrap;line-height:1.5;font-size:13px;margin:10px 0}.history-item small{color:#53715c}
        @media(max-width:900px){.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.crm-header{flex-direction:column}.form-grid{grid-template-columns:1fr}.span-2{grid-column:auto}.table-wrap table{min-width:900px}}
        @media(max-width:560px){.crm-shell{padding:24px 14px 40px}.stats{gap:9px}.stat{padding:14px}.stat strong{font-size:23px}.toolbar>*{width:100%}.search-wrap{min-width:0}.panel{padding:15px}.interaction-form{grid-template-columns:1fr}.interaction-form label:nth-child(2){grid-column:auto}.panel-title{flex-direction:column}}
      `}</style>
    </main>
  );
}
