import ContactForm from "./contactForm";

export default function Cursos() {
  return (
    <main style={{ padding: "40px" }}>
      <div className="curso">
        <h1>Bienestar y prevención. Escuela de Espalda</h1>

        <p>
          Curso completo para aprender a cuidar tu espalda, prevenir el dolor y
          mejorar tu calidad de vida mediante ejercicios, educación postural y
          hábitos saludables.
        </p>

        <h2>¿Qué incluye?</h2>

        <ul>
          <li>Anatomía básica de la columna vertebral.</li>
          <li>Ejercicios para fortalecer la espalda y el core.</li>
          <li>Estiramientos para mejorar la movilidad.</li>
          <li>Higiene postural en casa y en el trabajo.</li>
          <li>Cómo prevenir lesiones y recaídas.</li>
          <li>Consejos para reducir el dolor en el día a día.</li>
        </ul>

        <section id="contacto" style={{ marginTop: "40px" }}>
          <h2>Envíanos un mensaje</h2>

          <p>
            ¿Quieres más información sobre el curso o realizar tu reserva?
            Estaremos encantados de ayudarte.
          </p>

          <ContactForm />
        </section>
      </div>
    </main>
  );
}