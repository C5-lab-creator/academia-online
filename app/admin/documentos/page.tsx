"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DocumentoItem from "./DocumentoItem";

const carpetas = [
  { nombre: "🎓 Bachillerato", ruta: "bachillerato" },
  { nombre: "🧪 Universidad", ruta: "universidad" },
  { nombre: "📖 Primaria y ESO", ruta: "primaria-eso" },
  { nombre: "🧩 Alumnos con necesidades educativas especiales", ruta: "nee" },
  { nombre: "🧠 Estimulación Cognitiva", ruta: "estimulacioncognitiva" },
];

export default function Documentos() {
  const [documentos, setDocumentos] = useState<Record<string, any[]>>({});
  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    async function comprobarUsuario() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // ==========================
      // CORREOS DE LOS ADMINISTRADORES
      // ==========================
      const admins = [
        "sheylaapariciosuarez@gmail.com",
        "eduardobadi93@gmail.com",
      ];

      if (user?.email && admins.includes(user.email)) {
        setEsAdmin(true);
      }

      setCargando(false);
    }

    comprobarUsuario();
  }, []);

  async function cargarDocumentos() {
    const resultado: Record<string, any[]> = {};

    for (const carpeta of carpetas) {
      const { data, error } = await supabase.storage
        .from("documentos")
        .list(carpeta.ruta, {
          sortBy: {
            column: "name",
            order: "asc",
          },
        });

      if (error) {
        console.error(error);
        resultado[carpeta.ruta] = [];
      } else {
        resultado[carpeta.ruta] = data || [];
      }
    }

    setDocumentos(resultado);
  }

  useEffect(() => {
    if (esAdmin) {
      cargarDocumentos();
    }
  }, [esAdmin]);

  async function subirDocumento(
    event: React.ChangeEvent<HTMLInputElement>,
    carpeta: string
  ) {
    const archivo = event.target.files?.[0];

    if (!archivo) return;

    const { error } = await supabase.storage
      .from("documentos")
      .upload(`${carpeta}/${archivo.name}`, archivo, {
        upsert: true,
      });

    if (error) {
      alert("❌ " + error.message);
      return;
    }

    alert("✅ Documento subido correctamente");

    cargarDocumentos();

    event.target.value = "";
  }

  async function eliminarDocumento(
    carpeta: string,
    nombre: string
  ) {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return;

    const { error } = await supabase.storage
      .from("documentos")
      .remove([`${carpeta}/${nombre}`]);

    if (error) {
      alert("❌ " + error.message);
      return;
    }

    alert("✅ Documento eliminado");

    cargarDocumentos();
  }

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!esAdmin) {
    return (
      <main>
        <h1>⛔ Acceso denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>📄 Gestor de documentos</h1>

      {carpetas.map((carpeta) => (
        <div className="tarjeta-admin" key={carpeta.ruta}>
          <h2>{carpeta.nombre}</h2>

          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={(e) => subirDocumento(e, carpeta.ruta)}
          />

          <h3>Documentos subidos</h3>

          {(documentos[carpeta.ruta] || []).length === 0 ? (
            <p>No hay documentos.</p>
          ) : (
            <ul>
              {(documentos[carpeta.ruta] || []).map((doc) => (
                <DocumentoItem
                  key={doc.name}
                  carpeta={carpeta.ruta}
                  documento={doc}
                  onDelete={eliminarDocumento}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </main>
  );
}