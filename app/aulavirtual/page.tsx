"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Loginalumno() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function iniciarSesion() {
    console.log("========== INICIANDO LOGIN ==========");

    // ==========================================
    // 1. INTENTAR INICIAR SESIÓN
    // ==========================================

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // ==========================================
    // 2. COMPROBAR ERROR DE LOGIN
    // ==========================================

    if (error) {
      console.error("ERROR LOGIN:", error);
      alert(error.message);
      return;
    }

    console.log("USER DEVUELTO POR LOGIN:", data.user);
    console.log("SESSION DEVUELTA POR LOGIN:", data.session);

    // ==========================================
    // 3. COMPROBAR GET USER
    // ==========================================

    const {
      data: { user: usuarioActual },
      error: errorUsuario,
    } = await supabase.auth.getUser();

    console.log("GET USER:", usuarioActual);
    console.log("ERROR GET USER:", errorUsuario);

    // ==========================================
    // 4. COMPROBAR GET SESSION
    // ==========================================

    const {
      data: { session: sesionActual },
      error: errorSesion,
    } = await supabase.auth.getSession();

    console.log("GET SESSION:", sesionActual);
    console.log("ERROR GET SESSION:", errorSesion);

    // ==========================================
    // 5. COMPROBAR LOCAL STORAGE
    // ==========================================

    const clavesSupabase = Object.keys(localStorage).filter((key) =>
      key.startsWith("sb-")
    );

    console.log(
      "LOCAL STORAGE - CLAVES SUPABASE:",
      clavesSupabase
    );

    console.log("====================================");

    // ==========================================
    // 6. COMPROBAR QUE HAY USUARIO Y SESIÓN
    // ==========================================

    if (!usuarioActual || !sesionActual) {
      alert(
        "El login parece correcto, pero no se ha podido recuperar la sesión."
      );
      return;
    }

    // ==========================================
    // 7. LOGIN CORRECTO
    // ==========================================

    alert("¡Login correcto!");

    router.push("/aulavirtual/alumno");
  }

  return (
    <main
      style={{
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h1>Acceso de alumnos</h1>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={iniciarSesion}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Entrar
      </button>
    </main>
  );
}