/*
  LISTA DE ALUMNOS
  ----------------
  Para agregar a alguien, sumá una línea con su nombre y su curso:
    { nombre: "Nombre Apellido", curso: "1°A" },
  Para sacarlo, borrá su línea. Cada línea termina con coma.
  Los cursos aparecen solos en la app: no hay que cargarlos aparte.
  Escribí el curso siempre igual (por ejemplo "1°A", no "1A" ni "1° a").
*/
const ALUMNOS = [
  // 7°A
{ nombre: "	AGUILÓ, ALBERTO ANDRÉS	", curso: "	7° A	" },
{ nombre: "	APPIOLAZA DEL MONTE, PAULINA	", curso: "	7° A	" },
{ nombre: "	ATUR YADALA, RANIA LAIAL	", curso: "	7° A	" },
{ nombre: "	BONDER FERNÁNDEZ, FRANCO	", curso: "	7° A	" },
{ nombre: "	BORN, AGUSTINA	", curso: "	7° A	" },
{ nombre: "	BOULIN BAIARDI, LUCÍA	", curso: "	7° A	" },
{ nombre: "	CANALS, JUAN AGUSTÍN	", curso: "	7° A	" },
{ nombre: "	CATALANO, LAUTARO	", curso: "	7° A	" },
{ nombre: "	ESCANDE LIZARRAGA, THIAGO	", curso: "	7° A	" },
{ nombre: "	GARCIA SALA, EMILIA	", curso: "	7° A	" },
{ nombre: "	GIMÉNEZ GIORDANO, Pedro	", curso: "	7° A	" },
{ nombre: "	Läuchli, Alma	", curso: "	7° A	" },
{ nombre: "	LUCERO QUIROGA, JAZMÍN	", curso: "	7° A	" },
{ nombre: "	MARTIARENA BONDER, VICENTE	", curso: "	7° A	" },
{ nombre: "	MENNITI, MAGALI	", curso: "	7° A	" },
{ nombre: "	MERCADO, AGOSTINA BELÉN	", curso: "	7° A	" },
{ nombre: "	O'MALLEY, CATALINA ELIZABETH	", curso: "	7° A	" },
{ nombre: "	PAGANO, HELENA VIRGINIA	", curso: "	7° A	" },
{ nombre: "	PENUTTO MARTINEZ, PILAR	", curso: "	7° A	" },
{ nombre: "	POLIZZI, ANDRÉS	", curso: "	7° A	" },
{ nombre: "	QUINTEROS TORRECILLA, MARÍA MURIEL	", curso: "	7° A	" },
{ nombre: "	QUIROGA DRUETTA, MÍA	", curso: "	7° A	" },
{ nombre: "	RAMOS GRAS, BAUTISTA	", curso: "	7° A	" },
{ nombre: "	RODRIGUEZ PONDE, ALFONSO	", curso: "	7° A	" },
{ nombre: "	SARCINELLA LLANO, FRANCISCO	", curso: "	7° A	" },
{ nombre: "	THOMAS LEAL, MANUEL	", curso: "	7° A	" },
{ nombre: "	TORRE, MARÍA FAUSTINA	", curso: "	7° A	" },
{ nombre: "	VAZQUEZ ALSINA, JUAN	", curso: "	7° A	" },
{ nombre: "	VILLAPLANA TONN, JUAN FRANCISCO	", curso: "	7° A	" },
{ nombre: "	WEINER LLANO, PEDRO	", curso: "	7° A	" },


  // 7°B
{ nombre: "	BABINI PANTANO, VICTORIA	", curso: "	7° B	" },
{ nombre: "	BARRERA CANALS, ANA	", curso: "	7° B	" },
{ nombre: "	BIANCHI MAGNANI, SOFÍA	", curso: "	7° B	" },
{ nombre: "	BRAIN, ANTONINO	", curso: "	7° B	" },
{ nombre: "	CORDOBA, FAUSTINO	", curso: "	7° B	" },
{ nombre: "	ESPOSITO GARCIA, BENJAMÍN	", curso: "	7° B	" },
{ nombre: "	FARRANDO BISSON, FELIPE ARTURO	", curso: "	7° B	" },
{ nombre: "	FERNANDEZ POEPPEL, SANTINO	", curso: "	7° B	" },
{ nombre: "	FUKS, LARA	", curso: "	7° B	" },
{ nombre: "	GIAMBENEDETTI, BRUNO JOSE	", curso: "	7° B	" },
{ nombre: "	GOREN, DELFINA	", curso: "	7° B	" },
{ nombre: "	HERRERA GARIGNANI, MANUEL	", curso: "	7° B	" },
{ nombre: "	MAGISTOCCHI, ABRIL	", curso: "	7° B	" },
{ nombre: "	MIQUELINE ROMERO, GIULIANA	", curso: "	7° B	" },
{ nombre: "	Nazar, Yamir	", curso: "	7° B	" },
{ nombre: "	PALMILI CUBILLOS, Juan bautista	", curso: "	7° B	" },
{ nombre: "	QUESADA LECEA, MANUEL	", curso: "	7° B	" },
{ nombre: "	RAUEK SAMUDIO, TOMÁS	", curso: "	7° B	" },
{ nombre: "	ROVERES ORELLANA, AMANDA LUCÍA	", curso: "	7° B	" },
{ nombre: "	SAD PAGLIARULO, JAZMÍN	", curso: "	7° B	" },
{ nombre: "	SÁNCHEZ CUERVO, María José	", curso: "	7° B	" },
{ nombre: "	SUAREZ, SOFÍA	", curso: "	7° B	" },
{ nombre: "	TORRE DOMINGUEZ, SANTIAGO	", curso: "	7° B	" },
{ nombre: "	VALDEMOROS, LARA	", curso: "	7° B	" },
{ nombre: "	VALLONE FERRARESE, JUAN CRUZ	", curso: "	7° B	" },
{ nombre: "	VALLONE, LIS	", curso: "	7° B	" },
{ nombre: "	VENDRELL, MARTIN	", curso: "	7° B	" },
{ nombre: "	VIDELA CHALES, Thiago	", curso: "	7° B	" },
{ nombre: "	VITULLO MOLINA, Valentino	", curso: "	7° B	" },

];
