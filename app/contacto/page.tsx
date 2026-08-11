import ContactForm from "./contactForm";
import Image from "next/image";
export const metadata = {
  title: "Mente Abierta | Academia y Terapia Ocupacional",
  description:
    "Academia especializada en química, matemáticas y selectividad. Terapia ocupacional y estimulación cognitiva. Trastorno del espectro autista, integración sensorial, rehabilitación física y asesoramiento a familias. Cursos, clases y atención personalizada.",
};
export default function Contacto() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">


      <h1 className="text-5xl font-bold text-center text-blue-900 mb-4">
        Contacto
      </h1>


      <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-12">
        Estaremos encantados de ayudarte. Si necesitas información sobre
        nuestros cursos, reservas o servicios, puedes contactar con nosotros.
      </p>




      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">



        <div className="curso bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">


          <div className="text-5xl mb-4">
            📧
          </div>


          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Correo electrónico
          </h2>


          <p className="text-gray-700 mb-2">
            academia.menteabierta@gmail.com
          </p>


          <p className="text-gray-700">
            info@academia-menteabierta.com
          </p>


        </div>





        <div className="curso bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">


          <div className="text-5xl mb-4">
            📱
          </div>


          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Redes sociales
          </h2>


          <p className="text-gray-700 mb-2">
            Facebook
          </p>


          <p className="text-gray-700">
            Instagram
          </p>


        </div>





        <div className="curso bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">


          <div className="text-5xl mb-4">
            💬
          </div>


          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Teléfono y WhatsApp
          </h2>


          <p className="text-gray-700">
            604 33 26 08 
          </p>


        </div>



      </div>





      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">



        <div className="flex justify-center">


          <div className="curso bg-white rounded-3xl shadow-xl border border-gray-100 p-8">


            <Image
              src="/logo.png"
              alt="Mente Abierta"
              width={400}
              height={400}
              className="rounded-2xl w-64 sm:w-80 md:w-[350px] h-auto"
            />


          </div>


        </div>





        <section>


          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Envíanos un mensaje
          </h2>


          <p className="text-gray-700 mb-6">
            Escríbenos y nos pondremos en contacto contigo lo antes posible.
          </p>




          <div className="curso bg-white rounded-3xl shadow-xl border border-gray-100">


            <ContactForm />


          </div>



        </section>



      </div>



    </main>
  );
}