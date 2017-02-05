/* Importar as configuracoes do servidor */
var app =  require('./config/server');

/* Parametrizar a porta de escula */
var server = app.listen(8080, function(){
	console.log('Sevidor online');
})

var io = require('socket.io').listen(server);
app.set('io', io);

/* Criar a conexao por webSocket */
io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){

		/* Dialogo */
		socket.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);
		socket.broadcast.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		/* Participantes*/
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit(
				'participantesParaClientes',
				{apelido: data.apelido}
				);

			socket.broadcast.emit(
			'participantesParaClientes', 
			{apelido: data.apelido}
		);
		}
	});
})