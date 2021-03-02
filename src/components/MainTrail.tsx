import React from "react";
import { a, useTrail } from "react-spring";
interface MainTrailProps {
  animateOn: boolean;
}

export const MainTrail: React.FC<MainTrailProps> = ({
  animateOn,
  children,
}) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    to: {
      opacity: animateOn ? 1 : 0,
      translateX: animateOn ? 0 : -800,
    },
    from: {
      opacity: 0,
      translateX: -800,
    },
  });
  return (
    <div>
      {trail.map((props, index: number) => (
        <a.div key={index} style={props as any}>
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};
