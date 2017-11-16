import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Datafile } from '../datafile';
import { DatafileService } from '../datafile.service';

@Component({
  selector: 'app-datafile-detail',
  templateUrl: './datafile-detail.component.html',
  styleUrls: ['./datafile-detail.component.css']
})
export class DatafileDetailComponent implements OnInit {
  @Input() datafile: Datafile;

  constructor(
    private route: ActivatedRoute,
    private datafileService: DatafileService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDatafile();
  }

  getDatafile(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.datafileService.getDatafile(id)
      .subscribe(datafile => this.datafile = datafile);
  }

  goBack(): void {
    this.location.back();
  }
}
