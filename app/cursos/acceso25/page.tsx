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
        Cursos para Acceso a la Universidad para Mayores de 25 años
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Formación online completa para preparar con éxito las pruebas de acceso
        mediante vídeos grabados, ejercicios resueltos, exámenes oficiales y
        materiales disponibles las 24 horas.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CURSO TRONCALES */}

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📚 Curso de asignaturas troncales
          </h2>

          <p className="text-gray-700 mb-4">
            Curso completo para preparar las asignaturas troncales de las
            pruebas de acceso para mayores de 25 años.
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            Contenido del curso
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>10 horas de Lengua.</li>
            <li>10 horas de Inglés.</li>
            <li>10 horas de Comentario de Texto.</li>
            <li>Resolución de exámenes oficiales.</li>
            <li>Acceso ilimitado a todos los contenidos durante 6 meses.</li>
            <li>Material descargable.</li>
          </ul>

          <button
            onClick={() => comprarCurso("mayores25-troncales")}
            className="boton-reservar"
          >
            💳 Comprar curso
          </button>

        </div>

        {/* CURSO ESPECÍFICAS */}

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 Curso de asignaturas específicas
          </h2>

          <p className="text-gray-700 mb-4">
            Formación completa para preparar las asignaturas específicas de las
            pruebas de acceso.
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            Contenido del curso
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>10 horas de Química.</li>
            <li>10 horas de Matemáticas.</li>
            <li>10 horas de Biología.</li>
            <li>Resolución de exámenes oficiales.</li>
            <li>Acceso ilimitado a todos los contenidos durante 6 meses.</li>
            <li>Material descargable.</li>
          </ul>

          <button
            onClick={() => comprarCurso("mayores25-especificas")}
            className="boton-reservar"
          >
            💳 Comprar curso
          </button>

        </div>

        {/* CURSO QUÍMICA */}

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ⚗️ Intensivo de Química
          </h2>

          <p className="text-gray-700 mb-4">
            Curso intensivo para preparar la asignatura de Química de las
            pruebas de acceso para mayores de 25 años.
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            Contenido del curso
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Vídeos explicativos.</li>
            <li>Ejercicios resueltos.</li>
            <li>Exámenes oficiales.</li>
            <li>Tutorías.</li>
            <li>Acceso ilimitado a todos los contenidos durante 6 meses.</li>
            <li>Material descargable.</li>
          </ul>

          <button
            onClick={() => comprarCurso("quimica-mayores25")}
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