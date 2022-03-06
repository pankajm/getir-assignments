const request  = require('supertest');
const { Record } = require('../models/records');

let server;

/**
 * Integration Test for /getCounts api 
 */

describe('/api', ()=>{

  beforeEach(async ()=>{
    server = require('../index');
    await Record.collection.insertMany([
        {
          key:'firstkey',
          value:'firstvalue',
          createdAt: new Date('2022-01-01'),
          counts:[1, 2]
        }, 
        {
          key:'secondkey',
          value:'secondvalue',
          createdAt:new Date('2022-01-10'),
          counts:[3, 4]
        }, 
        {
          key:'thirdkey',
          value:'thirdvalue',
          createdAt:new Date('2022-01-20'),
          counts:[5, 6]
        }
      ])
  })

  afterEach(async ()=>{
    server.close();
    await Record.remove();
  })

  describe('Post /getRecords', ()=>{

    it('should return 400 if one of the request parameter is missing', async ()=>{

      const res = await request(server).post('/api/getRecords').send({
          startDate: "2022-01-01",
          endDate: "2022-01-12",
          maxCount: 8
      })

      expect(res.status).toBe(400);
    })

     it('should return empty records array if it does not match with any of the condition', async ()=>{

      const res = await request(server).post('/api/getRecords').send({
          startDate: "2022-01-01",
          endDate: "2022-01-12",
          minCount:20,
          maxCount: 25
      })

      expect(res.body.records.length).toBe(0);
    })

    it('should return all records matching provided criteria', async ()=>{

      const res = await request(server).post('/api/getRecords').send({
          startDate: "2022-01-01",
          endDate: "2022-01-12",
          minCount: 1,
          maxCount: 8
      })

      expect(res.status).toBe(200);
      expect(res.body.records.length).toBe(2);
      expect(res.body).toHaveProperty('code');
      expect(res.body).toHaveProperty('msg');
      expect(res.body).toHaveProperty('records');
      expect(res.body.code).toBe(0);
      expect(res.body.msg).toMatch('success');
    })
  })
})