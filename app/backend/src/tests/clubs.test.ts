// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import clubs from '../tests/mocks/clubs';
// import { app } from '../app';
// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('testa o endpoint /clubs', () => {
//   describe('caso o endpoint /clubs com o metodo getClubs', async () => {
//     describe('retorna com sucesso', async () => {

//       let chaiHttpResponse: Response;

//       it('retorna com sucesso 200', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs')
//         .send(clubs)
//         .then((res) => {
//           expect(res.status).to.be.equal(200);
//         }) as Response;
//       });

//       it('um array de objetos', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs')
//         .send(clubs)
//         .then((res) => {
//           expect(res.body).to.be.a('array') 
//           && expect(res.body[0]).to.be.a('object');
//         }) as Response;
//       });

//       it('um array de objetos que possui id e name', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs')
//         .send(clubs)
//         .then((res) => {
//           expect(res.body).to.be.a('array')
//           expect(res.body[0]).to.be.a('object');
//           expect(res.body[0]).to.have.property('id')
//           expect(res.body[0]).to.have.property('name')
//         }) as Response;
//       });

//       it('um array de objetos em que a chave id é um number e o name é uma string', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs')
//         .send(clubs)
//         .then((res) => {
//           expect(res.body).to.be.a('array')
//           expect(res.body[0]).to.be.a('object');
//           expect(res.body[0]).to.have.property('id')
//           expect(res.body[0]).to.have.property('name')
//           expect(res.body[0].id).to.be.a('number')
//           expect(res.body[0].name).to.be.a('string')
//         }) as Response;
//       });
//     })
//   })
// })

// describe('testando o endpoint /clubs/:id', () => {
//   describe('com a rota /clubs/:id com o metodo getById', async () => {
//     describe('retornar com sucesso', async () => {

//       let chaiHttpResponse: Response;

//       it('resposta de sucesso 200', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs/1')
//         .send(clubs[0])
//         .then((res) => {
//           expect(res.status).to.be.equal(200);
//         }) as Response;
//       });

//       it('é um objeto', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs/1')
//         .send(clubs[0])
//         .then((res) => {
//          expect(res.body).to.be.a('object');
//         }) as Response;
//       });

//       it('um objeto que possui as propriedas id e name', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs/1')
//         .send(clubs[0])
//         .then((res) => {
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.have.property('id')
//           expect(res.body).to.have.property('name')
//         }) as Response;
//       });

//       it('um objeto em que a chave id é um number e name é uma string"', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/clubs/1')
//         .send(clubs[0])
//         .then((res) => {
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.have.property('id')
//           expect(res.body).to.have.property('name')
//           expect(res.body.id).to.be.a('number')
//           expect(res.body.clubName).to.be.a('string')
//         }) as Response;
//       });
//     })
//   })
// })
