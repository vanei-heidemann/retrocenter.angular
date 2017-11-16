import { Component, OnInit } from '@angular/core';
import { Platform } from '../platform';
import { PlatformService } from '../platform.service';
import { CollectionResult } from '../collection.result';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit {

  platforms: Platform[];
  hasNext: boolean = false;
  hasPrev: boolean = false;

  constructor(private platformService: PlatformService) { }

  ngOnInit() {
    this.getPlatforms();
  }

  getPlatforms(): void {
    this.platformService.getPlatforms().subscribe(p => {
      this.platforms = p.items;
      this.hasNext = p.hasNext;
      this.hasPrev = p.hasPrev;
    });
  }

  getNextPlatforms(): void {
    this.platformService.getNextPage().subscribe(p => {
      this.platforms = p.items;
      this.hasNext = p.hasNext;
      this.hasPrev = p.hasPrev;
    });
  }

  getPrevPlatforms(): void {
    this.platformService.getPrevPage().subscribe(p => {
      this.platforms = p.items;
      this.hasNext = p.hasNext;
      this.hasPrev = p.hasPrev;
    });
  }
}
