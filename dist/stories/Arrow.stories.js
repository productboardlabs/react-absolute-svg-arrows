/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import React from "react";
import { Arrow } from "../components/Arrow";
var isHighlighted = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    return boolean("Is highlighted", defaultValue);
};
var showDebugGuideLines = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    return boolean("Show debug guide lines", defaultValue);
};
export var HighlightedArrow = function () {
    var startPoint = {
        x: 100,
        y: 100,
    };
    var endPoint = {
        x: 600,
        y: 300,
    };
    return (React.createElement(Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(true), showDebugGuideLines: showDebugGuideLines() }));
};
export var InversedArrow = function () {
    var startPoint = {
        x: 600,
        y: 300,
    };
    var endPoint = {
        x: 100,
        y: 100,
    };
    return (React.createElement(Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }));
};
export var ArrowInOneLine = function () {
    var startPoint1 = {
        x: 600,
        y: 100,
    };
    var endPoint1 = {
        x: 100,
        y: 120,
    };
    var startPoint2 = {
        x: 600,
        y: 200,
    };
    var endPoint2 = {
        x: 100,
        y: 180,
    };
    var startPoint3 = {
        x: 100,
        y: 300,
    };
    var endPoint3 = {
        x: 600,
        y: 300,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Arrow, { startPoint: startPoint1, endPoint: endPoint1, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }),
        React.createElement(Arrow, { startPoint: startPoint2, endPoint: endPoint2, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }),
        React.createElement(Arrow, { startPoint: startPoint3, endPoint: endPoint3, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() })));
};
export var ArrowWithCustomConfig = function () {
    var startPoint = {
        x: 100,
        y: 100,
    };
    var endPoint = {
        x: 600,
        y: 300,
    };
    var config = {
        arrowColor: "green",
        arrowHighlightedColor: "black",
        dotEndingBackground: "pink",
        dotEndingRadius: 15,
        arrowHeadEndingSize: 15,
        strokeWidth: 2,
    };
    return (React.createElement(Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(), config: config }));
};
export var ArrowWithVisibleControlPointsAndBoundingBox = function () {
    var startPoint = {
        x: 600,
        y: 200,
    };
    var endPoint = {
        x: 400,
        y: 100,
    };
    return (React.createElement(Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(true) }));
};
export var Playground = function () {
    var options = {
        range: true,
        min: 5,
        max: 800,
        step: 1,
    };
    var startPoint = {
        x: number("Ax", 100, options),
        y: number("Ay", 100, options),
    };
    var endPoint = {
        x: number("Bx", 600, options),
        y: number("By", 300, options),
    };
    var config = object("Custom config", {
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
    return (React.createElement(Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(), config: config }));
};
export default {
    title: "Arrow",
    decorators: [withKnobs],
};
//# sourceMappingURL=Arrow.stories.js.map