import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import matches from '../tests/mocks/matches';
import { app } from '../app';
import { Response } from 'superagent';
import MatchModel from '../database/models/MatchModel';
import * as sinon from 'sinon';
 

chai.use(chaiHttp);

const { expect } = chai;

const correctDatos = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '123456'
}

const equalTeams = {
    "homeTeamId": 2,
    "awayTeamId": 2,
    "homeTeamGoals": 4,
    "awayTeamGoals": 4,
};

const invalidId = {
    "homeTeamId": 999,
    "awayTeamId": 3,
    "homeTeamGoals": 1,
    "awayTeamGoals": 3,
};

describe('testando a rota /matchs', () => {
  describe('a rota /matchs com getMatchs', async () => {
    describe('retornar com os dados corretos', async () => {

      let chaiHttpResponse: Response;

      it('é uma resposta 200', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .send(matches)
        .then((res) => {
          expect(res.status).to.be.deep.equal(200);
        }) as Response;
      });

      it('é um array de objetos', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .send(matches)
        .then((res) => {
          expect(res.body).to.be('array') 
          && expect(res.body[3]).to.be('object');
        }) as Response;
      });

      it('buscando todas as partidas com findAll', async () => {
        sinon
          .stub(MatchModel, "findAll")
          .resolves(matches as unknown as MatchModel[]);
        
        const { body, status } = await chai
        .request(app)
        .get('/matches');
          expect(body).to.be.deep.equal(matches);
          expect(status).to.be.deep.equal(200);
      });

      it('nao permite cadastrar uma partida com times iguais', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(equalTeams)
        .then((res) => {
          expect(res.body.message).to.be.deep.equal('It is not possible to create a match with two equal teams');
          expect(res.status).to.be.deep.equal(422);
        }) as Response;
      });
      })

      it('com o token inválido nao salva uma partida', async () => {
        const { body, status } = await chai
        .request(app)
        .post('/matchs')
        .send(matches.matchMock)
        .set({ authorization: 'tokenInválido' });
          expect(body.message).to.equal('Token must be a valid token');
          expect(status).to.be.deep.equal(401);
      });

      it('com time inexistente nao é possível salvar', async () => {
        const { body: { token } } = await chai.request(app).post('/login').send(correctDatos);
  
        const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(invalidId)
        .set({ authorization: token });
          expect(body.message).to.equal('There is no team with such id!');
          expect(status).to.be.deep.equal(404);
      });

      it('sendo possível encerrar uma partida', async () => {
        sinon
          .stub(MatchModel, "update")
          .resolves(undefined);
        
        const { body, status } = await chai
        .request(app)
        .patch('/matches/1/finish');
           expect(body.message).to.be.deep.equal('Finished');
           expect(status).to.be.deep.equal(200);
      });
  })
})