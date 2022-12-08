import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: any;
  lat;
  lng;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: 'National Art Gallery',
      latitude: '36.7744',
      longitude: '-119.7306',
    },
    {
      title: 'West End Hospital',
      latitude: '36.7750',
      longitude: '-119.7310',
    },
    {
      title: 'Chop Chop Steakhouse',
      latitude: '36.7735',
      longitude: '-119.7300',
    },
  ];

  constructor(private geo: Geolocation) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.whereIam();
  }

  whereIam() {
    this.geo
      .getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: true,
      })
      .then((res) => {
        this.lat = String(res.coords.latitude);
        this.lng = String(res.coords.longitude);
        this.showMap();
        console.log('result ', res);
        console.log('lat', this.lat);
        console.log('lng ', this.lng);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ionViewDidEnter() {
  //   this.showMap();
  // }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapmarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        icon: {
          path: faMapPin.icon[4] as string,
          fillColor: '#ffff00',
          fillOpacity: 1,
          anchor: new google.maps.Point(
            faMapPin.icon[0] / 2, // width
            faMapPin.icon[1] // height
          ),
          strokeWeight: 1,
          strokeColor: '#ffffff',
          scale: 0.075,
        },
        //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
      });

      mapmarker.setMap(this.map);
      this.addInfoWindowToMarker(mapmarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
      '<div id="content">' +
      '<h2 id="firstHeading" class="firstHeading">' +
      marker.title +
      '</h2>' +
      '<p>Latitude: ' +
      marker.latitude +
      '</p>' +
      '<p>Longitude: ' +
      marker.longitude +
      '</p>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(this.lat, this.lng);
    const options = {
      center: location,
      zoom: 19,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.roadmap,
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
}
