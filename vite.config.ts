import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

export default defineConfig({
  plugins: [motionCanvas({
    project:
      ["./src/project.ts",
      "./src/batch_obj/batch_obj.ts",
      "./src/plots/plots.ts",
      "./src/random_gen/random_gen.ts"
      ]
  })],
});
