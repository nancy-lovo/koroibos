var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test get all olympians', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympic cascade');

    let aanei = {
      "name": "Andreea Aanei",
      "sex": "F",
      "age": 22,
      "height": 170,
      "weight": 125,
      "team": "Romania",
      "games": "2016 Summer",
      "sport": "Weightlifting",
      "event": "Weightlifting Women's Super-Heavyweight",
      "medal": null
    };

    let sanjun = {
      "name": "Nstor Abad Sanjun",
      "sex": "M",
      "age": 23,
      "height": 167,
      "weight": 64,
      "team": "Spain",
      "games": "2016 Summer",
      "sport": "Gymnastics",
      "event": "Gymnastics Men's Individual All-Around",
      "medal": null
    };

    let dascl = {
      "name": "Ana Iulia Dascl",
      "sex": "F",
      "age": 13,
      "height": 183,
      "weight": 60,
      "team": "Romania",
      "games": "2016 Summer",
      "sport": "Swimming",
      "event": "Swimming Women's 100 metres Freestyle",
      "medal": null
    };

    await database('olympic').insert(aanei, 'id');
    await database('olympic').insert(sanjun, 'id');
    await database('olympic').insert(dascl, 'id');
  });

  afterEach(() => {
    database.raw('truncate table olympic cascade');
  });

  describe('test olympians GET', () => {
    it('happy path', async () => {
      const res = await request(app).get("/api/v1/olympians");

      expect(res.statusCode).toBe(200);

      expect(res.body['olympians'][0]).toHaveProperty('name');
      expect(res.body['olympians'][0].name).toEqual('Andreea Aanei');

      expect(res.body['olympians'][0]).toHaveProperty('team');
      expect(res.body['olympians'][0].team).toEqual('Romania');

      expect(res.body['olympians'][0]).toHaveProperty('age');
      expect(res.body['olympians'][0].age).toEqual(22);

      expect(res.body['olympians'][0]).toHaveProperty('sport');
      expect(res.body['olympians'][0].sport).toEqual('Weightlifting');

      expect(res.body['olympians'][0]).toHaveProperty('total_medals_won');
      expect(res.body['olympians'][0].total_medals_won).toEqual(0)

    });

    it('sad path', async () => {
      const res = await request(app).get("/api/v1/olympian");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toEqual('Not Found');
    });
  });

  describe('test GET youngest olympian', () => {
    it('happy path', async () => {
      const res = await request(app).get("/api/v1/olympians?age=youngest");

      expect(res.statusCode).toBe(200);

      expect(res.body['data'][0]).toHaveProperty('name');
      expect(res.body['data'][0].name).toEqual('Ana Iulia Dascl');

      expect(res.body['data'][0]).toHaveProperty('team');
      expect(res.body['data'][0].team).toEqual('Romania');

      expect(res.body['data'][0]).toHaveProperty('age');
      expect(res.body['data'][0].age).toEqual(13);

      expect(res.body['data'][0]).toHaveProperty('sport');
      expect(res.body['data'][0].sport).toEqual('Swimming');

      expect(res.body['data'][0]).toHaveProperty('total_medals_won');
      expect(res.body['data'][0].total_medals_won).toEqual(0)

    });
  });
});
