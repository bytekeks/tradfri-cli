#!/usr/bin/env node

const debug = require('debug')('tradfri-cli:index');
const Tradfri = require('ikea-tradfri');
const config = require('./initialConfig.json');

const getCredentials = () => {
  tradfri = new Tradfri(config.tradfriGatewayUrl, config.securityCode);
  tradfri.connect()
  .then((credentials) => {
    // fs write file !!!
    console.log(credentials);
  })
  .catch((err) => {
    debug("ERROR:");
    debug(err);
    process.exit(1);
  });
};

getCredentials();