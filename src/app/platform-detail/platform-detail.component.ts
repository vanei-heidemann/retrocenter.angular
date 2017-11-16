import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Platform } from '../platform';
import { PlatformService } from '../platform.service';
import { PlatformArtifactFileImportHistory } from '../platform-artifact-file-import-history'

@Component({
  selector: 'app-platform-detail',
  templateUrl: './platform-detail.component.html',
  styleUrls: ['./platform-detail.component.css']
})
export class PlatformDetailComponent implements OnInit {
  @Input() platform: Platform;
  
  histories: PlatformArtifactFileImportHistory[];

  constructor(
    private route: ActivatedRoute,
    private platformService: PlatformService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlatform();
  }

  getPlatform(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.platformService.getPlatform(id)
      .subscribe(platform => this.platform = platform);
  }

  getHistories(): void {
    this.platformService.getImportHistories(this.platform.id).subscribe(p => {
      this.histories = p.items;
      console.log(this.histories[0].platformName);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
