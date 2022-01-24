/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */

import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import React from "react";

import { Arrow } from "../components/Arrow";

const isHighlighted = (defaultValue = false) =>
  boolean("Is highlighted", defaultValue);
const showDebugGuideLines = (defaultValue = false) =>
  boolean("Show debug guide lines", defaultValue);

export const HighlightedArrow = () => {
  const startPoint = {
    x: 100,
    y: 100,
  };
  const endPoint = {
    x: 600,
    y: 300,
  };

  return (
    <Arrow
      startPoint={startPoint}
      endPoint={endPoint}
      isHighlighted={isHighlighted(true)}
      showDebugGuideLines={showDebugGuideLines()}
    />
  );
};

export const InversedArrow = () => {
  const startPoint = {
    x: 600,
    y: 300,
  };
  const endPoint = {
    x: 100,
    y: 100,
  };

  return (
    <Arrow
      startPoint={startPoint}
      endPoint={endPoint}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines()}
    />
  );
};

export const ArrowInOneLine = () => {
  const startPoint1 = {
    x: 600,
    y: 100,
  };
  const endPoint1 = {
    x: 100,
    y: 120,
  };

  const startPoint2 = {
    x: 600,
    y: 200,
  };
  const endPoint2 = {
    x: 100,
    y: 180,
  };

  const startPoint3 = {
    x: 100,
    y: 300,
  };
  const endPoint3 = {
    x: 600,
    y: 300,
  };

  return (
    <>
      <Arrow
        startPoint={startPoint1}
        endPoint={endPoint1}
        isHighlighted={isHighlighted()}
        showDebugGuideLines={showDebugGuideLines()}
      />
      <Arrow
        startPoint={startPoint2}
        endPoint={endPoint2}
        isHighlighted={isHighlighted()}
        showDebugGuideLines={showDebugGuideLines()}
      />
      <Arrow
        startPoint={startPoint3}
        endPoint={endPoint3}
        isHighlighted={isHighlighted()}
        showDebugGuideLines={showDebugGuideLines()}
      />
    </>
  );
};

export const ArrowWithCustomConfig = () => {
  const startPoint = {
    x: 100,
    y: 100,
  };
  const endPoint = {
    x: 600,
    y: 300,
  };

  const config = {
    arrowColor: "green",
    arrowHighlightedColor: "black",
    dotEndingBackground: "pink",
    dotEndingRadius: 15,
    arrowHeadEndingSize: 15,
    strokeWidth: 2,
  };

  return (
    <Arrow
      startPoint={startPoint}
      endPoint={endPoint}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines()}
      config={config}
    />
  );
};
export const ArrowWithVisibleControlPointsAndBoundingBox = () => {
  const startPoint = {
    x: 600,
    y: 200,
  };
  const endPoint = {
    x: 400,
    y: 100,
  };

  return (
    <Arrow
      startPoint={startPoint}
      endPoint={endPoint}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines(true)}
    />
  );
};

export const Playground = () => {
  const options = {
    range: true,
    min: 5,
    max: 800,
    step: 1,
  };

  const startPoint = {
    x: number("Ax", 100, options),
    y: number("Ay", 100, options),
  };
  const endPoint = {
    x: number("Bx", 600, options),
    y: number("By", 300, options),
  };

  const config = object("Custom config", {
    arrowColor: "#bcc4cc",
    arrowHighlightedColor: "#4da6ff",
    controlPointsColor: "#fe4e4e",
    boundingBoxColor: "#fad1d1",
    dotEndingBackground: "#ffffff",
    dotEndingRadius: 3,
    arrowHeadEndingSize: 9,
    hoverableLineWidth: 10,
    strokeWidth: 1,
  });

  return (
    <Arrow
      startPoint={startPoint}
      endPoint={endPoint}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines()}
      config={config}
    />
  );
};

export default {
  title: "Arrow",
  decorators: [withKnobs],
};
