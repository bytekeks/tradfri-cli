#!/usr/bin/env node

const debug = require('debug')('tradfri-cli:index');
const api = require('./api');

const doit = async () => {
  const myLamps = new api();

  await myLamps.connect();

  //await myLamps.switchOff('MyCoolLampName');

  // await myLamps.switchOn('MyCoolLampName');

  await myLamps.setBrightness('MyCoolLampName', 100);

  // glow, white, warm
  await myLamps.setColour('MyCoolLampName', 'white');

  await myLamps.close();
};

doit();