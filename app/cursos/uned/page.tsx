"use client";

import ContactForm from "./contactForm";

export default function Cursos() {

  const comprarCurso = async (curso:any) => {
    const respuesta = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ curso }),
    });

    const data = await respuesta.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Cursos grados universitarios UNED
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Formación online completa para preparar las asignaturas de los grados de quimica y farmacia ofertados en la UNED
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CURSO QUIMICA */}

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📚 Grado en quimica
          </h2>

          <p className="text-gray-700 mb-4">
            Curso completo para preparar las asignaturas del grado en quimica de la UNED
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            Contenido del curso
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Todas las asignaturas del grado por cuatrimestres</li>
            <li>Resolución de exámenes oficiales.</li>
            <li>Tutorias y seguimiento individualizado</li>
            <li>Acceso ilimitado.</li>
            <li>Material descargable.</li>
          </ul>

          <button
            onClick={() => comprarCurso("mayores25-troncales")}
            className="boton-reservar"
          >
            💳 Comprar curso
          </button>

        </div>

        {/* CURSO FARMACIA */}

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 Grado en farmacia
          </h2>

          <p className="text-gray-700 mb-4">
            Curso completa para preparar las asignaturas del grado en farmacia de la UNED
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            Contenido del curso
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Todas las asignaturas del grado por cuatrimestres</li>
            <li>Resolución de exámenes oficiales.</li>
            <li>Tutorias y seguimiento individualizado</li>
            <li>Acceso ilimitado.</li>
            <li>Material descargable.</li>
          </ul>

          <button
            onClick={() => comprarCurso("mayores25-especificas")}
            className="boton-reservar"
          >
            💳 Comprar curso
          </button>

        </div>

      </div>

      <section className="mt-16">

        <h2 className="text-3xl font-bold text-blue-900 mb-3">
          ¿Necesitas más información?
        </h2>

        <p className="text-gray-700 mb-6">
          Si tienes cualquier duda sobre los cursos, el proceso de compra o el
          acceso al aula virtual, envíanos un mensaje y te responderemos lo
          antes posible.
        </p>

        <div className="curso">
          <ContactForm />
        </div>

      </section>

    </main>
  );
}