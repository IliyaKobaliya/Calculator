import React, { useState, useEffect } from 'react'

import { CalculatorView } from './CalculatorView';
import { CalcModel } from './CalculatorModel'



export const Calculator = () => {
    const [result, setResult] = useState(0)

    const changeTextField = (str) => CalcModel.changeTextField(str);
 
    const getResult = () => CalcModel.getCount();

    const updateResult = (result) => setResult(result);


    useEffect(() => {
        CalcModel.subscribe(updateResult)

        return () => CalcModel.unsubscribe(updateResult)
    }, [])


    return (
        <div>
            <CalculatorView result={result} clickAction={getResult} changeAction={changeTextField} />
        </div>
    )
}

