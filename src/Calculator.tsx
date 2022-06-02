import { useMemo, useReducer } from "react"
import Display from "./Display"
import Keyboard from "./Keyboard"
import reducer, { CalcState } from "./Reducer"

function showState(state: CalcState): string {
  switch (state.mode) {
    case 'arg1': {
      return state.transientInput
    }
    case 'arg2': {
      return state.transientInput
    }
    case 'operator': {
      return state.operand1.toString()
    }
    case 'answered': {
      return state.result.toString()
    }
    case 'initial': {
      return '0'
    }
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, { mode: 'initial' })
  return (
    <div className="flex flex-col items-stretch gap-y-1 | min-w-min max-w-lg
                   | p-1 | border border-solid border-gray-800">
      <Display value={showState(state)} />
      <Keyboard dispatch={dispatch} />
    </div>
  )
}
