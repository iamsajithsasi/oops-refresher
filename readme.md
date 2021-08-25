## Types

Value: String, Number, Boolean, undefined, null

Reference: Object, Function, Array

## 1. Object literals

```
const circle = {
    radius: 1,
    draw: function() {
        console.log(this.radius)
    }
}

circle.draw();
```

#### limitation -> Create another circle with same methods the code has to be duplicate.

`ex: const circle2 = {...`

## 2. Refractoring

```
function createCircle(radius) {
    return {
        radius,
        draw: function() {
            console.log(this.radius)
        }
    }
}

const circle = createCircle(1);
circle.draw();
```

## 3. Contructor

```
function CircleConstructor(radius) {
    this.radius = radius;
    this.draw = function() {
        console.log(this.radius);
    }
}
const circle1 = new CircleConstructor(1);
const circle2 = new CircleConstructor(2);
```

## 4. Abstraction

```
function CircleConstructor(radius) {
  this.radius = radius;

  // disable someComplexFn from accessing Ex: circleAbs.someComplexFn();
  let someComplexFn = function (that) {
    // this is undefined in this scope and no longer accessible here
    console.log("some complex fn ", that.radius);
  };
  this.draw = function () {
    someComplexFn(this);
  };
}

const circle = new CircleConstructor(1);
circle.draw();
```

## 5. Get and Set

```
function CircleConstructor(radius) {
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

const circle = new CircleConstructor(1);
circle.modRadius = 10; // modifying radius set is invoked
circle.draw();
```
