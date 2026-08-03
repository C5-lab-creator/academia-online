export default function PagoCancelado() {
  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "red" }}>❌ Pago cancelado</h1>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        No se ha realizado ningún cargo.
      </p>

      <p>
        Puedes volver a intentarlo cuando quieras.
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