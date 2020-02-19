import React from 'react'

export const CalculatorView = ({ result, clickAction, changeAction }) => {
    return (
        <div>
            <input onChange={(e) => changeAction(e.target.value)} placeholder={'Write you parameters'} />
            {result}
            <button onClick={clickAction}>=</button>
        </div>
    )
}
