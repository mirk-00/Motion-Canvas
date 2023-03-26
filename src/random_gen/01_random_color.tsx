import {makeRef, range, useRandom} from '@motion-canvas/core/lib/utils';
import { makeScene2D } from '@motion-canvas/2d';
import { all , loop} from '@motion-canvas/core/lib/flow';
import { Rect, Txt, Layout } from '@motion-canvas/2d/lib/components';
import { blur, hue, invert } from '@motion-canvas/2d/lib/partials';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { Color } from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
    const colors: Color[] = ["131B17","9FBCB5","587e75","519172","70a354","aeac26","ffa600","ffc75f"].map(i => new Color(i))
    const random = useRandom()
    const rects: Rect[] = []
    const nsquares = 5;
    const nloops = 5;
    const trans_time = 0.5;
    const totaltime = nloops * trans_time*2

    const rnumbers = range(nsquares).map(i => random.intArray(nloops, 1,8))

    new Txt('sds') 

    view.fill(colors[0])
    view.add(
        <>
        <Layout layout
         width={800}
         height={100}
         y={-350}
         alignContent={'space-evenly'}
         justifyContent={'space-evenly'}
         >
            {range(1,8).map(i => 
            <Rect 
                width={80}
                height={80}
                fill={colors[i]}
            > <Txt 
                text={String(i)}
                fontFamily={'Sans-serif'}
                fill='000'
                width={'100%'}
                textAlign={'center'}
                alignItems={'center'}

                ></Txt>
            </Rect>
                )}

        </Layout>


         <Rect layout
         width={1500}
         height={300}
         alignContent={'space-evenly'}
         justifyContent={'space-evenly'}
         >
            {range(nsquares).map(i => 
            <Rect 
                ref={makeRef(rects, i)}
                width={250}
                height={250}
                fill={colors[1]}
                children={<Txt></Txt>}
            />
                )}
         </Rect>
        </>
    )

    // yield* loop(5, () => 
    //     all(
    //     ...rects.map( (rect, i) => 
    //         rect.fill(colors[rnumbers[i][t]], trans_time).to(colors[rnumbers[i][t+1]], trans_time)
    //         )
    //     )    
    // )

    yield*    all(
            ...rects.map( (rect, i) => 
                rect.fill(colors[rnumbers[i][0]], trans_time).to(colors[rnumbers[i][1]], trans_time)
                ),
            )   
    yield*     all(
            ...rects.map( (rect, i) => 
                rect.fill(colors[rnumbers[i][1]], trans_time).to(colors[rnumbers[i][2]], trans_time)
                )
            )   
    yield*    all(
            ...rects.map( (rect, i) => 
                rect.fill(colors[rnumbers[i][2]], trans_time).to(colors[rnumbers[i][3]], trans_time)
                )
            )   
    yield*     all(
            ...rects.map( (rect, i) => 
                rect.fill(colors[rnumbers[i][3]], trans_time).to(colors[rnumbers[i][4]], trans_time)
                )
            )   
})