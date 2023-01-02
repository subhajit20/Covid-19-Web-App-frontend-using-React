import React,{useState,useEffect} from 'react';
import ShowLocation from './ShowLocation';
import SearchLocation,{GetCountryImg,GetCovid19data} from '../lib/SearchLocation';
import DetailCard from './DetailCard';

function Form() {
    const [data,setData] = useState("");
    const [loc,setLoc] = useState([]);
    const [loading,setLoading] = useState(false)
    const [flag,setFlag] = useState(false)
    const [location,setLocation] = useState({
        name:"",
        image:""
    });
    const [totalDetails,setDetails] = useState([])

    const locationinput = document.querySelector(".locationinput");
    const showLocations = document.querySelector(".showLocations");
    
    /**
     * 
     * @param {inputdata} e 
     */
    const oninputChange = async (e) =>{
        setData(e.target.value)
        setLoading(true)

        if(data.length == 0){
            setDetails([]);
            
        }else{
        }
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
            setFlag(true)
            setLoading(false)
            showLocations.style.display = "none";
        }
    }

    /**
     * 
     * @param {string} loc
     */
    const getSpecificLocation = async (locdetails,locationname,locationcode) =>{
        locationinput.value = locationname;
        setData(locationname);
        console.log(data)
        showLocations.style.display = "none";

        const getImageofcountry = await GetCountryImg(locationcode);
        const details = await GetCovid19data(locationname);
        setLoading(true)


        if(details.Data.length > 0){
            setDetails([details.Data[0]])
            setFlag(true)
        }
        if(getImageofcountry.data.flagImageUri){
            setLoading(false)

            setLocation({
                name:locationname,
                image:getImageofcountry.data.flagImageUri
            })
        }else{
            setLoading(false)
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

        <div style={{"display":"flex","justifyContent": loading ? "center" : "space-between","flexWrap":"wrap","alignItems":"center","marginBottom":"1.3rem"}}>
        {
            !loading ? <><img src={location.image} alt="country_img" style={{"width":"200px","paddingRight":"1.1rem"}}/><p><i className="fa-solid fa-earth-americas"></i> - <strong>{location.name}</strong></p></> :
            <div className="spinner-border" role="status">
                                                    <span className="sr-only"></span>
                                                  </div>
        }
        </div>  
        {/* {data.length > 0} */}
        {
            loading ? <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div> : flag ?  <DetailCard alldetails={totalDetails}/> : ""
        }
    </div>
  )
}

export default Form