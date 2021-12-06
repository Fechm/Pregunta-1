class Calculator {
    
  constructor() {

  }

  async evaluate(value) {
    const numbers = [];
    const operators = [];
    let b = "";
    let a = "";
    let operator = "";
    try {
      if (_validateSyntax(value)) {
        value = value
          .replace(/[\[']+/g, "(")
          .replace(/]/g, ")")
          .replace(/{/g, "(")
          .replace(/}/g, ")");
        for (let i = 0; i < value.length; i++) {
          if (value[i] >= "0" && value[i] <= "9") {
            let buffer = "";
            while (i < value.length && value[i] >= "0" && value[i] <= "9") {
              buffer += value[i++];
            }
            numbers.push(parseInt(buffer));
            i--;
          } else if (value[i] === "(") {
            operators.push(value[i]);
          } else if (value[i] === ")") {
            while (operators[operators.length - 1] !== "(") {
              operator = operators.pop();
              b = numbers.pop();
              a = numbers.pop();
              numbers.push(_calculate(operator, b, a));
            }
            operators.pop();
          } else if (
            value[i] === "+" ||
            value[i] === "-" ||
            value[i] === "*" ||
            value[i] === "/"
          ) {
            while (
              operators.length &&
              _hasPriority(value[i], operators[operators.length - 1])
            ) {
              operator = operators.pop();
              b = numbers.pop();
              a = numbers.pop();
              numbers.push(_calculate(operator, b, a));
            }
            operators.push(value[i]);
          }
        }

        while (operators.length) {
          operator = operators.pop();
          b = numbers.pop();
          a = numbers.pop();
          numbers.push(_calculate(operator, b, a));
        }
        return numbers.pop();
      }
    } catch (error) {
      return error;
    }
  }
}

function _hasPriority(operator1, operator2) {
  if (operator2 === "(" || operator2 === ")") {
    return false;
  }
  return !(
    (operator1 === "*" || operator1 === "/") &&
    (operator2 === "+" || operator2 === "-")
  );
}

function _calculate(operator, b, a) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        throw "Cannot divide by zero";
      }
      return Math.floor(a / b);
  }
  return 0;
}

function _validateSyntax(value = "") {
  let stack = [];
  for (let i = 0; i < value.length; i++) {
    let char = value.charAt(i);

    if (char === "{" || char === "[" || char === "(") {
      stack.push(char);
    } else {
      if (char === "}" || char === "]" || char === ")") {
        stack.pop();
      }
    }
  }
  if (stack.length > 0) {
    throw "Syntax Error";
  }
  return true;
}

module.exports = Calculator;
