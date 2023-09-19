
// COMO CALCULAR CUANTO PARACETAMOL DAR A UN NINIO DEPENDIENDO DE SU PESO 
// LA INDICACION MEDICA ES ADMINISTRAR 15MG/KG DE PESO DEL PACIENTE C/ 6HRS
// LA PRESENTACION DEL PARACETAMOL ES 120MG/5ML o 100MG/ML



class Paciente {

    constructor (nombre, peso, edad, presentacion){
        this.nombre =  nombre;
        this.peso = peso;
        this.edad = edad;
        this.presentacion = presentacion
    }

    esNinio(){
        return this.edad <=12;
    }

    calcularDosis(){
        if (!this.esNinio) return;

        if (this.presentacion == 1){
            let dosisMg = this.peso * 15;
            let dosisFinal = (dosisMg / 120) * 5; 
            return dosisFinal
        }

        let dosisMg = this.peso * 15;
        let dosisFinal = (dosisMg / 100) * 1; 
        return dosisFinal
    }

    imprimir(){
        let presentacionTexto = "100mg/ml"

        if (this.presentacion == 1  ){
            presentacionTexto = "120mg/5ml"
        }

        let tabla = document.getElementById("tabla-body")

        let row = document.createElement('tr')

            const nombreColumn = document.createElement("td")
            nombreColumn.innerHTML = this.nombre;

            const edadColumn = document.createElement("td")
            edadColumn.innerHTML = this.edad

            const pesoColumn = document.createElement("td")
            pesoColumn.innerHTML = ` ${this.peso} kg`

            const presentacionColumn = document.createElement("td")
            presentacionColumn.innerHTML = presentacionTexto

            const calculoColumn = document.createElement("td")
            calculoColumn.innerHTML = `${this.calcularDosis()} ml`

            row.append (nombreColumn, edadColumn, pesoColumn, presentacionColumn, calculoColumn)

        tabla.append(row)


    }
}

let pacientes = localStorage.getItem("pacientes") == null ?[]: JSON.parse(localStorage.getItem("pacientes"))
.map(({nombre,peso,edad,presentacion}) => new Paciente(nombre,peso,edad,presentacion)) ;



function pedirDatos(){
    let nombre = document.getElementById ("nombreUsuario").value;
    let peso = document.getElementById ("pesoUsuario").value;
    let edad = document.getElementById ("edadUsuario").value;    
    let presentacion = ''
    let presentaciones = document.getElementsByName ("presentacion");

    for( let i=0; i<presentaciones.length; i++){
        if(presentaciones[i].checked) {
            presentacion = presentaciones[i].value
            break;
        }
    }

    



    const paciente = new Paciente(nombre, peso, edad, presentacion);
    pacientes.push(paciente)

    localStorage.setItem("pacientes",JSON.stringify(pacientes))

    imprimirInfo()




}


function imprimirInfo(){

 document.getElementById ("tabla-body").innerHTML = ''


let resultadoFilter = pacientes.filter(paciente=>paciente.esNinio());
 resultadoFilter.forEach(paciente=>paciente.imprimir())
}


btnCalcular.addEventListener ("click",  pedirDatos)

console.log(pacientes)
imprimirInfo();


