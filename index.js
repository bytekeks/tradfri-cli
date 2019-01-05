#!/usr/bin/env node

const debug = require('debug')('tradfri-cli:index');
const api = require('./api');
const program = require('commander');

const app = async () => {
  program
    .version('0.0.1', '-v, --version')
    .usage('[options]')
    .option('-b, --brightness <percentage>', 'Set brightness of all lights', parseInt)
    .option('-t, --temp <color_temperature>', 'Set color temperature for all lights', /^(white|glow|warm)$/i, 'warm')
    .option('-off, --switchoff', 'Switch off all lights')
//    .option('-on, --switchon', 'Switch on all lights')
    .parse(process.argv);

  const myLamps = new api();

  await myLamps.connect();

  if (program.brightness) {
    await myLamps.setBrightness('MyCoolLampName', program.brightness);
  }

  if (program.temp && !program.switchoff) {
    await myLamps.setColour('MyCoolLampName', program.temp);
  }

  if (program.switchoff) {
    await myLamps.switchOff('MyCoolLampName');
  }

  // if (program.switchoon) {
  //   await myLamps.switchOn('MyCoolLampName');
  // }

  await myLamps.close();
};

app();
