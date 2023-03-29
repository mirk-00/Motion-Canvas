import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import snow from './scenes/snow?scene';
import audio from './scenes/audio/carol_of_the_bells.mp3'

export default makeProject({
  scenes: [snow],
  audio: audio,
  audioOffset: -15,
});
