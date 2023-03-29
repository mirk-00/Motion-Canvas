import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Node, Line, Layout, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {createRef, makeRef, range, Reference, useRandom} from '@motion-canvas/core/lib/utils';
import {all, any, chain, loop, waitFor} from '@motion-canvas/core/lib/flow';
import { Spline, Knot} from '@motion-canvas/2d/lib/components';
import { ThreadGenerator } from '@motion-canvas/core/lib/threading';
import { easeInOutQuad, easeOutQuad, linear } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    const colors = ["131B17","9FBCB5","587e75","519172","70a354","aeac26","ffa600","ffc75f"];
    const spline = createRef<Spline>();
    const front_flakes: Circle[] = [];
    const back_flakes: Circle[] = [];
    const frontwaves: Spline[] = [];
    const random = useRandom();


    const [x0, x1] = [-400, 500];
    const [y0, y1] = [400, -400];

    view.fill('#232F2E');
    view.add(
        <>
        <Node> //back snow
            {range(300).map(i => (
                <Circle
                    width={15} 
                    height={15}
                    fill={'#ffffff12'}
                    ref={makeRef(back_flakes, i)}
                    x={random.nextInt(-1000, 1000)}
                    y={random.nextInt(400, y1-800)}
                />
            ))}
        </Node>
            {range(6).map(j => (
                <Spline
                position={[-600+x0 +j *300,y0+random.nextInt(50, 200)]}
                ref={spline}
                lineWidth={6}
                stroke={'ffffffcc'}
                opacity={0.3}
                scale={0.7}
                fill={colors[1]}
                >
                    <Knot position={[0,0]} startHandle={[50,0]}></Knot>
                    <Knot position={[50,-100]} startHandle={[50,0]}></Knot>
                    <Knot position={[100,-200]} startHandle={[50,0]}></Knot>
                    <Knot position={[200, -300]} startHandle={[50,0]}></Knot>
                    <Knot position={[300, -200]} startHandle={[50,0]}></Knot>
                    <Knot position={[400, -100]} startHandle={[50,0]}></Knot>
                    <Knot position={[500, -400]} startHandle={[50,0]}></Knot>
                    <Knot position={[600, -800]} startHandle={[50,0]}></Knot>
                    <Knot position={[700, -400]} startHandle={[50,0]}></Knot>
                    <Knot position={[800, -100]} startHandle={[50,0]}></Knot>
                    <Knot position={[900, -0]} startHandle={[50,0]}></Knot>

                </Spline>
            ))}




            <Spline
            position={[x0,y0+40]}
            lineWidth={6}
            stroke={'ffffff'}
            fill={colors[1]}
            >
                <Knot position={[0,0]} startHandle={[50,0]}></Knot>
                <Knot position={[50,-100]} startHandle={[50,0]}></Knot>
                <Knot position={[100,-200]} startHandle={[50,0]}></Knot>
                <Knot position={[200, -300]} startHandle={[50,0]}></Knot>
                <Knot position={[300, -200]} startHandle={[50,0]}></Knot>
                <Knot position={[400, -100]} startHandle={[50,0]}></Knot>
                <Knot position={[500, -400]} startHandle={[50,0]}></Knot>
                <Knot position={[600, -800]} startHandle={[50,0]}></Knot>
                <Knot position={[700, -400]} startHandle={[50,0]}></Knot>
                <Knot position={[800, -100]} startHandle={[50,0]}></Knot>
                <Knot position={[900, -0]} startHandle={[50,0]}></Knot>

            </Spline>
            <Circle>
                width={50}
                height={50}
                fill={'#e76f51'}
                x={0}
                y={0}
            </Circle>

            <Node> //front snow
                {range(300).map(i => (
                    <Circle
                        width={15} 
                        height={15}
                        scale={random.nextFloat(0.7, 1.1)}
                        fill={'#ffffff99'}
                        ref={makeRef(front_flakes, i)}
                        x={random.nextInt(-1000, 1000)}
                        y={random.nextInt(400, y1-800)}
                    />
                ))}
            </Node>
            <Node> //front white wave
                {range(3).map(i => (
                    <Spline             
                    position={[-3000 + 600*i,500]}
                    ref={makeRef(frontwaves, i)}
                    lineWidth={6}
                    stroke={'fff'}
                    fill={'E2F2F3EE'}>
                        {range(10).map(k => 
                            <Knot position={[800 * k , 100 + Math.sin(Math.PI/2 * k) * 200]}/>
                            )}
                    </Spline>
                ))
                }
                    


            </Node>
        </>
    ); 

    yield* any(
        ...front_flakes.map( (flake, i ) => 
                    let_it_snow(flake)
        ),
        ...back_flakes.map( (flake, i ) => 
                    let_it_snow(flake, 0.5)
        ),
        ...frontwaves.map((wave, i) => 
                    wave.position.x(wave.position.x() + 500, 50 - i*4, linear)
        ),
    )

})

function* let_it_snow(circle: Circle, speed: number = 1): ThreadGenerator {
    const [orix, oriy] = [circle.position.x(), circle.position.y()];
    const random = useRandom()
    yield* all(
        loop(3, () => circle.position.x(orix + random.nextInt(50,100), 3/speed, easeInOutQuad).to(orix-random.nextInt(50,100), 3/speed, easeInOutQuad) ),
        circle.position.y(oriy+random.nextInt(250,300), 18/speed, linear)
    )
}

