export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "MedicalBusiness"],

    name: "Academia Mente Abierta",

    url: "https://www.academia-menteabierta.com",

    logo: "https://www.academia-menteabierta.com/logo.png",

    image: "https://www.academia-menteabierta.com/logo.png",

    description:
      "Academia online especializada en química, matemáticas y preparación para Selectividad. Terapia ocupacional, estimulación cognitiva, rehabilitación física, demencias y trastorno del espectro autista.",

    sameAs: [
      "https://www.instagram.com/academiamenteabierta",
      "https://www.facebook.com/academiamenteabierta"
    ],

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+34 TU TELEFONO",
      contactType: "customer service",
      availableLanguage: ["es"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}