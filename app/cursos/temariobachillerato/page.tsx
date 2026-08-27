"use client";

import ContactForm from "./contactForm";

export default function Cursos() {

  const comprarCurso = async (curso: string) => {
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
        Cursos completos de 2º de Bachillerato
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Aprende a tu ritmo con nuestros cursos completos de Matemáticas y
        Química de 2º de Bachillerato. Accede a todas las clases grabadas,
        ejercicios resueltos, materiales y tutorías para preparar con éxito el
        curso y la PAU.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📐 Curso completo de Matemáticas
          </h2>

          <p className="text-gray-700 mb-4">
            Curso completo de Matemáticas de 2º de Bachillerato organizado por
            temas para preparar el curso y la PAU.
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            ¿Qué incluye?
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>30 horas de clases grabadas.</li>
            <li>Explicación completa de todos los temas.</li>
            <li>Ejercicios resueltos paso a paso.</li>
            <li>Material descargable.</li>
            <li>3 horas de tutorías individuales online.</li>
            <li>Acceso ilimitado al curso durante 6 meses.</li>
            <li>Ver programa y precios →</li>
          </ul>

          <button
            onClick={() => comprarCurso("matematicas-bachillerato")}
            className="boton-reservar"
          >
            💳 Comprar curso
          </button>

        </div>

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ⚗️ Curso completo de Química
          </h2>

          <p className="text-gray-700 mb-4">
            Curso completo de Química de 2º de Bachillerato organizado por
            temas para dominar toda la asignatura y preparar la PAU.
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            ¿Qué incluye?
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>30 horas de clases grabadas.</li>
            <li>Explicación de todos los temas.</li>
            <li>Ejercicios y problemas resueltos.</li>
            <li>Material descargable.</li>
            <li>3 horas de tutorías individuales online.</li>
            <li>Acceso ilimitado al curso durante 6 meses.</li>
            <li>Ver programa y precios →</li>
          </ul>

          <button
            onClick={() => comprarCurso("quimica-bachillerato")}
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
          Si tienes cualquier duda sobre el contenido de los cursos, el proceso
          de compra o el acceso al aula virtual, envíanos un mensaje y te
          responderemos lo antes posible.
        </p>

        <div className="curso">
          <ContactForm />
        </div>

      </section>

    </main>
  );
}