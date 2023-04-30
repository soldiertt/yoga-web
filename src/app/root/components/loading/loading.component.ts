import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from "../../../core/services/loading-service";

@Component({
  selector: 'yog-loader',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  isLoading: boolean;

  constructor(public loadingService: LoadingService,
              private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe(loading => {
      this.isLoading = loading
      this.cdRef.detectChanges()
    })
  }

}
