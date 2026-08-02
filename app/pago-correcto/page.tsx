export default function PagoCorrecto() {
  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "green" }}>✅ ¡Pago realizado correctamente!</h1>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Gracias por confiar en Academia Mente Abierta.
      </p>

      <p>
        En unos segundos tendrás acceso a tu curso.
      </p>

      <a
        href="/cursos"
        style={{
          display: "inline-block",
          marginTop: "30px",
          background: "#2563eb",
          color: "white",
          padding: "12px 25px",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        Volver a los cursos
      </a>
    </main>
  );
}