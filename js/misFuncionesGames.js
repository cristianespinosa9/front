function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.114.127:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}




function traerInformacionGames(){
    $.ajax({
        url:"http://129.151.114.127:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaGames(respuesta);
        }
    });
}

function pintarRespuestaGames(respuesta){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<th>Nombre</th>";
        myTable+="<th>Developer</th>";
        myTable+="<th>Año</th>";
        myTable+="<th>Descripcion</th>";
        myTable+="<th>Categoria</th>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].developer+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionGames("+respuesta[i].id+")'>Actualizar</button>";
        myTable+='<td><button class = "botonGames2" onclick="cargarDatosGames(' +respuesta[i].id + ')">Editar Juego</button></td>';
        myTable+="<td> <button onclick='borrarGames("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}


function cargarDatosGames(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.114.127:8080/api/Game/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Gname").val(item.name);
            $("#Gdeveloper").val(item.developer);
            $("#Gyear").val(item.year);
            $("#Gdescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function guardarInformacionGames(){

    if($("#Gname").val().length == 0 || $("#Gdeveloper").val().length == 0 || $("#Gyear").val().length == 0 || $("#Gdescription").val().length == 0){
        alert("Todos los campos son obligatorios")
     }else{

    let var3 = {
        name:$("#Gname").val(),
        developer:$("#Gdeveloper").val(),
        year:$("#Gyear").val(),
        description:$("#Gdescription").val(),
        category:{id: +$("#select-category").val()},
        }

        let dataToSend = JSON.stringify(var3);
        console.log(var3);

        $.ajax({
        type:'POST',
        contentType: "application/json",
        url:"http://129.151.114.127:8080/api/Game/save",
        dataType: 'JSON',
        data: dataToSend,
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            $("#resultado2").empty();
            $("#Gname").val("");
            $("#Gdeveloper").val("");
            $("#Gyear").val("");
            $("#Gdescription2").val("");
            traerInformacionGames();
            alert("Se guardo correctamente");
            
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            traerInformacionGames();
            alert("No se guardo correctamente");
    
        }
        });}

}

function actualizarInformacionGames(idElemento){

    if($("#Gname").val().length == 0 || $("#Gdeveloper").val().length == 0 || $("#Gyear").val().length == 0 || $("#Gdescription").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let myData={
            id:idElemento,
            name:$("#Gname").val(),
            developer:$("#Gdeveloper").val(),
            year:$("#Gyear").val(),
            description:$("#Gdescription").val(),
            category:{id: +$("#select-category").val()},

        }
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.114.127:8080/api/Game/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#id").val("");
            $("#Gname").val("");
            $("#Gdeveloper").val("");
            $("#Gyear").val("");
            $("#Gdescription").val("");
            traerInformacionGames();
            alert("Se ha actualizado correctamente el Juego")
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Actualizo Correctamente!")
        }
    });}

}

function borrarGames(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.114.127:8080/api/Game/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            traerInformacionGames();
            alert("Se ha Eliminado.")
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });

}
