import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Node, Line, Layout, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {createRef, makeRef, range} from '@motion-canvas/core/lib/utils';
import {all, chain} from '@motion-canvas/core/lib/flow';
import {createSignal} from '@motion-canvas/core/lib/signals';
import { Origin, Vector2 } from '@motion-canvas/core/lib/types';
import {useLogger} from '@motion-canvas/core/lib/utils';

/// not doable until SPLINES components are out


export default makeScene2D(function* (view) {
    const colors = ["131B17","9FBCB5","587e75","519172","70a354","aeac26","ffa600","ffc75f"];

    view.fill(colors[0])
    view.add(
        <>
            <Line 
            fill={colors[1]}
            closed
            points={[
                [0,0],
                [0,100],
                [100,100],
                [100,0],
                [0,0]
            ]}
            />
        </>
    )

    yield* all()

})