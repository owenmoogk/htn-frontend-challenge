import { useEffect, useState } from 'react';

export default function InfoModal(props) {

  const [data, setData] = useState()
  const [errorMessage, setErrorMessage] = useState()

  // fetching the data, or throwing an error
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("Error, could not fetch data.")
    }, 100)
    fetch("https://api.hackthenorth.com/v3/events/" + props.infoId)
      .then(response => response.json())
      .then(json => {setData(json); })
  }, [props.infoId])

  return (
    // popup
    <div id="myModal" className="modal">
      <div className="modal-content">
        {data
          ? <div>
              {/* heading with the name */}
              <h3>{data.name}</h3>

              {/* activity type */}
              <p className='info'>{data.event_type.replace('_', ' ').charAt(0).toUpperCase() + data.event_type.replace('_', ' ').slice(1)}</p>

              {/* date */}
              <p className='info'>{props.timestampToString(data.start_time) + ' - ' + props.timestampToString(data.end_time)}</p>

              {/* link to open the page */}
              <a href={
                data.permission === 'private'
                ? data.private_url
                : data.public_url
              } className='info' target='_blank' rel='noreferrer'>
                <button>
                  Open
                </button>
              </a>

              {/* description */}
              <p className='description'>{data.description}</p>

              {/* speaker (only showing the main speaker) */}
              {data.speakers.length === 0
                ? null
                : <span>
                    <h4>Speaker - <span>{data.speakers[0].name}</span></h4>
                  </span>

              }
            </div>

            // if the data has not loaded, show the error message 
          : <h3>{errorMessage}</h3>
        }

      </div>
    </div>
  )
}