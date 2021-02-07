import React from "react";
import { a, useTrail } from "react-spring";
interface MainTrailProps {
  dataRecieved: boolean;
}

export const MainTrail: React.FC<MainTrailProps> = ({
  dataRecieved,
  children,
}) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    to: {
      opacity: dataRecieved ? 1 : 0,
      translateX: dataRecieved ? 0 : -800,
    },
    from: {
      opacity: 0,
      translateX: -800,
    },
  });
  return (
    <div>
      {trail.map((props, index) => (
        <a.div key={items[index] as any} style={props as any}>
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};
