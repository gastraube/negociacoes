class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){
        return new Promise((resolve, reject) => {

            this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                console.log(erro)
                reject('Não foi possível obter as negociações da semana.')
            });
            
        }); 
    }

    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject) => {

            this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                console.log(erro)
                reject('Não foi possível obter as negociações da semana anterior.')
            });
            
        }); 
    }

    obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {

            this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                console.log(erro)
                reject('Não foi possível obter as negociações da semana retrasada.')
            });
            
        });
    }

    cadastra(negociacao) {
        return ConnectionFactory
           .getConnection()
           .then(conexao => new NegociacaoDao(conexao))
           .then(dao => dao.adiciona(negociacao))
           .then(() => 'Negociação cadastrada com sucesso')
           .catch(erro => {
               console.log(erro);
               throw new Error("Não foi possível adicionar a negociação")
           });
   }

   lista(){
    return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos())
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível obter as Negociações.');
        })

   }

   apaga(){
    return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso.')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações.');
            });
   }

    //EXEMPLO PRATICO
    // let promise = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve('PROMISE RESOLVIDA'), 5000);
    // });

    // promise.then(resultado => console.log(resultado));
}