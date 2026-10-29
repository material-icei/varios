(function () {
  "use strict";

  var alumnos = (typeof ALUMNOS !== "undefined" && Array.isArray(ALUMNOS))
    ? ALUMNOS.filter(function (a) { return a && a.nombre && a.curso; })
    : [];

  var formulario = document.getElementById("formulario");
  var selectCurso = document.getElementById("curso");
  var campoGrupos = document.getElementById("grupos");
  var opcionParejo = document.getElementById("opcion-parejo");
  var checkParejo = document.getElementById("parejo");
  var error = document.getElementById("error");
  var resultado = document.getElementById("resultado");
  var cuerpo = document.getElementById("cuerpo");
  var aviso = document.getElementById("aviso");

  var grupos = [];
  var ultima = null; // { personas, cantidadGrupos, parejo, mostrarCurso }

  function comparar(a, b) {
    return a.localeCompare(b, "es", { numeric: true, sensitivity: "base" });
  }

  function mezclar(lista) {
    for (var i = lista.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = lista[i];
      lista[i] = lista[j];
      lista[j] = tmp;
    }
    return lista;
  }

  function cursosDisponibles() {
    var vistos = {};
    alumnos.forEach(function (a) { vistos[a.curso] = true; });
    return Object.keys(vistos).sort(comparar);
  }

  function cargarSelector() {
    var cursos = cursosDisponibles();
    var todos = document.createElement("option");
    todos.value = "";
    todos.textContent = "Todos los cursos (" + alumnos.length + ")";
    selectCurso.appendChild(todos);
    cursos.forEach(function (curso) {
      var cantidad = alumnos.filter(function (a) { return a.curso === curso; }).length;
      var opcion = document.createElement("option");
      opcion.value = curso;
      opcion.textContent = curso + " (" + cantidad + ")";
      selectCurso.appendChild(opcion);
    });
  }

  function actualizarOpcion() {
    opcionParejo.hidden = selectCurso.value !== "";
  }

  function crearGrupos(personas, cantidadGrupos, parejo) {
    var lista = mezclar(personas.slice());

    if (parejo) {
      // Se ordenan por curso (cursos en orden al azar) y se reparte de a uno,
      // así cada curso queda distribuido entre todos los grupos.
      var porCurso = {};
      lista.forEach(function (p) {
        (porCurso[p.curso] = porCurso[p.curso] || []).push(p);
      });
      lista = [];
      mezclar(Object.keys(porCurso)).forEach(function (curso) {
        lista = lista.concat(porCurso[curso]);
      });
    }

    var resultadoGrupos = [];
    for (var g = 0; g < cantidadGrupos; g++) resultadoGrupos.push([]);
    lista.forEach(function (persona, indice) {
      resultadoGrupos[indice % cantidadGrupos].push(persona);
    });
    resultadoGrupos.forEach(function (grupo) {
      grupo.sort(function (a, b) { return comparar(a.nombre, b.nombre); });
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
      var celdaIntegrantes = document.createElement("td");

      celdaNombre.textContent = "Grupo " + (i + 1);
      var cantidad = document.createElement("span");
      cantidad.className = "cantidad";
      cantidad.textContent = grupo.length + (grupo.length === 1 ? " persona" : " personas");
      celdaNombre.appendChild(cantidad);

      grupo.forEach(function (p) {
        var linea = document.createElement("div");
        linea.className = "persona";
        linea.textContent = p.nombre;
        if (ultima.mostrarCurso) {
          var curso = document.createElement("small");
          curso.textContent = p.curso;
          linea.appendChild(curso);
        }
        celdaIntegrantes.appendChild(linea);
      });

      fila.appendChild(celdaNombre);
      fila.appendChild(celdaIntegrantes);
      cuerpo.appendChild(fila);
    });
    resultado.hidden = false;
    aviso.textContent = "";
  }

  function generar() {
    grupos = crearGrupos(ultima.personas, ultima.cantidadGrupos, ultima.parejo);
    dibujar();
  }

  // Planilla: una columna por grupo, una fila por integrante ("Nombre (Curso)").
  function armarFilas() {
    var filas = [grupos.map(function (_, i) { return "Grupo " + (i + 1); })];
    var largo = Math.max.apply(null, grupos.map(function (g) { return g.length; }));
    for (var r = 0; r < largo; r++) {
      filas.push(grupos.map(function (g) {
        return g[r] ? g[r].nombre + " (" + g[r].curso + ")" : "";
      }));
    }
    return filas;
  }

  function celdaCsv(valor) {
    return /[;"\r\n]/.test(valor) ? '"' + valor.replace(/"/g, '""') + '"' : valor;
  }

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    error.hidden = true;

    var curso = selectCurso.value;
    var personas = curso ? alumnos.filter(function (a) { return a.curso === curso; }) : alumnos;
    var cantidadGrupos = Number(campoGrupos.value);

    if (!personas.length) {
      return mostrarError("No hay alumnos cargados. Completá la lista en data.js.");
    }
    if (!Number.isInteger(cantidadGrupos) || cantidadGrupos < 1) {
      return mostrarError("Escribí una cantidad de grupos válida (1 o más).");
    }
    if (cantidadGrupos > personas.length) {
      return mostrarError("Hay " + personas.length + " personas: no puede haber más grupos que eso.");
    }

    ultima = {
      personas: personas,
      cantidadGrupos: cantidadGrupos,
      parejo: curso === "" && checkParejo.checked,
      mostrarCurso: curso === ""
    };
    generar();
    resultado.scrollIntoView({ behavior: "smooth" });
  });

  selectCurso.addEventListener("change", actualizarOpcion);
  document.getElementById("mezclar").addEventListener("click", generar);

  document.getElementById("descargar").addEventListener("click", function () {
    // Separador ";" y BOM para que Excel en español lo abra bien.
    var csv = "\uFEFF" + armarFilas().map(function (f) {
      return f.map(celdaCsv).join(";");
    }).join("\r\n");
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

  cargarSelector();
  actualizarOpcion();
  if (!alumnos.length) {
    mostrarError("No hay alumnos cargados. Completá la lista en data.js.");
  }
})();
