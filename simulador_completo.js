
  let clientesArreglo = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

function ocultarSecciones(){
  let componente= document.getElementById("parametros");
  let listaClass = componente.classList;
  listaClass.remove("activa");  // oculta

  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;
  listaClass2.remove("activa");

  let componente3 = document.getElementById("creditos");
  let listaClass3 = componente3.classList;
  listaClass3.remove("activa");
}


function mostrarSeccion(id){ // funcion q activa parte visual
  ocultarSecciones();

  let componente= document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");  //activa
}

// funcion guradar tasa
// Conectar el botón Guardar tasa con la función
// 
function guardarTasa(){
  let tasa = recuperarFloat("tasaInteres");
  if(tasa>=10 && tasa<=20){
    tasaInteres = tasa;
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+tasa+" %"); //mostrar texto: util.
  }else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10 y 20");  //funcion utilitarios
  }
}

//----- ADMINISTRACION DE CLIENTES --------

// AGREGAR ID Y PLACEHOLDER A LOS INPUTS
//CREAR ARREGLO     let clientes=[]

// FUNCION GUARDAR CLIENTES
/*
  1. Obtener datos del formulario
  2. Convertir valores numéricos
  3. Crear objeto cliente
  4. Agregarlo al arreglo   */

function guardarCliente(){

  let valorCedula =   recuperaraTexto("idCedula");
  let valorNombre =   recuperaraTexto("idNombre");
  let valorApellido = recuperaraTexto("idApellido");
  let valorIngresos = recuperarFloat("idIngresos");
  let valorEgresos =  recuperarFloat("idEgresos");

  let cliente ={};

  cliente.cedula = valorCedula;
  cliente.nombre = valorNombre;
  cliente.apellido = valorApellido;
  cliente.ingresos = valorIngresos;
  cliente.egresos = valorEgresos;

  let busqueda = buscarCliente(valorCedula);

    if(busqueda == null){
      clientesArreglo.push(cliente);    // guarda el cliente dentro de clientesArreglo[]
      pintarClientes();                 //llama a la funcion pintar para mostrar datos en la tabla  
    } else{
      busqueda.nombre = valorNombre;
      busqueda.apellido = valorApellido;
      busqueda.ingresos = valorIngresos;
      busqueda.egresos = valorEgresos;
      pintarClientes();    
    }

  limpiar();
    
}


// FUNCION PINTAR CLIENTES
/*
  1. Recorrer el arreglo
  2. Generar filas <tr> dinámicamente
  3. Insertarlas en: <tbody id="tablaClientes">
  4. Cada fila debe tener: Datos del cliente Y  Botón Actualizar  */

  /* Estructura de una tabla:

<table>
    <tr>
        <th>cabecera1</th>
        <th>cabecera2</th>
    </tr>

    <tr>
        <td>fila1</td>
        <td>fila2</td> 
    </tr>
</table>   */

  function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    let elementosTabla;
    let filaTabla = "";

    for(let i=0;  i<clientesArreglo.length; i++){
      elementosTabla = clientesArreglo[i];

      filaTabla += "<tr>"+ 
                      "<td>"+ elementosTabla.cedula     +"</td>"+
                      "<td>"+ elementosTabla.nombre     +"</td>"+
                      "<td>"+ elementosTabla.apellido   +"</td>"+
                      "<td>"+ elementosTabla.ingresos   +"</td>"+
                      "<td>"+ elementosTabla.egresos    +"</td>"+
                      "<td><button onclick='seleccionarCliente("+ elementosTabla.cedula +")'>Actualizar</button>"+"<button>"+'Eliminar'+"</button></td>"+      
                  "</tr>";      
    }
    tabla.innerHTML = filaTabla;   
  }



  //----- BUSCAR Y ACTUALIZAR --------

/*   Función buscarCliente(cedula)
● Retorna:
  ○ Cliente si existe
  ○ null si no        */
function buscarCliente(cedula){
  let elementoTabla;
  let clienteEncontrado = null;

  for(let i=0; i<clientesArreglo.length; i++){
    elementoTabla = clientesArreglo[i];
      if(elementoTabla.cedula == cedula){
        clienteEncontrado = elementoTabla;
        break;                    //encuentra el valor y suspende la ejecucion del for
      }
  }

  return clienteEncontrado;
}

/*Función seleccionarCliente(cedula)
  Debe:
      1. Buscar el cliente
      2. Guardarlo en clienteSeleccionado
      3. Mostrar datos en inputs              */

