import ContactForm from "./contactForm";

export default function Contacto() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Contacto</h1>

      <div className="curso">
        <h2>academia.menteabierta@gmail.com</h2>
        <p></p>
      </div>

      <div className="curso">
        <h2>Redes sociales</h2>
        <p>Facebook</p>
        <p>Instagram</p>
      </div>

      <section id="contacto" style={{ marginTop: "40px" }}>
        <h2>Envíanos un mensaje</h2>
        <ContactForm />
      </section>
    </main>
  );
}