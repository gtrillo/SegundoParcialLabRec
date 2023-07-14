var selectElement = document.getElementById("sltFiltro");
spinner.style.display = "none";
var manejadorFormAbm = function (accion) {
    formularioLista = document.getElementById("formLista");
    formularioAbm = document.getElementById("formularioAbm");
    if (accion == 'ocultar') {
        formularioAbm.style.display = "none";
        formularioLista.style.display = "block";
    } else {
        formularioLista.style.display = "none";
        formularioAbm.style.display = "block";
    }
}

var manejadorFormLista = function (accion) {
    formularioLista = document.getElementById("formLista");
    formularioAbm = document.getElementById("formularioAbm");
    if (accion == 'ocultar') {
        formularioLista.style.display = "none";
        btnAgregar.style.display = "none";
    } else {
        btnAgregar.style.display = "block";
        formularioLista.style.display = "block";
    }
}
//RECUPERAR LISTA USANDO XMLHttpRequest
function recuperarPersonas() {
    manejadorFormAbm("ocultar");

    console.log("Bloqueamos Pantalla");
    let listaPersonas = [];

    let xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                let json = JSON.parse(xml.responseText);
                for (let i = 0; i < json.length; i++) {
                    if ('ventas' in json[i]) {
                        let empleado = new Empleado(
                            json[i].id,
                            json[i].nombre,
                            json[i].apellido,
                            json[i].edad,
                            json[i].sueldo,
                            json[i].ventas
                        );
                        // Hacer algo con el empleado...
                        listaPersonas.push(empleado);
                    } else {
                        // Crear instancia de Cliente
                        let cliente = new Cliente(
                            json[i].id,
                            json[i].nombre,
                            json[i].apellido,
                            json[i].edad,
                            json[i].compras,
                            json[i].telefono
                        );
                        // Hacer algo con el cliente...
                        listaPersonas.push(cliente);
                    }
                }
                manejadorFormLista("dibujar");
                manejadorSpinner("ocultar");
            } else {
                console.log("Fallo Delete");
                console.log("Desbloqueamos Pantalla");
                console.log("Muestro Form Tabla");
            }
        }
    };
    xml.open("GET", "http://localhost/PersonasEmpleadosClientes.php", false);
    xml.send();

    return listaPersonas; // Retornar la lista de personas
}

let personas = recuperarPersonas();


var crearTabla = function (lista) {
    let stringTable = "<tr>";

    stringTable += "<th id='labelId'>Id</th>";
    stringTable += "<th id='labelNombre'>Nombre</th>";
    stringTable += "<th id='labelApellido'>Apellido</th>";
    stringTable += "<th id='labelEdad'>Edad</th>";

    // Campos específicos de Empleado
    stringTable += "<th id='labelSueldo'>Sueldo</th>";
    stringTable += "<th id='labelVentas'>Ventas</th>";

    // Campos específicos de Cliente
    stringTable += "<th id='labelCompras'>Compras</th>";
    stringTable += "<th id='labelTelefono'>Telefono</th>";

    stringTable += "</tr>";

    for (let elem of lista) {
        let fila = "<tr id='" + elem.getId() + "'>";

        fila += "<td>" + elem.getId() + "</td>";
        fila += "<td>" + elem.getNombre() + "</td>";
        fila += "<td>" + elem.getApellido() + "</td>";
        fila += "<td>" + elem.getEdad() + "</td>";

        if (elem instanceof Empleado) {
            fila += "<td>" + elem.getSueldo() + "</td>";
            fila += "<td>" + elem.getVentas() + "</td>";
            fila += "</td>";
            fila += "<td> N/A";
            fila += "</td>";
            fila += "<td>N/A";
            fila += "</td>";
        } else if (elem instanceof Cliente) {
            fila += "</td>";
            fila += "<td> N/A";
            fila += "</td>";
            fila += "<td>N/A";
            fila += "<td>" + elem.getCompras() + "</td>";
            fila += "<td>" + elem.getTelefono() + "</td>";
        }

        fila += "</tr>";
        stringTable += fila;
    }

    return stringTable;
};
document.getElementById("tablaPersonas").innerHTML = crearTabla(personas);

