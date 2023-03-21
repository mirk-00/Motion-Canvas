import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Node, Layout, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {createRef, makeRef, range} from '@motion-canvas/core/lib/utils';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createSignal} from '@motion-canvas/core/lib/signals';
// import { Direction, Origin } from '@motion-canvas/core/lib/types';
import {linear, easeInOutBounce} from '@motion-canvas/core/lib/tweening';
// import {slideTransition} from '@motion-canvas/core/lib/transitions';



export default makeScene2D(function* (view) {
    const colors = ["131B17","9FBCB5","587e75","519172","70a354","aeac26","ffa600","ffc75f"];

    const count = createSignal(1)

    let elesize = createSignal(() => 100/Math.ceil(Math.sqrt(count())) )
    const gridsize = 600
    const paddingsize = 10
    let rect_elesize = createSignal(() => gridsize * elesize()/100)
    let circ_elesize = '100%'
    view.fill(colors[0])
    view.add(
        <>
        <Rect layout
        width={600}
        height={600}
        wrap={'wrap'}
        justifyContent={'space-evenly'}
        alignContent={'space-evenly'}
        spawner={() => 
            range(count()).map(() => <Rect 
                                    width={rect_elesize} 
                                    height={rect_elesize}
                                    padding={paddingsize}
                                    >
                                        <Circle 
                                        width={'100%'}
                                        height={'100%'}
                                        fill={colors[1]}
                                        />
                                     </Rect>)
            }
        />
        </>
    );
    
    // yield* slideTransition(Direction.Left);
    yield* waitFor(0)

    yield* all(
        count(30, 5, linear)
    )
})