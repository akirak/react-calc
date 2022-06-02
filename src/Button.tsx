import { Dispatch, CalcEvent } from "./Reducer"

type ButtonProps = {
  label: string
  className?: string
  dispatch: Dispatch
  event: CalcEvent
}

export default function Button({ label, className = '', dispatch, event }: ButtonProps) {
  return (
    <input type="button" value={label}
      className={`border border-solid border-gray-800 | m-0.5 ` + className}
      onClick={() => dispatch(event)}
    />
  )
}
