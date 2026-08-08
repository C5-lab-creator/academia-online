import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contactForm";
export const metadata = {
  title: "Mente Abierta | Academia y Terapia Ocupacional",
  description:
    "Centro de Terapia Ocupacional. Atención indivualizada y asesorameinto a familias y cuidadores",
};
export default function Neurodesarrollo() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                Trastornos del Neurodesarrollo
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
                Ofrecemos programas de intervención personalizados dirigidos a
                niños, adolescentes y adultos con trastornos del
                neurodesarrollo, favoreciendo el aprendizaje, la autonomía y la
                participación en todos los ámbitos de la vida.
              </p>

              <Link href="/reservas?servicio=neurodesarrollo">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Reservar una valoración
                </button>
              </Link>

            </div>

            <div className="w-full md:w-96">

              <Image
                src="/neurodesarrollo.jpeg"
                alt="Trastornos del neurodesarrollo"
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

            <div className="text-5xl mb-4">🎓</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Apoyo educativo
            </h3>

            <p className="text-gray-700 leading-7">
              Intervención individualizada para favorecer el aprendizaje y el
              desarrollo de competencias académicas y funcionales.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">🧩</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Adaptaciones personalizadas
            </h3>

            <p className="text-gray-700 leading-7">
              Diseño de apoyos visuales, estrategias de aprendizaje,
              adaptaciones metodológicas y recursos específicos para cada
              persona.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">👨‍👩‍👧</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Asesoramiento familiar
            </h3>

            <p className="text-gray-700 leading-7">
              Orientación a familias para favorecer la continuidad del trabajo
              en casa y potenciar el desarrollo integral.
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
              <li>✅ Valoración inicial.</li>
              <li>✅ Objetivos individualizados.</li>
              <li>✅ Intervención personalizada.</li>
              <li>✅ Seguimiento continuo.</li>
            </ul>

            <ul className="space-y-4">
              <li>✅ Coordinación con la familia.</li>
              <li>✅ Adaptaciones específicas.</li>
              <li>✅ Recursos visuales y didácticos.</li>
              <li>✅ Evaluación del progreso.</li>
            </ul>

          </div>

        </div>

        {/* ÁREAS DE INTERVENCIÓN */}

        <div className="bg-blue-900 text-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            ¿En qué podemos ayudarte?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-lg">

            <p>✔ Trastorno del Espectro Autista (TEA).</p>
            <p>✔ TDAH.</p>
            <p>✔ Dificultades específicas de aprendizaje.</p>
            <p>✔ Adaptaciones visuales y sensoriales.</p>
            <p>✔ Estrategias para el aprendizaje.</p>
            <p>✔ Organización y gestión del tiempo.</p>
            <p>✔ Planificación y seguimiento de tareas.</p>
            <p>✔ Recursos didácticos y apoyos visuales.</p>
            <p>✔ Comprensión de instrucciones y comunicación.</p>
            <p>✔ Preparación de exámenes y evaluaciones.</p>
            <p>✔ Asesoramiento personalizado.</p>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-14">

          <Link href="/reservas?servicio=neurodesarrollo">

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
            Si tienes dudas sobre nuestros programas de intervención en
            trastornos del neurodesarrollo o deseas recibir una valoración
            personalizada, estaremos encantados de ayudarte.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}