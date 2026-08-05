import Link from "next/link";
import ContactForm from "./contactForm";
export default function Escuelaespalda() {
  return (
    <main>
      <h1>📖 ESCUELA DE ESPALDA</h1>
      <div className="cursos-grid">
       <h2>¿Qué ofrecemos?</h2>
         <p>Apoyo educativo para alumnado con necesidades educativas especiales</p>
         <p>Adaptaciones y apoyos personalizados</p>
         <p>Asesoramiento a padres y familias</p>
        
       <h2>Metodología</h2>
         <p>Valoracion incial</p>
         <p>Intervencion</p>
         <p>Asesoramiento y seguimiento posterior</p>

      <h2>¿En que te ayudamos y como lo hacemos?</h2>
          <p>Ergonomia en actividades de la vida diaria</p>
          <p>Educación postural</p>
          <p>Artritis y artrosis</p>
          <p>Postura y movilidad</p>
          <p>Disfunciones musculares</p>
  
  <Link href="/reservas">
    <button className="boton-reservar?servicio=neurodesarrollo">
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