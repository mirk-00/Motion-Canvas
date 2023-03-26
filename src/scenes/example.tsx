import { Circle, Polygon, Node } from "@motion-canvas/2d/lib/components";
import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { waitFor } from "@motion-canvas/core/lib/flow";
import { Color, PossibleColor } from "@motion-canvas/core/lib/types";
import { createRef, makeRef, range, useLogger } from "@motion-canvas/core/lib/utils";
import { CircleText } from "../components/CircleText";
import { linear } from "@motion-canvas/core/lib/tweening";

const linearTimingFunction = (value: number) => value;

export default makeScene2D(function* (view) {
  const runeColor = new Color("#8ff");
  const runeColor2 = runeColor.darken(1);
  const runeColor3 = runeColor.darken(1.5);

//   const cirlceRefs = range(3).map(() => createRef<Circle>());
  const circles: Circle[] = [];
  const radius = 200;
  const strokeWidth = radius / 20;

  const bigCircleTextRef = createRef<CircleText>();
  const circleTextRef = createRef<CircleText>();

  const polyRef1 = createRef<Polygon>();
  const polyRef2 = createRef<Polygon>();

  const runeCircleText = "MOTIONCANVAS";

  view.fill('121212')
  view.add(
    <Node shadowBlur={20} shadowColor={runeColor3}>
      <Polygon
        ref={polyRef1}
        width={radius * 4}
        height={radius * 4}
        sides={3}
        rotation={0}
        lineWidth={strokeWidth}
        stroke={runeColor3}
      />
      <Polygon
        ref={polyRef2}
        width={radius * 4}
        height={radius * 4}
        sides={3}
        rotation={180}
        lineWidth={strokeWidth}
        stroke={runeColor3}
      />

      {range(3).map((i) => {
        return (
          <Circle
            lineWidth={strokeWidth}
            ref={makeRef(circles, i)}
            width={(i + 1) * radius}
            opacity={0.9}
            height={(i + 1) * radius}
            stroke={runeColor}
          />
        );
      })}
      <CircleText
        ref={circleTextRef}
        radius={radius * 0.75}
        fontSize={radius * 0.2}
        color={runeColor2}
        text={runeCircleText}
      />
      <CircleText
        ref={bigCircleTextRef}
        radius={radius * 1.25}
        fontSize={radius * 0.2}
        color={runeColor2}
        text={runeCircleText + runeCircleText}
      />
    </Node>
  );

  yield circleTextRef().rotation(-360, 18);
  yield bigCircleTextRef().rotation(360, 20);

  yield polyRef1().rotation(-360 - 180, 40);
  yield polyRef2().rotation(-360, 40);

  yield* waitFor(25);
});