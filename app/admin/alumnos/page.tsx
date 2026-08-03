"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Alumno = {
  id: string;
  nombre: string | null;
  email: string;
  role: string;
  classroom_url: string | null;
};

export default function AdminAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<Alumno | null>(null);
const [nombre, setNombre] = useState("");
const [classroom, setClassroom] = useState("");

  useEffect(() => {
    cargarAlumnos();
  }, []);
function editarAlumno(alumno: Alumno) {
  setAlumnoSeleccionado(alumno);
  setNombre(alumno.nombre || "");
  setClassroom(alumno.classroom_url || "");
}
async function cargarAlumnos() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  console.log("DATA:", data);
console.log(error);
console.log(error?.message);
console.log(error?.details);
console.log(error?.hint);
console.log(error?.code);

  if (!error && data) {
    setAlumnos(data);
  }
}
  async function guardarAlumno() {
  if (!alumnoSeleccionado) return;

console.log("Alumno seleccionado:", alumnoSeleccionado);
  const { data, error } = await supabase
  .from("profiles")
  .update({
    nombre,
    classroom_url: classroom,
  })
    .eq("id", alumnoSeleccionado.id)
    .select();

console.log("ID:", alumnoSeleccionado.id);
console.log("DATA:", data);
console.log("ERROR:", error);

if (error) {
  alert(error.message);
  return;
}

alert("Alumno actualizado correctamente");

  alert("Alumno actualizado");

  setAlumnoSeleccionado(null);
  cargarAlumnos();
}

  return (
    <main style={{ padding: 40 }}>
      <h1>👨‍🎓 Gestión de alumnos</h1>

      <table style={{ width: "100%", marginTop: 30 }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Classroom</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre || "-"}</td>
              <td>{alumno.email}</td>
              <td>
                {alumno.classroom_url ? (
                  <a
                    href={alumno.classroom_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir Classroom
                  </a>
                ) : (
                  "Sin asignar"
                )}
              </td>
              <td>
                <button onClick={() => editarAlumno(alumno)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {alumnoSeleccionado && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        background: "white",
        padding: 30,
        borderRadius: 10,
        width: 450,
      }}
    >
      <h2>Editar alumno</h2>

      <p>Nombre</p>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ width: "100%" }}
      />

      <br />
      <br />

      <p>Classroom</p>

      <input
        value={classroom}
        onChange={(e) => setClassroom(e.target.value)}
        style={{ width: "100%" }}
      />

      <br />
      <br />

      <button onClick={guardarAlumno}>
        Guardar
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={() => setAlumnoSeleccionado(null)}
      >
        Cancelar
      </button>
    </div>
  </div>
)}
    </main>
  );
}