const promise = import('app2/index')

export function Component() {
    const handleClick = async () => {
        const { default: sayHello } = await promise

        sayHello()
    }

    return (
        <div>
            <button onClick={handleClick}>say 444aaa</button>
        </div>
    )
}
