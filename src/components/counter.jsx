import React, { Component } from 'react';
import axios from 'axios';

class Counter extends Component {
    constructor() {
        super();
        this.state = {
           data: [],
           position:{}
        }
     }

componentDidMount() {
  navigator.geolocation.getCurrentPosition((position) => {
    this.state.position={latitude:position.coords.latitude,longitude:position.coords.longitude};
    //calculateDistance(position.coords.latitude,position.coords.longitude,)
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude}%2C${position.coords.longitude}&radius=1500&type=restaurant&key=AIzaSyDSppklhRjH-gjsLaikHpaQ9POE5L_WJpQ`)
    .then(response => {
      this.setState({ data: response.data.results });
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  })

}

     render() {

        return (
          <div style={{ width: '70%',margin: 'auto'}}>
            {this.state.data.map(item => (
              <div key={item.id} style={{ margin: '50px',}} >
                 <div className="card shadow p-3 mb-5 bg-white rounded" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <img src={item.icon} className="card-img-top" alt="..." style={{ width: '25%', height: '25%', marginRight: '1rem' }} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.vicinity}</p>
        <p>{this.calculateDistance(this.state.position.latitude,this.state.position.longitude,item.geometry.location.lat,item.geometry.location.lng)}km</p>
      </div>
    </div>
              </div>
            ))}
          </div>
        );


      }
      calculateDistance(lattitude1, longittude1,lattitude2,longittude2)
{

const toRadian = n => (n * Math.PI) / 180

    let lat2 = lattitude2
    let lon2 = longittude2
    let lat1 = lattitude1
    let lon1 = longittude1

    console.log(lat1, lon1+"==="+lat2, lon2)
    let R = 6371  // km
    let x1 = lat2 - lat1
    let dLat = toRadian(x1)
    let x2 = lon2 - lon1
    let dLon = toRadian(x2)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    console.log("distance==?",d)
    return d.toFixed(2)
      }
     }



export default Counter;