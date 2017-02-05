/*Importar o modulo do framework expresss*/
var express = require('express');

/*Importar o modulo do consign*/
var consign = require('consign');

/*Importar o modulo do body-parser */
var boryParser = require('body-parser');

/*Importar o modulo do express-validator*/
var expressValidator = require('express-validator')

/*Iniciar o objeto do express*/
var app = express();

/*Setar as variaves que a 'view engine' e 'views' do express*/
app.set('view engine', 'ejs');
app.set('views', './app/views');

/*Configurar o middleware express.static*/
app.use(express.static('./app/public'));

/*Configurar o middleware body-parser*/
app.use(boryParser.urlencoded({extended: true}));

/*configurar o middleware express-validator*/
app.use(expressValidator());

/*Efetua o autoload das rotas, dos models e dos controlles para o objeto app*/
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/*Exportar o objeto app*/
module.exports = app;