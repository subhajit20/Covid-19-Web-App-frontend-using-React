import React,{useState,useEffect} from 'react';
import ShowLocation from './ShowLocation';
import SearchLocation from '../lib/SearchLocation';

function Form() {
    const locationinput = document.querySelector(".locationinput");
    const showLocations = document.querySelector(".showLocations");
    const [data,setData] = useState("");
    const [loc,setLoc] = useState([]);
    
    /**
     * 
     * @param {inputdata} e 
     */
    const onDataChange = async (e) =>{
        setData(e.target.value)
    }

    /**
     * Calling @SearchLocation funtion
     * this funtion takes location name
     */
    const SearchMyLocation = async () =>{
        const datas = await SearchLocation(data);   
        if(datas){
            if(datas.data.length > 0){
                setLoc(datas.data)
                showLocations.style.display = "block";
            }else{
                console.log("No Location");
                showLocations.style.display = "none";
            }
        }else{
            showLocations.style.display = "none";
        }
    }

    /**
     * 
     * @param {string} loc
     */
    const clickSpecificLocation = (loc) =>{
        console.log(loc);
        setData(loc);
        locationinput.value = loc;
        showLocations.style.display = "none";
    }
    
    useEffect(()=>{
        if(data.length > 0){
            SearchMyLocation();
        }
    },[data])
  return (
    <div className='container'>
        <div className="mb-3 mt-5">
            <input type="location" className="form-control locationinput" id="exampleFormControlInput1" placeholder="Enter your location" onChange={onDataChange}/>
            <div className='showLocations' style={{"position":"relative","top":"2px"}}>
                {loc.length > 0 ? loc.map((x,index)=>{
                    return <ShowLocation key={index} searchedLocs={x.name} onClickData={()=> clickSpecificLocation(x.name)}/>
                }) : ""}
            </div>
        </div>
    </div>
  )
}

export default Form