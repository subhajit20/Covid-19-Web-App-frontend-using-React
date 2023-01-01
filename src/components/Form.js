import React,{useState,useEffect} from 'react';
import ShowLocation from './ShowLocation';
import SearchLocation,{GetCountryImg} from '../lib/SearchLocation';

function Form() {
    const [data,setData] = useState("");
    const [loc,setLoc] = useState([]);
    const [loading,setLoading] = useState(false)
    const [location,setLocation] = useState({
        name:"",
        image:""
    })
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
    const getSpecificLocation = async (locdetails,locationname,locationcode) =>{
        setData(locationname);
        locationinput.value = locationname;
        showLocations.style.display = "none";
        const data = await GetCountryImg(locationcode);
        if(data.data.flagImageUri){
            setLocation({
                name:locationname,
                image:data.data.flagImageUri
            })
        }else{
            setLocation({
                name:locationname,
                image:""
            })
        }
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
                    return <ShowLocation key={index} searchedLocs={x.name} onClickData={()=> getSpecificLocation(x,x.name,x.code)}/>
                }) : <ShowLocation  searchedLocs={<div className="spinner-border" role="status">
                                                    <span className="sr-only"></span>
                                                  </div>} />
                }
            </div>
        </div>

        <div style={{"display":"flex","justifyContent":"space-between","flexWrap":"wrap","alignItems":"center"}}>
        {
            location !== null ? <><img src={location.image} alt="country_img" style={{"width":"200px","paddingRight":"1.1rem"}}/><p>Country - <strong>{location.name}</strong></p></>: ""
        }
        </div>
    </div>
  )
}

export default Form