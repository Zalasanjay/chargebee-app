const chargebee = require('chargebee');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

chargebee.configure({site : process.env.site, api_key : process.env.apiKey});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let PORT = process.env.PORT || '2200';

/* Get Plans List With Limit Attribute Default Limit = 10 */
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
    console.log('Info Plans List');
    res.send(resp);
  }).catch(err => {
    console.log('Error Plans List');
    res.send(err);
  });
});

/* Retrieve Plan With Id */
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
    console.log('Info Plans Get', planId);
    res.send(resp);
  }).catch(err => {
    console.log('Error Plans Get', planId);
    res.send(err);
  });
});

/* Get Plan List With Limit Attribute */
app.get('/plans', function (req, res) {
  let availablePlan;
  let limit = req.query.limit || 10;
  availablePlan = new Promise (function (resolve, reject) {
    chargebee.plan.list({
      limit: limit
    }).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.list);
      }
    });
  });
  Promise.resolve(availablePlan).then(resp => {
    console.log('Info Plans List');
    res.send(resp);
  }).catch(err => {
    console.log('Error Plans List');
    res.send(err);
  });
});

/* Create New Plan */
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
    console.log('Info Plans Create');
    res.send(resp);
  }).catch(err => {
    console.log('Error Plans Create');
    res.send(err);
  });
});

/* Update Plan Definition With Plan Id */
app.put('/plans/:id', function (req, res) {
  let updatedPlan;
  let updatePlanId = req.params.id;
  let updatePlanObj = req.body;
  updatedPlan = new Promise (function (resolve, reject) {
    chargebee.plan.update(updatePlanId, updatePlanObj).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  Promise.resolve(updatedPlan).then(resp => {
    console.log('Info Plans Update ', updatePlanId);
    res.send(resp);
  }).catch(err => {
    console.log('Error Pllans Update ', updatePlanId);
  });
});

/* Create New Subscription With Customer */
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
    console.log('Info Subscriptions Create');
    res.send(resp);
  }).catch(err => {
    console.log('Error Subscription Create');
    res.send(err);
  });
});

/* Get Subscription List With Limit Attribute Default Limit = 10 */
app.get('/subscriptions', function (req, res) {
  let availableSubscription;
  let limit = req.query.limit || 10;
  availableSubscription = new Promise (function (resolve, reject) {
    chargebee.subscription.list({
      limit : limit
    }).request(function (error, result) {
        if(error) {
          reject(error);
        } else {
          resolve(result.list);
        }
      });
    });
  Promise.resolve(availableSubscription).then(resp => {
    console.log('Info Subscriptions List');
    res.send(resp);
  }).catch(err => {
    console.log('Error Subscriptions List');
    res.send(err);
  });
});

/* Retrieve Subscription With Id */
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
    console.log('Info Subscription Get ', subId);
    res.send(resp);
  }).catch(err => {
    console.log('Error Subscription Get ', subId);
    res.send(err);
  });
});

/* Update Subscription With Id */
app.put('/subscriptions/:id', function (req, res) {
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
    console.log('Info Subscriptions Update ', updateSubId);
    res.send(resp);
  }).catch(err => {
    console.log('Error Subscription Update ', updateSubId);
    res.send(err);
  });
});

/* Get Addon List With Limit Attribute Default Limit = 10 */
app.get('/addons', function (req, res) { 
  let availableAddon;
  let limit = req.query.limit || 10;
  availableAddon = new Promise (function (resolve, reject) { 
    chargebee.addon.list({
      limit: limit
    }).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  Promise.resolve(availableAddon).then(resp => {
    console.log('Info Addons List');
    res.send(resp);
  }).catch(err => {
    console.log('Error Addons List');
    res.send(err);
  });
});

/* Retrieve Addon With Id */
app.get('/addons/:id', function (req, res) {
  let availableAddon; 
  let addonId = req.params.id;
  availableAddon = new Promise (function (resolve, reject) {
    chargebee.addon.retrieve(addonId).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  Promise.resolve(availableAddon).then(resp => {
    console.log('Info Addons Get ', addonId);
    res.send(resp);
  }).catch(err => {
    console.log('Error Addons Get', addonId);
    res.send(err);
  });
});

/* Create New Addon */
app.post('/addons', function (req, res) {
  let addonDefinition = req.body;
  let createdaAddon;
  createdaAddon = new Promise (function (resolve, reject) {
    chargebee.addon.create(addonDefinition).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.addon);
      }
    });
  });
  Promise.resolve(createdaAddon).then(resp => {
    conosole.log('Info Addons Create');
    res.send(resp);
  }).catch(err => {
    console.log('Error Addons Create', err);
    res.send(err);
  });
});

/* Update Addon With Id */
app.put('/addons/:id', function (req, res) {
  let updatedAddon; 
  let updateAddonId = req.params.id;
  let updateAddonObj = req.body;
  updatedAddon = new Promise (function (resolve, reject) {
    chargebee.addon.update(updateAddonId, updateAddonObj).request(function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  Promise.resolve(updatedAddon).then(resp => {
    console.log('Info Addons Update ', updateAddonId);
    res.send(resp);
  }).catch(err => {
    console.log('Error Addons Update ', updateAddonId);
    res.send(err);
  });
});

app.post('/changefeeds', function (req, res) {
  console.log(req.body);
});

let server = app.listen(PORT, (port) => { 
  console.log('Probably listening to %s',PORT);
});