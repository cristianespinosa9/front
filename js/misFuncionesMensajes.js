function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://129.151.114.127:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


function autoInicioGames(){

    $.ajax({
        url:"http://129.151.114.127:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-game");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}


function autoInicioMessage(){
    
    $.ajax({
        url:"http://129.151.114.127:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarMessage(respuesta);
        }
    
    })

}


function traerInformacionMessage(){
    $.ajax({
        url:"http://129.151.114.127:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarMessage(respuesta);
        }
    });
}

function pintarMessage(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<th>Mensaje</th>";
        myTable+="<th>Nombre del juego</th>";
        myTable+="<th>Nombre cliente</th>";
        
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].game.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMessage("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+='<td><button class = "botonGames2" onclick="cargarDatosMessage(' +respuesta[i].idMessage + ')">Editar Mensaje</button></td>';
        myTable+="<td> <button onclick='borrarMessage("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMessage(){

    if ($("#messageText").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let var2 = {
        
        messageText:$("#messageText").val(),
        game:{id: +$("#select-game").val()},
        client:{idClient: +$("#select-client").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.114.127:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            traerInformacionMessage();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            traerInformacionMessage();
            alert("No se guardo correctamente");
    
    
        }
        });
    }
}


function actualizarInformacionMessage(idElemento){

    if ($("#messageText").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{
    
    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(),
        game:{id: +$("#select-game").val()},
        client:{idClient: +$("#select-client").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.114.127:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messageText").val("");
            traerInformacionMessage();
            alert("Se ha actualizado correctamente Mensaje")
        }
    });}

}

function cargarDatosMessage(idMessage) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.114.127:8080/api/Message/"+idMessage,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;

            $("#idMessage").val(item.idElemento);
            $("#messageText").val(item.messageText);
            $("#select-client").val(item.name);
            $("#select-game").val(item.name);
            
            

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function borrarMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.114.127:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionMessage();
            alert("Se ha Eliminado.")
        }
    });

}
