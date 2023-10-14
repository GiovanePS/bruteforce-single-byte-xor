import {useState} from 'react'
import './Main.css'

function Main() {
    
    const [encodedString, setEncodedString] = useState("")
    const [resultsList, setResultsList] = useState<string[]>([]);

    const results = (input: string): void => {
        try {
            let results: string[] = []

            let inputLenght: number = input.length
            for (let i: number = 0; i < inputLenght; i += 2) {
                results.push(String.fromCharCode(parseInt(input.slice(i, i+2), 16)))
            }

            setResultsList(prevList => [...prevList, ...results])
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        results(encodedString)
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <main>
                <input type='text' placeholder='Input' value={encodedString} onChange={e => setEncodedString(e.target.value)} />
                {resultsList.map((result, index) => (
                    <div key={index}>{result}</div>
                ))}
            </main>
            <button>Ok</button>
        </form>
        </>
    )
}

export default Main