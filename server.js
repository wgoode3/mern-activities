const express = require('express'),
           bp = require('body-parser'),
         cors = require('cors'),
         path = require('path'),
      DB_NAME = "activities",
         port = 8000,
          app = express();

app.use(cors());
app.use(bp.json());
app.use(express.static(path.join(__dirname, './client/build')));

require('./server/utils/mongoose')(DB_NAME);
require('./server/utils/routes')(app);

app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/build/index.html'));
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});