const chargebee = require('chargebee');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

chargebee.configure({site : process.env.site, api_key : process.env.apiKey});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let PORT = process.env.port || '80';

app.post('/plans', function (req, res) {
  const planDefinition = req.body;
  let createdPlan;
  createdPlan = new Promise (function (resolve, reject) {
    chargebee.plan.create(planDefinition).request(function(error,result){
      if (error) {
        reject(error);
      } else {
        resolve(result.plan);
      }
    });
  });
  Promise.resolve(createdPlan).then(resp => {
    res.send(resp);
  }).catch(err => {
    res.send(err);
  });
});

app.get('/plans', function (req, res) {
  let availablePlan;
  let limit = req.query.limit || 10;
  availablePlan = new Promise (function (resolve, reject) {
    chargebee.plan.list({
      limit : limit
    }).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.list);
      }
    });
  });
  Promise.resolve(availablePlan).then(resp => {
    res.send(resp);
  }).catch(err => {
    res.send(err);
  });
});

app.get('/plans/:id', function (req, res) {
  let availablePlan;
  let planId = req.params.id;
  availablePlan = new Promise (function (resolve, reject) {
    chargebee.plan.retrieve(planId).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.plan);
      }
    });
  });
  Promise.resolve(availablePlan).then(resp => {
    res.send(resp);
  }).catch(err => {
    res.send(err);
  });
});

app.post('/subscriptions', function (req, res) {
  const userConfiguration = req.body;
  let subscription;
  subscription = new Promise (function (resolve, reject) {
    chargebee.subscription.create(userConfiguration).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  Promise.resolve(subscription).then(resp => {
    res.send(resp);
  }).catch(err => {
    res.send(err);
  });
});

app.get('/subscriptions', function (req, res) {
  let availableSubscription;
  let limit = req.query.limit || 10;
  availableSubscription = new Promise (function (resolve, reject) {
    chargebee.subscription.list({
      limit : limit
    }).request(function (error, result) {
        if(error) {
          //handle error
          // console.log(error);
          reject(error);
        } else {
          resolve(result.list);
        }
    });
  });
  Promise.resolve(availableSubscription).then(resp => {
    res.send(resp);
  }).catch(err => {
    res.send(err);
  });
});

app.get('/subscriptions/:id', function (req, res) {
  let availableSubscription;
  let subId = req.params.id;
  availableSubscription = new Promise(function (resolve, reject) {
    chargebee.subscription.retrieve(subId).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  Promise.resolve(availableSubscription).then(resp => {
    res.send(resp);
  }).catch(err => {
    res.send(err);
  });
});

app.post('/subscriptions/:id', function (req, res) {
  let updatedSubscription;
  let updateSubId = req.params.id;
  let updateSubObj = req.body;
  updatedSubscription = new Promise(function (resolve, reject) {
    chargebee.subscription.update(updateSubId, updateSubObj).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  Promise.resolve(updatedSubscription).then(resp => {
    res.send(resp);
  }).catch(err => {
    res.send(err);
  });
});

app.post('/changefeeds', function (req, res) {
  console.log('==============================================');
  console.log(req.body);
});

let server = app.listen(PORT, (port) => { 
  console.log('ChargeBee app is running http://localhost:%s', server.address().port); 
});