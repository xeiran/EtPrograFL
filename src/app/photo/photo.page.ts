import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions,
} from '@awesome-cordova-plugins/camera-preview/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  imgUrl;

  constructor(private camera: Camera) {}

  ngOnInit() {}

  getCamera() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
      })
      .then((imageData) => {
        this.imgUrl = 'data:image/jpeg;base64,' + imageData;
        console.log(this.imgUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
