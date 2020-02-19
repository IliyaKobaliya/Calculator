import { calculate, tokenize } from '../../../helpers'

class CalculatorModel {
    constructor(textField = '') {
        this._textField = textField;
        this.observers = [];
    }

    subscribe(f) {
        this.observers.push(f);
    }

    unsubscribe(f) {
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }

    changeTextField(str) {
        this._textField = str
    }

    getCount() {
        let tokens = tokenize(this._textField); 
        this.notify(calculate(tokens))
    }


}
export const CalcModel = new CalculatorModel();