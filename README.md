# Koroibos
This repo contains a Node API that exposes 6 endpoints. They display analytical data from the 2016 Summer Olympics. These endpoints are tested and deployed to production within 2 days (it was a 48-hour take home challenge from Turing school's backend program).


#### Getting Started
- Demo: [Koroibos](http://koroibos-olympic-2020.herokuapp.com) (All endpoints must be prefixed with `/api/v1`).
- Postman is another HTTP client that can be used to test the endpoints.
- Sample requests and responses for each endpoint are shown [here](http://koroibos-olympic-2020.herokuapp.com/api-docs)
- Project management: [GitHub project board](https://github.com/nancylee713/koroibos/projects/1)


#### Schema Design
![koroibos_dbschema](https://user-images.githubusercontent.com/24424825/72316246-c5aeb200-3652-11ea-94fa-d0ee7135d1e0.png)


#### How to Use
Clone down this repo and install required dependencies.
```
$ git clone git@github.com:nancylee713/koroibos.git
$ npm install
```

Create 2 databases for test and development environments named `koroibos_olympic_test` and `koroibos_olympic_development` in PostgreSQL. Then run migrations to create tables.
```
$ knex migrate:latest
$ knex migrate:latest --env test
```

To populate the tables, connect to psql and choose the development database and run the following command in the terminal.
```
$ psql
username=# \c koroibos_olympic_development

// for olympic table
\copy olympic(name, sex, age, height, weight, team, games, sport, event, medal) FROM './data/data.csv' WITH(FORMAT csv, HEADER true, NULL 'NA')

// for events table
\copy events(event, medal, id) FROM './data/data.csv' WITH(FORMAT csv, HEADER true, NULL 'NA')

UPDATE events
    SET event_id = r.rnk
    FROM (SELECT event, DENSE_RANK() OVER ( ORDER BY event) as rnk
      FROM events
     ) r
    WHERE events.event = r.event;
```

To run the server,
```
$ node ./bin/www
```

And hit `localhost:3000/api/v1/some_endpoint` in the web browser or Postman.


#### Running Tests
To run all tests,
```
$ npm test
```

To access test coverage report,
```
$ open coverage/lcov-report/index.html
```

#### Tech Stack List
```
node 10.16.3
Knex CLI version: 0.20.7
PostgreSQL 11.5
```

#### Known Issues
Currently, `GET /api/v1/olympians?age=middle` endpoint does not return the expected error; it returns a list of all olympians regardless of the parameter(s) passed in.
```
 it('sad path', async () => {
   const res = await request(app).get("/api/v1/olympians?age=middle");

   expect(res.statusCode).toBe(404);
   expect(res.body.message).toEqual('Not Found');
 });
```


#### How to Contribute
If you'd like to contribute to this project (i.e., adding new analytical endpoints, fixing bugs, etc), simply fork this repo, clone it to your local machine, and follow the setup instructions described above. Then push any changes back to your repo, and open a new pull request.


#### Core Contributors
[Nancy Lee](https://github.com/nancylee713)
