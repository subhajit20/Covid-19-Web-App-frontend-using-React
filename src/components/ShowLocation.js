import React from 'react'
import '../css/ShowLocation.css'

function ShowLocation({searchedLocs,onClickData}) {
  return (
    <div className="showmylocations" onClick={onClickData}>
       {searchedLocs}
    </div>
  )
}

export default ShowLocation