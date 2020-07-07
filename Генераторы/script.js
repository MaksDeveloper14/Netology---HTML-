        'use strict';

    function hslToRgb(h, s, l) {
        let r, g, b;

  if(s == 0) {
    r = g = b = l; 
  } else {
    const hue2rgb = function (p, q, t) {
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  function colorToHex(color) {
    let hex = Math.round(color * 255).toString(16);
    return hex.length < 2 ? `0${hex}` : hex;
  }

  const color = [r, g, b].map(colorToHex).join('');
  return `#${color}`;
}

class Order {
  constructor(id, weight) {
    this.id = id;
    this.weight = weight;
  }
}

class Truck extends Array {
  constructor(number, weightLimit) {
    super();
    this.number = number;
    this.weightLimit = weightLimit;
  }

  add(order) {
    if (!this.isFit(order)) {
      return false;
    }
    this.push(order);
    return true;
  }

  isFit(order) {
    return this.weightLimit >= (this.totalWeight + order.weight);
  }

  get totalWeight() {
    return this.reduce((total, order) => total + order.weight, 0);
  }

  show() {
    console.log(`Машина №${this.number} (общий вес груза ${this.totalWeight}кг):`);
    this.forEach(order => console.log(`\tЗаказ #${order.id} ${order.weight}кг`));
  }
}


// Задача 1

function* palette(amount) {
  let hue = Math.random(); 
  let saturation = Math.random();
  let lightness = Math.random();
  let colorRGB;

  for(let i = 0; i < amount; i++) {
    let step = 1 / amount;
    hue += step;
    if(hue > 1) {
      hue -= 1;
    }
    colorRGB = hslToRgb(hue, saturation, lightness);
    yield colorRGB;
  }
}

for (const color of palette(10)) {
  console.log(color);
}

// Статус: сделал

console.log('\n');

// Задача 2

  function* numberQuiz(number) {
    yield 'Назовите число:';

    while(attempt !== undefined) {
      if(attempt === number) {
        return `Вы угадали, это, ${attempt}!`;
      } else if (attempt > number) {
         yield `Меньше чем ${attempt}!`;
        } else {
           yield `Меньше чем ${attempt}!`;
          }
    }

  }


const attempts = [7, 4, 6, 5]; 
const quiz = numberQuiz(5);  

let attempt, result;

do {
  result = quiz.next(attempt); 
  console.log(result.value);  
  attempt = attempts.shift(); 
} while (!result.done); 

// Статус: сделал

console.log('\n');

// Задача 3

class TruckPlanner
{
  constructor(weightLimit) {
    this.weightLimit = weightLimit;
    this.orders = [];
    this.add = function(Order) {
      this.orders.push(Order);
    }
    this[Symbol.iterator] = function* generator () {
      let trucks = [];
      let index = 0;
      let id = 1;

      if(trucks.length === 0) {
            trucks[index] = new Truck(id, weightLimit);
          }

      for(let i = 0; i < this.orders.length; i++) {
        let order = this.orders[i];
          if(trucks[index].isFit(order)) {
            trucks[index].add(order);
          } else {
                index += 1;
                id += 1;
                trucks[index] = new Truck(id, weightLimit);
                trucks[index].add(order);
            } 
      }
      for(let i = 0; i < trucks.length; i++) {
        yield trucks[i];
      }
    }
  }
}

const planner = new TruckPlanner(10);

planner.add(new Order(1, 2));
planner.add(new Order(2, 5));
planner.add(new Order(3, 4));
planner.add(new Order(4, 4));
planner.add(new Order(5, 1));
planner.add(new Order(6, 2));


for (const truck of planner) { truck.show()}


// Сделал