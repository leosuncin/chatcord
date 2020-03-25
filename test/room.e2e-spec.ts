import { INestApplication, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import * as faker from 'faker';

describe('RoomController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/room (POST)', done => {
    request(app.getHttpServer())
      .post('/room')
      .send({ name: faker.lorem.sentence(), public: faker.random.boolean() })
      .expect(HttpStatus.CREATED)
      .end(done);
  });

  it('/room/:id (GET)', done => {
    request(app.getHttpServer())
      .post('/room')
      .send({ name: faker.lorem.sentence(), public: faker.random.boolean() })
      .expect(HttpStatus.CREATED)
      .end((err, res) => {
        if (err) return done(err);

        request(app.getHttpServer())
          .get(`/room/${res.body.id}`)
          .expect(HttpStatus.OK)
          .end(done);
      });
  });

  it('/room (GET)', done => {
    request(app.getHttpServer())
      .get('/room')
      .expect(HttpStatus.OK)
      .expect(res => Array.isArray(res.body))
      .end(done);
  });

  it('/room/:id (PUT)', done => {
    request(app.getHttpServer())
      .post('/room')
      .send({ name: faker.lorem.sentence(), public: faker.random.boolean() })
      .expect(HttpStatus.CREATED)
      .end((err, res) => {
        if (err) return done(err);
        const room = res.body;
        const updates = { name: faker.lorem.sentence() };

        request(app.getHttpServer())
          .put(`/room/${room.id}`)
          .send(updates)
          .expect(HttpStatus.OK)
          .expect(
            ({ body }) =>
              body.name === updates.name && body.public === room.body,
          )
          .end(done);
      });
  });

  it('/room/:id (DELETE)', done => {
    request(app.getHttpServer())
      .post('/room')
      .send({ name: faker.lorem.sentence(), public: faker.random.boolean() })
      .expect(HttpStatus.CREATED)
      .end((err, res) => {
        if (err) return done(err);

        request(app.getHttpServer())
          .delete(`/room/${res.body.id}`)
          .expect(HttpStatus.NO_CONTENT)
          .end(done);
      });
  });
});
