import Link from "next/link";
import ContactForm from "./contactForm";
export default function Envejecimiento() {
  return (
    <main>
<h1>📖 ENVEJECIMIENTO NORMAL Y PATOLOGICO</h1>

<div className="cursos-grid">
  
<h2>¿Qué ofrecemos?</h2>
  <p>Estimulacion cognitiva y apoyo para la vida diaria para personas con deterioro cognitivo</p>
  <p>Asesoramiento a padres y familias</p>

<h2>Metodología</h2>
  <p>¿En que te ayudamos y como lo hacemos?</p>
  <p> Enfermedad de Alzheimer y otras demencias</p>
  <p>Enfermedad de Parkinson</p>
  <p>Daño cerebral adquirido</p>

          <Link href="/reservas?servicio=estimulacioncognitiva">
    <button className="boton-reservar">
      Reservar
    </button>
  </Link>
<section id="contacto" style={{ marginTop: "40px" }}>
                    <h2>Envíanos un mensaje</h2>
                     <p>..................Mas info y reservas...................</p> 
                    <ContactForm />
       </section>
     </div>
    </main>
  );
}

