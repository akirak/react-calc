type Binary
  = 'multiply' | 'subtract' | 'add' | 'division'

type Unary
  = 'negate' | 'percent'

export type CalcState =
  | {
    // An initial state
    mode: 'initial'
  }
  | {
    // Accepting a value for the first argument
    mode: 'arg1'
    operand1: number
    transientInput: string
  }
  | {
    // An operator is registered
    mode: 'operator'
    operand1: number
    operator: Binary
  }
  | {
    // Accepting a value for the second argument
    mode: 'arg2'
    operand1: number
    operator: Binary
    operand2: number
    transientInput: string
  }
  | {
    // The user has pressed '=' and the result has been confirmed
    mode: 'answered'
    result: number
  }

export type CalcEvent =
  | {
    kind: 'binary'
    payload: Binary
  }
  | {
    kind: 'unary'
    payload: Unary
  }
  | {
    kind: 'number'
    payload: string
  }
  | {
    kind: 'confirm' | 'ac'
  }

function calc(op1: number, operator: Binary, op2: number) {
  switch (operator) {
    case 'multiply': {
      return op1 * op2
    }
    case 'subtract': {
      return op1 - op2
    }
    case 'add': {
      return op1 + op2
    }
    case 'division': {
      return op1 / op2
    }
  }
}

function applyOperator(operator: Unary, operand: number, operandString: string): [number, string] {
  switch (operator) {
    case 'negate': {
      return [-operand, negateNumberString(operandString)]
    }
    case 'percent': {
      return [operand * 0.01, (operand * 0.01).toString()]
    }
  }
}

function negateNumberString(s: string): string {
  if (/^-/.test(s)) {
    return s.slice(1)
  } else {
    return '-' + s
  }
}

export type Dispatch = (event: CalcEvent) => void

export default function reduce(state: CalcState, event: CalcEvent): CalcState {
  switch (event.kind) {

    case 'number': {

      let transientInput
      if ('transientInput' in state) {
        transientInput = state.transientInput + event.payload
      } else {
        transientInput = event.payload
      }

      if (state.mode === 'initial' || state.mode === 'arg1' || state.mode === 'answered') {
        return {
          mode: 'arg1',
          transientInput,
          operand1: Number(transientInput),
        }
      } else if (state.mode === 'operator' || state.mode === 'arg2') {
        return {
          mode: 'arg2',
          transientInput,
          operand1: state.operand1,
          operator: state.operator,
          operand2: Number(transientInput),
        }
      } else {
        return state
      }
    }

    case 'binary': {

      switch (state.mode) {
        case 'operator': {
          return {
            mode: 'operator',
            operand1: state.operand1,
            operator: event.payload,
          }
        }
        case 'arg1': {
          return {
            mode: 'operator',
            operand1: state.operand1,
            operator: event.payload,
          }
        }
        case 'answered': {
          return {
            mode: 'operator',
            operand1: state.result,
            operator: event.payload,
          }
        }
        default: {
          return state
        }
      }

    }

    case 'unary': {

      switch (state.mode) {
        case 'arg1': {
          const [operand1, transientInput] = applyOperator(event.payload,
            state.operand1,
            state.transientInput
          )
          return {
            mode: state.mode,
            operand1,
            transientInput,
          }
        }
        case 'arg2': {
          const [operand2, transientInput] = applyOperator(event.payload,
            state.operand2,
            state.transientInput
          )
          return {
            mode: state.mode,
            operand1: state.operand1,
            operator: state.operator,
            operand2: operand2,
            transientInput,
          }
        }
        case 'answered': {
          const [operand1, transientInput] = applyOperator(event.payload,
            state.result,
            state.result.toString()
          )
          return {
            mode: 'arg1',
            operand1,
            transientInput,
          }
        }
        default: {
          return state
        }
      }
    }

    case 'confirm': {
      switch (state.mode) {
        case 'arg2': {
          let result = calc(state.operand1, state.operator, state.operand2)
          return {
            mode: 'answered',
            result,
          }
        }
        case 'arg1': {
          return {
            mode: 'answered',
            result: state.operand1,
          }
        }
        default: {
          return state
        }
      }
    }

    case 'ac': {
      return {
        mode: 'initial'
      }
    }

    default: {
      return state as never;
    }

  }
}
