function traerInformacionCategorias(){
    $.ajax({
        url:"http://129.151.114.127:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<th>Nombre</th>";
    myTable+="<th>Descripcion</th>";


    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+='<td><button class = "botonGames2" onclick="cargarDatosCategory(' +respuesta[i].id + ')">Editar Categoria</button></td>';
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function cargarDatosCategory(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.114.127:8080/api/Category/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Cname").val(item.name);
            $("#Cdescription").val(item.description);
            

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function guardarInformacionCategorias(){
    
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
    
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.114.127:8080/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            traerInformacionCategorias();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            traerInformacionCategorias();
            alert("No se guardo correctamente");
            
    
    
        }
        });}

}


function actualizarInformacionCategorias(idElemento){

    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{

    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.114.127:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("Se ha actualizado correctamente la categoria")
        }
    });}

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.114.127:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });

}