manejadorFormAbm('ocultar');


//////importantisimo poner estooo
///es para abrir la fila
let personaSeleccionada;

function abrirFormulario(persona) {
    btnAceptar.style.display = "none";
    manejadorFormAbm("dibujar");
    mostrarPersona(persona);
    personaSeleccionada = persona;
}

function obtenerInstanciaPersona(numeroFila) {
    for (let elem of personas) {
        if (numeroFila == elem.getId()) {
            return elem;
        }
    }
    return null;
}
let abrirFila = function () {
    let filas = document.querySelectorAll('tr');
    filas.forEach((fila) => {
        const idFila = fila.getAttribute('id');
        if (idFila) {
            let persona = obtenerInstanciaPersona(idFila);
            fila.removeEventListener('click', abrirFormulario);
            fila.addEventListener('click', abrirFormulario.bind(null, persona));
        }
    });
};
abrirFila();
selectTipo.addEventListener("change", function () {
    let valorSeleccionado = selectTipo.value;
    switch (valorSeleccionado) {
        case "empleado":
            elementosEmpleado.style.display = "block";
            elementosCliente.style.display = "none";
            break;
        case "cliente":
            elementosEmpleado.style.display = "none";
            elementosCliente.style.display = "block";
            break;
    }
});

function mostrarPersona(persona) {
    ocultarBotonos("dibujar");
    formularioAbm = document.getElementById("formularioAbm");
    formularioAbm.style.display = "block";
    formularioLista.style.display = "none";
    elementosEmpleado = document.getElementById("elementosEmpleado");
    elementosCliente = document.getElementById("elementosCliente");
    labelTipo = document.getElementById("lblTipo");
    selectTipo = document.getElementById("selectTipo");
    labelTipo.style.display = "none";
    selectTipo.style.display = "none";
    if (persona instanceof Empleado) {
        document.getElementById("txtApellido").value = persona.getApellido();
        document.getElementById("txtEdad").value = persona.getEdad();
        document.getElementById("txtNombre").value = persona.getNombre();
        document.getElementById("txtSueldo").value = persona.getSueldo();
        document.getElementById("txtVentas").value = persona.getVentas();
        elementosEmpleado.style.display = "block";
        elementosCliente.style.display = "none";
    } else {
        document.getElementById("txtApellido").value = persona.getApellido();
        document.getElementById("txtEdad").value = persona.getEdad();
        document.getElementById("txtNombre").value = persona.getNombre();
        document.getElementById("txtCompras").value = persona.getCompras();
        document.getElementById("txtTelefono").value = persona.getTelefono();
        elementosEmpleado.style.display = "none";
        elementosCliente.style.display = "block";
    }
}

btnCancelar.addEventListener("click", function () {
    manejadorFormAbm('ocultar');
    limpiarFormAbm();

});

function ocultarBotonos(accion)
{
    let botonEliminar = document.getElementById("btnEliminar");
    let botonModificar = document.getElementById("btnModificar");

    if(accion == "dibujar"){
        botonEliminar.style.display = "block";
        botonModificar.style.display = "block";
    }else{
        botonEliminar.style.display = "none";
        botonModificar.style.display = "none";
    }

}
btnAgregar.addEventListener("click", function () {
    elementosEmpleado.style.display = "none";
    manejadorFormAbm('dibujar');
    selectTipo = document.getElementById("selectTipo");
    selectTipo.style.display = "block";
    btnAceptar.style.display = "block";
    ocultarBotonos("ocultar");
});

btnAceptar.addEventListener("click", function () {
    agregarALaLista();
    manejadorFormAbm('ocultar');
    limpiarFormAbm();
    abrirFila();

});


