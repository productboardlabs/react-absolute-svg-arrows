"use strict";
/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playground = exports.ArrowWithVisibleControlPointsAndBoundingBox = exports.ArrowWithCustomConfig = exports.ArrowInOneLine = exports.InversedArrow = exports.HighlightedArrow = void 0;
var addon_knobs_1 = require("@storybook/addon-knobs");
var react_1 = __importDefault(require("react"));
var Arrow_1 = require("../components/Arrow");
var isHighlighted = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    return addon_knobs_1.boolean("Is highlighted", defaultValue);
};
var showDebugGuideLines = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    return addon_knobs_1.boolean("Show debug guide lines", defaultValue);
};
var HighlightedArrow = function () {
    var startPoint = {
        x: 100,
        y: 100,
    };
    var endPoint = {
        x: 600,
        y: 300,
    };
    return (react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(true), showDebugGuideLines: showDebugGuideLines() }));
};
exports.HighlightedArrow = HighlightedArrow;
var InversedArrow = function () {
    var startPoint = {
        x: 600,
        y: 300,
    };
    var endPoint = {
        x: 100,
        y: 100,
    };
    return (react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }));
};
exports.InversedArrow = InversedArrow;
var ArrowInOneLine = function () {
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint1, endPoint: endPoint1, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }),
        react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint2, endPoint: endPoint2, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }),
        react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint3, endPoint: endPoint3, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() })));
};
exports.ArrowInOneLine = ArrowInOneLine;
var ArrowWithCustomConfig = function () {
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
    return (react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(), config: config }));
};
exports.ArrowWithCustomConfig = ArrowWithCustomConfig;
var ArrowWithVisibleControlPointsAndBoundingBox = function () {
    var startPoint = {
        x: 600,
        y: 200,
    };
    var endPoint = {
        x: 400,
        y: 100,
    };
    return (react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(true) }));
};
exports.ArrowWithVisibleControlPointsAndBoundingBox = ArrowWithVisibleControlPointsAndBoundingBox;
var Playground = function () {
    var options = {
        range: true,
        min: 5,
        max: 800,
        step: 1,
    };
    var startPoint = {
        x: addon_knobs_1.number("Ax", 100, options),
        y: addon_knobs_1.number("Ay", 100, options),
    };
    var endPoint = {
        x: addon_knobs_1.number("Bx", 600, options),
        y: addon_knobs_1.number("By", 300, options),
    };
    var config = addon_knobs_1.object("Custom config", {
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
    return (react_1.default.createElement(Arrow_1.Arrow, { startPoint: startPoint, endPoint: endPoint, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(), config: config }));
};
exports.Playground = Playground;
exports.default = {
    title: "Arrow",
    decorators: [addon_knobs_1.withKnobs],
};
