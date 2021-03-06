import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Environment, GoogleMapOptions, GoogleMaps, MyLocation, Marker, GoogleMapsAnimation, GoogleMap } from '@ionic-native/google-maps';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss']
})
export class OrderDetailsPage implements OnInit {
  constructor(private platform: Platform, private toastCtrl: ToastController) {}
  map: GoogleMap;
  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAUlvH09qvfqTyR6izVneDPXEzDyHcIB-0',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAUlvH09qvfqTyR6izVneDPXEzDyHcIB-0'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map
      .getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        });
        const marker: Marker = this.map.addMarkerSync({
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });
        marker.showInfoWindow();
      })
      .catch(err => {
        this.showToast(err.error_message);
      });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
