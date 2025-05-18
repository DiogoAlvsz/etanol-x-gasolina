import { useState, type FormEvent } from 'react'
import './App.css'
import LogoImg from './assets/logo.png'

interface InfoProps {
  title: string;
  gasolina: string | number;
  etanol: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState('')
  const [etanolInput, setEtanolInput] = useState('')
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent) {
    event.preventDefault();

    const gasolina = Number(gasolinaInput)
    const etanol = Number(etanolInput)

    if (isNaN(gasolina) || isNaN(etanol) || gasolina === 0) {
      alert("Por favor, preencha os dois campos corretamente.");
      return;
    }

    const calculo = etanol / gasolina;

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar etanol",
        gasolina: gasolinaInput,
        etanol: etanolInput
      })
    } else {
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: gasolinaInput,
        etanol: etanolInput
      })
    }
  }

  return (
    <div>
      <main className='container'>
        <img className='logo' src={LogoImg} alt='Logo da calculadora "Etanol ou Gasolina"' />
        <h1 className='title'>Qual a melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Etanol (preço por litro)</label>
          <input
            className='input'
            type='number'
            placeholder='0'
            min={0}
            step={0.01}
            required
            value={etanolInput}
            onChange={(e) => setEtanolInput(e.target.value)}
          />

          <label>Gasolina (preço por litro)</label>
          <input
            className='input'
            type='number'
            placeholder='0'
            min={0}
            step={0.01}
            required
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(e.target.value)}
          />

          <input className='button' type='submit' value="Calcular" />
        </form>

        {info && (
          <section className='result'>
            <h2 className='result-title'>{info.title}</h2>
            <span>Etanol R$ {Number(info.etanol).toFixed(2)}</span>
            <span>Gasolina R$ {Number(info.gasolina).toFixed(2)}</span>
          </section>
        )}
      </main>
    </div>
  )
}

export default App

