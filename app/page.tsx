import Link from "next/link";
import Image from "next/image";
import Header from "./components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex items-center gap-4 p-6">


</div>
      <div className="flex items-center justify-between gap-10 px-6 py-8">
  {/* Texto */}
  <div className="flex-1">
    <h3 className="text-3xl font-bold mb-4">
      ACADEMIA MENTE ABIERTA. Especialistas en Selectividad, Ciencias y desarrollo cognitivo
    </h3>

    <p className="mb-4">
      En Mente Abierta creemos que cada persona aprende, crece y desarrolla
      su potencial de una manera única. Por ello, hemos creado un espacio
      online que integra educación, estimulación cognitiva y bienestar,
      ofreciendo servicios especializados y adaptados a cada etapa de la vida.
    </p>

    <p className="mb-4">
      Nuestro propósito es acompañar a estudiantes, familias y personas de
      todas las edades mediante una atención cercana, profesional y de calidad,
      favoreciendo el aprendizaje, la autonomía y el desarrollo personal.
    </p>

    <p>
      <strong>
        "Un mismo espacio donde la excelencia académica, la intervención
        especializada y el acompañamiento personalizado se unen para ayudarte a
        alcanzar tus objetivos."
      </strong>
    </p>
  </div>

  {/* Imagen */}
  <div className="flex-shrink-0">
    <Image
      src="/logo.png"
      alt="Mente Abierta"
      width={500}
      height={500}
      className="rounded-xl shadow-lg"
    />
  </div>
</div>

        <div className="cursos-grid">

  <Link href="/academia" className="curso">
    <h3>ACADEMIA</h3>
    <p>
      Especialistas en Selectividad (PAU), Química y Matemáticas.
    </p>
  </Link>

  <Link href="/estimulacioncognitiva" className="curso">
    <h3>ESTIMULACIÓN COGNITIVA</h3>
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
