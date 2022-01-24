import React from 'react';


type Point = {
  x: number;
  y: number; 
}

type ArrowProps = { 
  startPoint: Point, 
  endPoint: Point 
}

const MAX_Y_CONTROL_POINT_SHIFT = 50;

export const calculateLowDyControlPointShift = (
  dx: number,
  dy: number,
  maxShift = MAX_Y_CONTROL_POINT_SHIFT,
) => {
  if (dx > 0) return 0;
  const sign = dy < 0 ? -1 : 1;
  const value = Math.round(
    maxShift * Math.pow(0.9, Math.pow(1.2, Math.abs(dy) / 10)),
  );

  // prevent negative zero
  if (value === 0) return 0;

  return sign * value;
};




export const calculateDeltas = (
  startPoint: Point,
  targetPoint: Point,
): {
  dx: number;
  dy: number;
  absDx: number;
  absDy: number;
} => {
  const dx = targetPoint.x - startPoint.x;
  const dy = targetPoint.y - startPoint.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  return { dx, dy, absDx, absDy };
};

// Curve flexure should remain on the same area no matter of absolute deltas, so we have to slightly shift X coordinates of our control points. It was created empirically, it's not based on a clear formula.
const calculateFixedLineInflectionConstant = (
  absDx: number,
  absDy: number,
) => {
  const WEIGHT_X = 4;
  const WEIGHT_Y = 0.8;

  return Math.round(Math.sqrt(absDx) * WEIGHT_X + Math.sqrt(absDy) * WEIGHT_Y);
};

export const calculateControlPoints = ({
  absDx,
  absDy,
  dx,
  dy,
}: {
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
}): {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;
} => {
  let leftTopX = 0;
  let leftTopY = 0;
  let rightBottomX = absDx;
  let rightBottomY = absDy;
  if (dx < 0) [leftTopX, rightBottomX] = [rightBottomX, leftTopX];
  if (dy < 0) [leftTopY, rightBottomY] = [rightBottomY, leftTopY];

  const fixedLineInflectionConstant = calculateFixedLineInflectionConstant(
    absDx,
    absDy,
  );
  const lowDyYShift = calculateLowDyControlPointShift(dx, dy);

  const p1 = {
    x: leftTopX,
    y: leftTopY,
  };
  const p2 = {
    x: leftTopX + fixedLineInflectionConstant,
    y: leftTopY + lowDyYShift,
  };
  const p3 = {
    x: rightBottomX - fixedLineInflectionConstant,
    y: rightBottomY - lowDyYShift,
  };
  const p4 = {
    x: rightBottomX,
    y: rightBottomY,
  };

  return { p1, p2, p3, p4 };
};

export const calculateControlPointsWithBuffer = ({
  boundingBoxElementsBuffer,
  absDx,
  absDy,
  dx,
  dy,
}: {
  boundingBoxElementsBuffer: number;
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
}): {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;
  boundingBoxBuffer: {
    vertical: number;
    horizontal: number;
  };
} => {
  const { p1, p2, p3, p4 } = calculateControlPoints({
    absDx,
    absDy,
    dx,
    dy,
  });

  const topBorder = Math.min(p1.y, p2.y, p3.y, p4.y);
  const bottomBorder = Math.max(p1.y, p2.y, p3.y, p4.y);
  const leftBorder = Math.min(p1.x, p2.x, p3.x, p4.x);
  const rightBorder = Math.max(p1.x, p2.x, p3.x, p4.x);

  const verticalBuffer =
    (bottomBorder - topBorder - absDy) / 2 + boundingBoxElementsBuffer;
  const horizontalBuffer =
    (rightBorder - leftBorder - absDx) / 2 + boundingBoxElementsBuffer;

  const boundingBoxBuffer = {
    vertical: verticalBuffer,
    horizontal: horizontalBuffer,
  };

  return {
    p1: {
      x: p1.x + horizontalBuffer,
      y: p1.y + verticalBuffer,
    },
    p2: {
      x: p2.x + horizontalBuffer,
      y: p2.y + verticalBuffer,
    },
    p3: {
      x: p3.x + horizontalBuffer,
      y: p3.y + verticalBuffer,
    },
    p4: {
      x: p4.x + horizontalBuffer,
      y: p4.y + verticalBuffer,
    },
    boundingBoxBuffer,
  };
};

export const calculateCanvasDimensions = ({
  absDx,
  absDy,
  boundingBoxBuffer,
}: {
  absDx: number;
  absDy: number;
  boundingBoxBuffer: { vertical: number; horizontal: number };
}): {
  canvasWidth: number;
  canvasHeight: number;
} => {
  const canvasWidth = absDx + 2 * boundingBoxBuffer.horizontal;
  const canvasHeight = absDy + 2 * boundingBoxBuffer.vertical;

  return { canvasWidth, canvasHeight };
};

const Arrow = ({ startPoint, endPoint }: ArrowProps) => {
  const canvasStartPoint = {
    x: Math.min(startPoint.x, endPoint.x),
    y: Math.min(startPoint.y, endPoint.y)
  }

  // const canvasWidth = Math.abs(endPoint.x - startPoint.x)
  // const canvasHeight = Math.abs(endPoint.y - startPoint.y)

  
  const { absDx, absDy, dx, dy } = calculateDeltas(startPoint, endPoint);
  
const strokeWidth = 1
const arrowHeadEndingSize = 10

const boundingBoxElementsBuffer =
    strokeWidth + arrowHeadEndingSize;
    const STRAIGHT_LINE_BEFORE_ARROW_HEAD = 5

const { p1, p2, p3, p4, boundingBoxBuffer } = calculateControlPointsWithBuffer({
    boundingBoxElementsBuffer,
    dx,
    dy,
    absDx,
    absDy,
  });
  const { canvasWidth, canvasHeight } = calculateCanvasDimensions({
    absDx,
    absDy,
    boundingBoxBuffer,
  });

  const canvasXOffset =
    Math.min(startPoint.x, endPoint.x) - boundingBoxBuffer.horizontal;
  const canvasYOffset =
    Math.min(startPoint.y, endPoint.y) - boundingBoxBuffer.vertical;

  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      
      style={{ 
        backgroundColor:"#eee",
        transform: `translate(${canvasXOffset}px, ${canvasYOffset}px)`
      }}
    >
      
      <path 
        stroke="black"
        strokeWidth={strokeWidth}
        fill="none"
        d={`
        M ${p1.x} ${p1.y}
        C ${p2.x} ${p2.y},
        ${p3.x} ${p3.y},
        ${p4.x - STRAIGHT_LINE_BEFORE_ARROW_HEAD} ${p4.y}
        L ${p4.x} ${p4.y}`} 
      />

<path
  d={`
  M ${(arrowHeadEndingSize / 5) * 2} 0
  L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
  L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
  fill="none"
  stroke="black"
  style={{ transform: `translate(${p4.x - arrowHeadEndingSize}px, ${p4.y - arrowHeadEndingSize / 2}px)` }}
></path> 
    </svg>
  )
}


function App() {
  const featureAPosition = {
    x: 100,
    y: 200,
  }

  const featureBPosition = {
    x: 700,
    y: 200,
  }

  return (
      <Arrow 
        startPoint={featureBPosition} 
        endPoint={featureAPosition} 
      />
  );
}

export default App;
