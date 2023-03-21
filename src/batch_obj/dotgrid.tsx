import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Node, Layout, Rect} from '@motion-canvas/2d/lib/components';
import {createRef, makeRef, range} from '@motion-canvas/core/lib/utils';
import {all} from '@motion-canvas/core/lib/flow';
import {createSignal} from '@motion-canvas/core/lib/signals';
import { Origin } from '@motion-canvas/core/lib/types';


export default makeScene2D(function* (view) {
  const circles: Circle[] = [];
  const spacing = createSignal(100);
  const scale = createSignal(1);
  const gridRect = createRef<Rect>();
  const spins_node = createRef<Node>();
  const spinning_circles: Circle[] = [];


  const colors = ['#e76f51', '#f4a261', '#e9c46a']
  const newcolors = ['#e9c46a', '#2a9d8f', '#264653']


  view.fill('#121212')

  view.add(
    <>
    <Rect ref={gridRect}
    width={1920}
    height={1080}
    scale={()=>scale()}
    clip
    > 
        {range(400).map(i => (
            <Circle ref={makeRef(circles, i)} 
            width={4}
            height={4}
            x={() => -view.width()/2 + spacing() * (i % 20)}
            y={() => -view.width()/2 + spacing() * (Math.floor(i/20))}
            fill={'#E7E7E7'}
            />
        ))}

        <Node ref={spins_node}
        x={-600}
        >
        {range(3).map(i => (
            <Node
            rotation={i*50}
            >
                <Circle ref={makeRef(spinning_circles, i)}
                width={100}
                height={100}
                fill={colors[i]}
                x={-100}
                >
                </Circle>
            </Node>

        ))}
        </Node>
    </Rect>

    

    </>
  );

  yield* all(
    scale(2, 2).to(1, 3),
    // gridRect().rotation(45, 3).to(90, 2),
    // gridRect().width(1080, 3),
    // gridRect().height(1920, 3),
    spins_node().rotation(360, 5),
    spins_node().position.x(0, 3),
    spinning_circles[0].fill(newcolors[0], 4),
    spinning_circles[1].fill(newcolors[1], 4),
    spinning_circles[2].fill(newcolors[2], 4),
    spinning_circles[0].parent().rotation(0,3).to(70,2),
    spinning_circles[1].parent().rotation(90,3).to(120,2),
    spinning_circles[2].parent().rotation(170,3),
  );
});
