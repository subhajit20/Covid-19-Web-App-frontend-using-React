const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4390fc5c07mshbb5a1ef5d1cb5f0p17abb7jsn7aa7fdda0c7a',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
}

async function SearchLocation(loc) {
  const res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10&namePrefix=${loc}`,options);
  
  const data = await res.json();

  return data
}

export async function GetCountryImg(loc) {
  const res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${loc}`,options);
  
  const data = await res.json();
  return data
}

export async function GetCovid19data(name){
    const res = await fetch("http://127.0.0.1:8000/home/s2/",{
      method:"POST",
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify({
        name:name
      })
    });
    const data = await res.json();

    return data
}

export default SearchLocation