import ContactForm from "./contactForm";
import Image from "next/image";

export default function Contacto() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Contacto</h1>

      <div className="curso">
        <h2>academia.menteabierta@gmail.com</h2>
      </div>

      <div className="curso">
        <h2>Redes sociales</h2>
        <p>Facebook</p>
        <p>Instagram</p>
      </div>

      <div className="contacto-contenido">
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="Mente Abierta"
            width={350}
            height={350}
            className="rounded-xl shadow-lg"
          />
        </div>

        <section id="contacto" className="formulario">
          <h2>Envíanos un mensaje</h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}