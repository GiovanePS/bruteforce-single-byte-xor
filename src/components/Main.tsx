import {useState} from 'react'
import './Main.css'

function Main() {
    
    const [inputString, setInputString] = useState<string>("")
    const [resultsList, setResultsList] = useState<string[]>([])
    const [option, setOption] = useState<string>("encode")

    const decodeResults = (input: string): void => {
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

    const encodeResults = (input: string) => {
        try {
            console.log("Funcionou!")
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        setResultsList([])
        e.preventDefault()
        if (option == "encode") {
            encodeResults(inputString)
        } else {
            decodeResults(inputString)
        }
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div id="input-section">
                <main>
                    <input type='text' placeholder='Input' value={inputString} onChange={e => setInputString(e.target.value)} />
                    {resultsList.map((result, index) => (
                        <div key={index}>{result}</div>
                    ))}
                </main>
                <select name="option" id="option" value={option} onChange={e => setOption(e.target.value)}>
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            </div>
            <button>Ok</button>
        </form>
        </>
    )
}

export default Main