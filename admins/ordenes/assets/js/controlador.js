let idOrden = "";
const cargarOrdenes = async () => {
    let respuesta = await fetch("http://localhost:3000/pedidos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let ordenes = await respuesta.json();
    console.log(ordenes);
    $("#tblPedidos").empty();
    ordenes.forEach(orden => {
        if(orden.estado == "Pendiente"){
            $("#tblPedidos").append(`
                <tr>
                    <td class="text-center centrado">
                        <button class="btn btn-success btn-sm" onclick="addMotorista('${orden._id}')">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </td>
                    <td class="centrado">${orden.nombreCliente}</td>
                    <td class="centrado">${orden.celularCliente}</td>
                    <td class="centrado">${orden.ubicacion}</td>
                    <td class="centrado">Lps. ${orden.totalPrice}</td>
                </tr>
            `);
        }
    });

}
cargarOrdenes();

const addMotorista = async (id) => {
    idOrden = id;
    let respuesta = await fetch(`http://localhost:3000/motoristas`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let motoristas = await respuesta.json();
    console.log(motoristas);
    $("#slcMotorista").empty();
    motoristas.forEach(motorista => {
        $("#slcMotorista").append(`
            <option value="${motorista._id}">${motorista.nombre} ${motorista.apellido}</option>
        `);
    });
    $("#modalMotorista").modal("show");

}

$("#btnAsignar").click(() => {
    asignarMotorista();
});

const asignarMotorista = async () => {
    let idMotorista = $("#slcMotorista").val();
    let respuesta = await fetch(`http://localhost:3000/motoristas/${idMotorista}/ordenes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idOrden: idOrden
        })
    });
    let orden = await respuesta.json();
    console.log(orden);
    $("#modalMotorista").modal("hide");
    cargarOrdenes();
}

const updateOrden = async (id) => {
    let respuesta = await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            estado: "En camino"
        })
    });
    let orden = await respuesta.json();
    console.log(orden);
    $("#modalMotorista").modal("hide");
    cargarOrdenes();
}
