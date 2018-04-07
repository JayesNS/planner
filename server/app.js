const http = require('http');
const express = require('express');
const xml2json = require('xml2json');
const cors = require('cors');
const app = express();

const apiConfig = require('./api-config');
app.use(cors());

const Type = {'groups': 'G', 'teachers': 'N', 'classrooms': 'S'};

const prepareUrl = (type, id, range) => {
  let url = apiConfig.url;
  url += type ? 'typ='+type+'&' : '';
  url += id ? 'id='+id+'&' : '';
  url += range ? 'okres='+range+'&' : 'okres=1&';
  url += 'xml';

  return url;
};

const getRawJSON = (url) => {

    return new Promise((res, rej) => {
        http.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                res(xml2json.toJson(data));
            });

        }).on("error", (err) => {
            rej(err);
        });
    });
};

app.get('/api/:type/:id?/:range?', (req, res) => {
    if (!req.params) {
        res.status(503);
        res.send('error');
    }

    getRawJSON(prepareUrl(Type[req.params.type], req.params.id, req.params.range)).then((data) => {
        res.json(JSON.parse(data)['plan-zajec']);
    });
});

app.listen(8000, () => {
    console.log('Server');
});
