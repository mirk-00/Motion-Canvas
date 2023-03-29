import {makeProject} from '@motion-canvas/core';

import lineplots from './lineplots?scene';
import filledline from './filled_line?scene';

import '../global.css';

export default makeProject({
  scenes: [
          // lineplots, 
          filledline,
  ],
});

