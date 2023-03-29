import {createRef, makeRef, range, useLogger, useRandom} from '@motion-canvas/core/lib/utils';
import { makeScene2D } from '@motion-canvas/2d';
import { all , chain, loop, waitFor} from '@motion-canvas/core/lib/flow';
import { Rect, Txt, Layout, Node} from '@motion-canvas/2d/lib/components';
import { blur, hue, invert } from '@motion-canvas/2d/lib/partials';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { Color } from '@motion-canvas/core/lib/types';
import { easeInQuint, easeOutQuint } from '@motion-canvas/core/lib/tweening';


export default makeScene2D(function* (view) {
    // const colors: Color[] = ["131B17","9FBCB5","587e75","519172","70a354","aeac26","ffa600","ffc75f"].map(i => new Color(i))
    // const colors: Color[] =["fefae0", "ccd5ae","e9edc9","F8E5B5","d4a373"].map(i => new Color(i))
    const colors: Color[] =["FFF9FF","cdb4db","ffc8dd","ffafcc","bde0fe","a2d2ff"].map(i => new Color(i))
    const random = useRandom()
    const rects: Rect[] = []
    const txts: Txt[] = []
    const nsquares = 15;
    const nloops = 5;
    const trans_time = 1;

    const rnumbers = range(nsquares).map(i => random.intArray(nloops+1, 1,colors.length))

    view.fill(colors[0])
    view.add(
        <>
        {/* <Rect layout
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

        </Rect> */}


         <Rect layout
         width={1400}
         alignContent={'space-evenly'}
         justifyContent={'space-evenly'}
         wrap={'wrap'}
         >
            {range(nsquares).map(i => 
            <Rect 
                ref={makeRef(rects, i)}
                margin={10}
                width={250}
                height={250}
                fill={colors[1]}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Rect
                width={90}
                height={100}
                radius={20}
                fill={colors[0]+ '00'}
                >
                    <Txt ref={makeRef(txts, i)}
                    shadowBlur={6}
                    shadowColor={'fff'}
                    fill={'000'}
                    width={'100%'}
                    alignItems={'center'}
                    textAlign={'center'}
                    fontFamily={'sans-serif'}
                    fontSize={80}
                    />
                </Rect>
            </Rect>
                )}
         </Rect>
        </>
    )

    yield* all(...rects.map( (rect, i) => 
        rect.fill(colors[rnumbers[i][0]], 0.5, easeInQuint)
        ),
        ...txts.map( (txt, i) => 
        txt.text(String(rnumbers[i][0]), 0.5, easeInQuint)
        ),
        waitFor(2)
    )
    yield* loop(nloops, nloop =>
        all(...rects.map( (rect, i) => 
            rect.fill(colors[rnumbers[i][nloop]], trans_time, easeInQuint).to(colors[rnumbers[i][nloop+1]], trans_time, easeInQuint)
            ),
            ...txts.map( (txt, i) => 
            txt.text(String(rnumbers[i][nloop]), trans_time, easeInQuint).to(String(rnumbers[i][nloop+1]), trans_time, easeInQuint)
            ),
            waitFor(2)
        )
    )
    waitFor(3)
})
