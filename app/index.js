function calculate(aRaw, operator, bRaw, angleMode = "rad") {
    const a = aRaw !== "" ? Number(aRaw) : undefined;
    const b = bRaw !== undefined && bRaw !== "" ? Number(bRaw) : undefined;

    const unaryOps = new Set(["sqrt", "sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "log", "ln", "abs", "fact", "exp", "pi", "e"]);
    const binaryOps = new Set(["+", "-", "*", "/", "%", "^"]);

    const throwServerStyleError = (mes) => {
        throw { response: { data: { mes } } };
    };

    if (!unaryOps.has(operator) && !binaryOps.has(operator)) {
        throwServerStyleError("Invalid operator");
    }

    if ((operator !== "pi" && operator !== "e") && Number.isNaN(a)) {
        throwServerStyleError("Value of a must be a valid number");
    }

    if (binaryOps.has(operator) && Number.isNaN(b)) {
        throwServerStyleError("Value of b must be a valid number for this operation");
    }

    const toRadians = (value) => (angleMode === "deg" ? (value * Math.PI) / 180 : value);
    const factorial = (n) => {
        let result = 1;
        for (let i = 2; i <= n; i += 1) {
            result *= i;
        }
        return result;
    };

    let ans;
    let mes;

    switch (operator) {
        case "+":
            ans = a + b;
            mes = `Sum of ${a} and ${b}`;
            break;
        case "-":
            ans = a - b;
            mes = `Subtraction of ${b} from ${a}`;
            break;
        case "*":
            ans = a * b;
            mes = `Multiplication of ${a} and ${b}`;
            break;
        case "/":
            if (b === 0) {
                throwServerStyleError("Division by zero is not allowed");
            }
            ans = a / b;
            mes = `Division of ${a} by ${b}`;
            break;
        case "%":
            if (b === 0) {
                throwServerStyleError("Modulo by zero is not allowed");
            }
            ans = a % b;
            mes = `Remainder of ${a} divided by ${b}`;
            break;
        case "^":
            ans = Math.pow(a, b);
            mes = `${a} raised to the power ${b}`;
            break;
        case "sqrt":
            if (a < 0) {
                throwServerStyleError("Square root of negative number is invalid");
            }
            ans = Math.sqrt(a);
            mes = `Square root of ${a}`;
            break;
        case "sin":
            ans = Math.sin(toRadians(a));
            mes = `Sine of ${a} (${angleMode})`;
            break;
        case "cos":
            ans = Math.cos(toRadians(a));
            mes = `Cosine of ${a} (${angleMode})`;
            break;
        case "tan":
            ans = Math.tan(toRadians(a));
            mes = `Tangent of ${a} (${angleMode})`;
            break;
        case "asin":
            if (a < -1 || a > 1) {
                throwServerStyleError("Input for asin must be between -1 and 1");
            }
            ans = angleMode === "deg" ? (Math.asin(a) * 180 / Math.PI) : Math.asin(a);
            mes = `Inverse Sine of ${a} (${angleMode})`;
            break;
        case "acos":
            if (a < -1 || a > 1) {
                throwServerStyleError("Input for acos must be between -1 and 1");
            }
            ans = angleMode === "deg" ? (Math.acos(a) * 180 / Math.PI) : Math.acos(a);
            mes = `Inverse Cosine of ${a} (${angleMode})`;
            break;
        case "atan":
            ans = angleMode === "deg" ? (Math.atan(a) * 180 / Math.PI) : Math.atan(a);
            mes = `Inverse Tangent of ${a} (${angleMode})`;
            break;
        case "sinh":
            ans = Math.sinh(a);
            mes = `Hyperbolic Sine of ${a}`;
            break;
        case "cosh":
            ans = Math.cosh(a);
            mes = `Hyperbolic Cosine of ${a}`;
            break;
        case "tanh":
            ans = Math.tanh(a);
            mes = `Hyperbolic Tangent of ${a}`;
            break;
        case "log":
            if (a <= 0) {
                throwServerStyleError("log10 is defined only for positive numbers");
            }
            ans = Math.log10(a);
            mes = `Base-10 log of ${a}`;
            break;
        case "ln":
            if (a <= 0) {
                throwServerStyleError("Natural log is defined only for positive numbers");
            }
            ans = Math.log(a);
            mes = `Natural log of ${a}`;
            break;
        case "abs":
            ans = Math.abs(a);
            mes = `Absolute value of ${a}`;
            break;
        case "fact":
            if (!Number.isInteger(a) || a < 0) {
                throwServerStyleError("Factorial is defined for non-negative integers only");
            }
            ans = factorial(a);
            mes = `Factorial of ${a}`;
            break;
        case "exp":
            ans = Math.exp(a);
            mes = `e raised to ${a}`;
            break;
        case "pi":
            ans = Math.PI;
            mes = "Value of PI";
            break;
        default:
            ans = Math.E;
            mes = "Value of Euler's number (e)";
            break;
    }

    return {
        data: {
            timestamp: new Date(),
            mes,
            ans
        }
    };
}

window.calculate = calculate;