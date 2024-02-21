import { useEffect, useState } from "preact/hooks"

export function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    native_setCount(count)
  }, [count])

  return (
    <main class="grid w-svw h-svh">
      <div class="place-self-center flex flex-col gap-3 align-middle">
        <span>
          Hello Vite + Preact + <span class="animate-bounce">Tailwind</span>!
        </span>
        <button onClick={() => setCount(count + 1)}>
          {count > 0 ? `Clicked ${count} times!` : "Click me!"}
        </button>
      </div>
    </main>
  )
}
