
/* ----- acessibilidade_corrigido.js ----- */
window.onload = init;
document.onclick = setaAcao;

var browser = null;
var versao_brw = null;
var arrayAssociacoes = null;
var handlersOnSubmitForm = null;
var handlersOnFocusInput = null;
var formularios = null;
var qntFormularios = 0;
var qntItensTotal = 0;
var qntItensAux = 0;

//Classe AssociacaoElementoHandler
function AssociacaoElementoHandler(elemento,handler)
{
		this._elemento = elemento;
		this._handler = handler;
}
AssociacaoElementoHandler.prototype._elemento;
AssociacaoElementoHandler.prototype._handler;
AssociacaoElementoHandler.prototype.getElemento = function(){return this._elemento}
AssociacaoElementoHandler.prototype.getHandler = function(){return this._handler}
//Fim da classe


function chamaHandlerOriginal(obj, arrayHandler)
{
	var strHandler = '';
	var indChaveInicial;
	var indChaveFinal;
	var tamArrayHandler = arrayHandler.length; 

	for (var i = 0; i < tamArrayHandler; ++i)
	{
		try
		{
			objAEH = arrayHandler[i];
			if (obj == objAEH.getElemento())
			{
				strHandler = objAEH.getHandler().toString();
				indChaveInicial = strHandler.indexOf('{');
				indChaveFinal = strHandler.lastIndexOf('}');
				eval(strHandler.substring(indChaveInicial,indChaveFinal+1));
				return;
			}
			
		}
		catch (error)
		{
			continue;
		}
	}


	return;
}

function onSubmit()
{
	var indiceFormulario = -1;
	var elementos = this.elements;
	var qntElementos = elementos.length;
	var j = 0

	for (var i = 0; i < qntElementos; ++i)
	{
		if (elementos[i].value == '|')
		{
			elementos[i].value = '';
		}
	}
	
	try
	{
		chamaHandlerOriginal(this, handlersOnSubmitForm);			
	}
	catch (error)
	{

	}
}

function onFocus()
{
	if (this.value == '|')
	{
		this.value = '';
	}
	try
	{
		chamaHandlerOriginal(this, handlersOnFocusInput);			
	}
	catch (error)
	{
	}

	return;
}

function verificaForms()
{
	var itensFormulario = null;
	var qntItensFormulario = 0;
	var k = 0;

	try
	{
		formularios = document.forms;
		qntFormularios = formularios.length;
		handlersOnFocusInput = null;

		for (var i = 0; i < qntFormularios; ++i)
		{
			if (i == 0)
			{
				//Instanciando array que comportara eventuais handlers "onsubmit" dos formularios contidos na pagina
				handlersOnSubmitForm = new Array(qntFormularios);
			}
			/*
			Existe handler para o evento "onsubmit" do form?
			Se sim, guarda-se o handler no array para que ele (o handler) seja chamado
			posteriormente depois de rodar o NOSSO handler para o evento.
			Assim, nosso handler sera chamado sempre antes do handler original (se existir um).

			*/
			if (formularios[i].onsubmit)
			{	
				handlersOnSubmitForm[i]	= new AssociacaoElementoHandler(formularios[i], formularios[i].onsubmit)
			}
			/*
			No submit do formulario eh verificado existem campos preenchidos com '|' e limpa tais campos, 
			isto eh feito atraves da atribuicao de um novo handler para o evento "submit" do form, 
			neste caso, o handler "onSubmit"
			*/
			formularios[i].onsubmit = onSubmit;

			itensFormulario = formularios[i].elements;
			qntItensFormulario = itensFormulario.length;

			for (var j = 0; j < qntItensFormulario; ++j)
			{	
				if (itensFormulario[j].type == 'text' || itensFormulario[j].type == 'textarea' || itensFormulario[j].type == 'password')
				{	
					// O mesmo procedimento realizado para o evento "onsubmit" dos formularios
					if (itensFormulario[j].onfocus)
					{
						if (j == 0)
						{	
							/*
							Instanciando array que contera eventuais handlers "onfocus" 
							dos campos "text" ou "textarea" de TODOS os formularios da pagina
							*/
							if (!handlersOnFocusInput)
							{
								handlersOnFocusInput = new Array(qntItensFormulario);
							}
						}

						handlersOnFocusInput[k] = new AssociacaoElementoHandler(itensFormulario[j], itensFormulario[j].onfocus);
						k++;
					}
					itensFormulario[j].onfocus = onFocus;
					/*
					Se o campo ja vem com algum valor (como retorno de um processamento daquele formulario, por exemplo)
					nenhum valor deve ser setado naquele campo	
					*/
					if (!itensFormulario[j].value) 
					{
						itensFormulario[j].value = '|';
					}

				}
			}

		}
		return;
	}
	catch (error)
	{
		
	}
}


