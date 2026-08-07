export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.academia-menteabierta.com/#organization",

        name: "Academia Mente Abierta",

        url: "https://www.academia-menteabierta.com",

        logo: "https://www.academia-menteabierta.com/logo.png",

        image: "https://www.academia-menteabierta.com/logo.png",

        description:
          "Academia online especializada en química, matemáticas y preparación para Selectividad. Terapia ocupacional, estimulación cognitiva, rehabilitación física, demencias y trastorno del espectro autista.",

        areaServed: {
          "@type": "Country",
          name: "España",
        },

        availableLanguage: ["es"],

        sameAs: [
          "https://www.instagram.com/academiamenteabierta",
          "https://https://www.facebook.com/share/19FLXjw8KT/?mibextid=wwXIfr"
        ],

        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Química"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Matemáticas"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Preparación para Selectividad"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Terapia Ocupacional"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Deterioro cognitivo y demencias"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Autismo"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Rehabilitación física"
              }
            }
          ]
        },

        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://www.academia-menteabierta.com",
          availableLanguage: "es",
          serviceLocation: {
            "@type": "Country",
            name: "España"
          }
        }
      },

      {
        "@type": "WebSite",
        "@id": "https://www.academia-menteabierta.com/#website",

        url: "https://www.academia-menteabierta.com",

        name: "Academia Mente Abierta",

        publisher: {
          "@id": "https://www.academia-menteabierta.com/#organization"
        },

        inLanguage: "es"
      }
    ]
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