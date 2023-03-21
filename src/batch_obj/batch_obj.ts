import {makeProject} from '@motion-canvas/core';

import dotgrid from './dotgrid?scene';
import layout_grid from './layout_grid_simulation?scene';

export default makeProject({
  scenes: [
    // dotgrid,
    layout_grid
  ],
});
