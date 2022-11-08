import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { VideoManager } from '../services/restcontroller/bizservice/video.service';
import { Video001wb } from '../services/restcontroller/entities/Video001wb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-videopopup',
  templateUrl: './videopopup.component.html',
  styleUrls: ['./videopopup.component.css']
})
export class VideopopupComponent implements OnInit {

  @Input() title: string = '';
  details: any;
  @Input() sources: any;
  hexToRgb: any;
  video: Video001wb[] = [];
  rgbToHex: any;
  // @HostBinding('style.--color_l1') colorthemes_1: any;
  // @HostBinding('style.--color_l2') colorthemes_2: any;
  // @HostBinding('style.--color_l3') colorthemes_3: any;
  // @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    public activeModal: NgbActiveModal,
    private calloutService: CalloutService,
    private authManager: AuthManager, private videoManager: VideoManager,
  ) { }

  ngOnInit(): void {
    let res0 = this.videoManager.allvideo();
    forkJoin([res0]).subscribe((data: any) => {
      this.video = deserialize<Video001wb[]>(Video001wb, data[0]);
      this.loadData();
    });
  }

  loadData() {
    this.videoManager.allvideo().subscribe((response) => {
      this.video = deserialize<Video001wb[]>(Video001wb, response);
    });
  }

  

  onAcceptClick() {
    if (this.details._id) {
      if (this.details.status == 'INACTIVE') {
        let video001wb = new Video001wb();
        video001wb.status = 'ACTIVE';
        video001wb.flag = true;
        let res0 = this.videoManager.updatesub(video001wb, this.details._id);
        forkJoin([res0]).subscribe((data: any) => {
          this.video = deserialize<Video001wb[]>(Video001wb, data[0]);
          this.calloutService.showSuccess('Video Updated Successfully');
          this.activeModal.close('Yes');
        }); 
      }
      else {
        this.calloutService.showWarning('Video Already Updated');
      }
    }
  }
  onCloseClick() {
    if (this.details._id) {
      let video001wb = new Video001wb();
      video001wb.flag = false;
      this.videoManager.updatesubss(video001wb).subscribe((response) => {
      })
      this.activeModal.close('No');
    }
  }


}
