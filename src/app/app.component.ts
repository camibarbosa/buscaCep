import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buscaCep';

  constructor(private http: HttpClient){}

  //forms variables
  cep: string = '';

  //variaveis de retorno
  endereco : any;
  retorno = {
    rua : '',
    cidade : '',
    estado : ''
  }

  //logadouro, localidade= cidade, uf=estado
  foiPesquisado = false;
  emEspera = false;

  pesquisa(){

    if (!this.cep) {
      // exibir uma mensagem para o usuário informando que o campo está vazio
     alert('Campo de pesquisa vazio. Insira um CEP válido.');
      return; // Sai do método sem prosseguir com a pesquisa
    }

    this.emEspera = true;
    this.cep = this.cep.replace(/\D/g, '');

    const url = 'http://viacep.com.br/ws/' + this.cep + '/json/';

    //while (true) teste = 0;
    this.http.get(url).subscribe(
      (res) => {
        this.endereco = res;
        this.retorno.rua = this.endereco.logradouro;
        this.retorno.cidade = this.endereco.localidade;
        this.retorno.estado = this.endereco.uf;
      },
      (error) => {  
        // Tratamento de erro
        console.error('Ocorreu um erro na requisição:', error);
      
      }
    );

    this.foiPesquisado = true;
    this.emEspera = false;
  }

  limpa(){
    this.foiPesquisado = false;
    this.emEspera = false;
    this.cep = "";
    this.endereco = "";
    this.retorno.rua = "";
    this.retorno.cidade = "";
    this.retorno.estado = "";

  }
}