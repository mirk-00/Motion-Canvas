import { Node, NodeProps, Txt } from "@motion-canvas/2d/lib/components";
import { PossibleColor } from "@motion-canvas/core/lib/types";

export interface CircleTextProps extends NodeProps {
  text: string;
  radius: number;
  color?: PossibleColor;
  fontSize?: number;
}

export class CircleText extends Node {
  public constructor(props?: CircleTextProps) {
    super({
      ...props,
    });

    const texts = props.text.split("").map((char, i) => {
      const angle = (360 / props.text.length) * i;
      const radians = (angle * Math.PI) / 180;
      const x = props.radius * Math.cos(radians);
      const y = props.radius * Math.sin(radians);

      const textRotation = angle + 90;
      return (
        <Txt
          fill={props.color}
          text={char}
          fontSize={props.fontSize}
          rotation={textRotation}
          x={x}
          y={y}
        />
      );
    });

    this.add(<Node>{texts}</Node>);
  }
}