var limpiarFormAbm = function () {
    var campos = ["txtNombre", "txtApellido", "txtEdad", "txtSueldo", "txtVentas", "txtCompras", "txtTelefono"];

    campos.forEach(function (campo) {
        document.getElementById(campo).value = "";
    });
};

function alta(objeto) {
    manejadorSpinner("dibujar");
    manejadorFormLista("ocultar");
    formulario = document.getElementById("formLista");
    formulario.style.display = "none";
    document.body.style.pointerEvents = "none";

    return fetch('http://localhost/PersonasEmpleadosClientes.php', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    })
        .then(function (response) {
            if (response.ok) {
                manejadorSpinner("ocultar");
                manejadorFormLista("dibujar");
                document.body.style.pointerEvents = "auto";

                return response.json();
            } else {
                throw new Error("Fallo alta");
            }
        })
        .then(function (data) {
            console.log(data);
            manejadorSpinner("ocultar");

            return parseInt(data.id);
        })
        .catch(function (error) {
            console.log(error);
            console.log("Fallo conexión");
            document.body.style.pointerEvents = "auto";
            return null;
        });
}


var agregarALaLista = function () {

    try {
        let nombre = document.getElementById("txtNombre").value;
        let apellido = document.getElementById("txtApellido").value;
        let edad = document.getElementById("txtEdad").value;
        let sueldo = document.getElementById("txtSueldo").value;
        let ventas = document.getElementById("txtVentas").value;
        let compras = document.getElementById("txtCompras").value;
        let telefono = document.getElementById("txtTelefono").value;

        if (typeof nombre !== 'string') {
            throw new Error("El campo nombre debe ser una cadena de texto.");
        }
        if (typeof apellido !== 'string') {
            throw new Error("El campo apellido debe ser una cadena de texto.");
        }
        if (isNaN(parseInt(edad)) || edad < 15) {
            throw new Error("El campo edad debe ser un valor numérico y mayor a 15");
        }

        if (sueldo && ventas) {
            if (isNaN(parseInt(sueldo)) || sueldo < 1) {
                throw new Error("El campo sueldo debe ser un valor numérico mayor a 0.");
            }
            if (isNaN(parseInt(ventas)) || ventas < 1) {
                throw new Error("El campo ventas debe ser un valor numérico mayor a 0.");
            }
            let objeto = {
                nombre: nombre,
                apellido: apellido,
                edad: parseInt(edad),
                sueldo: parseInt(sueldo),
                ventas: parseInt(ventas)
            };
            alta(objeto)
                .then(function (response) {
                    if (response) {
                        let empleado = new Empleado(response, nombre, apellido, edad, sueldo, ventas);
                        personas.push(empleado);
                        document.getElementById("tablaPersonas").innerHTML = crearTabla(personas);
                        abrirFila();
                    }
                });

        } else if (compras && telefono) {
            if (isNaN(parseInt(compras))) {
                throw new Error("El campo compras debe ser un valor numérico.");
            }
            if (isNaN(parseInt(telefono))) {
                throw new Error("El campo telefono debe ser un valor numérico.");
            }
            let objeto = {
                nombre: nombre,
                apellido: apellido,
                edad: parseInt(edad),
                compras: parseInt(compras),
                telefono: parseInt(telefono)
            };
            alta(objeto)
                .then(function (response) {
                    if (response) {
                        let cliente = new Cliente(response, nombre, apellido, edad, compras, telefono);
                        personas.push(cliente);
                        document.getElementById("tablaPersonas").innerHTML = crearTabla(personas);
                        abrirFila();
                    }
                });
        } else {
            throw new Error("Por favor, complete todos los campos requeridos.");
        }
        return true;
    } catch (error) {
        alert(error.message);
        return false;
    }
};

btnModificar.addEventListener("click", modificarPersonaSeleccionada);

function modificarPersonaSeleccionada() {
    if (personaSeleccionada) {
        actualizar(personaSeleccionada);
        abrirFila();
        personaSeleccionada = null;
    }
}

