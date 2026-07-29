export default function Alumno() {
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>🎓 Área del alumno</h1>

      <p>¡Bienvenido a tu área privada!</p>

      <hr style={{ margin: "30px 0" }} />

      <section>
        <h2>📚 Mis cursos</h2>
        <ul>
          <li>Matemáticas</li>
          <li>Química</li>
          <li>Física</li>
        </ul>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>📄 Material disponible</h2>
        <ul>
          <li>Apuntes en PDF</li>
          <li>Ejercicios</li>
          <li>Exámenes resueltos</li>
        </ul>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>🎥 Clases online</h2>
        <p>Próximamente podrás acceder a las grabaciones de las clases.</p>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>📅 Próximas clases</h2>
        <p>No tienes clases programadas.</p>
      </section>
    </main>
  );
}