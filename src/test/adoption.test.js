require('dotenv').config();

const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');

describe('Adoptions API', function () {
  this.timeout(15000);

  let adoptionId;


  const userId = '69d474848d70288366cd6ecd';
  const petId = '69d474848d70288366cd6ecf';


  before(async function () {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }
  });


  after(async function () {
    await mongoose.connection.close();
  });

  // 🟢 GET ALL
  it('GET /api/adoptions - debería obtener todas las adopciones', async () => {
    const res = await request(app).get('/api/adoptions');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('adoptions');
    expect(res.body.adoptions).to.be.an('array');
  });

  // 🟢 CREATE
  it('POST /api/adoptions - debería crear una adopción', async () => {
    const res = await request(app)
      .post('/api/adoptions')
      .send({ userId, petId });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('adoption');
    expect(res.body.adoption).to.have.property('_id');

    adoptionId = res.body.adoption._id;
  });

  // 🟢 GET BY ID
  it('GET /api/adoptions/:id - debería obtener una adopción por id', async () => {
    const res = await request(app).get(`/api/adoptions/${adoptionId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('adoption');
    expect(res.body.adoption).to.have.property('_id');
  });

  // 🟢 DELETE
  it('DELETE /api/adoptions/:id - debería eliminar una adopción', async () => {
    const res = await request(app).delete(`/api/adoptions/${adoptionId}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Adopción eliminada correctamente');
  });
});