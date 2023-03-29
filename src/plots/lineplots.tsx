import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Node, Line, Layout, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {createRef, makeRef, range} from '@motion-canvas/core/lib/utils';
import {all, chain} from '@motion-canvas/core/lib/flow';
import {createSignal} from '@motion-canvas/core/lib/signals';
import { Origin, Vector2 } from '@motion-canvas/core/lib/types';
import {useLogger} from '@motion-canvas/core/lib/utils';
import {default as linspace} from '@stdlib/array-linspace'
import { easeInOutBack, easeInOutCirc, easeInOutElastic, easeInOutExpo, easeInOutQuad, easeInOutQuart, linear } from '@motion-canvas/core/lib/tweening';

// declare function require(name:string);


export default makeScene2D(function* (view) {
    const line1 = createRef<Line>();
    const axes = createRef<Node>();
    const movingcircle = createRef<Circle>();
    const endtime = createSignal(0);
    const length = createSignal(80);
    const colors = ["131B17","9FBCB5","587e75","519172","70a354","aeac26","ffa600","ffc75f"];
    const steps = 500

    const logger = useLogger();
    let xvalues:number[] = [].slice.call(linspace(0,2*Math.PI,steps));
    const pos = xvalues.map<[number, number]>(x => (
        [-270+ x*length(), 1.7*length()*Math.sin(x)]
    ))
    xvalues = pos.map(tuple => tuple[0])
    let yvalues = pos.map(tuple => tuple[1])

    const circpos = createSignal(() => line1().getPointAtPercentage(1-endtime()).position)
    const stdx = createSignal(() => Math.round((circpos().x - Math.min(...xvalues)) / (Math.max(...xvalues)-Math.min(...xvalues))*1000*2)/1000 )
    const stdy = createSignal(() => Math.round(-2*((circpos().y - Math.min(...yvalues)) / (Math.max(...yvalues)-Math.min(...yvalues)) -0.5)*1000)/1000 )
    
    const spacing = 100
    const scale = 1.5
    const circles: Circle[] = [];
    

    view.fill(colors[0])
    view.add(
        <>
        <Rect 
        width={1920}
        height={1080}
        x={-58}
        y={-58}
        scale={()=>scale}
        clip
        > 
        {range(400).map(i => (
            <Circle ref={makeRef(circles, i)} 
            width={4}
            height={4}
            x={() => -view.width()/2 + spacing * (i % 20)}
            y={() => -view.width()/2 + spacing * (Math.floor(i/20))}
            fill={'#E7E7E7'}
            opacity={0.4}
            />
        ))}
        </Rect>

        <Node ref={axes}    
        >
            <Line 
                lineWidth={8}
                stroke={colors[1]}
                endArrow
                startOffset={30}
                points={[
                    [-300, 0],
                    [300, 0],
                ]}
            />
            <Line 
                lineWidth={8}
                stroke={colors[1]}
                endArrow
                startOffset={30}
                points={[
                    [-300, 300],
                    [-300, -300],
                ]}
            />
        </Node>

        <Line ref={line1}
            lineWidth={10}
            stroke={colors[3]}
            start={() => 1-endtime()}
            // // endOffset={0}
            // end={() => 1-endtime()}
            points={pos.reverse()}        />
        <Circle ref={movingcircle}
            width={30}
            height={30}
            fill={colors[6]}
            position={() => circpos()
            }
        />
        <Layout layout
        x={600}
        y={-300}
        direction={'column'}
        >
            <Txt
            padding={10}
            fill={'#fff'}
            fontFamily={'lato'}
            fontSize={60}
            text={() => "X value: " + stdx() + 'π'}
            ></Txt>
            <Txt
            padding={10}
            fill={'#fff'}
            fontFamily={'lato'}
            fontSize={60}
            text={() => 'Y value: '+stdy()}
            ></Txt>
        </Layout>
        
        </>
    )

    yield* all(
        endtime(1,6),
    )

})