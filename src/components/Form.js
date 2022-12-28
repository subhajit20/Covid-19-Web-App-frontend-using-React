import React,{useState,useEffect} from 'react';
import ShowLocation from './ShowLocation';
import SearchLocation from '../lib/SearchLocation';

function Form() {
    const [data,setData] = useState("");
    const [loc,setLoc] = useState([]);
    const [loading,setLoading] = useState(false)
    const locationinput = document.querySelector(".locationinput");
    const showLocations = document.querySelector(".showLocations");
    
    /**
     * 
     * @param {inputdata} e 
     */
    const oninputChange = async (e) =>{
        setData(e.target.value)
        setLoading(true)
    }

    /**
     * Calling @SearchLocation funtion
     * this funtion takes location name
     */
    const LoadLocations = async () =>{
        const datas = await SearchLocation(data);   
        if(datas){
            if(datas.data.length > 0){
                setTimeout(()=>{
                    setLoading(false)
                    setLoc(datas.data)
                    showLocations.style.display = "block";
                },1000)
            }else{
                console.log("No Location");
                showLocations.style.display = "none";
            }
        }else{
            setLoading(false)
            showLocations.style.display = "none";
        }
    }

    /**
     * 
     * @param {string} loc
     */
    const getSpecificLocation = (loc) =>{
        setData(loc);
        locationinput.value = loc;
        showLocations.style.display = "none";
    }
    
    useEffect(()=>{ 
        if(data.length > 0){
            LoadLocations();
        }
    },[data])
  return (  
    <div className='container'>
        <div className="mb-3 mt-5">
            <input type="location" className="form-control locationinput" id="exampleFormControlInput1" placeholder="Search for your location" onChange={oninputChange}/>
            <div className='showLocations' style={{"position":"relative","top":"2px"}}>
                {!loading ? loc.map((x,index)=>{
                    return <ShowLocation key={index} searchedLocs={x.name} onClickData={()=> getSpecificLocation(x.name)}/>
                }) : <ShowLocation  searchedLocs={<div className="spinner-border" role="status">
                                                    <span className="sr-only"></span>
                                                  </div>} />
                }
            </div>
        </div>

        
    </div>
  )
}

export default Form