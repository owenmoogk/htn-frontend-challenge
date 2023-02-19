import { useEffect, useState } from 'react';

export default function InfoModal(props) {

  const [data, setData] = useState()
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("Error, could not fetch data.")
    }, 100)
    fetch("https://api.hackthenorth.com/v3/events/" + props.infoId)
      .then(response => response.json())
      .then(json => { console.log(json); setData(json); })
  }, [props.infoId])

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        {data
          ? <div>
              <h3>{data.name}</h3>
              <p className='info'>{data.event_type.replace('_', ' ').charAt(0).toUpperCase() + data.event_type.replace('_', ' ').slice(1)}</p>
              <p className='info'>{props.timestampToString(data.start_time) + ' - ' + props.timestampToString(data.end_time)}</p>
              <a href={
                data.permission == 'private'
                ? data.private_url
                : data.public_url
              } className='info' target='_blank' rel='noreferrer'>
                <button className='centerButton'>
                  Open
                </button>
              </a>
              <p className='description'>{data.description}</p>
              {data.speakers.length == 0
                ? null
                : <span>
                    <h4>Speaker - <span>{data.speakers[0].name}</span></h4>
                  </span>

              }
            </div>
          : <h3>{errorMessage}</h3>
        }

      </div>
    </div>
  )
}