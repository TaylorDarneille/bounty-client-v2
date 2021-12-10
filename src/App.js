import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Poster from './Poster'
import Display from './Display'
import Form from './Form'

function App() {
  const [bounties, setBounties] = useState([])
  const [current, setCurrent] = useState({})

  useEffect(()=>{
    getBounties()
  }, [])

  const getBounties = () => {
    fetch('http://localhost:8000/bounties')
    .then(response=>{
      return response.json()
    })
    .then(foundBounties=>{
      console.log(foundBounties)
      setBounties(foundBounties)
    })
  }

  const changeCurrent = (bounty) => {
    setCurrent(bounty)
  }

  let posters = bounties.map(b=>{
    return <Poster bounty={b} key={b.name} changeCurrent={changeCurrent}/>
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wanted</h1>
        <Display bounty={current} />
        
      </header>
      <section>
        {posters}
      </section>
      <section className="App-header">
        <Form refreshBounties={getBounties}/>
      </section>
    </div>
  )
}

export default App;
