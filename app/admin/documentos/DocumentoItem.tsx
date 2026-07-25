"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Documento = {
  name: string;
  metadata?: {
    size?: number;
  };
};

type Props = {
  carpeta: string;
  documento: Documento;
  onDelete: (carpeta: string, nombre: string) => void;
};

export default function DocumentoItem({
  carpeta,
  documento,
  onDelete,
}: Props) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function cargarUrl() {
      const { data, error } = await supabase.storage
        .from("documentos")
        .createSignedUrl(
          `${carpeta}/${documento.name}`,
          3600 // válida durante 1 hora
        );

      if (!error && data) {
        setUrl(data.signedUrl);
      }
    }

    cargarUrl();
  }, [carpeta, documento.name]);

  function formatearTamano(bytes?: number) {
    if (!bytes) return "";

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        padding: "8px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <strong>📄 {documento.name}</strong>

        {documento.metadata?.size && (
          <div
            style={{
              fontSize: "12px",
              color: "#777",
            }}
          >
            {formatearTamano(documento.metadata.size)}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {url && (
          <>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              👁️ Ver
            </a>

            <a href={url} download>
              ⬇️ Descargar
            </a>
          </>
        )}

        <button
          onClick={() =>
            onDelete(carpeta, documento.name)
          }
        >
          🗑️ Eliminar
        </button>
      </div>
    </li>
  );
}