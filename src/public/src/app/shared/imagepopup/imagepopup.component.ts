import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { PhotoManager } from '../services/restcontroller/bizservice/photo.service';
import { Photo001wb } from '../services/restcontroller/entities/Photo001wb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-imagepopup',
  templateUrl: './imagepopup.component.html',
  styleUrls: ['./imagepopup.component.css'],
})
export class ImagepopupComponent implements OnInit {
  @Input() title: string = '';
  details: any;
  @Input() source: any;
  hexToRgb: any;
  photo: Photo001wb[] = [];
  photo001wb: Photo001wb[] = [];
  rgbToHex: any;
  // @HostBinding('style.--color_l1') colorthemes_1: any;
  // @HostBinding('style.--color_l2') colorthemes_2: any;
  // @HostBinding('style.--color_l3') colorthemes_3: any;
  // @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private photoManager: PhotoManager,
    private calloutService: CalloutService
  ) {}

  ngOnInit(): void {
   
  }

  loadData() {
 
  }

  onAcceptClick() {
    if (this.details._id) {      
      if (this.details.status == 'INACTIVE') {
        let photo001wb = new Photo001wb();
        photo001wb.status = 'ACTIVE';
        photo001wb.flag = true;
        let res0 = this.photoManager.updatesub(photo001wb, this.details._id,);
        forkJoin([res0]).subscribe((data: any) => {
          this.photo = deserialize<Photo001wb[]>(Photo001wb, data[0]);
          this.calloutService.showSuccess('Image Updated Successfully');
          this.activeModal.close('Yes');
        });
      
      }
      else {
        this.calloutService.showWarning('Image Already Updated');
      }
    }
  }
  onCloseClick() {
    if (this.details._id) {
      let photo001wb = new Photo001wb();
      photo001wb.flag = false;
      this.photoManager.updatesubss(photo001wb).subscribe((response) => {});
      this.activeModal.close('No');
    }
  }
}
