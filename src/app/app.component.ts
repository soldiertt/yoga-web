import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Store} from '@ngxs/store';
import {Authentication} from './public/state/actions/authentication';
import {LoadingService} from "./loading/loading-service";

@Component({
  selector: 'yog-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isLoading: boolean;

  constructor(private authService: AuthService, private store: Store,
              private loadingService: LoadingService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(bool => {
      if (bool) {
        this.store.dispatch(new Authentication())
      }
    })
    this.loadingService.isLoading$.subscribe(loading => {
      this.isLoading = loading
      this.cdRef.detectChanges()
    })
  }

}
