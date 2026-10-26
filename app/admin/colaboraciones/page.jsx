"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ColaboracionesPage() {
  const router = useRouter();

  const [cargando, setCargando] = useState(true);
  const [colaboraciones, setColaboraciones] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    comprobarSesion();
  }, []);

  async function comprobarSesion() {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error obteniendo sesión:", sessionError);

        alert(
          "No se pudo comprobar la sesión:\n\n" +
            sessionError.message
        );

        return;
      }

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      const { data: perfil, error: perfilError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (perfilError) {
        console.error(
          "Error comprobando perfil:",
          perfilError
        );

        alert(
          "No se pudo comprobar el perfil:\n\n" +
            perfilError.message
        );

        return;
      }

      if (!perfil || perfil.role !== "admin") {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      await cargarColaboraciones();

      setCargando(false);
    } catch (error) {
      console.error(
        "Error comprobando sesión:",
        error
      );

      alert(
        "Ha ocurrido un error:\n\n" +
          (error?.message || "Error desconocido")
      );
    }
  }

  async function cargarColaboraciones() {
    const { data, error } = await supabase
      .from("collaborations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "ERROR SUPABASE - colaboraciones:",
        error
      );

      console.error("Mensaje:", error.message);
      console.error("Código:", error.code);
      console.error("Detalles:", error.details);
      console.error("Hint:", error.hint);

      alert(
        "Error cargando colaboraciones:\n\n" +
          error.message +
          "\n\nCódigo: " +
          (error.code || "sin código")
      );

      return;
    }

    setColaboraciones(data || []);
  }

  function seleccionarLogo(event) {
    const archivo = event.target.files?.[0];

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith("image/")) {
      alert("Selecciona una imagen válida.");
      event.target.value = "";
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      alert("El logo no puede superar los 5 MB.");
      event.target.value = "";
      return;
    }

    setLogo(archivo);

    const preview = URL.createObjectURL(archivo);
    setLogoPreview(preview);
  }

  function limpiarFormulario() {
    setNombre("");
    setLogo(null);
    setLogoPreview("");
  }

  async function guardarColaboracion(event) {
    event.preventDefault();

    if (!nombre.trim()) {
      alert("Escribe el nombre de la colaboración.");
      return;
    }

    if (!logo) {
      alert("Selecciona un logo.");
      return;
    }

    try {
      setGuardando(true);

      const extension =
        logo.name.split(".").pop()?.toLowerCase() || "png";

      const nombreArchivo =
        `${crypto.randomUUID()}.${extension}`;

      const rutaLogo = `logos/${nombreArchivo}`;

      // 1. SUBIR LOGO
      const { error: errorUpload } = await supabase.storage
        .from("collaboration-logos")
        .upload(rutaLogo, logo, {
          cacheControl: "3600",
          upsert: false,
          contentType: logo.type,
        });

      if (errorUpload) {
        console.error(
          "ERROR SUBIENDO LOGO:",
          errorUpload
        );

        alert(
          "No se pudo subir el logo:\n\n" +
            errorUpload.message
        );

        return;
      }

      // 2. OBTENER URL PÚBLICA
      const { data: publicUrlData } = supabase.storage
        .from("collaboration-logos")
        .getPublicUrl(rutaLogo);

      const publicUrl = publicUrlData?.publicUrl;

      if (!publicUrl) {
        alert(
          "El logo se subió, pero no se pudo obtener su URL."
        );

        await supabase.storage
          .from("collaboration-logos")
          .remove([rutaLogo]);

        return;
      }

      // 3. GUARDAR EN LA TABLA
      const { data, error: errorInsert } = await supabase
        .from("collaborations")
        .insert({
          nombre: nombre.trim(),
          logo_url: publicUrl,
          activa: true,
        })
        .select()
        .single();

      if (errorInsert) {
        console.error(
          "ERROR GUARDANDO COLABORACIÓN:",
          errorInsert
        );

        await supabase.storage
          .from("collaboration-logos")
          .remove([rutaLogo]);

        alert(
          "No se pudo guardar la colaboración:\n\n" +
            errorInsert.message +
            "\n\nCódigo: " +
            (errorInsert.code || "sin código")
        );

        return;
      }

      if (data) {
        setColaboraciones((actuales) => [
          data,
          ...actuales,
        ]);
      }

      limpiarFormulario();
      setMostrarFormulario(false);

      alert(
        "Colaboración añadida correctamente."
      );
    } catch (error) {
      console.error(
        "ERROR GENERAL:",
        error
      );

      alert(
        "Ha ocurrido un error:\n\n" +
          (error?.message || "Error desconocido")
      );
    } finally {
      setGuardando(false);
    }
  }

  async function eliminarColaboracion(colaboracion) {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar "${colaboracion.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      // Primero eliminamos el registro
      const { error } = await supabase
        .from("collaborations")
        .delete()
        .eq("id", colaboracion.id);

      if (error) {
        console.error(
          "ERROR ELIMINANDO:",
          error
        );

        alert(
          "No se pudo eliminar:\n\n" +
            error.message
        );

        return;
      }

      // Después intentamos eliminar el logo
      if (colaboracion.logo_url) {
        const partes = colaboracion.logo_url.split(
          "/collaboration-logos/"
        );

        if (partes.length > 1) {
          const rutaLogo = partes[1];

          const { error: errorStorage } =
            await supabase.storage
              .from("collaboration-logos")
              .remove([rutaLogo]);

          if (errorStorage) {
            console.error(
              "Error eliminando logo:",
              errorStorage
            );
          }
        }
      }

      setColaboraciones((actuales) =>
        actuales.filter(
          (item) =>
            item.id !== colaboracion.id
        )
      );

      alert(
        "Colaboración eliminada correctamente."
      );
    } catch (error) {
      console.error(
        "ERROR GENERAL:",
        error
      );

      alert(
        "Ha ocurrido un error:\n\n" +
          (error?.message || "Error desconocido")
      );
    }
  }

  async function cambiarEstado(colaboracion) {
    const nuevoEstado = !colaboracion.activa;

    const { data, error } = await supabase
      .from("collaborations")
      .update({
        activa: nuevoEstado,
      })
      .eq("id", colaboracion.id)
      .select()
      .single();

    if (error) {
      console.error(
        "ERROR CAMBIANDO ESTADO:",
        error
      );

      alert(
        "No se pudo cambiar el estado:\n\n" +
          error.message
      );

      return;
    }

    setColaboraciones((actuales) =>
      actuales.map((item) =>
        item.id === colaboracion.id
          ? data
          : item
      )
    );
  }

  if (cargando) {
    return (
      <main
        style={{
          padding: "40px",
        }}
      >
        <p>Comprobando acceso...</p>
      </main>
    );
  }

  return (
    <main className="contenedor">
      <div className="cabecera">
        <div>
          <h1>🤝 Colaboraciones</h1>

          <p>
            Gestiona las empresas y colaboradores
            de la academia.
          </p>
        </div>

        <button
          className="boton-volver"
          onClick={() =>
            router.push("/admin")
          }
        >
          ← Volver al panel
        </button>
      </div>

      <button
        className="boton-anadir"
        onClick={() => {
          limpiarFormulario();

          setMostrarFormulario(
            !mostrarFormulario
          );
        }}
      >
        {mostrarFormulario
          ? "✕ Cerrar formulario"
          : "➕ Añadir colaboración"}
      </button>

      <button
        className="boton-crm"
        onClick={() => router.push("/admin/colaboraciones/crm")}
      >
        📋 Abrir CRM de entidades
      </button>

      {mostrarFormulario && (
        <form
          className="formulario"
          onSubmit={guardarColaboracion}
        >
          <h2>Nueva colaboración</h2>

          <div className="campo">
            <label htmlFor="nombre">
              Nombre de la colaboración
            </label>

            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(event) =>
                setNombre(
                  event.target.value
                )
              }
              placeholder="Ej. Academia XYZ"
            />
          </div>

          <div className="campo">
            <label htmlFor="logo">
              Logo
            </label>

            <input
              id="logo"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={seleccionarLogo}
            />
          </div>

          {logoPreview && (
            <div className="preview">
              <p>Vista previa:</p>

              <img
                src={logoPreview}
                alt="Vista previa del logo"
              />
            </div>
          )}

          <button
            type="submit"
            className="boton-guardar"
            disabled={guardando}
          >
            {guardando
              ? "Guardando..."
              : "💾 Guardar colaboración"}
          </button>
        </form>
      )}

      <section className="lista">
        <h2>
          Colaboraciones existentes
        </h2>

        {colaboraciones.length === 0 ? (
          <div className="vacio">
            <p>
              Todavía no tienes ninguna
              colaboración.
            </p>

            <p>
              Pulsa "Añadir colaboración"
              para crear la primera.
            </p>
          </div>
        ) : (
          <div className="grid">
            {colaboraciones.map(
              (colaboracion) => (
                <article
                  className="tarjeta"
                  key={colaboracion.id}
                >
                  <div className="logo-contenedor">
                    {colaboracion.logo_url ? (
                      <img
                        src={
                          colaboracion.logo_url
                        }
                        alt={`Logo de ${colaboracion.nombre}`}
                      />
                    ) : (
                      <span>
                        Sin logo
                      </span>
                    )}
                  </div>

                  <h3>
                    {colaboracion.nombre}
                  </h3>

                  <p
                    className={
                      colaboracion.activa
                        ? "estado activa"
                        : "estado inactiva"
                    }
                  >
                    {colaboracion.activa
                      ? "● Activa"
                      : "● Inactiva"}
                  </p>

                  <div className="acciones">
                    <button
                      onClick={() =>
                        cambiarEstado(
                          colaboracion
                        )
                      }
                    >
                      {colaboracion.activa
                        ? "Desactivar"
                        : "Activar"}
                    </button>

                    <button
                      className="eliminar"
                      onClick={() =>
                        eliminarColaboracion(
                          colaboracion
                        )
                      }
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>

      <style jsx>{`
        .contenedor {
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cabecera {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        h1 {
          margin: 0 0 8px;
        }

        .cabecera p {
          margin: 0;
          color: #666;
        }

        button {
          border: none;
          border-radius: 8px;
          padding: 11px 16px;
          cursor: pointer;
          font-size: 14px;
        }

        .boton-volver {
          background: #eee;
          color: #333;
        }

        .boton-anadir {
          background: #333;
          color: white;
          margin-bottom: 25px;
        }

        .boton-crm {
          background: #28664d;
          color: white;
          margin: 0 0 25px 10px;
        }

        .boton-crm:hover {
          background: #1f503b;
        }

        .formulario {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 35px;
          background: #fafafa;
        }

        .formulario h2 {
          margin-top: 0;
        }

        .campo {
          margin-bottom: 20px;
        }

        .campo label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .campo input[type="text"] {
          width: 100%;
          max-width: 500px;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .campo input[type="file"] {
          display: block;
          margin-top: 8px;
        }

        .preview {
          margin: 20px 0;
        }

        .preview p {
          font-weight: 600;
        }

        .preview img {
          width: 180px;
          height: 120px;
          object-fit: contain;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          background: white;
        }

        .boton-guardar {
          background: #333;
          color: white;
        }

        .boton-guardar:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .lista h2 {
          margin-bottom: 20px;
        }

        .vacio {
          border: 1px dashed #ccc;
          border-radius: 10px;
          padding: 30px;
          text-align: center;
          color: #666;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(250px, 1fr)
          );
          gap: 20px;
        }

        .tarjeta {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          background: white;
        }

        .logo-contenedor {
          width: 100%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f7f7f7;
          border-radius: 8px;
          margin-bottom: 15px;
          overflow: hidden;
        }

        .logo-contenedor img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 15px;
          box-sizing: border-box;
        }

        .logo-contenedor span {
          color: #999;
        }

        .tarjeta h3 {
          margin: 10px 0;
          font-size: 20px;
        }

        .estado {
          font-size: 14px;
          font-weight: 600;
        }

        .activa {
          color: green;
        }

        .inactiva {
          color: #999;
        }

        .acciones {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .acciones button {
          background: #eee;
          color: #333;
        }

        .acciones .eliminar {
          background: #d32f2f;
          color: white;
        }

        @media (max-width: 700px) {
          .contenedor {
            padding: 20px;
          }

          .cabecera {
            flex-direction: column;
            align-items: flex-start;
          }

          .boton-volver {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}