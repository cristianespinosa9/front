function autoInicioCategoria(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}

function traerInformacionCategorias(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
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
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            autoInicioCategoria();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
            autoInicioCategoria();
    
    
        }
        });

}


function actualizarInformacionCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            autoInicioCategoria();
            alert("Se ha actualizado correctamente la categoria")
        }
    });

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCategoria();
            alert("Se ha Eliminado.")
        }
    });

}

///////////////////Games//////////////////////////////////////

function autoInicioGames(){
    
    $.ajax({
        url:"http://localhost:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaGames(respuesta);
             
        }
    
    })

}




function traerInformacionGames(){
    $.ajax({
        url:"http://localhost:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaGames(respuesta);
        }
    });
}

function pintarRespuestaGames(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].developer+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionGames("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarGames("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionGames(){
    let var3 = {
        name:$("#Gname").val(),
        developer:$("#Gdeveloper").val(),
        year:$("#Gyear").val(),
        description:$("#Gdescription").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://localhost:8080/api/Game/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            autoInicioGames();
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            
            alert("No se guardo correctamente");
            autoInicioGames();
    
    
        }
        });

}

function actualizarInformacionGames(idElemento){
    let myData={
        id:idElemento,
        name:$("#Gname").val(),
        developer:$("#Gdeveloper").val(),
        year:$("#Gyear").val(),
        description:$("#Gdescription").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Game/update",
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
            alert("Se ha actualizado correctamente el Juego")
            autoInicioGames();
        }
    });

}

function borrarGames(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Game/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            autoInicioGames();
            alert("Se ha Eliminado.")
        }
    });

}


//////////////////////Clientes//////////////////////////////////

function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarCliente(respuesta);
        }
    
    })

}
function pintarCliente(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function traerInformacionClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaGames(respuesta);
        }
    });
}

function guardarInformacionClientes(){
    let var2 = {
        
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            autoInicioCliente();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            autoInicioCliente();
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            autoInicioCliente();
            alert("Se ha actualizado correctamente Cliente")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")
        }
    });

}


//////////////////////Mensaje//////////////////////////////////

function autoInicioMessage(){
    
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
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
        url:"http://localhost:8080/api/Message/all",
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
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMessage("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMessage("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMessage(){
    let var5 = {
        messageText:$("#messageText").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),
        
        url:"http://localhost:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            autoInicioMessage();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
            alert("No se guardo correctamente");
            autoInicioMessage();
    
    
        }
        });

}


function actualizarInformacionMessage(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messageText").val("");
            autoInicioMessage();
            alert("Se ha actualizado correctamente Mensaje")
        }
    });

}

function borrarMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioMessage();
            alert("Se ha Eliminado.")
        }
    });

}






//////////////////////Reservatiom//////////////////////////////////
function autoInicioReservation(){
    
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
             
        }
    
    })

}


function traerInformacionReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
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
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionReservation("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarReservation("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function guardarInformacionReservation(){
    let var6 = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var6),
        
        url:"http://localhost:8080/api/Reservation/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            traerInformacionReservation();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
            alert("No se guardo correctamente");
            traerInformacionReservation();
    
    
        }
        });
    }

    function actualizarInformacionReservation(idElemento){
        let myData={
            idReservation:idElemento,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
    
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://localhost:8080/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                autoInicioReservation();
                alert("Se ha actualizado correctamente la Reservacion")
            }
        });
    
    }
    
    function borrarReservation(idElemento){
        let myData={
            idMessage:idElemento
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://localhost:8080/api/Reservation/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                autoInicioReservation();
                alert("Se ha Eliminado.")
            }
        });
    
    }
    
