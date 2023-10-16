import {useState} from 'react'
import './Main.css'

function Main() {
    
    const [encodedString, setEncodedString] = useState("")
    const [resultsList, setResultsList] = useState<string[]>([]);

    const results = (input: string): void => {
        setResultsList([])
        try {
            let results: string[] = []

            let inputLenght: number = input.length
            let hexXoredInput: string = '';
            for (let caractere = 32; caractere < 127; caractere++) {
                for (let i: number = 0; i < inputLenght; i += 2) {
                    hexXoredInput += String.fromCharCode(parseInt(input.slice(i, i+2), 16) ^ caractere)
                }
                results.push(`Caractere:\xa0\xa0\xa0\xa0${String.fromCharCode(caractere)}\xa0\xa0\xa0\xa0= ${hexXoredInput}`)
                hexXoredInput = ''
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