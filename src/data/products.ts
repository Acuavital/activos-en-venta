export interface Media {
  src: string;
  alt: string;
  caption?: string;
}

export interface Product {
  id: string;
  slug: string;
  category: 'Campo' | 'Transporte' | 'Energía' | 'Inmuebles';
  title: string;
  shortTitle: string;
  eyebrow: string;
  price: number;
  priceLabel: string;
  priceSuffix?: string;
  location: string;
  tagline: string;
  campaignHeading?: string;
  summary: string;
  description: string[];
  highlights: { value: string; label: string }[];
  specs: { label: string; value: string }[];
  images: Media[];
  conditions: string[];
  sections: { title: string; body: string; bullets?: string[] }[];
  imageNote?: string;
  video?: string;
  secondaryOption?: { id: string; label: string; price: number; detail: string };
  shareDescription: string;
}

export const phone = '584127856703';

export function money(value: number): string {
  return `US$${new Intl.NumberFormat('es-VE', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)}`;
}

function pricedProduct(product: Omit<Product, 'priceLabel'>): Product {
  return { ...product, priceLabel: money(product.price) };
}

export const products: Product[] = [
  pricedProduct({
    id: 'fundo',
    slug: 'fundo-agropecuario',
    category: 'Campo',
    title: 'Fundo agrícola y ganadero de 1.500 ha',
    shortTitle: 'Fundo de 1.500 ha',
    eyebrow: 'Hato en venta en el Zulia',
    campaignHeading: '🌾 ¡EL MOMENTO DE INVERTIR EN EL LLANO ES AHORA! HATO EN VENTA EN EL ZULIA 🤠',
    price: 2_100_000,
    priceSuffix: 'negociable',
    location: 'Cerca de Mene Mauroa · Corredor Falcón–Zulia',
    tagline: '¡El momento de invertir en el llano es ahora!',
    summary:
      'Hato de 1.500 ha con agua, forraje natural e infraestructura ganadera, torre de telecomunicaciones, Wi‑Fi y videovigilancia. US$2.100.000 negociables; planta y transformador incluidos, rebaño y camión por separado.',
    description: [
      '¿Busca una propiedad ganadera que combine ubicación, agua y tierra para desarrollar su inversión? El propietario presenta este hato como una propiedad consolidada, con agua asegurada y tierra productiva. Aproveche una base con 60 años de desarrollo para organizar su próximo proyecto agrícola o ganadero.',
      'La oferta combina potreros, forraje natural, instalaciones de manejo, ordeño, enfriamiento, viviendas, taller y energía propia. También cuenta con torre de telecomunicaciones, conectividad Wi‑Fi y videovigilancia con detección de placas, según la información actual del propietario. Conozca lo ya construido y evalúe cómo puede encajar en su proyecto.',
      'Precio de oferta: US$2.100.000, negociable. La planta Caterpillar de 312 kVA y el transformador de 300 kVA están incluidos. El rebaño no forma parte del precio y el camión lechero se vende por separado.',
    ],
    highlights: [
      { value: '1.500 ha', label: 'Superficie declarada' },
      { value: '60 años', label: 'De desarrollo' },
      { value: '9 pozos', label: '8 profundos y 1 artesanal' },
      { value: '123', label: 'Potreros inventariados' },
    ],
    specs: [
      { label: 'Superficie', value: '1.500 ha, declaradas por el propietario' },
      { label: 'Desarrollo', value: '60 años' },
      { label: 'Acceso aproximado desde el asfalto', value: '8 km, según la referencia actual del propietario; recorrido y condiciones a confirmar' },
      { label: 'Empalizadas de alambre de púas', value: 'Aproximadamente 99,5 km' },
      { label: 'Tendido propio de alta tensión', value: '5,28 km' },
      { label: 'Pozos', value: '9: 8 profundos y 1 artesanal; no equivale a nueve pozos en operación' },
      { label: 'Jagüeyes o lagunas artificiales', value: '30' },
      { label: 'Acueductos', value: 'Aproximadamente 6,9 km' },
      { label: 'Riego por inundación', value: '188 ha' },
      { label: 'Referencia de riego por aspersión', value: '20 ha; no se suman al área por inundación sin comprobar superposición' },
      { label: 'Potreros', value: '123' },
      { label: 'Viviendas', value: '15: una casa principal y 14 viviendas rurales' },
      { label: 'Almacenamiento', value: '7 espacios: 6 depósitos y un galpón destinado a depósito' },
      { label: 'Vaqueras', value: '3: ordeño mecánico, maternidad y manejo ganadero' },
      { label: 'Ordeño mecánico', value: 'Una instalación de 10 puestos' },
      { label: 'Tanques de enfriamiento', value: '3: dos de 1.500 L y uno de 4.000 L' },
      { label: 'Capacidad conjunta de enfriamiento', value: '7.000 litros de almacenamiento; no es una cifra de producción diaria' },
      { label: 'Romana ganadera', value: '5.000 kg; manga y romana techadas según el propietario' },
      { label: 'Apoyo rural', value: 'Taller mecánico, depósitos y galpones' },
      { label: 'Equipos eléctricos incluidos', value: 'Caterpillar 312 kVA y transformador 300 kVA' },
      { label: 'Telecomunicaciones', value: 'Torre/antena con enlace de microondas Ubiquiti' },
      { label: 'Conectividad Wi‑Fi', value: 'Antenas de enlace y red inalámbrica' },
      { label: 'Videovigilancia', value: 'Sistema CCTV con cámaras PTZ y fijas; detección de placas según el propietario' },
      { label: 'Respaldo de comunicaciones y vigilancia', value: 'Respaldo UPS' },
      { label: 'Negociación', value: 'Precio negociable; se evalúan vehículos de lujo o comerciales, apartamentos y locales como parte de pago, sujetos a avalúo y acuerdo' },
      { label: 'Documentación declarada', value: 'Al día y lista para firmar, según el propietario; se revisarán títulos y requisitos de transferencia antes del cierre' },
    ],
    images: [
      {
        src: '/media/fundo-mapa-referencial.webp',
        alt: 'Vista satelital referencial del fundo, sin etiqueta del vecino ni indicaciones de acceso',
        caption: 'Vista satelital referencial. La delimitación ilustrada no sustituye un levantamiento de superficie.',
      },
      {
        src: '/media/fundo-taller.webp',
        alt: 'Vista del taller y galpón de apoyo agropecuario',
        caption: 'Taller y galpón de apoyo rural con maquinaria fotografiada.',
      },
      {
        src: '/media/fundo-01.webp',
        alt: 'Rebaño de referencia del fundo; animales no incluidos en la venta',
        caption: 'Rebaño de referencia. Animales no incluidos en el precio.',
      },
      {
        src: '/media/fundo-02.webp',
        alt: 'Ganado de referencia en el fundo, excluido de la oferta',
        caption: 'Fotografía ilustrativa del ganado. Rebaño no incluido.',
      },
      {
        src: '/media/fundo-03.webp',
        alt: 'Animales del rebaño de referencia; venta del fundo sin rebaño',
        caption: 'Animales de referencia del manejo ganadero, fuera de la venta.',
      },
      {
        src: '/media/fundo-04.webp',
        alt: 'Vista del ganado de referencia, no incluido en la venta del fundo',
        caption: 'El rebaño es cambiante y no forma parte del precio.',
      },
    ],
    imageNote:
      'Mapa y fotografías de referencia del inmueble. El rebaño fotografiado NO está incluido en el precio. Planta y transformador incluidos; camión por separado.',
    conditions: [
      'Planta Caterpillar de 312 kVA y transformador de 300 kVA incluidos. Rebaño excluido y camión lechero por separado.',
      'Precio de oferta US$2.100.000, negociable. Se pueden evaluar vehículos de lujo o comerciales, apartamentos y locales como parte de pago, sujetos a avalúo y acuerdo.',
      'La superficie de 1.500 ha es declarada por el propietario; las cantidades de infraestructura, su estado actual y el alcance del inventario de venta se confirmarán durante la inspección.',
      'El acceso de 8 km, su uso estacional y la descripción del terreno sin anegamiento son información del propietario, no una comprobación independiente. El recorrido y las condiciones actuales se revisarán antes de la visita.',
      'El propietario declara la documentación al día y lista para firmar. Los títulos, la situación jurídica y los requisitos de transferencia se revisarán antes de acordar el cierre.',
      'La existencia de pozos e infraestructura no garantiza por sí sola el caudal permanente, la producción inmediata ni la rentabilidad. Se comprobarán funcionamiento, disponibilidad de agua y condiciones del proyecto.',
      'Las áreas de riego por inundación y aspersión no se suman sin comprobar su posible superposición.',
      'Si se acuerda una venta individual de los equipos eléctricos, se revisará su disponibilidad e inclusión en la oferta del fundo. No se descuenta automáticamente su precio del total.',
      'Las visitas y los detalles de acceso se coordinan directamente por WhatsApp.',
    ],
    sections: [
      {
        title: '📍 Ubicación estratégica y tierra firme',
        body:
          'Ubicación aproximada cerca de Mene Mauroa, en el corredor Falcón–Zulia. El propietario indica una referencia actual de aproximadamente 8 km desde la carretera asfaltada, y describe acceso para cualquier tipo de vehículo tanto en invierno como en verano, así como terrenos que no se aniegan. Coordine la visita para confirmar el recorrido y las condiciones actuales.',
      },
      {
        title: '🌾 Tierra y abundancia de alimento natural',
        body:
          'Una superficie declarada de 1.500 hectáreas, con 123 potreros y aproximadamente 99,5 km de empalizadas de alambre de púas. El propietario destaca abundante alimento para ganado escotero y vegetación forrajera espontánea para pastoreo y ramoneo.',
        bullets: [
          '188 ha de riego por inundación y referencia separada de 20 ha por aspersión; no sumar áreas sin comprobar superposición.',
          'Según la experiencia del propietario, un sector permite el levante de aproximadamente 600 bovinos sin siembra de pasturas; la carga sostenible depende del tipo de animales, el forraje estacional y el manejo.',
          'Rebaño Pardo Suizo y Cebú descrito por el propietario como adaptado a la finca. Los animales fotografiados no están incluidos en el precio.',
        ],
      },
      {
        title: '🏗️ Infraestructura ganadera de hierro',
        body:
          'Corrales y divisiones de hierro, manga de vacunación, embarcadero y 3 vaqueras para ordeño mecánico, maternidad y manejo ganadero. El propietario señala áreas para becerros y declara la manga y la romana de 5.000 kg totalmente techadas.',
        bullets: [
          'Instalación de ordeño mecánico de 10 puestos.',
          '3 tanques de enfriamiento: dos de 1.500 litros y uno de 4.000 litros, para una capacidad conjunta de almacenamiento de 7.000 litros.',
        ],
      },
      {
        title: '💧 Agua y energía con infraestructura propia',
        body:
          '9 pozos inventariados —8 profundos y 1 artesanal—, 30 jagüeyes o lagunas artificiales y aproximadamente 6,9 km de acueductos. Una base de captación, almacenamiento y distribución para evaluar las necesidades de su proyecto ganadero o agrícola.',
        bullets: [
          'Aproximadamente 5,28 km de red propia de alta tensión, con generación y distribución eléctrica.',
          'Planta Caterpillar de 312 kVA y transformador de 300 kVA incluidos en el precio total.',
          'El propietario destaca vegetación y maderas como recursos del predio; cualquier aprovechamiento deberá respetar las autorizaciones aplicables.',
        ],
      },
      {
        title: '📡 Conectividad y seguridad',
        body:
          'La tierra y las instalaciones se complementan con infraestructura para comunicar y supervisar la operación rural. Contar con torre de telecomunicaciones, Wi‑Fi y videovigilancia ofrece una base de apoyo para gestionar el trabajo, no solo un terreno en el que empezar desde cero.',
        bullets: [
          'Torre/antena de telecomunicaciones con estructura, bases y anclajes, y enlace de microondas Ubiquiti.',
          'Conectividad Wi‑Fi mediante antenas de enlace y red inalámbrica.',
          'Sistema de videovigilancia CCTV con cámaras PTZ y fijas.',
          'Detección de placas de vehículos, según la información actual del propietario.',
          'Respaldo UPS para comunicaciones y videovigilancia.',
        ],
      },
      {
        title: '🏡 Comodidades y apoyo para el trabajo',
        body:
          'Una casa principal y 14 viviendas rurales para propietarios y personal, taller mecánico y 7 espacios de almacenamiento: 6 depósitos y un galpón destinado a depósito. El propietario describe estos espacios de almacenamiento como resguardados para materiales y equipos.',
      },
      {
        title: '💼 Facilidades de negociación',
        body:
          'US$2.100.000, negociable. ¿Tiene bienes para intercambiar? Se pueden evaluar vehículos de lujo o comerciales, apartamentos y locales como parte de pago, sujetos a avalúo y acuerdo entre las partes.',
        bullets: [
          'Documentación al día y lista para firmar, según el propietario. Antes del cierre se revisarán títulos y requisitos de transferencia.',
          'Planta y transformador incluidos. El rebaño no está incluido y el camión lechero se vende por separado.',
          'Solicite información detallada y coordine su visita directamente por WhatsApp.',
        ],
      },
      {
        title: 'Una base para evaluar un proyecto acuícola',
        body:
          'El propietario destaca clima favorable, disponibilidad de electricidad y agua de pozo para considerar la cría de camarones. Se trata de un potencial por evaluar, no de una explotación camaronera instalada ni de una aptitud certificada.',
        bullets: [
          'Validar el caudal y la calidad del agua, las condiciones del suelo y el diseño del proyecto.',
          'Revisar los permisos y requisitos técnicos aplicables antes de invertir.',
        ],
      },
      {
        title: 'Maquinaria y equipo de apoyo rural',
        body:
          'El conjunto descrito en la oferta comprende maquinaria agrícola, equipos de manejo de forrajes y accesorios rurales del inventario de venta. El estado y alcance de cada unidad se revisarán durante la inspección.',
        bullets: [
          '10 tractores sobre ruedas, 1 Caterpillar D5 y 1 cargador CAT 920.',
          '3 rastras, 3 rolos y 2 rotativas.',
          'Arado, surcadora, lomador y equipos de manejo de forrajes.',
          'Planta Caterpillar de 312 kVA y transformador de 300 kVA incluidos en el precio total.',
        ],
      },
    ],
    shareDescription:
      'Hato de 1.500 ha cerca de Mene Mauroa, con infraestructura ganadera, agua, energía propia, Wi‑Fi y videovigilancia. US$2.100.000 negociables; planta y transformador incluidos. Sin rebaño ni camión.',
  }),
  pricedProduct({
    id: 'camion',
    slug: 'camion-lechero',
    category: 'Transporte',
    title: 'Camión lechero FSR 2008 con tanque',
    shortTitle: 'Camión lechero FSR 2008',
    eyebrow: 'Transporte lechero · Camión + tanque',
    price: 40_000,
    location: 'Zona norte de Maracaibo',
    tagline: 'Transporte y 10.000 litros en una sola compra.',
    summary:
      'FSR 2008 con motor Isuzu de aspiración natural, 325.000 km y tanque de 10.000 litros. Conjunto declarado 100% operativo. También se ofrece el tanque solo.',
    description: [
      'Su próxima ruta lechera puede comenzar con camión y tanque en una sola compra. El conjunto reúne transporte y capacidad de 10.000 litros, con operatividad declarada por el propietario.',
      'El propietario indica 325.000 km, cauchos casi nuevos y documentación en regla. Coordine una inspección para revisar el vehículo, el tanque y la documentación antes de decidir.',
      'Si ya dispone de un vehículo compatible, puede considerar el tanque como compra individual. El desmontaje y retiro se acordarán durante la negociación.',
    ],
    highlights: [
      { value: '2008', label: 'Año del FSR' },
      { value: '10.000 L', label: 'Capacidad del tanque' },
      { value: '325.000 km', label: 'Kilometraje declarado' },
      { value: 'Isuzu', label: 'Motor de aspiración natural' },
    ],
    specs: [
      { label: 'Modelo', value: 'FSR' },
      { label: 'Año', value: '2008' },
      { label: 'Motor', value: 'Isuzu de aspiración natural' },
      { label: 'Kilometraje', value: '325.000 km, según el propietario' },
      { label: 'Capacidad del tanque', value: '10.000 litros' },
      { label: 'Cauchos', value: 'Casi nuevos, según el propietario' },
      { label: 'Documentación', value: 'En regla, según el propietario; a revisar' },
      { label: 'Operatividad', value: '100% operativo, según el propietario' },
      { label: 'Oferta principal', value: 'Camión y tanque' },
      { label: 'Alternativa de compra', value: 'Tanque solo; consultar desmontaje y retiro' },
    ],
    images: [
      {
        src: '/media/camion-frente.webp',
        alt: 'Vista frontal del camión lechero FSR 2008',
        caption: 'Frente del vehículo ofrecido en venta.',
      },
      {
        src: '/media/camion-odometro.webp',
        alt: 'Detalle del tablero y odómetro del camión con su kilometraje visible',
        caption: 'Detalle del odómetro con el kilometraje visible en la fotografía.',
      },
      {
        src: '/media/camion-01.webp',
        alt: 'Vista lateral del camión lechero FSR 2008 con tanque',
        caption: 'Vista lateral del conjunto de camión y tanque.',
      },
      {
        src: '/media/camion-03.webp',
        alt: 'Interior de la cabina del camión lechero',
        caption: 'Interior de la cabina.',
      },
      {
        src: '/media/camion-04.webp',
        alt: 'Tablero de instrumentos del camión lechero',
        caption: 'Tablero de instrumentos.',
      },
    ],
    video: '/media/camion-sin-audio.mp4',
    imageNote: 'Fotografías reales del vehículo y video sin pista de audio.',
    secondaryOption: {
      id: 'tanque',
      label: 'Tanque solo',
      price: 25_000,
      detail:
        'Tanque lechero de 10.000 litros, sin camión. Desmontaje y retiro a acordar durante la negociación.',
    },
    conditions: [
      'El precio principal corresponde al conjunto de camión y tanque de 10.000 litros.',
      'El tanque se ofrece también por separado. No se establece un precio de camión sin tanque por diferencia.',
      'Esta oferta se vende por separado del fundo.',
      'Operatividad, kilometraje, estado de cauchos y documentación son datos declarados por el propietario, sujetos a inspección.',
      'La compatibilidad, el desmontaje y el retiro del tanque se revisarán y acordarán antes de la compra individual.',
      'La inspección se coordina por WhatsApp; no se publica una dirección precisa.',
    ],
    sections: [
      {
        title: 'Conjunto completo o tanque individual',
        body:
          'La oferta principal comprende el camión FSR 2008 y el tanque de 10.000 litros. La alternativa de tanque solo permite evaluar su uso con un vehículo compatible, sin incluir el camión.',
        bullets: [
          'Seleccione la alternativa que le interesa al consultar por WhatsApp.',
          'Para el tanque solo, acuerde el alcance del desmontaje y retiro.',
        ],
      },
      {
        title: 'Revise el equipo antes de su próxima ruta',
        body:
          'Las fotografías y el video sin audio permiten una primera revisión. Coordine una inspección para comprobar el estado actual del vehículo y el tanque, y revisar la documentación con el propietario.',
      },
    ],
    shareDescription:
      'Camión lechero FSR 2008 con tanque de 10.000 litros, en la zona norte de Maracaibo. Operativo según el propietario; alternativa de tanque solo.',
  }),
  pricedProduct({
    id: 'planta',
    slug: 'planta-cat-312-kva',
    category: 'Energía',
    title: 'Planta Caterpillar 312 kVA',
    shortTitle: 'Caterpillar 312 kVA',
    eyebrow: 'Generación eléctrica',
    price: 20_000,
    location: 'Cerca de Mene Mauroa',
    tagline: 'Respaldo eléctrico para la siguiente etapa de su proyecto.',
    summary:
      'Motor Caterpillar 3406, cabina y arco de izaje. Declarada 100% operativa por el propietario; venta donde y como está. También incluida en la oferta del fundo.',
    description: [
      'Evalúe una unidad existente de 312 kVA con motor Caterpillar 3406, cabina y arco de izaje. Coordine una inspección para confirmar su compatibilidad con el proyecto que desea desarrollar.',
      'El propietario declara la planta 100% operativa e indica que no se ha usado en los últimos años. Las tensiones declaradas son 460 V / 230 V; la configuración actual debe comprobarse.',
      'Se ofrece individualmente donde y como está. También está comprendida en el precio del fundo, por lo que su disponibilidad para una venta individual se confirmará antes de acordarla.',
    ],
    highlights: [
      { value: '312 kVA', label: 'Potencia declarada' },
      { value: '3406', label: 'Motor Caterpillar' },
      { value: '460 / 230 V', label: 'Tensiones declaradas; a comprobar' },
      { value: 'Cabina', label: 'Con arco de izaje' },
    ],
    specs: [
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Potencia', value: '312 kVA' },
      { label: 'Motor', value: 'Caterpillar 3406' },
      { label: 'Tensiones declaradas', value: '460 V / 230 V; configuración a comprobar' },
      { label: 'Elementos', value: 'Cabina y arco de izaje' },
      { label: 'Operatividad', value: '100% operativa, según el propietario' },
      { label: 'Antecedente de uso', value: 'Sin uso en los últimos años, según el propietario' },
      { label: 'Modalidad', value: 'Venta donde y como está' },
    ],
    images: [
      {
        src: '/media/planta-01.webp',
        alt: 'Vista general de la planta Caterpillar de 312 kVA',
        caption: 'Vista general del equipo.',
      },
      {
        src: '/media/planta-03.webp',
        alt: 'Fotografía de detalle de la planta Caterpillar de 312 kVA',
        caption: 'Detalle del equipo para una primera revisión.',
      },
      {
        src: '/media/planta-04.webp',
        alt: 'Vista adicional del equipo de generación Caterpillar',
        caption: 'Vista adicional de la unidad.',
      },
      {
        src: '/media/planta-05.webp',
        alt: 'Detalle adicional de la unidad Caterpillar',
        caption: 'Fotografía complementaria; estado actual a inspeccionar.',
      },
    ],
    conditions: [
      'Se vende donde y como está; no se presume transporte incluido.',
      'El estado 100% operativo es una declaración del propietario y requiere comprobación durante la inspección.',
      'El antecedente de varios años sin uso debe considerarse en la revisión técnica.',
      'Las tensiones 460 V / 230 V son declaradas; no se da por verificada la configuración actual.',
      'También está incluida en la oferta del fundo. Se confirmará disponibilidad y alcance de la inclusión antes de una venta individual.',
      'Una venta individual no implica descontar automáticamente este precio del total del fundo.',
      'Compatibilidad, condiciones de retiro y transporte se acordarán antes de comprar.',
    ],
    sections: [
      {
        title: 'Una unidad para evaluar su respaldo eléctrico',
        body:
          'La potencia declarada, el motor Caterpillar 3406, la cabina y el arco de izaje son puntos de partida para revisar la adecuación de la planta a su proyecto. La inspección debe confirmar funcionamiento, configuración y requisitos de instalación.',
      },
      {
        title: 'Inspección y retiro coordinados',
        body:
          'La unidad se vende en su ubicación y estado actuales. Consulte por WhatsApp para confirmar disponibilidad y coordinar una inspección, considerando que también forma parte de la oferta del fundo.',
        bullets: [
          'Revisar el equipo tras su período declarado sin uso.',
          'Confirmar las tensiones y su compatibilidad con la carga prevista.',
          'Acordar retiro y transporte; no se presumen incluidos.',
        ],
      },
    ],
    shareDescription:
      'Planta Caterpillar de 312 kVA, motor 3406, cerca de Mene Mauroa. Operativa según el propietario; venta donde y como está y disponibilidad individual a confirmar.',
  }),
  pricedProduct({
    id: 'transformador',
    slug: 'transformador-300-kva',
    category: 'Energía',
    title: 'Transformador pad-mounted 300 kVA',
    shortTitle: 'Transformador 300 kVA',
    eyebrow: 'Distribución eléctrica',
    price: 10_000,
    location: 'Cerca de Mene Mauroa',
    tagline: 'Una unidad concreta para dar soporte eléctrico a su proyecto.',
    summary:
      'Electrans de pedestal, trifásico: 13,8 kV en alta y 480 V en baja, 60 Hz, aceite ONAN. En servicio y 100% operativo según el propietario. También incluido en el fundo.',
    description: [
      'Evalúe un transformador Electrans de 300 kVA tipo pedestal, pad-mounted, con alta tensión de 13,8 kV y baja tensión de 480 V. Confirme su compatibilidad eléctrica con el proyecto antes de acordar la compra.',
      'La unidad es trifásica, de frecuencia nominal 60 Hz, con aislamiento en aceite y enfriamiento ONAN. El propietario la declara en servicio y 100% operativa; el estado actual se comprobará durante la revisión técnica.',
      'La oferta individual corresponde al transformador, no al terreno ni a toda la instalación eléctrica. También está incluido en el precio del fundo, por lo que se debe confirmar disponibilidad para la venta individual.',
    ],
    highlights: [
      { value: '300 kVA', label: 'Potencia nominal' },
      { value: '13,8 kV', label: 'Alta tensión' },
      { value: '480 V', label: 'Baja tensión' },
      { value: 'Trifásico', label: '60 Hz · Aceite ONAN' },
    ],
    specs: [
      { label: 'Fabricante', value: 'Electrans' },
      { label: 'Tipo', value: 'Pedestal, pad-mounted' },
      { label: 'Potencia', value: '300 kVA' },
      { label: 'Alta tensión', value: '13,8 kV' },
      { label: 'Baja tensión', value: '480 V' },
      { label: 'Sistema', value: 'Trifásico' },
      { label: 'Frecuencia nominal', value: '60 Hz' },
      { label: 'Aislamiento y enfriamiento', value: 'Aceite, ONAN' },
      { label: 'Estado declarado', value: 'En servicio y 100% operativo, según el propietario' },
    ],
    images: [
      {
        src: '/media/transformador-03.webp',
        alt: 'Vista frontal del transformador de pedestal de 300 kVA',
        caption: 'Frente del transformador ofrecido en venta.',
      },
      {
        src: '/media/transformador-placa.webp',
        alt: 'Placa eléctrica Electrans de 300 kVA con alta de 13,8 kV y baja de 480 V',
        caption: 'Placa nominal: 300 kVA, alta de 13,8 kV y baja de 480 V.',
      },
      {
        src: '/media/transformador-01.webp',
        alt: 'Vista lateral del transformador de 300 kVA',
        caption: 'Vista complementaria del equipo para su evaluación.',
      },
    ],
    conditions: [
      'La oferta individual comprende el transformador, no el terreno ni toda la instalación eléctrica.',
      'En servicio y 100% operativo según el propietario; estado y compatibilidad sujetos a inspección técnica.',
      'La desconexión y el retiro se coordinarán con personal calificado.',
      'También está incluido en el precio del fundo. Su disponibilidad para una venta individual debe confirmarse.',
      'Una venta individual no descuenta automáticamente este precio del total del fundo.',
      'Las condiciones de retiro y transporte se acordarán durante la negociación.',
    ],
    sections: [
      {
        title: 'Características para revisar la compatibilidad',
        body:
          'Los datos nominales permiten una primera evaluación de su aplicación: 300 kVA, sistema trifásico, 13,8 kV / 480 V y 60 Hz, con aceite y enfriamiento ONAN. La revisión técnica debe confirmar su adecuación a la instalación prevista.',
      },
      {
        title: 'Disponibilidad y retiro seguro',
        body:
          'Consulte para confirmar la disponibilidad individual y coordinar la inspección. Como la unidad también está comprendida en la oferta del fundo, el alcance de ambas ofertas se revisará antes de cerrar una venta.',
        bullets: [
          'La venta individual no comprende el terreno ni el resto de la instalación eléctrica.',
          'La desconexión y el retiro requieren coordinación con personal calificado.',
        ],
      },
    ],
    shareDescription:
      'Transformador Electrans pad-mounted de 300 kVA, trifásico, 13,8 kV / 480 V y 60 Hz. Cerca de Mene Mauroa; operativo según el propietario.',
  }),
  pricedProduct({
    id: 'local',
    slug: 'local-comercial',
    category: 'Inmuebles',
    title: 'Local comercial en C.C. El Sol',
    shortTitle: 'Local comercial de 100 m²',
    eyebrow: 'Espacio comercial · Venta de contado',
    price: 48_000,
    priceSuffix: 'de contado',
    location: 'C.C. El Sol · Frente a la estación del Metro de Sabaneta',
    tagline: 'Vea el espacio de su próximo negocio.',
    summary:
      '100 m² en dos niveles: planta baja de 60 m² con espacio de cocina y mezzanina de 40 m² con baño. Fachada de vidrio y aluminio, dos santamarías y sin A/C. Solo venta de contado.',
    description: [
      'Un espacio propio con fachada de exhibición y dos niveles para organizar su actividad comercial, en el Centro Comercial El Sol, frente a la estación del Metro de Sabaneta.',
      'La superficie total es de 100 m²: 60 m² de planta baja con espacio de cocina y 40 m² de mezzanina con una sala de baño. La fachada tiene dos santamarías y cerramiento de vidrio y aluminio. El local no cuenta con aire acondicionado.',
      'Puede observar el interior desde fuera a través del vidrio en cualquier momento: una santamaría se ha dejado abierta para ese propósito. Para entrar y recorrerlo, coordine una visita por WhatsApp. La venta es únicamente de contado.',
    ],
    highlights: [
      { value: '100 m²', label: 'Superficie total' },
      { value: '60 m²', label: 'Planta baja con espacio de cocina' },
      { value: '40 m²', label: 'Mezzanina con baño' },
      { value: 'Contado', label: 'Única modalidad de venta' },
    ],
    specs: [
      { label: 'Ubicación', value: 'Centro Comercial El Sol, frente a la estación del Metro de Sabaneta' },
      { label: 'Superficie total', value: '100 m²' },
      { label: 'Planta baja', value: '60 m², con espacio de cocina' },
      { label: 'Mezzanina', value: '40 m², con una sala de baño' },
      { label: 'Fachada', value: 'Dos santamarías' },
      { label: 'Exhibición', value: 'Cerramiento de vidrio y aluminio' },
      { label: 'Aire acondicionado', value: 'Sin A/C' },
      { label: 'Modalidad', value: 'Solo venta de contado; no alquiler ni financiamiento' },
      { label: 'Observación desde el exterior', value: 'A través del vidrio; una santamaría abierta para ese propósito' },
      { label: 'Visita interior', value: 'Previa coordinación por WhatsApp' },
    ],
    images: [
      {
        src: '/media/local-fachada.webp',
        alt: 'Fachada del Centro Comercial El Sol donde se encuentra el local ofrecido',
        caption: 'Fachada del C.C. El Sol, frente al Metro de Sabaneta.',
      },
      {
        src: '/media/local-01.webp',
        alt: 'Interior de la planta baja del local comercial',
        caption: 'Interior de la planta baja.',
      },
      {
        src: '/media/local-03.webp',
        alt: 'Vista de los dos niveles del local comercial',
        caption: 'Distribución del espacio en dos niveles.',
      },
      {
        src: '/media/local-04.webp',
        alt: 'Mezzanina del local comercial',
        caption: 'Vista de la mezzanina.',
      },
    ],
    conditions: [
      'Únicamente venta de contado. No se ofrece alquiler ni financiamiento.',
      'El local se ofrece sin aire acondicionado.',
      'Puede observar el interior desde fuera a través del vidrio en cualquier momento; una santamaría se ha dejado abierta para ese fin.',
      'La observación desde el exterior no implica entrada libre. Para ingresar se coordina una visita por WhatsApp.',
      'Revise la distribución, la documentación, las adecuaciones y la actividad permitida antes de decidir.',
    ],
    sections: [
      {
        title: 'Dos niveles para organizar su actividad',
        body:
          'La planta baja de 60 m² dispone de espacio de cocina y la mezzanina de 40 m² cuenta con una sala de baño. La fachada de vidrio y aluminio permite exhibición hacia el exterior. Evalúe la distribución y las adecuaciones necesarias para la actividad permitida que desea desarrollar.',
      },
      {
        title: 'Observe desde fuera; visite el interior con cita',
        body:
          'Una santamaría permanece abierta para permitir la observación a través del vidrio desde el exterior. Puede pasar a mirar en cualquier momento, sin que esto implique acceso libre al local. Para entrar y recorrer ambos niveles, acuerde una visita por WhatsApp.',
      },
      {
        title: 'Una compra exclusivamente de contado',
        body:
          'La oferta corresponde a la venta de contado del local. No se ofrece alquiler ni financiamiento. Consulte los detalles y revise la documentación antes de acordar la compra.',
      },
    ],
    shareDescription:
      'Local de 100 m² en C.C. El Sol, frente al Metro de Sabaneta. Planta baja y mezzanina con baño, sin A/C. Venta solo de contado; visita interior con cita.',
  }),
];

