let idCategoria = "";

const cargarCategorias = async()=>{
    let respuesta = await fetch("http://localhost:3000/categorias",{
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let categorias = await respuesta.json();
    let template = "";
    console.log(categorias);
    categorias.forEach(categoria => {
        template += `
            <tr>
                <td class="text-center centrado">
                    <button class="btn btn-success btn-sm" onclick="verCategoria('${categoria._id}')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    
                </td>
                <td class="centrado">${categoria.nombreCategoria}</td>
                <td class="text-center centrado"><img src="../../assets/${categoria.icono}" alt="${categoria.nombreCategoria}.png" style="width: 50px; height:50px;" class="rounded-pill"></td>
            </tr>
        `;
    });
    $("#tblCategorias").html(template);
}

cargarCategorias();

const verCategoria = async (id) => {
    console.log(id);
    let respuesta = await fetch(`http://localhost:3000/categorias/${id}`,{
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let categoria = await respuesta.json();
    console.log(categoria);
    idCategoria = id;
    $("#tblEmpresas").empty();
    categoria.empresas.forEach(empresa => {
        let stars = "";
        for (let i = 0; i < empresa.calificacion; i++) {
            stars += `<i class="fa-solid fa-star"></i>`;
        }
        $("#tblEmpresas").append(`
            <tr>
                <td class="text-center centrado">
                    <button class="btn btn-success btn-sm" onclick="verEmpresa('${idCategoria}','${empresa.id}')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </td>
                <td class="centrado">${empresa.nombreEmpresa}</td>
                <td class="centrado">${empresa.descripcion}</td>
                <td class="centrado">${stars}</td>
                <td class="text-center centrado"><img src="../../assets/${empresa.logo}" alt="${empresa.nombreEmpresa}.png" style="width: 50px; height:50px;" class="rounded-pill"></td>
            </tr>
        `);
    });
    $("#nomCat").text(categoria.nombreCategoria);
    $("#categorias").css("display", "none");
    $("#empresas").css("display", "block");
    $("#productos").css("display", "none");
}

$("#btnBackCategorys").click(()=>{
    $("#categorias").css("display", "block");
    $("#empresas").css("display", "none");
    $("#productos").css("display", "none");
});

const verEmpresa = async (idCat,idEmp) => {
    let respuesta = await fetch(`http://localhost:3000/categorias/${idCat}/empresas/${idEmp}/productos`,{
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let empresa = await respuesta.json();
    console.log(empresa);
    $("#tblProductos").empty();
    empresa.productos.forEach(producto => {
        $("#tblProductos").append(`
            <tr>
                <td class="centrado">${producto.nombreProducto}</td>
                <td class="centrado">${producto.descripcion}</td>
                <td class="centrado">Lps. ${producto.precio}</td>
                <td class="text-center centrado"><img src="../../assets/${producto.imagenProducto}" alt="${producto.nombreProducto}.png" style="width: 50px; height:50px;" class="rounded-pill"></td>
            </tr>
        `);
    });
    console.log(empresa);
    $("#nomEmp").text(empresa.empresa);
    $("#categorias").css("display", "none");
    $("#empresas").css("display", "none");
    $("#productos").css("display", "block");
}

$("#btnBackEmpresas").click(()=>{
    $("#categorias").css("display", "none");
    $("#empresas").css("display", "block");
    $("#productos").css("display", "none");
});

