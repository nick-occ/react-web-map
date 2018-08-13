import React, { PureComponent } from 'react';
import EsriLoaderReact from 'esri-loader-react';

class EsriMap extends PureComponent {
    render() {
        const options = {
            url: 'https://js.arcgis.com/4.8/'
          };

        return (
            <EsriLoaderReact  
                options={options}
                modulesToLoad={[
                    'esri/Map', 
                    'esri/views/MapView',
                    'esri/layers/MapImageLayer']}    
                onReady={({loadedModules: [Map, MapView, MapImageLayer], containerNode}) => {
                    let map = new Map({basemap: 'osm'})
                    let mapView = new MapView({
                        container: containerNode,
                        map,
                        center: [-80.73330044747591, 35.30811028755144],
                        zoom: 17
                    })

                    var layer = new MapImageLayer({
                        url: "http://test-maps.uncc.edu/arcgis/rest/services/AdoptASpot/MapServer"
                      });

                    map.add(layer);  // adds the layer to the map

                    mapView.on('click',(evt)=> {
                        console.log(evt.mapPoint.latitude,evt.mapPoint.longitude);
                    })
                }}
            />
        );
    }
}

export default EsriMap;

         