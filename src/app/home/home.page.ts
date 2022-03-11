import { Component, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: any;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: 'National Art Gallery',
      latitude: '-17.824991',
      longitude: '31.049295',
    },
    {
      title: 'West End Hospital',
      latitude: '-17.820987',
      longitude: '31.039682',
    },
    {
      title: 'Chop Chop Steakhouse',
      latitude: '-17.829460',
      longitude: '31.053844',
    },
  ];

  constructor() {}

  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapmarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
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
    const location = new google.maps.LatLng(-17.824858, 31.053028);
    const options = {
      center: location,
      zoom: 18,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
}
