import { Component, OnInit } from '@angular/core';
import { Datafile } from '../datafile';
import { DatafileService } from '../datafile.service';
import { CollectionResult } from '../collection.result';

@Component({
  selector: 'app-datafiles',
  templateUrl: './datafiles.component.html',
  styleUrls: ['./datafiles.component.css']
})
export class DatafilesComponent implements OnInit {

  datafiles: Datafile[];
  hasNext: boolean = false;
  hasPrev: boolean = false;

  constructor(private datafileService: DatafileService) { }

  ngOnInit() {
    this.getDatafiles();
  }

  getDatafiles(): void {
    this.datafileService.getDatafiles()
      .subscribe(p => {
        this.datafiles = p.items;
        this.hasNext = p.hasNext;
        this.hasPrev = p.hasPrev;
        });
  }

  getNextDatafiles(): void {
    this.datafileService.getNextPage()
      .subscribe(p => {
        this.datafiles = p.items;
        this.hasNext = p.hasNext;
        this.hasPrev = p.hasPrev;
        });
  }

  getPrevDatafiles(): void {
    this.datafileService.getPrevPage()
      .subscribe(p => {
        this.datafiles = p.items;
        this.hasNext = p.hasNext;
        this.hasPrev = p.hasPrev;
        });
  }
}
