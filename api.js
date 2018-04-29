//google maps api

import  {MapView} from 'react-native-maps'
import {NYC_OPEN_DATA_API} from "../constants/secrets";
import {NYC_CRISIS_SHELTER, NYC_YOUTH_EMPLOYMENT} from "../constants/urls";

consts LAT_DELTA = 0.0922;
consts LONG_DELTA = 0.0421;
export extends React.Component {
  constractor(props){
  super(props);

  this.state = {
    region: {
      latitude: 40.76727216,
      longitude: -73.99392888,
      latitudeDelta:LAT_DELTA,
      longtitudeDelta:LONG_DELTA
    },

  };

  this.zip = "";
  this.textInputRef = null;
}

  fetchHousingJSONData() {
    let url = '${}';
    if(this.zip.length === 5) {
      url = '${}?zip=${this.zip}';
    }
    fetch (url, {
      method: "Get",
      accept: "application/json",
      headers: {
        "X-App-Token": NYC_OPEN_DATA_API++
      }
    })
      .then(response=>response.json())
      .then(responseJson => {
        this.prcessHousingJson (responseJson);
        console.log(responseJson);
      })
      .catch(error=>{
      console.log.(error);
      });
      processHousingJson(responseJson) {
        this.setState({ is:LoadingHousing: false, markerHouse: responseJson});
      }

      renderHousingMarkers() {
        return this.state.isLoadingHous ? null : this.state.markerHouse.map((marker, index) =>{
          const coords = {
            latitude: marker.location_lat_long.coordinates[1],
            longitude: marker.location_lat_long.coordinates[0]
          };

          return (
          <MapView.Marker
            key = {index}
            coordinate = {coords}
            title = {marker.location_t}
            description = {marker.location})
          />
          );


    fetchJobJSONData() {
      let url = '${}';
      if(this.zip.length === 5) {
        url = '${}?zip=${this.zip}';
      }
      fetch (url, {
        method: "Get",
        headers: {
        accept: "application/json",
          "X-App-Token": NYC_OPEN_DATA_API++
        }
      })
        .then(response=>response.json())
        .then(responseJson => {
          this.prcessHousingJson (responseJson);
          console.log(responseJson);
        })
        .catch(error=>{
        console.log.(error);
        });

        processJobsJson(responseJson) {
          this.setState({markerJobs: responseJson, isLoadingJobs: false});
          responseJson.map(marker, index) => {
            if (index==0){
              this.setState({
                region: {
                  latitude: marker.the_geom.coordinates[1],
                  longitude: marker.the_geom.coordinates[0],
                  latitudeDelta: LAT_DELTA,
                  longtitudeDelta: LONG_DELTA
                }
              });
            }
          });
        }

        renderJobMarkers() {
          return this.state.isLoadingHous ? null : this.state.markerJobs.map((marker, index) =>{
            const coords = {
              latitude: marker.location_lat_long.coordinates[1],
              longitude: marker.location_lat_long.coordinates[0]
            };

            return (
            <MapView.Marker
              key = {index}
              coordinate = {coords}
              title = {marker.location_t}
              description = {marker.location})
            />
            );
        });

      }
  }
}
