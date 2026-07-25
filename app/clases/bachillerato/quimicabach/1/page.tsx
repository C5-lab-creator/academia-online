import Link from "next/link";
import ContactForm from "./contact";
export default function Bachillerato() {
  return (
    <main>
      <h1>🎓 Quimica</h1>
<div className="cursos-grid">
      <h2>¿Qué ofrecemos?</h2>
       <p>Clases particulares de Química y otras asignaturas científicas para estudiantes de Bachillerato.</p>
       <p>En las clases se desarollaran esquemas y  conceptos esenciales asi como resolucion de ejercicios y modelos de exámenes para obtener resultados exitosos.</p>

        <h2>Modalidades</h2>
        <ul>
          <li>Clases individuales</li>
          <li>Grupos reducidos</li>
          <li>Intensivos</li>
        </ul>

        <Link href="/reservas?servicio=quimica1">
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