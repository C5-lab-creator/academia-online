import Link from "next/link";
import ContactForm from "./contactForm";
import Image from "next/image";

export default function Rehabilitacion() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                Rehabilitación Física y Promoción de la Autonomía
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Programas personalizados dirigidos a mejorar la movilidad,
                recuperar funciones, reducir el dolor y favorecer la autonomía
                en las actividades de la vida diaria mediante una intervención
                basada en la evidencia científica.
              </p>

              <Link href="/reservas?servicio=rehabilitacionfisica">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una valoración
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">
              <Image
                src="/rehabilitacion.jpeg"
                alt="Rehabilitación física"
                width={450}
                height={320}
                className="rounded-2xl shadow-lg object-cover w-full"
              />
            </div>

          </div>
        </div>

        {/* SERVICIOS */}

        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          ¿Qué ofrecemos?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-14">

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-5xl mb-4">🩺</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Valoración inicial
            </h3>

            <p className="text-gray-700 leading-7">
              Evaluación funcional completa para conocer tus capacidades,
              necesidades y objetivos, elaborando un plan de intervención
              totalmente personalizado.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🧠</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Intervención personalizada
            </h3>

            <p className="text-gray-700 leading-7">
              Tratamiento individualizado para personas con daño cerebral
              adquirido, enfermedad de Parkinson, esclerosis múltiple y otras
              patologías neurológicas.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">👨‍👩‍👧</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Acompañamiento familiar
            </h3>

            <p className="text-gray-700 leading-7">
              Asesoramiento y seguimiento para que las familias dispongan de
              herramientas que faciliten la continuidad del tratamiento en casa.
            </p>

          </div>

        </div>

        {/* METODOLOGÍA */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            ¿Cómo trabajamos?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700">

            <ul className="space-y-4">
              <li>✅ Valoración inicial individual.</li>
              <li>✅ Definición de objetivos personalizados.</li>
              <li>✅ Plan de intervención adaptado.</li>
              <li>✅ Seguimiento continuo.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Ejercicio terapéutico.</li>
              <li>✅ Entrenamiento funcional.</li>
              <li>✅ Promoción de la autonomía.</li>
              <li>✅ Asesoramiento a familias.</li>
            </ul>

          </div>

        </div>

        {/* PATOLOGÍAS */}

        <div className="bg-blue-900 text-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            Patologías en las que intervenimos
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-lg">

            <p>✔ Daño cerebral adquirido</p>
            <p>✔ Enfermedad de Parkinson</p>
            <p>✔ Esclerosis múltiple</p>
            <p>✔ Otras enfermedades neurológicas</p>

          </div>

        </div>

        {/* CTA */}

        <div className="text-center mb-14">

          <Link href="/reservas?servicio=rehabilitacionfisica">
            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              Reservar una valoración
            </button>
          </Link>

        </div>

        {/* CONTACTO */}

        <div
          id="contacto"
          className="bg-white rounded-3xl shadow-xl p-10"
        >

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Necesitas más información?
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si tienes cualquier duda sobre nuestros programas de rehabilitación
            física o deseas recibir asesoramiento personalizado, estaremos
            encantados de ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}
