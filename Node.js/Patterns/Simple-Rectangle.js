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

let Rec1 = new Rectangle(2,2);
//print area detail
console.log(Rec1.area);