import React,{useState,useEffect} from 'react'

function DetailCard({alldetails}) {
    console.log(alldetails)
    const [data,setData] = useState([])
    function getdata(){
        if(alldetails.length > 0){
            setData([...alldetails])
        }else{
            setData([])
        }
    }

    useEffect(()=>{
        if(alldetails.length > 0){
            getdata()
        }
    },[alldetails.length])
  return (
    <div >
        {
            alldetails.length > 0 ? data.map((data,index)=>{
                return <><div className='row' key={index}>
                    <div className="card-deck" style={{"display":"flex","justifyContent":"center","flexWrap":"wrap"}}>
            <div className="card text-white bg-primary mb-3 mx-2 col">
                <div className="card-header">  <i className="fa-solid fa-virus"></i></div>
                <div className="card-body">
                    <h5 className="card-title">Active Cases</h5>
                    <p className="card-text">{data["Active Cases"] ? data["Active Cases"] : "No Active Cases"}</p>
                </div>
            </div>
            <div className="card text-white bg-secondary mb-3 mx-2 col">
                <div className="card-header"><i className="fa-solid fa-calendar-plus"></i></div>
                    <div className="card-body">
                        <h5 className="card-title">New Cases</h5>
                        <p className="card-text">{data["New Cases"] ? data["New Cases"] : "No New Cases"}</p>
                    </div>
                </div>
            </div>
            <div className='row'>

            <div className="card text-white bg-success mb-3 mx-2  col">
                <div className="card-header"> <i className="fa-solid fa-hammer"></i></div>
                <div className="card-body">
                    <h5 className="card-title">Success card title</h5>
                    <p className="card-text">{data["Total Recovered"] ? data["Total Recovered"] : "No Total Recorvered"}</p>
                </div>
            </div>
            <div className="card text-white bg-danger mb-3 mx-2  col" >
                <div className="card-header"> <i className="fa-solid fa-bed-pulse"></i> </div>
                <div className="card-body">
                    <h5 className="card-title"> Serious Critical </h5>
                    <p className="card-text">{data["Serious Critical"] ? data["Serious Critical"] : "No Serious Crital Case"}</p>
                </div>
            </div>
            </div>
            <div className='row'>
                    <div className="card text-white bg-warning mb-3 mx-2 col" >
                    <div className="card-header"><i className="fa-solid fa-book-skull"></i></div>
                    <div className="card-body">
                        <h5 className="card-title"> Total Deaths </h5>
                        <p className="card-text">{data["Total Deaths"] ? data["Total Deaths"] : "No Total Death"}</p>
                    </div>
                    </div>
                </div>
            </div>
            </>
            })  : ""
                
        }
    </div>
  )
}

export default DetailCard