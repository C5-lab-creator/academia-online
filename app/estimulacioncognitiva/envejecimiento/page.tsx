import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contactForm";
export const metadata = {
  title: "Envejecimiento, Demencias y Apoyo Familiar | Mente Abierta",
  description:
    "Apoyo a personas mayores y familias ante el envejecimiento y las demencias, con estrategias para favorecer la autonomía, mantener capacidades y facilitar la vida diaria.",
};
export default function Envejecimiento() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                Envejecimiento Normal y Patológico
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Acompañamos a las personas mayores para mantener y potenciar sus
                capacidades cognitivas, funcionales y emocionales, favoreciendo
                la autonomía, la participación en la vida diaria y una mejor
                calidad de vida.
              </p>

              <Link href="/reservas?servicio=estimulacioncognitiva">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una valoración
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/envejecimiento.jpeg"
                alt="Envejecimiento activo"
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

            <div className="text-5xl mb-4">🧠</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Estimulación Cognitiva
            </h3>

            <p className="text-gray-700 leading-7">
              Programas personalizados para mantener y mejorar la memoria, la
              atención, el lenguaje, las funciones ejecutivas y la orientación.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🧑‍🦯</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Autonomía y Vida Diaria
            </h3>

            <p className="text-gray-700 leading-7">
              Intervención para mantener la independencia en las actividades de
              la vida diaria y retrasar el deterioro funcional.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">👨‍👩‍👧</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Asesoramiento Familiar
            </h3>

            <p className="text-gray-700 leading-7">
              Orientación y apoyo a familiares y cuidadores para afrontar el día
              a día con mayor seguridad y confianza.
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
              <li>✅ Objetivos personalizados.</li>
              <li>✅ Intervención basada en la evidencia.</li>
              <li>✅ Seguimiento continuo.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Estimulación cognitiva.</li>
              <li>✅ Entrenamiento funcional.</li>
              <li>✅ Promoción de la autonomía.</li>
              <li>✅ Apoyo a familias y cuidadores.</li>
            </ul>

          </div>

        </div>

        {/* PATOLOGÍAS */}

        <div className="bg-blue-900 text-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            ¿En qué intervenimos?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-lg">

            <p>✔ Envejecimiento saludable.</p>
            <p>✔ Deterioro cognitivo leve.</p>
            <p>✔ Enfermedad de Alzheimer.</p>
            <p>✔ Otras demencias.</p>
            <p>✔ Enfermedad de Parkinson.</p>
            <p>✔ Daño cerebral adquirido.</p>
            <p>✔ Esclerosis múltiple.</p>
            <p>✔ Otras enfermedades neurológicas.</p>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-14">

          <Link href="/reservas?servicio=estimulacioncognitiva">

            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              Reservar una valoración
            </button>

          </Link>

        </div>

        {/* CONTACTO */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Necesitas más información?
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si deseas conocer cómo podemos ayudarte o necesitas orientación
            sobre nuestros programas de envejecimiento activo y atención al
            deterioro cognitivo, estaremos encantados de atenderte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}