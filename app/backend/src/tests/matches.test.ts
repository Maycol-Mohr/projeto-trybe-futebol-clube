// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import matches from './mocks/matches';
// import { app } from '../app';
// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('testaando a rota /matchs', () => {
//   describe('a rota /matchs com getMatchs', async () => {
//     describe('retornar com os dados corretos', async () => {

//       let chaiHttpResponse: Response;

//       it('é uma resposta 200', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/matchs')
//         .send(matches)
//         .then((res) => {
//           expect(res.status).to.be.equal(200);
//         }) as Response;
//       });

//       it('é um array de objetos', async () => {
//         chaiHttpResponse = await chai
//         .request(app)
//         .get('/matchs')
//         .send(matches)
//         .then((res) => {
//           expect(res.body).to.be.a('array') 
//           && expect(res.body[0]).to.be.a('object');
//         }) as Response;
//       });
//     })
//   })
// })