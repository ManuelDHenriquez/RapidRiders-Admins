const cargar = (url) => {
    document.getElementById('informacion').src = url;
    //$('#informacion').attr("src",url);
}

$(document).ready(function () {
    $('.hijo').click( function () {
        $("#menu").prop( "checked", false );
        //console.log($(this).attr('id'))
    })
})

const idUser = localStorage.getItem("id");
console.log(`Id de usuario: ${idUser}`);

const cargarUsuario = async (id) => {
    let respuesta = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        }
    });
    let usuario = await respuesta.json();
    console.log(usuario);
}
cargarUsuario(idUser);

const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "../login/login.html";
}

