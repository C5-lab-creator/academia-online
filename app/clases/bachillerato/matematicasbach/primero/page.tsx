import Link from "next/link";
import ContactForm from "./contact";
 export default function Bachillerato() {
  return (
    <main>
      <h1>🎓 Matematicas</h1>
<div className="cursos-grid">
      <h2>¿Qué ofrecemos?</h2>
       <p>Clases particulares de Matematicas y durante todo el año.</p>
       <p>Desarrollo de esquemas y  conceptos esenciales</p>
       <p>Resolucion de ejercicios y modelos de exámenes para obtener resultados exitosos.</p>

        <h2>Modalidades</h2>
        <ul>
          <li>Clases individuales</li>
          <li>Grupos reducidos</li>
          <li>Intensivos</li>
        </ul>

        <Link href="/reservas?servicio=matematicas1">
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