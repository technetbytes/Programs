//Simple Rectangle Class

class Rectangle {
  // Constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

//Implement Singleton Design Pattern

const Singleton = (function () {
    var instance;

    function createInstance(x,y) {
        var classObj = new Rectangle(x,y);
        return classObj;
    }

    return {
        getInstance: function (x,y) {
            if (!instance) {
                instance = createInstance(x,y);
            }
            return instance;
        },
    };
})();

function execute() {
    var instance1 = Singleton.getInstance(22,6);
    var instance2 = Singleton.getInstance(6,33);
	console.log(instance1.area);
	console.log(instance2.area);
    console.log("Same instance? " + (instance1 === instance2));
}

//To run this script call execute function
execute()