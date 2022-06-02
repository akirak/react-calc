import { assert, test } from 'vitest'
import reduce from '../src/Reducer'

test('Normal calculation', () => {

  assert.deepEqual(
    reduce({
      mode: 'initial',
    }, {
      kind: 'number',
      payload: '1',
    }),
    // Change the mode to arg1
    {
      mode: 'arg1',
      operand1: 1,
      transientInput: '1',
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'arg1',
      operand1: 2,
      transientInput: '2',
    }, {
      kind: 'number',
      payload: '1',
    }),
    // Update the operand value
    {
      mode: 'arg1',
      operand1: 21,
      transientInput: '21',
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'arg1',
      operand1: 2,
      transientInput: '2',
    }, {
      kind: 'binary',
      payload: 'add',
    }),
    // Change the mode to operator
    {
      mode: 'operator',
      operand1: 2,
      operator: 'add',
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'operator',
      operand1: 2,
      operator: 'add',
    }, {
      kind: 'number',
      payload: '3',
    }),
    // Change the mode to arg2
    {
      mode: 'arg2',
      operand1: 2,
      operator: 'add',
      operand2: 3,
      transientInput: '3',
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'arg2',
      operand1: 2,
      operator: 'add',
      operand2: 3,
      transientInput: '3',
    }, {
      kind: 'number',
      payload: '.',
    }),
    // Update the operand value
    {
      mode: 'arg2',
      operand1: 2,
      operator: 'add',
      operand2: 3,
      transientInput: '3.',
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'arg2',
      operand1: 2,
      operator: 'add',
      operand2: 3,
      transientInput: '3',
    }, {
      kind: 'confirm',
    }),
    // Set the result
    {
      mode: 'answered',
      result: 5,
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'answered',
      result: 5,
    }, {
      kind: 'binary',
      payload: 'subtract',
    }),
    // Initiate a new calculation with the operand and operator
    {
      mode: 'operator',
      operand1: 5,
      operator: 'subtract',
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'answered',
      result: 5,
    }, {
      kind: 'unary',
      payload: 'negate',
    }),
    // Initiate a new calculation with the operand
    {
      mode: 'arg1',
      operand1: -5,
      transientInput: '-5',
    }
  )

  assert.deepEqual(
    reduce({
      mode: 'answered',
      result: 5,
    }, {
      kind: 'number',
      payload: '3',
    }),
    // Clear the result and enter a new value
    {
      mode: 'arg1',
      operand1: 3,
      transientInput: '3',
    }
  )

})

test('Unary operations', () => {
  test('negate', () => {
    assert.deepEqual(
      reduce({
        mode: 'arg1',
        operand1: 2,
        transientInput: '2',
      }, {
        kind: 'unary',
        payload: 'negate',
      }),
      {
        mode: 'arg1',
        operand1: -2,
        transientInput: '-2',
      }
    )

    assert.deepEqual(
      reduce({
        mode: 'arg2',
        operand1: 2,
        operator: 'add',
        operand2: -3,
        transientInput: '-3',
      }, {
        kind: 'unary',
        payload: 'negate',
      }),
      {
        mode: 'arg2',
        operand1: 2,
        operator: 'add',
        operand2: 3,
        transientInput: '3',
      }
    )
  })
})
