import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { useEffect } from 'react';
import { clearData, incrementID, decrementID, inputID, fetchData } from './features/dataSlice'

function App(props) {
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

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])


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

const mapStateToProps = (state, ownProps) => ({
  objectId: state.data.objectId
})


export default connect(mapStateToProps)(App)
