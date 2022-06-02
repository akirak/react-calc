import { useMemo } from "react"

type DisplayProps = {
  value: string
}

export default function Display({ value }: DisplayProps) {
  return (
    <div className="bg-gray-300 text-right p-1">
      {value}
    </div>
  )
}
