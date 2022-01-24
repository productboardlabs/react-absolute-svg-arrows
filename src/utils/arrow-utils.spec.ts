/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
import {
  calculateDeltas,
  calculateLowDyControlPointShift,
  calculateFixedLineInflectionConstant,
  calculateCanvasDimensions,
  calculateControlPointsWithoutBoundingBox,
  calculateControlPoints,
} from './arrow-utils';

describe('calculateDeltas', () => {
  it('calculates deltas', () => {
    const sourcePoint = {
      x: 0,
      y: 0,
    };
    const targetPoint = {
      x: 100,
      y: 200,
    };
    expect(calculateDeltas(sourcePoint, targetPoint)).toEqual({
      absDx: 100,
      absDy: 200,
      dx: 100,
      dy: 200,
    });
  });

  it('calculates deltas when the end point is before the start one', () => {
    const sourcePoint = {
      x: 100,
      y: 200,
    };
    const targetPoint = {
      x: -100,
      y: -100,
    };
    expect(calculateDeltas(sourcePoint, targetPoint)).toEqual({
      absDx: 200,
      absDy: 300,
      dx: -200,
      dy: -300,
    });
  });
});

describe('calculateLowDyControlPointShift', () => {
  const MAX_Y_CONTROL_POINT_SHIFT = 50;

  test.each`
    dx     | dy      | expected
    ${10}  | ${10}   | ${0}
    ${-10} | ${-300} | ${0}
    ${-10} | ${-200} | ${-1}
    ${-10} | ${-100} | ${-26}
    ${-10} | ${-10}  | ${-44}
    ${-10} | ${0}    | ${45}
    ${-10} | ${10}   | ${44}
    ${-10} | ${100}  | ${26}
    ${-10} | ${200}  | ${1}
    ${-10} | ${300}  | ${0}
  `(
    `calculates control low dY point shift when dx = $dx and dy = $dy`,
    ({ dx, dy, expected }) => {
      expect(
        calculateLowDyControlPointShift(dx, dy, MAX_Y_CONTROL_POINT_SHIFT),
      ).toBe(expected);
    },
  );
});

describe('calculateFixedLineInflectionConstant', () => {
  test.each`
    absDx    | absDy   | expected
    ${10}    | ${10}   | ${15}
    ${1000}  | ${10}   | ${129}
    ${10}    | ${1000} | ${38}
    ${10000} | ${3000} | ${444}
  `(
    `calculates fixed line inflection constant when absDx = $absDx and absDy = $absDy`,
    ({ absDx, absDy, expected }) => {
      expect(calculateFixedLineInflectionConstant(absDx, absDy)).toBe(expected);
    },
  );
});

describe('calculateCanvasDimensions', () => {
  it('calculates canvas dimensions with bounding box buffer', () => {
    expect(
      calculateCanvasDimensions({
        absDx: 1000,
        absDy: 100,
        boundingBoxBuffer: {
          vertical: 50,
          horizontal: 20,
        },
      }),
    ).toEqual({
      canvasHeight: 200,
      canvasWidth: 1040,
    });
  });
});

describe('calculateControlPointsWithoutBoundingBox', () => {
  it('calculates control points without bounding box', () => {
    expect(
      calculateControlPointsWithoutBoundingBox({
        absDx: 1000,
        absDy: 100,
        dx: 1000,
        dy: 100,
      }),
    ).toEqual({
      p1: {
        x: 0,
        y: 0,
      },
      p2: {
        x: 134,
        y: 0,
      },
      p3: {
        x: 866,
        y: 100,
      },
      p4: {
        x: 1000,
        y: 100,
      },
    });
  });
});

describe('calculateControlPoints', () => {
  it('calculates control points with bounding box', () => {
    expect(
      calculateControlPoints({
        absDx: 1000,
        absDy: 100,
        dx: 1000,
        dy: 100,
        boundingBoxElementsBuffer: 20,
      }),
    ).toEqual({
      p1: {
        x: 20,
        y: 20,
      },
      p2: {
        x: 154,
        y: 20,
      },
      p3: {
        x: 886,
        y: 120,
      },
      p4: {
        x: 1020,
        y: 120,
      },
      boundingBoxBuffer: {
        horizontal: 20,
        vertical: 20,
      },
    });
  });
});
