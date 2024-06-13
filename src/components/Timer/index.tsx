import React, { useState, useEffect } from 'react'

type TPropsTimer = {
  handleFinishCouterRevealCards: () => void
}

export default function Timer({ handleFinishCouterRevealCards }: TPropsTimer) {
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
      handleFinishCouterRevealCards()
    }
  }, [count])

  return (
    <>
      <div>
        <h5>{count}</h5>
      </div>
    </>
  )
}
