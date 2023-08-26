const login = async () => {
    let user = $("#txtUsuario").val();
    let password = $("#txtPsw").val();
    let respuesta = await fetch("http://localhost:3000/clientes/login", {
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
        localStorage.setItem("id", usuario._id);
        localStorage.setItem("correo", usuario.correo);
        localStorage.setItem("direccion", usuario.direccion);
        window.location.href = `../menu/menu.html`;
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}