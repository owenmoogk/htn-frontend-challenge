import { useEffect, useState } from 'react';
import './style.css';
import Login from './Login';
import InfoModal from './Info';

export default function App() {

  // this should not be a function for security purposes
  // however for this purpose, storing if the user is logged in works (for demonstration)
  function getLoggedInState(){
    if (localStorage.getItem('loggedIn')){
      return localStorage.getItem('loggedIn') === 'true'
    }
    return false
  }

  const [data, setData] = useState()
  const [sortedBy, setSortedBy] = useState('date')
  const [loginPopup, setLoginPopup] = useState(false)
  const [loggedIn, setLoggedIn] = useState(getLoggedInState())

  const [infoModal, setInfoModal] = useState()
  const [infoId, setInfoId] = useState()

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  useEffect(() => {
    fetch("https://api.hackthenorth.com/v3/events")
      .then(response => response.json())
      .then(json => {setData(json); sortTable('date')})
  }, [])

  window.onclick = function(event) {
    if (event.target == document.getElementById("myModal") && (loginPopup || infoModal)) {
      setLoginPopup(false)
      setInfoModal(false)
    }
  }

  // table sorting function
  function sortTable(sortBy) {

    setSortedBy(sortBy)

    function shouldSwap(node1, node2, sortBy){
      if (sortBy == 'date'){
        if (node1.childNodes[1].innerText > node2.childNodes[1].innerText){
          return(true)
        }
        return(false)
      }
      if (sortBy == 'category'){
        if (node1.childNodes[2].innerText > node2.childNodes[2].innerText){
          return(true)
        }
        return(false)
      }
    }

    var table = document.getElementById('table').childNodes[0]
    var nodes = table.childNodes

    for (var i = 0; i < nodes.length; i++){
      for (var j = 1; j < nodes.length; j++){
        if (shouldSwap(nodes[j-1], nodes[j], sortBy)){
          table.insertBefore(nodes[j], nodes[j-1])
        }
      }
    }
  }

  // searching function
  function search(searchBy){
    var table = document.getElementById('table').childNodes[0]
    var nodes = table.childNodes

    for (var i = 0; i < nodes.length; i++){
      if (nodes[i].innerText.toLowerCase().includes(searchBy.toLowerCase())){
        nodes[i].style.display = ''
      }
      else{
        nodes[i].style.display = 'none'
      }
    }
    
  }

  function timestampToString(timestamp){
    let startTime = new Date(timestamp)
    var min = startTime.getMinutes() < 10 ? '0' + startTime.getMinutes() : startTime.getMinutes();
    return months[startTime.getMonth()] + ' ' +  startTime.getDate() + ', ' + startTime.getHours() + ":" + min;
  }

  return (
    <div className="App">

      {/* if the login popup is active */}
      {loginPopup ?
        <Login setLoginPopup={setLoginPopup} setLoggedIn={setLoggedIn}/>
        :null
      }

      {/* if the info modal popup is active for descriptions of events */}
      {infoModal ? 
        <InfoModal infoId={infoId} timestampToString={timestampToString}/>
        :null
      }

      {/* page header */}
      <div style={{
        width: "100%",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex"
        }}>
          <h1>Events&nbsp;</h1><h1 className='mobileHidden'> - Hack the North</h1>
        </div>
      </div>
      
      {/* header with sorting and searching */}
      <div className="head">
        
        <input type="text" id="searchBar" onKeyUp={(e) => search(e.target.value)} placeholder="Search by Name, Date, Time, or Event Type" />
        
        <div>
          {/* logged in button */}
          {loggedIn
            ? <button onClick={() => {setLoggedIn(false); localStorage.setItem('loggedIn', false)}}>Logout</button>
            : <button onClick={() => setLoginPopup(true)}>Login</button>
          }
        
          {/* sort button */}
          {sortedBy === 'date'
            ? <button onClick={() => sortTable('category')} id="sort-button" className='mobileHidden'>Sort by Category</button>
            : <button onClick={() => sortTable('date')} id="sort-button" className='mobileHidden'>Sort by Start Time</button>
          }
        </div>
       
      </div>

      {/* table */}
      <div className="tableHolder">
        <table id="table">
          <tbody>

            {/* mapping the data onto the table items */}
            {data
              ? data.map((item, key) => {

                // don't show private things when the user is not logged in
                // there should probably be more security things here, however for this demo it is ok
                if (item.permission !== 'private' || loggedIn){
                  return (
                    <tr key={key} onClick={() => {setInfoModal(true); setInfoId(item.id)}}>

                      {/* name */}
                      <td>
                        <b>{item.name}</b>
                      </td>

                      {/* date */}
                      <td className='mobileHidden'>
                        {timestampToString(item.start_time) + ' - ' + timestampToString(item.end_time)}
                      </td>

                      {/* activity type (converting from this_case to This Case (snake case to english)) */}
                      <td className='mobileHidden'>
                        {item.event_type.replace('_', ' ').charAt(0).toUpperCase() + item.event_type.replace('_', ' ').slice(1)}
                      </td>
                    </tr>
                  )
                }
                return null
              })
              : null
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}