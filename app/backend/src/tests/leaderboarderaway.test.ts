import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import leaderboarderAwayMock from './mocks/leaderboarderaway.mock';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa o endpoint /leaderboard/away', () => {
  describe('caso o endpoint /away com o metodo getAwayClassification', async () => {
    describe('retorna com sucesso', async () => {

      let chaiHttpResponse: Response;

      it('retorna com sucesso 200', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send(leaderboarderAwayMock)
        .then((res) => {
          expect(res.status).to.be.equal(200);
        }) as Response;
      });

      it('um array de objetos', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send(leaderboarderAwayMock)
        .then((res) => {
          expect(res.body).to.be.a('array') 
          && expect(res.body[0]).to.be.a('object');
        }) as Response;
      });

      it('um array que possui 10 propriedades', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send(leaderboarderAwayMock)
        .then((res) => {
          expect(res.body[0]).to.have.property('name')
          expect(res.body[0]).to.have.property('totalPoints')
          expect(res.body[0]).to.have.property('totalGames')
          expect(res.body[0]).to.have.property('totalVictories')
          expect(res.body[0]).to.have.property('totalDraws')
          expect(res.body[0]).to.have.property('totalLosses')
          expect(res.body[0]).to.have.property('goalsFavor')
          expect(res.body[0]).to.have.property('goalsOwn')
          expect(res.body[0]).to.have.property('goalsBalance')
          expect(res.body[0]).to.have.property('efficiency')
        }) as Response;
      });

      it('um array de objetos em que as chaves tem propriedades', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send(leaderboarderAwayMock)
        .then((res) => {
          expect(res.body).to.be.a('array')
          expect(res.body[0]).to.be.a('object');
          expect(res.body[0]).to.have.property('name')
          expect(res.body[0]).to.have.property('totalPoints')
          expect(res.body[0]).to.have.property('totalGames')
          expect(res.body[0]).to.have.property('totalVictories')
          expect(res.body[0]).to.have.property('totalDraws')
          expect(res.body[0]).to.have.property('totalLosses')
          expect(res.body[0]).to.have.property('goalsFavor')
          expect(res.body[0]).to.have.property('goalsOwn')
          expect(res.body[0]).to.have.property('goalsBalance')
          expect(res.body[0]).to.have.property('efficiency')
          expect(res.body[0].name).to.be.a('string')
          expect(res.body[0].totalPoints).to.be.a('number')
          expect(res.body[0].totalGames).to.be.a('number')
          expect(res.body[0].totalVictories).to.be.a('number')
          expect(res.body[0].totalDraws).to.be.a('number')
          expect(res.body[0].totalLosses).to.be.a('number')
          expect(res.body[0].goalsFavor).to.be.a('number')
          expect(res.body[0].goalsOwn).to.be.a('number')
          expect(res.body[0].goalsBalance).to.be.a('number')
          expect(res.body[0].efficiency).to.be.a('string')
        }) as Response;
      });
    })
  })
})