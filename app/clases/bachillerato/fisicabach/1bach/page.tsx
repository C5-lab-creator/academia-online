import Link from "next/link"; 
import ContactForm from "./contact";
 export default function Bachillerato() {
  return (
    <main>
      <h1>🎓 Fisica</h1>
<div className="cursos-grid">
      <h2>¿Qué ofrecemos?</h2>
       <p>Clases particulares de fisica para alumnos de 1º de bachillerato</p>
       <p>Refuerzo escolar durante todo el año</p>
      
      <h2>Modalidades</h2>
        <ul>
          <li>Clases individuales</li>
          <li>Grupos reducidos</li>
          <li>Intensivos</li>
        </ul>

        <Link href="/reservas?servicio=fisica1">
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