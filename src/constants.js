const LITERAL = 'LITERAL';
const OPERATOR = 'OPERATOR';
const LEFT_PARENTHESIS = 'LEFT_PARENTHESIS';
const RIGHT_PARENTHESIS = 'RIGHT_PARENTHESIS';

const operations = {
    '+': {
        priority: 1,
        doOperation: (a, b) => a + b
    },
    '-': {
        priority: 1,
        doOperation: (a, b) => a - b
    },
    '*': {
        priority: 2,
        doOperation: (a, b) => a * b
    },
    '/': {
        priority: 2,
        doOperation: (a, b) => a / b
    }
}

export { LITERAL, OPERATOR, LEFT_PARENTHESIS, RIGHT_PARENTHESIS, operations }