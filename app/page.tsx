import Link from "next/link";
import Image from "next/image";
import Header from "./components/header";

export default function Home() {
  return (
    <main>
      <div className="flex items-center gap-4 p-6">
  <Image
    src="/logo.png"
    alt="Logo Mente Abierta"
    width={80}
    height={80}
  />

  <div>
    <h1>Mente Abierta</h1>
    <p>Educación · Estimulación Cognitiva · Bienestar</p>
  </div>
</div>
      <h3>ACADEMIA MENTE ABIERTA. “Especialistas en Selectividad, Ciencias y desarrollo cognitivo”</h3>
       <p>En Mente Abierta creemos que cada persona aprende, crece y desarrolla su potencial de una manera única. Por ello, hemos creado un espacio online que integra educación, estimulación cognitiva y bienestar, ofreciendo servicios especializados y adaptados a cada etapa de la vida.</p>
       <p>Nuestro propósito es acompañar a estudiantes, familias y personas de todas las edades mediante una atención cercana, profesional y de calidad, favoreciendo el aprendizaje, la autonomía y el desarrollo personal.</p>
       <p>“Un mismo espacio donde la excelencia académica, la intervención especializada y el acompañamiento personalizado se unen para ayudarte a alcanzar tus objetivos.”</p>


        <div className="cursos-grid">
          <Link href="/academia">
            <h3>ACADEMIA</h3>
            <p>
              Especialistas en Selectividad (PAU), Química y Matemáticas.
            </p>
          </Link>
        </div>

        <div className="cursos-grid">
          <Link href="/estimulacioncognitiva">
          <h3>ESTIMULACION COGNITIVA</h3>
          <p>
            Entrenamos la mente para potenciar la autonomía, el aprendizaje y la calidad de vida.
          </p>
          </Link>
      </div>

   
        <h3>¿Por qué elegir Mente Abierta?</h3>

        <p>✔ Especialistas en Selectividad (PAU), Química y Ciencias.</p>
        <p>✔ Programas de estimulación cognitiva para niños, adultos y personas mayores.</p>
        <p>✔ Atención al alumnado con necesidades educativas especiales.</p>
        <p>✔ Asesoramiento y acompañamiento a familias.</p>
        <p>✔ Clases y sesiones completamente online.</p>
        <p>✔ Intervenciones personalizadas.</p>
        <p>✔ Profesionales especializados.</p>
        <p>✔ Atención cercana, flexible y adaptada a cada persona.</p>
    

   </main>);
}
