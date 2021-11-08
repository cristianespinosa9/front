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




function traerInformacionReservation(){
    $.ajax({
        url:"http://129.151.114.127:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<td>Fecha Inicio</td>";
    myTable+="<td>Fecha Devolucion</td>";
    myTable+="<td>Estado</td>";
    myTable+="<td>Juego</td>";
    myTable+="<td>Cliente</td>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].game.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionReservation("+respuesta[i].idReservation+")'>Actualizar</button>";
        
        myTable+="<td> <button onclick='borrarReservation("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function guardarInformacionReservation(){

    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{ 

    let var6 = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        game:{id: +$("#select-game").val()},
        client:{idClient: +$("#select-client").val()},
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var6),
        
        url:"http://129.151.114.127:8080/api/Reservation/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            $("#resultado5").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            alert("Se guardo correctamente");
            
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
            alert("No se guardo correctamente");
            
    
    
        }
        });}
    }

    function actualizarInformacionReservation(idElemento){

        if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
            alert("Todos los campos deben estar llenos")
        }else{
        let myData={
            idReservation:idElemento,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            game:{id: +$("#select-game").val()},
            client:{idClient: +$("#select-client").val()},
    
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.114.127:8080/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                traerInformacionReservation();
                alert("Se ha actualizado correctamente la Reservacion")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                traerInformacionReservation();
                alert("No se Actualizo Correctamente!")
            }
        });}
    
    }
    
    function borrarReservation(idElemento){
        let myData={
            idMessage:idElemento
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.114.127:8080/api/Reservation/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado5").empty();
                alert("Se ha Eliminado Correctamente.")
            }
        });
    
    }
    
    function cargarDatosReservation(id) {
        $.ajax({
            dataType: 'json',
            url:"http://129.151.114.127:8080/api/Reservation/"+id,
            type: 'GET',
    
            success: function (response) {
                console.log(response);
                var item = response;
    
                $("#startDate").val(item.startDate);
                $("#devolutionDate").val(item.devolutionDate);
                $("#status").val(item.status);
    
            },
    
            error: function (jqXHR, textStatus, errorThrown) {
    
            }
        });
    }