function manejadorSpinner(accion) {
    if (accion == "dibujar") {
        spinner.style.display = "block";
    } else {
        spinner.style.display = "none";
    }

}

async function actualizar(objeto) {
    try {
        manejadorSpinner("dibujar");
        manejadorFormAbm("ocultar");
        manejadorFormLista("ocultar")
        let resultado = await fetch('http://localhost/PersonasEmpleadosClientes.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: objeto.toJson()
        });
        if (resultado.ok) {
            let respuesta = await resultado.text();
            console.log(respuesta);
            modificarPersona(objeto);
            manejadorSpinner("ocultar");
            manejadorFormLista("dibujar")
            document.getElementById("tablaPersonas").innerHTML = crearTabla(personas);
            abrirFila();
        } else {
            let respuesta = await resultado.text();
            console.log(respuesta);
            manejadorSpinner("ocultar");
            alert("Fallo la actualización");
            manejadorFormLista("dibujar");
            abrirFila();
        }
    } catch (error) {
        console.log("Fallo conexion");
    }
}


function modificarPersona(personaAModificar) {
    try {
        let apellido = document.getElementById("txtApellido").value;
        let nombre = document.getElementById("txtNombre").value;
        let edad = document.getElementById("txtEdad").value;
        let sueldo = document.getElementById("txtSueldo").value;
        let ventas = document.getElementById("txtVentas").value;
        let compras = document.getElementById("txtCompras").value;
        let telefono = document.getElementById("txtTelefono").value;

        if (typeof apellido !== 'string' || typeof nombre !== 'string' || isNaN(parseInt(edad))) {
            throw new Error("Por favor, ingrese los campos correctamente.");
        }
        if (personaAModificar instanceof Empleado) {
            if (isNaN(parseInt(sueldo)) || isNaN(parseInt(ventas))) {
                throw new Error("Por favor, ingrese los campos correctamente.");
            }
            personaAModificar.setApellido(apellido);
            personaAModificar.setNombre(nombre);
            personaAModificar.setEdad(edad);
            personaAModificar.setSueldo(sueldo);
            personaAModificar.setVentas(ventas);
        } else if (personaAModificar instanceof Cliente) {
            if (isNaN(parseInt(compras)) || typeof telefono !== 'string') {
                throw new Error("Por favor, ingrese los campos correctamente.");
            }
            personaAModificar.setApellido(apellido);
            personaAModificar.setNombre(nombre);
            personaAModificar.setEdad(edad);
            personaAModificar.setCompras(compras);
            personaAModificar.setTelefono(telefono);
        } else {
            throw new Error("No se puede modificar la persona especificada.");
        }
    } catch (error) {
        alert(error.message);
    }
}


btnEliminar.addEventListener("click", function () {
    eliminar(personaSeleccionada);
    abrirFila();
});


function eliminar(personaSeleccionada) {
    manejadorSpinner("dibujar");
    manejadorFormAbm("ocultar");
    manejadorFormLista("ocultar")
    let xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                borrarPersonaEnMemoria(personaSeleccionada);
                manejadorSpinner("ocultar");
                manejadorFormLista("dibujar")
                document.getElementById("tablaPersonas").innerHTML = crearTabla(personas);
                abrirFila();
            } else {
                abrirFila();
                alert("Fallo al eliminar la persona seleccionada");
                manejadorSpinner("ocultar");
                manejadorFormLista("dibujar")
            }
        }
    };
    xml.open("DELETE", 'http://localhost/vehiculoAereoTerrestre.php');
    xml.setRequestHeader("Content-Type", "application/json");
    let o = { id: personaSeleccionada.id };
    xml.send(JSON.stringify(o));
}

let borrarPersonaEnMemoria = function (personaAEliminar) {
    for (let i = 0; i < personas.length; i++) {
        if (personaAEliminar.getId() == personas[i].getId()) {
            personas.splice(i, 1);
            break;
        }
    }
}