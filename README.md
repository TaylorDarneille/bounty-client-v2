## 0: Start JSX

```jsx
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wanted</h1>
      </header>
      <main>
        <p>Posters will go here.</p>
      </main>
    </div>
  );
```

## 1: Get Bounty Data

* make a fetch call to the API '/bounties' in a useEffect and print to the console

```js
  useEffect(()=>{
    fetch('http://localhost:8000/bounties')
    .then(response=>{
      return response.json()
    })
    .then(foundBounties=>{
      console.log(foundBounties)
    })
  })
```

* install and configure cors package in server to fix error

```js
const cors = require('cors')
app.use(cors())
```

## 2. Build out posters.

* Create a Poster component and import it to App.js
* Render a poster in App for each bounty:
    * store foundBounties in state so we have access to that list in the return

    ```js
    function App() {
        const [bounties, setBounties] = useState([])

        useEffect(()=>{
            fetch('http://localhost:8000/bounties')
            .then(response=>{
                return response.json()
            })
            .then(foundBounties=>{
                console.log(foundBounties)
                setBounties(foundBounties)
            })
        })
    ```
    * Map the bounties to a list of Poster components that each receive a bounty prop.

    ```js
    let posters = bounties.map(b=>{
        return <Poster bounty={b} key={b.name}/>
    })

    return (
        <div className="App">
            <header className="App-header">
                <h1>Wanted</h1>
            </header>
            <main>
                {posters}
            </main>
        </div>
    )
    ```
    * Build out Poster component
    ```js
    function Poster(props) {
        let status = props.bounty.caught ? 'In Custody' : 'At Large'
        return (
            <div className="poster">
                <h2>{status}</h2>
                <h3>{props.bounty.name}</h3>
                <h4>{props.bounty.reward}</h4>
            </div>
            )
    }

    export default Poster;
    ```
## 3: Build out Display

* Set up a 'current' state to hold a bounty to be displayed. Users will set the current bounty by clicking a "more" button on a poster.

```js
  const [current, setCurrent] = useState({})
```

* Write a changeCurrent method in App.js and pass it to each poster:

```js
 const changeCurrent = (bounty) => {
    setCurrent(bounty)
  }

  let posters = bounties.map(b=>{
    return <Poster bounty={b} key={b.name} changeCurrent={changeCurrent}/>
  })
```

* Add a 'more' button to Poster component that changes the current bounty:

```js
    <button onClick={()=>{props.changeCurrent(props.bounty)}}>More</button>
```

* Import and render in App.js within header.

```js
function Display(props) {
    let display
    if(props.bounty.name) {
        display = (
            <div className='showBounty'>
                <h2>{props.bounty.name}</h2>
                <h3>Wanted For: {props.bounty.wantedFor}</h3>
                <p>Last Seen: {props.bounty.lastSeen?props.bounty.lastSeen:'Unknown'}</p>
            </div>
        )
    } else {display = <p>Click "more" to see more about a bounty.</p>}
    return (
        <>
            {display}
        </>
    )
}

export default Display;
```