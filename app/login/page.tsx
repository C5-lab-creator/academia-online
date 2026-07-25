"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function iniciarSesion() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  // Buscar el rol del usuario
  const { data: perfil, error: perfilError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

console.log("Usuario Auth:", data.user);
console.log("Perfil:", perfil);
console.log("Error perfil:", perfilError);
console.log(data.user.id);
  if (perfilError) {
    alert("No se encontró el perfil del usuario.");
    return;
  }

  if (perfil.role === "admin") {
    router.push("/admin");
  } else {
    router.push("/alumno");
  }
}

  return (
    <main>
      <h1>Acceso administrador</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={iniciarSesion}>
        Entrar
      </button>
    </main>
  );
}