import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-viewr',
  templateUrl: './img-viewr.component.html',
  styleUrls: ['./img-viewr.component.scss']
})
export class ImgViewrComponent implements OnInit {
  showImageViewer = false;
  imageUrl: string | null = null;

  openImageViewer(imageUrl: string) {
    this.imageUrl = imageUrl;
    this.showImageViewer = true;
  }

  closeImageViewer() {
    this.showImageViewer = false;
    this.imageUrl = null;
  }
  ngOnInit(): void {
  }
  
  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    if( this.showImageViewer ==false){
    if (!target.closest('.image-viewer-container')) {
      this.closeImageViewer();
    }
  }
}
}
