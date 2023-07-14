class Persona {
    nombre;
    id;
    apellido;
    edad;

    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    tostring() {
        return "ID: " + this.id + "\n" +
            "Nombre: " + this.nombre + "\n" +
            "Apellido: " + this.apellido + "\n" +
            "Edad: " + this.edad + "\n";
    }

    getId() {
        return this.id;
    }

    setId(nuevoId) {
        this.id = nuevoId;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    getApellido() {
        return this.apellido;
    }

    setApellido(nuevoApellido) {
        this.apellido = nuevoApellido;
    }

    getEdad() {
        return this.edad;
    }

    setEdad(nuevaEdad) {
        this.edad = nuevaEdad;
    }


}   
class Empleado extends Persona {
    sueldo;
    ventas;
    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);

        this.ventas = ventas;
        this.sueldo = sueldo;
    }

    getSueldo() {
        return this.sueldo;
    }

    setVentas(nuevaVenta) {
        this.ventas = this.ventas;
    }

    getVentas() {
        return this.ventas;
    }

    setSueldo(nuevoSueldo) {
        this.sueldo = nuevoSueldo;
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad,
            ventas: this.ventas,
            sueldo: this.sueldo
        });
    }
}

class Cliente extends Persona {
    compras;
    telefono;

    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }

    getCompras() {
        return this.compras;
    }

    setCompras(nuevasCompras) {
        this.compras = nuevasCompras;
    }

    getTelefono() {
        return this.telefono;
    }

    setTelefono(nuevoTelefono) {
        this.telefono = nuevoTelefono;
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad,
            compras: this.compras,
            telefono: this.telefono
        });
    }
}
