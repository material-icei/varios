(function () {
  "use strict";

  var MAXIMO = 1000;

  var formulario = document.getElementById("formulario");
  var campoCantidad = document.getElementById("cantidad");
  var campoGrupos = document.getElementById("grupos");
  var error = document.getElementById("error");
  var resultado = document.getElementById("resultado");
  var cuerpo = document.getElementById("cuerpo");
  var aviso = document.getElementById("aviso");

  var grupos = [];
  var ultimaCantidad = 0;
  var ultimosGrupos = 0;

  function mezclar(lista) {
    for (var i = lista.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = lista[i];
      lista[i] = lista[j];
      lista[j] = tmp;
    }
    return lista;
  }

  function crearGrupos(cantidad, cantidadGrupos) {
    var numeros = [];
    for (var n = 1; n <= cantidad; n++) numeros.push(n);
    mezclar(numeros);

    var resultadoGrupos = [];
    for (var g = 0; g < cantidadGrupos; g++) resultadoGrupos.push([]);
    numeros.forEach(function (numero, indice) {
      resultadoGrupos[indice % cantidadGrupos].push(numero);
    });
    resultadoGrupos.forEach(function (grupo) {
      grupo.sort(function (a, b) { return a - b; });
    });
    return resultadoGrupos;
  }

  function mostrarError(texto) {
    error.textContent = texto;
    error.hidden = false;
  }

  function dibujar() {
    cuerpo.innerHTML = "";
    grupos.forEach(function (grupo, i) {
      var fila = document.createElement("tr");
      var celdaNombre = document.createElement("td");
      var celdaNumeros = document.createElement("td");
      celdaNombre.textContent = "Grupo " + (i + 1);
      celdaNumeros.textContent = grupo.join("  ");
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaNumeros);
      cuerpo.appendChild(fila);
    });
    resultado.hidden = false;
    aviso.textContent = "";
  }

  function generar() {
    grupos = crearGrupos(ultimaCantidad, ultimosGrupos);
    dibujar();
  }

  // Planilla: una columna por grupo, una fila por posición.
  function armarFilas() {
    var filas = [grupos.map(function (_, i) { return "Grupo " + (i + 1); })];
    var largo = Math.max.apply(null, grupos.map(function (g) { return g.length; }));
    for (var r = 0; r < largo; r++) {
      filas.push(grupos.map(function (g) { return g[r] === undefined ? "" : g[r]; }));
    }
    return filas;
  }

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    error.hidden = true;

    var cantidad = Number(campoCantidad.value);
    var cantidadGrupos = Number(campoGrupos.value);

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      return mostrarError("Escribí una cantidad de números válida (1 o más).");
    }
    if (!Number.isInteger(cantidadGrupos) || cantidadGrupos < 1) {
      return mostrarError("Escribí una cantidad de grupos válida (1 o más).");
    }
    if (cantidad > MAXIMO || cantidadGrupos > MAXIMO) {
      return mostrarError("El máximo permitido es " + MAXIMO + ".");
    }
    if (cantidadGrupos > cantidad) {
      return mostrarError("No puede haber más grupos que números.");
    }

    ultimaCantidad = cantidad;
    ultimosGrupos = cantidadGrupos;
    generar();
    resultado.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("mezclar").addEventListener("click", generar);

  document.getElementById("descargar").addEventListener("click", function () {
    // Separador ";" y BOM para que Excel en español lo abra bien.
    var csv = "\uFEFF" + armarFilas().map(function (f) { return f.join(";"); }).join("\r\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "grupos.csv";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(enlace.href);
    aviso.textContent = "Planilla descargada (grupos.csv).";
  });

  document.getElementById("copiar").addEventListener("click", function () {
    var texto = armarFilas().map(function (f) { return f.join("\t"); }).join("\n");
    if (!navigator.clipboard) {
      aviso.textContent = "Tu navegador no permite copiar. Usá Descargar planilla.";
      return;
    }
    navigator.clipboard.writeText(texto).then(
      function () { aviso.textContent = "Copiado. Pegalo en una planilla."; },
      function () { aviso.textContent = "No se pudo copiar. Usá Descargar planilla."; }
    );
  });
})();
