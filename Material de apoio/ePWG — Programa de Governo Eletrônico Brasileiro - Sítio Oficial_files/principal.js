window.onload = init;

var browser = null;
var versao_brw = null;
var arrayAssociacoes = null;
var handlersOnSubmitForm = null;
var handlersOnFocusInput = null;
var formularios = null;
var qntFormularios = 0;
var qntItensTotal = 0;
var qntItensAux = 0;

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
			reposicionaBotaoRegistrar();				
		}
		catch (error)
		{

		}

	}


}

 function atualizarCBO(node){
   document.join_form.profissao.value=node.label;
   document.join_form.cbo.value=node.data.id;
 }
 function atualizarCNAE(node){
   document.join_form.cnae_texto.value=node.label;
   document.join_form.cnae.value=node.data.id;
 }

function testEmpresa(campo){
	if(campo.checked){
		ee = document.getElementById('camposempresa');
		if(campo.value=='1'){
			  ee.style.position = 'relative';
			  ee.style.visibility= 'visible';
			  if (navigator.appName.indexOf('Explorer') != -1){
					joinForm = document.getElementById('join_form');
					reposicionaForm(joinForm);
			  }
	}else{
		ee.style.position = 'absolute';
		ee.style.top = '0px';
		ee.style.visibility="hidden";
	}
	}    
}

function testCamposForumConsultasPublicas(){
	ee = document.getElementById('camposForumConsultasPublicas');
	joinForm = document.getElementById('join_form');
	senha = document.getElementById('password');
	confirmacao_senha = document.getElementById('password_confirm');
	divContainer = document.getElementById('conteiner');
	divSecao03 = document.getElementById('uma-coluna');

	if((document.join_form.forum.checked) || (document.join_form.consultas_publicas.checked)){
		ee.style.position = 'relative';
		ee.style.visibility='visible';
		if (navigator.appName.indexOf('Explorer') != -1){
			divContainer.style.height = '1100px';
			divSecao03.style.height = '800px';
		}
		reposicionaForm(joinForm);
		if (navigator.appName.indexOf('Explorer') != -1){
			senhaX = document.getElementById('password');
			senhaX.value = senha.value;
			confirmacao_senhaX = document.getElementById('password_confirm');
			confirmacao_senhaX.value = confirmacao_senha.value;
		}
		if(document.join_form.representaempresa[0].checked){
		  representaEmpresa = document.getElementById('camposempresa');
		  representaEmpresa.style.visibility="visible";
		}
	}else{
		reposicionaBotaoRegistrar();
		ee.style.visibility="hidden";
		representaEmpresa = document.getElementById('camposempresa');
		representaEmpresa.style.visibility="hidden";
	}
}

function testCamposBoletim(){

  ee = document.getElementById('camposBoletim');
  
  if(document.join_form.boletim.checked){
	ee.style.visibility="hidden";
  }else{
	ee.style.visibility="visible";
  }
}

function reposicionaForm(form){
	if (navigator.appName.indexOf('Explorer') != -1)
	{
		joinForm.innerHTML = joinForm.innerHTML;
	}

	return;
}

function reposicionaBotaoRegistrar(){
	divConsultas = document.getElementById('camposForumConsultasPublicas');
	divContainer = document.getElementById('conteiner');
	divSecao03 = document.getElementById('uma-coluna');

	camposEmpresa = document.getElementById('camposempresa');

	if (divConsultas)
	{
		if (navigator.appName.indexOf('Explorer') != -1)
		{
			divSecao03.style.height = '550px';
			divContainer.style.height = '780px';
		}
		camposEmpresa.style.position = 'absolute';
		camposEmpresa.style.top = '0px'
		divConsultas.style.position = 'absolute';
		divConsultas.style.top = '0px';
	}


	return;
}

function comboChange(idComboBox,usado)
{ 
	comboBox = document.getElementById(idComboBox)
    indiceSelecionado = comboBox.selectedIndex
	if (indiceSelecionado != 0)
	{
		window.open(comboBox.options[indiceSelecionado].value);
    }
	if (usado) comboBox.selectedIndex = 0;
}


function atualizaData(campo){
	var dia = document.getElementById(campo.id+'_day');
	var mes = document.getElementById(campo.id+'_month');
	var ano = document.getElementById(campo.id+'_year');
	campo.value=dia[dia.selectedIndex].value+'/'+mes[mes.selectedIndex].value+'/'+ano[ano.selectedIndex].value;   
}
