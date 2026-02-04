import { useState } from 'react'
import { PrimaryButton } from './components/PrimaryButton'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div style={{
            padding: '40px',
            fontFamily: 'var(--font-families-sans)',
            backgroundColor: 'var(--color-bg-secondary)',
            minHeight: '100vh'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <h1 style={{ color: 'var(--color-text-primary)' }}>Design System Demo</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                    React + Vite + Tokens Studio 🚀
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>

                    <PrimaryButton onClick={() => setCount((count) => count + 1)}>
                        Clicked {count} times
                    </PrimaryButton>

                    <PrimaryButton onClick={() => alert("Hola!")}>
                        Say Hello
                    </PrimaryButton>

                </div>
            </div>
        </div>
    )
}

export default App
