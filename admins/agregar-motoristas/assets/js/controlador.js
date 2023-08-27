$("#btnAdd").click(function() {
    $("#mdlAddMotorista").modal("show");
});
let idMotoristaEdit = "";
const addMotorista = async () => {
    let nombre = $("#txtNombre").val();
    let apellido = $("#txtApellido").val();
    let identidad = $("#txtId").val();
    let correo = $("#txtEmail").val();
    let telefono = $("#txtTelefono").val();
    let date = $("#txtDate").val();
    let contrasena = $("#txtContrasena").val();
    let repetir = $("#txtRepetir").val();
    let decripcion = $("#txtDescripcion").val();
    let placa = $("#txtPlaca").val();

    if (nombre == "" || apellido == "" || identidad == "" || correo == "" || telefono == "" || date == "" || contrasena == "" || repetir == "" || decripcion == "" || placa == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios!',
        })
    } else {
        if (contrasena == repetir) {
            let data = {
                nombre: nombre,
                apellido: apellido,
                imagenPerfil: "",
                identificacion: identidad,
                fechaNacimiento: date,
                correo: correo,
                password: contrasena,
                celular: telefono,
                descripcionVehiculo: descripcion,
                placaVehiculo: placa.toUpperCase()
            }
            let response = await fecth ("http://localhost:3000/motoristas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Motorista agregado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
                $("#mdlAddMotorista").modal("hide");
                $("#txtNombre").val("");
                $("#txtApellido").val("");
                $("#txtId").val("");
                $("#txtEmail").val("");
                $("#txtTelefono").val("");
                $("#txtDate").val("");
                $("#txtContrasena").val("");
                $("#txtRepetir").val("");
                $("#txtDescripcion").val("");
                $("#txtPlaca").val("");
                listarMotoristas();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al agregar motorista!',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden!',
            })
        }
    }
}


const cargarMotoristas = async () => {
    let response = await fetch("http://localhost:3000/motoristas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            }
        });
    let data = await response.json();
    if(data){
        $("#tblMotoristas").empty();
        data.forEach(motorista => {
            $("#tblMotoristas").append(`
            <tr>
                <td>${motorista._id}</td>
                <td>${motorista.nombre} ${motorista.apellido}</td>
                <td>${motorista.celular}</td>
                <td>${motorista.correo}</td>
                <td>${motorista.placaVehiculo}</td>
                <td class="text-center">
                    <button class="btn btn-success btn-sm" onclick="cargarMotorista('${motorista._id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarMotorista('${motorista._id}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
            `);
        });
    }
    return data;
}

const cargarMotorista = async (id) => {
    let response = await fetch(`http://localhost:3000/motoristas/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
         }
    });
    let respuesta = await response.json();
    if(respuesta){
        $("#txtNombreEdit").val(respuesta.nombre);
        $("#txtApellidoEdit").val(respuesta.apellido);
        $("#txtEmailEdit").val(respuesta.correo);
        $("#txtTelefonoEdit").val(respuesta.celular);
        $("#txtDescripcionEdit").val(respuesta.descripcionVehiculo);
        $("#txtPlacaEdit").val(respuesta.placaVehiculo);
        idMotoristaEdit = id;
        $("#mdlEditMotorista").modal("show");
    }
}

$("#btnEditar").click(function() {
    let nombreEdit = $("#txtNombreEdit").val();
    let apellidoEdit = $("#txtApellidoEdit").val();
    let correoEdit = $("#txtEmailEdit").val();
    let telefonoEdit = $("#txtTelefonoEdit").val();
    let decripcionEdit = $("#txtDescripcionEdit").val();
    let placaEdit = $("#txtPlacaEdit").val();
    let dataEdit = {
        nombre: nombreEdit,
        apellido: apellidoEdit,
        correo: correoEdit,
        celular: telefonoEdit,
        descripcionVehiculo: decripcionEdit,
        placaVehiculo: placaEdit.toUpperCase()
    }
    editarMotorista(idMotoristaEdit,dataEdit);
});
cargarMotoristas();

const eliminarMotorista = async (id) => {
    let response = await fetch(`http://localhost:3000/motoristas/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            }
        });
    let data = await response.json();
    if(data){
        Swal.fire({
            icon: 'success',
            title: 'Motorista eliminado con exito!',
            showConfirmButton: false,
            timer: 1500
        })
        cargarMotoristas();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al eliminar motorista!',
        })
    }
}

const editarMotorista = async (id,data) => {
    let respuesta = await fetch(`http://localhost:3000/motoristas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify(data)
    });
    const dataRes = await respuesta.json();
    if(dataRes.modifiedCount == 1){
        Swal.fire({
            icon: 'success',
            title: 'Motorista editado con exito!',
            showConfirmButton: false,
            timer: 1500
        })
        $("#mdlEditMotorista").modal("hide");
        cargarMotoristas();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al editar motorista!',
        })
    }
}


$("#btnCerrarEdit").click(function() {
    $("#txtNombreEdit").val("");
    $("#txtApellidoEdit").val("");
    $("#txtEmailEdit").val("");
    $("#txtTelefonoEdit").val("");
    $("#txtDescripcionEdit").val("");
    $("#txtPlacaEdit").val("");
    $("#mdlEditMotorista").modal("hide");
});

$("#btnCerrarAdd").click(function() {
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtId").val("");
    $("#txtEmail").val("");
    $("#txtTelefono").val("");
    $("#txtDate").val("");
    $("#txtContrasena").val("");
    $("#txtRepetir").val("");
    $("#txtDescripcion").val("");
    $("#txtPlaca").val("");
    $("#mdlAddMotorista").modal("hide");
});