import express from 'express'
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const middleware = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const hostname = req.hostname;
    console.log("Method: ", method);
    console.log("URL: ", url);
    console.log('Hostname is :', hostname);
    console.log("current time: ", new Date());
    next();
}

function handler(req, res) {
    const a = Number(req.body.a);
    const operator = req.body.operator;
    const b = req.body.b !== undefined && req.body.b !== "" ? Number(req.body.b) : undefined;
    const angleMode = req.body.angleMode === "deg" ? "deg" : "rad";

    const unaryOps = new Set(["sqrt", "sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "log", "ln", "abs", "fact", "exp", "pi", "e"]);
    const binaryOps = new Set(["+", "-", "*", "/", "%", "^"]);
    if (!unaryOps.has(operator) && !binaryOps.has(operator)) {
        return res.status(400).json({
            timestamp: new Date(),
            mes: "Invalid operator"
        });
    }

    if ((operator !== "pi" && operator !== "e") && Number.isNaN(a)) {
        return res.status(400).json({
            timestamp: new Date(),
            mes: "Value of a must be a valid number"
        });
    }

    if (binaryOps.has(operator) && Number.isNaN(b)) {
        return res.status(400).json({
            timestamp: new Date(),
            mes: "Value of b must be a valid number for this operation"
        });
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
                return res.status(400).json({ timestamp: new Date(), mes: "Division by zero is not allowed" });
            }
            ans = a / b;
            mes = `Division of ${a} by ${b}`;
            break;
        case "%":
            if (b === 0) {
                return res.status(400).json({ timestamp: new Date(), mes: "Modulo by zero is not allowed" });
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
                return res.status(400).json({ timestamp: new Date(), mes: "Square root of negative number is invalid" });
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
                return res.status(400).json({ timestamp: new Date(), mes: "Input for asin must be between -1 and 1" });
            }
            ans = angleMode === "deg" ? (Math.asin(a) * 180 / Math.PI) : Math.asin(a);
            mes = `Inverse Sine of ${a} (${angleMode})`;
            break;
        case "acos":
            if (a < -1 || a > 1) {
                return res.status(400).json({ timestamp: new Date(), mes: "Input for acos must be between -1 and 1" });
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
                return res.status(400).json({ timestamp: new Date(), mes: "log10 is defined only for positive numbers" });
            }
            ans = Math.log10(a);
            mes = `Base-10 log of ${a}`;
            break;
        case "ln":
            if (a <= 0) {
                return res.status(400).json({ timestamp: new Date(), mes: "Natural log is defined only for positive numbers" });
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
                return res.status(400).json({ timestamp: new Date(), mes: "Factorial is defined for non-negative integers only" });
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

    const timestamp = new Date();
    res.status(200).json({
        timestamp,
        mes,
        ans
    });
}

app.post('/Calculator/', middleware, handler);

app.listen(3000, () => {
    console.log(" ---------------Server started on port 3000 ----------------");
});