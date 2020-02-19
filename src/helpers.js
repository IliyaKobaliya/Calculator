import {
    LITERAL,
    OPERATOR,
    LEFT_PARENTHESIS,
    RIGHT_PARENTHESIS,
    operations
} from './constants'

const has = Object.prototype.hasOwnProperty;

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

const isOperator = (item) => has.call(operations, item)

const isNumber = (item) => (!isNaN(item))
 
const isLeftParanthesis = (item) => (item === '(')

const isRightParanthesis = (item) => (item === ')')

export const tokenize = (str) => {

    const tmp = str.replace(/\s+/g, '').split('')

    let result = [],
        numberBuffer = [];

    const emptyNumberBuffer = () => {
        if (numberBuffer.length) {
            result.push(new Token(LITERAL, numberBuffer.join('')))
            numberBuffer = [];
        }
    }

    tmp.forEach((item) => {
        if (isNumber(item)) {
            numberBuffer.push(item)
        }
        else if (isOperator(item)) {
            emptyNumberBuffer();
            result.push(new Token(OPERATOR, item))
        }
        else if (isLeftParanthesis(item)) {
            emptyNumberBuffer();
            result.push(new Token(LEFT_PARENTHESIS, item))
        }
        else if (isRightParanthesis(item)) {
            emptyNumberBuffer();
            result.push(new Token(RIGHT_PARENTHESIS, item))
        }
    })
    if (numberBuffer.length) {
        emptyNumberBuffer()
    }

    return result;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
const count = (numbers, operations) => {
    let val1 = Number(numbers.pop()),
        val2 = Number(numbers.pop()),
        lastOperation = operations.pop().doOperation;
    numbers.push(lastOperation(val2, val1))
}

export const calculate = (tokens) => {
    let stackNumbers = [],
        stackOperations = [];

    tokens.forEach((token) => {
        switch (token.type) {
            case LITERAL: {
                return stackNumbers.push(token.value)
            }
            case OPERATOR: {
                if (stackOperations.length === 0) {
                    return stackOperations.push(operations[token.value])
                } else {
                    if (!isLeftParanthesis(stackOperations[stackOperations.length - 1].value)) {
                        const lastOperator = stackOperations[stackOperations.length - 1];
                        const thisOperator = operations[token.value];
                        if (lastOperator.priority >= thisOperator.priority) {
                            count(stackNumbers, stackOperations)
                        }
                    }
                    return stackOperations.push(operations[token.value])
                }
            }
            case LEFT_PARENTHESIS: {
                return stackOperations.push(token)
            }
            case RIGHT_PARENTHESIS: {
                while (!isLeftParanthesis(stackOperations[stackOperations.length - 1].value)) {
                    count(stackNumbers, stackOperations)
                }
                return stackOperations.pop()
            }
            default: throw new Error('Введены не валидные данные!')
        }
    })

    while (stackOperations.length) {
        count(stackNumbers, stackOperations)
    }

    return stackNumbers.pop();
}
