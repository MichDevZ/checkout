export const shippingCosts = {
  zones: {
    zone1: {
      cost: 5000,
      communes: [
        'SAN MIGUEL',
        'RECOLETA',
        'INDEPENDENCIA',
        'CONCHALI',
        'QUINTA NORMAL',
        'CERRO NAVIA',
        'PUDAHUEL'
      ]
    },
    zone2: {
      cost: 8000,
      communes: [
        'ESTACION CENTRAL',
        'PEDRO AGUIRRE CERDA',
        'LA CISTERNA',
        'SANTIAGO',
        'ÑUÑOA',
        'PROVIDENCIA',
        'MACUL',
        'SAN JOAQUIN',
        'HUECHURABA',
        'RENCA',
        'QUILICURA',
        'LO PRADO',
        'LOS ESPEJO',
        'CERRILLOS',
        'MAIPU',
        'LA GRANJA',
        'SAN RAMON',
        'LA FLORIDA',
        'EL BOSQUE',
        'LA PINTANA',
        'PUENTE ALTO',
        'SAN BERNARDO'
      ]
    },
    zone3: {
      cost: 12000,
      communes: [
        'LAS CONDES',
        'LA REINA',
        'BARNECHEA',
        'VITACURA',
        'PEÑALOLEN'
      ]
    }
  },
  freeShippingThreshold: 100000,
  expressCost: 15000
};

export const isWithinAmericoVespucioRing = (commune) => {
  const innerCommunes = [
    'SANTIAGO CENTRO',
    'PROVIDENCIA',
    'NUNOA',
    'SAN MIGUEL',
    'SAN JOAQUIN',
    'MACUL',
    'LA FLORIDA',
    'PEÑALOLEN',
    'LA REINA',
    'LAS CONDES',
    'VITACURA',
    'RECOLETA',
    'INDEPENDENCIA',
    'QUINTA NORMAL',
    'ESTACION CENTRAL',
    'PEDRO AGUIRRE CERDA',
    'LA CISTERNA'
  ];
  return innerCommunes.includes(commune.toUpperCase());
};

