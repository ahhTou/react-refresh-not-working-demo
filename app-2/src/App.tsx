import { useEffect } from 'react'

import { Component } from './Component'

export default function App() {
    useEffect(() => {
        console.log('[app] mounted!')
    }, [])

    return (
        <div>
            <div>App</div>

            <Component />
        </div>
    )
}
