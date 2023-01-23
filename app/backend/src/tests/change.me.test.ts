import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
// import LoginController from '../controllers/userController';

import { Response } from 'superagent';
import User from '../database/models';
// import { before, after } from 'node:test';
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
});

describe('Teste com o caminho /login', () => {
  let chaiHttpResponse: Response;

  const correctDatos = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '123456'
  }

  const correctLogin = {
    email: "admin@admin.com",
    password: "secret_admin"
  }

  const incorrectLogin = {
    email: "maycol@admin.com",
    password: "maycol_admin_secret"
  }

  const emptyPassword = {
    email: "admin@admin.com"
  }

  const emptyEmail = {
    password: "secret_admin"
  }

  enum EnumDescription {
    unauthorizedError = 401,
    success = 200,
    incorrectCredentials = 'Incorrect email or password',
    emptyFields = 'All fields must be filled',
  }

//   before(async () => {
//     sinon
//       .stub(User, "create")
//       .resolves(correctDatos as User);
//   });

//   after(()=>{
//     (User.create as sinon.SinonStub).restore();
//   })


  it('Retorna 200 com cadastro feito com os dados corretos', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(correctDatos)
       .then((res) => {
         expect(res.status).to.be.equal(200);
       }).catch((err) => {
         throw err
       }) as unknown as Response;
  });
  it('com dados incorretos, a messagem de "Incorrect email or password" e status 401', async () => {
    chaiHttpResponse  = await chai
    .request(app)
    .post('/login')
    .send(incorrectLogin)
    .then((res) => {
      expect(res.status).to.be.equal(EnumDescription.unauthorizedError);
      expect(res.body.message).to.be.equal(EnumDescription.incorrectCredentials);
    }) as Response;
  });

  it('com email vazio, a messagem de "All fields must be filled" e status 401', async () => {
    chaiHttpResponse  = await chai
    .request(app)
    .post('/login')
    .send(emptyEmail)
    .then((res) => {
      expect(res.status).to.be.equal(EnumDescription.unauthorizedError);
      expect(res.body.message).to.be.equal(EnumDescription.emptyFields);
    }) as Response;
  });

  it('com password vazio, a messagem de "All fields must be filled" e status 401', async () => {
    chaiHttpResponse  = await chai
    .request(app)
    .post('/login')
    .send(emptyPassword)
    .then((res) => {
      expect(res.status).to.be.equal(EnumDescription.unauthorizedError);
      expect(res.body.message).to.be.equal(EnumDescription.emptyFields);
    }) as Response;
  });

  describe('caso o metodo getLogin retornar com sucesso', async () => {
    it('a resposta é 200', async () => {
      chaiHttpResponse  = await chai
        .request(app)
        .post('/login')
        .send(correctLogin)
        .then((res) => {
          expect(res.status).to.be.equal(EnumDescription.success);
          expect(res.body).not.to.be.empty;
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('é um objeto', async () => {
      chaiHttpResponse  = await chai
        .request(app)
        .post('/login')
        .send(correctLogin)
        .then((res) => {
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('é um objeto não vazio', async () => {
      chaiHttpResponse  = await chai
        .request(app)
        .post('/login')
        .send(correctLogin)
        .then((res) => {
          expect(res.body).not.to.be.empty;
          expect(res.body).to.be.an('object');
      }) as Response;
    });

    it('é um objeto User onde tem: id, username, role e email', async () => {
      chaiHttpResponse  = await chai
        .request(app)
        .post('/login')
        .send(correctLogin)
        .then((res) => {
          expect(res.body.user).to.have.property('id') 
          && expect(res.body.user).to.have.property('username') 
          && expect(res.body.user).to.have.property('role') 
          && expect(res.body.user).to.have.property('email');
      }) as Response;
    });

    it('é um objeto User onde id é um número, username, role e email são strings', async () => {
      chaiHttpResponse  = await chai
        .request(app)
        .post('/login')
        .send(correctLogin)
        .then((res) => {
          expect(res.body.user.id).to.have.a('number') 
          && expect(res.body.user.username).to.have.a('string') 
          && expect(res.body.user.role).to.have.a('string') 
          && expect(res.body.user.email).to.have.a('string');
      }) as Response;
    });

      it('existem as propriedades "user e token"', async () => {
        chaiHttpResponse  = await chai
          .request(app)
          .post('/login')
          .send(correctLogin)
          .then((res) => {
            expect(res.body).to.have.property('user') 
            && expect(res.body).to.have.property('token');
        }) as Response;
      });

        it('o user é um objeto', async () => {
          chaiHttpResponse  = await chai
            .request(app)
            .post('/login')
            .send(correctLogin)
            .then((res) => {
              expect(res.body.user).to.be.a('object');
          }) as Response;
        });

        it('o token é uma string', async () => {
          chaiHttpResponse  = await chai
            .request(app)
            .post('/login')
            .send(correctLogin)
            .then((res) => {
              expect(res.body.token).to.be.a('string');
          }) as Response;
        });
    });
})

describe('testa o endpoint /login/validate', () => {
  describe('caso o metodo getUser retornar com sucesso', async () => {
    let chaiHttpResponse: Response;

    const correctLogin = {
      email: "admin@admin.com",
      password: "secret_admin"
    }

    it('com a resposta 200 e o role "admin"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(correctLogin)
      const token = chaiHttpResponse.body.token;
      const role = chaiHttpResponse.body.user.role;

      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('authorization', token)
        .then((res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.equal(role);
      }) as Response;
    });
  })
})

// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Seu teste', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   // let chaiHttpResponse: Response;

//   // before(async () => {
//   //   sinon
//   //     .stub(Example, "findOne")
//   //     .resolves({
//   //       ...<Seu mock>
//   //     } as Example);
//   // });

//   // after(()=>{
//   //   (Example.findOne as sinon.SinonStub).restore();
//   // })

//   // it('...', async () => {
//   //   chaiHttpResponse = await chai
//   //      .request(app)
//   //      ...

//   //   expect(...)
//   // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });

