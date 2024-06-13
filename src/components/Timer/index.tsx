import React, { useState, useEffect } from 'react'

type TPropsTimer = {
  onFinishTimer: () => void
}

export default function Timer({ onFinishTimer }: TPropsTimer) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count > 0) {
      const timeoutId = setTimeout(() => {
        setCount(count - 1)
      }, 1000)

      // Limpa o timeout quando o componente é desmontado ou quando o count muda
      return () => clearTimeout(timeoutId)
    }

    if (count == 0) {
      onFinishTimer()
    }
  }, [count, onFinishTimer])

  return (
    <>
      <div>
        <h5>{count}</h5>
      </div>
    </>
  )
}