function seleccionarCliente(cedula){     // falta entender esta parte
  let resultado = buscarCliente(cedula);

  if(resultado != null){ 
      clienteSeleccionado = resultado;
      mostrarTextoEnCaja("idCedula",clienteSeleccionado.cedula);
      mostrarTextoEnCaja("idNombre",clienteSeleccionado.nombre);
      mostrarTextoEnCaja("idApellido",clienteSeleccionado.apellido);
      mostrarTextoEnCaja("idIngresos",clienteSeleccionado.ingresos);
      mostrarTextoEnCaja("idEgresos",clienteSeleccionado.egresos);
  }

}



// Función limpiar()
//   Debe vaciar todos los inputs.
function limpiar(){
  document.getElementById("idCedula").value = "";
  document.getElementById("idNombre").value = "";
  document.getElementById("idApellido").value = "";
  document.getElementById("idIngresos").value = "";
  document.getElementById("idEgresos").value = "";
}


// SIMULADOR PARTE 2 *****************************

function buscarClienteCredito(){
  
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let clienteEncontrado = buscarCliente(cedula);

  let divDatos = document.getElementById("datosClienteCredito");

  if(clienteEncontrado != null){
    clienteSeleccionado = clienteEncontrado;
    
    divDatos.innerHTML = "<h3>Datos del Cliente</h3>"+
                        "<p><strong>Cedula: </strong>" + clienteEncontrado.cedula + "</p>" +
                        "<p><strong>Nombre: </strong>" + clienteEncontrado.nombre + "</p>" +
                        "<p><strong>Apellido: </strong>" + clienteEncontrado.apellido + "</p>" +
                        "<p><strong>Ingresos: </strong>" + clienteEncontrado.ingresos + "</p>" +
                        "<p><strong>Egresos: </strong>" + clienteEncontrado.egresos + "</p>";    
  } else{
    divDatos.innerHTML = "<p>Cliente no encontrado</p>";
    clienteSeleccionado = null;
  }

} // fin de funcion


//funcion calcular capacidad de pago
function calcularCredito(){
  
  let monto = recuperarFloat("montoCredito");
  let plazo = recuperarFloat("plazoCredito");

  let capacidadPago = (clienteSeleccionado.ingresos - clienteSeleccionado.egresos) * 0.5;
  let totalPagar = monto + ((monto * tasaInteres)/100);
  let cuotaMensual = totalPagar/plazo;

  //calcula capacidad de pago
  if(cuotaMensual <= capacidadPago){
    creditoAprobado = true;
  } else{
    creditoAprobado = false;
  }

  montoCalculado = monto;
  plazoCalculado = plazo;
  cuotaCalculada = cuotaMensual;

  let divResultado = document.getElementById("resultadoCredito");
  let textoResultado ="";

  if(creditoAprobado){
    textoResultado = "APROBADO";
  }else{
    textoResultado = "RECHAZADO";
  }


  divResultado.innerHTML = "Capacidad de pago: " + capacidadPago + "<br>" +
                           "Total a pagar: " + totalPagar + "<br>" +
                           "Cuota mensual: " + cuotaMensual + "<br>" +
                           "Resultado: " + textoResultado;


  if(creditoAprobado){
    divResultado.className = "aprobado";
  }else{
    divResultado.className = "rechazado";
  }

  
  //habilitar boton segun el resultado
  let boton = document.getElementById("btnSolicitarCredito");
  if(creditoAprobado){
    boton.disabled = false;
  } else{
    boton.disabled = true;
  }

}//fin de funcion


function solicitarCredito(){
  let credito = {};
      credito.cedula = clienteSeleccionado.cedula;
      credito.nombre = clienteSeleccionado.nombre;
      credito.apellido = clienteSeleccionado.apellido;

      credito.monto = montoCalculado;
      credito.plazo = plazoCalculado;
      credito.cuota = cuotaCalculada;
      credito.tasa  = tasaInteres;

  creditos.push(credito);  //arreglo d creditos

  alert ("Credito aprobado con exito para: " + credito.nombre + " " + credito.apellido );

  document.getElementById("buscarCedulaCredito").value = "";
  document.getElementById("datosClienteCredito").innerHTML = "";
  document.getElementById("montoCredito").value = "";
  document.getElementById("plazoCredito").value = "";
  document.getElementById("resultadoCredito").innerHTML = "";
  document.getElementById("resultadoCredito").className = "";


  document.getElementById("btnSolicitarCredito").disabled = true;


  clienteSeleccionado = null;
  creditoAprobado = false;
  cuotaCalculada = 0;
  montoCalculado = 0;
  plazoCalculado = 0;




}//fin de funcion