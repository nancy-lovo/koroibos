var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test get all events', () => {
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

    let brougham = {
      "name": "Julie Brougham",
      "sex": "F",
      "age": 62,
      "height": 157,
      "weight": 48,
      "team": "New Zealand",
      "games": "2016 Summer",
      "sport": "Equestrianism",
      "event": "Equestrianism Mixed Dressage, Individual",
      "medal": 'Silver'
    };

    await database('olympic').insert(aanei, 'id');
    await database('olympic').insert(sanjun, 'id');
    await database('olympic').insert(dascl, 'id');
    await database('olympic').insert(brougham, 'id')
  });

  afterEach(() => {
    database.raw('truncate table olympic cascade');
  });

  describe('test events GET', () => {
    it('happy path', async () => {
      const res = await request(app).get("/api/v1/events");

      expect(res.statusCode).toBe(200);

      expect(res.body['events'].length).toEqual(4)
      expect(res.body['events'][0]).toHaveProperty('sport');
      expect(res.body['events'][0].sport).toEqual('Equestrianism');

      expect(res.body['events'][0]).toHaveProperty('events');
      expect(res.body['events'][0].events).toEqual(["Equestrianism Mixed Dressage, Individual"]);
    });

    it('sad path', async () => {
      const res = await request(app).get("/api/v1/event");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toEqual('Not Found');
    });
  });

  describe('test medalists by event id GET', () => {
    beforeEach(async () => {
      await database.raw('truncate table events cascade');
    });

    afterEach(() => {
      database.raw('truncate table olympic cascade');
      database.raw('truncate table events cascade');
    });

    it('happy path', async () => {
      let brougham = {
        "name": "Julie Brougham",
        "sex": "F",
        "age": 62,
        "height": 157,
        "weight": 48,
        "team": "New Zealand",
        "games": "2016 Summer",
        "sport": "Equestrianism",
        "event": "Equestrianism Mixed Dressage, Individual",
        "medal": 'Silver'
      };

      await database('olympic').insert(brougham, 'id')
        .then(id => {
          let equestrian_1 = {
            "event": "Equestrianism Mixed Dressage, Individual",
            "event_id": 1,
            "medal": "Silver",
            "olympian_id": id
          }

          database('events').insert(equestrian_1, 'id')
            .then(event_id => {
              const res = request(app).get(`/api/v1/events/${event_id}/medalists`);

              expect(res.statusCode).toBe(200);

              expect(res.body).toHaveProperty('event');
              expect(res.body).toHaveProperty('medalists');
            })
        })
    });

    it('sad path id out of range case 1', async () => {
      const res = await request(app).get("/api/v1/events/80/medalists");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toEqual('id is out of range. Valid range of id is 0 < id < 80');
    });

    it('sad path id out of range case 2', async () => {
      const res = await request(app).get("/api/v1/events/0/medalists");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toEqual('id is out of range. Valid range of id is 0 < id < 80');
    });
   });
});
