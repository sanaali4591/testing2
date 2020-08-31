import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

import { Base64 } from '@ionic-native/base64/ngx';

import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController,private ocr: OCR,private base64: Base64) {}

  ngOnInit() {
    this.photoService.loadSaved();
  }

  public async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Read Text',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          
          this.ocr.recText(OCRSourceType.FASTFILEURL, photo.filepath)
              .then((res: OCRResult) => console.log(JSON.stringify(res)))
              .catch((error: any) => console.error(error));

              console.log('photo.filepath : '+photo.filepath);
             
          
         

         }
      }]
    });
    await actionSheet.present();
  }
}