function init()
{	
	if (!browser)
	{
		browser = navigator.appName;
		versao_brw = navigator.appVersion;

	}

	try
	{	
		exibeCamposConsultasPublicas();
	}
	catch (error)
	{
		try
		{
			testCamposForumConsultasPublicas();				
		}
		catch (error)
		{

		}

	}

	try
	{
		corrigeTamDivContainer();
	}
	catch (error)
	{
	}


	//Classe AssociacaoElementoFuncao
	function AssociacaoElementoFuncao(idElemento, idFuncao, paramFuncao)
	{
			this._idElemento = idElemento;
			this._idFuncao = idFuncao;
			this._paramFuncao = paramFuncao;
	}
	AssociacaoElementoFuncao.prototype._idElemento;
	AssociacaoElementoFuncao.prototype._idFuncao;
	AssociacaoElementoFuncao.prototype._paramFuncao;
	AssociacaoElementoFuncao.prototype.getIdElemento = function(){return this._idElemento}
	AssociacaoElementoFuncao.prototype.getIdFuncao = function(){return this._idFuncao}
	AssociacaoElementoFuncao.prototype.getParamFuncao = function(){return this._paramFuncao}
	//Fim da classe

	//Associando id dos botoes com suas respectivas acoes
	arrayAssociacoes = new Array();
	arrayAssociacoes[0] = new AssociacaoElementoFuncao('cb_boletim','testCamposBoletim', null);
	arrayAssociacoes[1] = new AssociacaoElementoFuncao('cb_forum','testCamposForumConsultasPublicas', null);
	arrayAssociacoes[2] = new AssociacaoElementoFuncao('cb_consultas_publicas','testCamposForumConsultasPublicas', null);
	arrayAssociacoes[3] = new AssociacaoElementoFuncao('representaempresa','testEmpresa', null);
	arrayAssociacoes[4] = new AssociacaoElementoFuncao('pt_toggle','toggleSelect', new Array('elemento','\'portal_type:list\'','true'));
	arrayAssociacoes[5] = new AssociacaoElementoFuncao('rs_toggle','toggleSelect', new Array('elemento','\'review_state:list\'','true'));
	arrayAssociacoes[6] = new AssociacaoElementoFuncao('selecionaTodosItens','window.frames[\'frameConsultasPublicas\'].selecionarTodos', new Array('elemento.form','\'selecionaTodosItens\'','\'itensAcompanhamento\''));

	verificaForms();

}


function setaAcao(e)
{

	//Associando id dos botoes com suas respectivas acoes
	arrayAssociacoes = new Array();
	arrayAssociacoes[0] = new AssociacaoElementoFuncao('cb_boletim','testCamposBoletim', null);
	arrayAssociacoes[1] = new AssociacaoElementoFuncao('cb_forum','testCamposForumConsultasPublicas', null);
	arrayAssociacoes[2] = new AssociacaoElementoFuncao('cb_consultas_publicas','testCamposForumConsultasPublicas', null);
	arrayAssociacoes[3] = new AssociacaoElementoFuncao('representaempresa','testEmpresa', null);
	arrayAssociacoes[4] = new AssociacaoElementoFuncao('pt_toggle','toggleSelect', new Array('elemento','\'portal_type:list\'','true'));
	arrayAssociacoes[5] = new AssociacaoElementoFuncao('rs_toggle','toggleSelect', new Array('elemento','\'review_state:list\'','true'));
	arrayAssociacoes[6] = new AssociacaoElementoFuncao('selecionaTodosItens','window.frames[\'frameConsultasPublicas\'].selecionarTodos', new Array('elemento.form','\'selecionaTodosItens\'','\'itensAcompanhamento\''));


	var elemento = '';

	// Se o browser for IE o "alvo" da acao eh o objeto event (regra)
	elemento = (browser == 'Netscape') ? e.target : event.srcElement;
	for (var i=0; i < arrayAssociacoes.length; ++i)
	{
		if (elemento.id == arrayAssociacoes[i].getIdElemento())
		{
			if (!arrayAssociacoes[i].getParamFuncao())
				eval(arrayAssociacoes[i].getIdFuncao()+'(elemento);');
			else
				eval(arrayAssociacoes[i].getIdFuncao()+'('+arrayAssociacoes[i].getParamFuncao()+')');
		}
	}

}


function retiraPipe()
{
	formularios = document.forms;
	qntFormularios = formularios.length;
	
	for (var i = 0; i < qntFormularios; ++i)
	{
		itensFormulario = formularios[i].elements;
		qntItensFormulario = itensFormulario.length;
		for (var j = 0; j < qntItensFormulario; ++j)
		{	
			try{
				if(itensFormulario[j].value == '|')
				{
					itensFormulario[j].value = '';
				}
			}
			catch(error)
			{
				
			}
		}
		
	}	
}
