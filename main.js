"use strict";

// 1. Object literals
const circleObj = {
  radius: 1,
  draw: function () {
    console.log(this.radius);
  },
};

circleObj.draw();

// limitation -> Create another circle with same methods the code has to be duplicate.
// ex: const circle2 = {...

// 2. Refractoring
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log(this.radius);
    },
  };
}

const circleRef = createCircle(1);
circleRef.draw();

// 3. Contructor
function CircleConstructor(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log(this.radius);
  };
}

const circle1 = new CircleConstructor(1);
const circle2 = new CircleConstructor(2);
circle1.draw();
circle2.draw();

// 4. Abstraction
function CircleConstructorAbs(radius) {
  this.radius = radius;

  // disable someComplexFn from accessing Ex: circleAbs.someComplexFn();
  let someComplexFn = function (that) {
    // this is undefine and no longer accessible here
    console.log("some complex fn ", that.radius);
  };
  this.draw = function () {
    someComplexFn(this);
  };
}

const circleAbs = new CircleConstructorAbs(1);
circleAbs.draw();

// 5. Get and Set
function CircleConstructorCst(radius) {
  this.radius = radius;

  Object.defineProperty(this, "modRadius", {
    get: function () {
      return this.radius * 2;
    },
    set: function (radius) {
      this.radius = radius;
    },
  });

  this.draw = function () {
    console.log("radius ", this.modRadius); // get modRadius is invoked
  };
}

const circleCst = new CircleConstructorCst(1);
circleCst.modRadius = 10; // modifying radius set is invoked
circleCst.draw();
