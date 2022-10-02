import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { clearData, incrementID, decrementID, inputID, fetchData } from './features/dataSlice'

function App() {
  // your logic goes here!
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if (data.apiData) {         //if() == true
      return <img style={{ width: "60vw" }}
        src={data.apiData.primaryImage}
        alt={data.apiData.title} />
    }
    else {
      return <p>No Image Found</p>
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(incrementID())}>Next</button>
        <button onClick={() => dispatch(decrementID())}>Back</button>
      </div>
      <input value={data.objectID} onChange={(e) => {
        dispatch(inputID(Number(e.target.value)))
      }} />
      <div>
        {renderImg()}
      </div>
    </div>
  );
}

export default App;