export function productPath(p: Product): string {
  return `/activos/${p.slug}/`;
}

/** Consulta breve compartida entre HTML estático y actualización del interés visitado. */
export function contactMessage(p?: Product, option?: string, origin?: string): string {
  const names: Record<string, string> = {
    fundo: 'Fundo agrícola y ganadero',
    camion: 'Camión lechero con tanque',
    planta: 'Planta Caterpillar',
    transformador: 'Transformador',
    local: 'Local comercial',
  };
  const selectedTank = p?.id === 'camion' && Boolean(p.secondaryOption && p.secondaryOption.id === option);
  const name = p ? (selectedTank ? 'Tanque lechero' : names[p.id] || p.title) : undefined;
  const lines = [
    name ? `Hola, me interesa *${name}*.` : 'Hola, me interesan los activos en venta.',
    'Quisiera más información sobre disponibilidad, precios y ubicación.',
  ];

  // El origen es explícito: no se inventa un dominio ni se toma de datos privados.
  if (origin?.trim()) {
    try {
      const suppliedOrigin = new URL(origin.trim());
      if (
        (suppliedOrigin.protocol === 'https:' || suppliedOrigin.protocol === 'http:') &&
        !suppliedOrigin.username &&
        !suppliedOrigin.password
      ) {
        const publicUrl = new URL(p ? productPath(p) : '/', suppliedOrigin.origin);
        lines.push(publicUrl.href);
      }
    } catch {
      // Un origen ausente o inválido deja la consulta funcional, sin URL inventada.
    }
  }

  return lines.join('\n');
}

/** Abre un borrador editable: el interesado debe enviar el mensaje en WhatsApp. */
export function initialWhatsApp(p?: Product, option?: string, origin?: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(contactMessage(p, option, origin))}`;
}
