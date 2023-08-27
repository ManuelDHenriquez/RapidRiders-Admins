const login = async (user, password) => {
    //window.location.href = `../menu/menu.html`;
    let respuesta = await fetch("http://localhost:3000/admins/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        },
        body: JSON.stringify({
            usuario: user,
            contrasena: password
        })
    }); 
    let usuario = await respuesta.json();
    console.log(usuario);
    if (usuario){
        localStorage.setItem("id", usuario.usuario._id);
        localStorage.setItem("correo", usuario.usuario.correo);
        localStorage.setItem("direccion", usuario.usuario.direccion);
        window.location.href = `../menu/menu.html`;
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}

$("#login").click(function() {
    let user = $("#txtUsuario").val();
    let password = $("#txtPsw").val();
    console.log("Nada");
    login(user, password);
});
