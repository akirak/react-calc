import Button from "./Button";
import { Dispatch } from "./Reducer"

type KeyboardProps = {
  dispatch: Dispatch
}

export default function Keyboard({ dispatch }: KeyboardProps) {
  return (
    <div className="inline-grid grid-cols-4">
      <Button dispatch={dispatch} label="AC" event={{ kind: 'ac' }} />
      <Button dispatch={dispatch} label="+/-" event={{ kind: 'unary', payload: 'negate' }} />
      <Button dispatch={dispatch} label="%" event={{ kind: 'unary', payload: 'percent' }} />
      <Button dispatch={dispatch} label="÷" event={{ kind: 'binary', payload: 'division' }} />

      <Button dispatch={dispatch} label="7" event={{ kind: 'number', payload: '7' }} />
      <Button dispatch={dispatch} label="8" event={{ kind: 'number', payload: '8' }} />
      <Button dispatch={dispatch} label="9" event={{ kind: 'number', payload: '9' }} />
      <Button dispatch={dispatch} label="×" event={{ kind: 'binary', payload: 'multiply' }} />

      <Button dispatch={dispatch} label="4" event={{ kind: 'number', payload: '4' }} />
      <Button dispatch={dispatch} label="5" event={{ kind: 'number', payload: '5' }} />
      <Button dispatch={dispatch} label="6" event={{ kind: 'number', payload: '6' }} />
      <Button dispatch={dispatch} label="-" event={{ kind: 'binary', payload: 'subtract' }} />

      <Button dispatch={dispatch} label="1" event={{ kind: 'number', payload: '1' }} />
      <Button dispatch={dispatch} label="2" event={{ kind: 'number', payload: '2' }} />
      <Button dispatch={dispatch} label="3" event={{ kind: 'number', payload: '3' }} />
      <Button dispatch={dispatch} label="+" event={{ kind: 'binary', payload: 'add' }} />

      <Button dispatch={dispatch} label="0" event={{ kind: 'number', payload: '4' }} className="col-start-1 col-end-3" />
      <Button dispatch={dispatch} label="." event={{ kind: 'number', payload: '.' }} />
      <Button dispatch={dispatch} label="=" event={{ kind: 'confirm' }} />
    </div>
  )
}
