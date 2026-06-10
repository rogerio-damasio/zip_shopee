const ref = db.ref("clientes")


let idcapturado = null;
$("#cancelar").hide();

//Função salvar
$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();
    let telefone = $("#telefone").val();

    if(nome === "" || email === "" || telefone === ""){
        alert('Preencha todos os campos');
        return
    }

    if (idcapturado) {//Editar
        ref.child(idcapturado).update({nome, email, telefone});
        idcapturado = null;
       cancelar();
    } else {//Salvar
        ref.push({ nome, email, telefone});    
    }

    

    limpar();
});

//------------------------------------------------//

//Puxando o ID, Nome, E-mail e telefone
ref.on("value", dados_tabela => {
    $("#lista").empty();


    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th colspan="2">Opções</th>
        </tr>
    `);


    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.email}</td>
                <td>${reg.telefone}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="excluir('${id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.email}' , '${reg.telefone}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
    });
});

//------------------------------------------------//

//Função Limpar
function limpar(){
    $("#nome").val("");
    $("#email").val("");
    $("#telefone").val("");
    $("#nome").focus("");
}

//Função Editar
function editar(id, nome, email, telefone){
    $("#nome").val(nome);
    $("#email").val(email);
    $("#telefone").val(telefone);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editanto registro...");
}

//Função Cancelar
function cancelar(){
    idcapturado = null;
    limpar();
    $("#status").text("");
    $("#salvar")
        .text("Salvar")
        .removeClass("btn-success")
        .addClass("btn-primary")
         $("#cancelar").hide();
}
 
$("#cancelar").click(function(){
    cancelar();
});
 
//Função Excluir
function excluir(id){
    if(confirm("Tem certeza que deseja excluir?")){
            db.ref("clientes/" + id).remove();
        }
}

