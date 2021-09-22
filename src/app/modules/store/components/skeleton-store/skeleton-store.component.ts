import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreVerifiedService } from '@core/services/store-verified/store-verified.service';
import { Store } from '@data/model/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skeleton-store',
  templateUrl: './skeleton-store.component.html',
  styleUrls: ['./skeleton-store.component.scss'],
})
export class SkeletonStoreComponent implements OnInit {
  private nameStore: string = '';
  store$!: Observable<Store>;
  storeUndefined = false;
  loading = true;
  constructor(
    private storeVerifiedService: StoreVerifiedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nameStore = this.activatedRoute.snapshot.params.id;
    if (this.nameStore !== undefined) {
      this.storeVerifiedService.getStore(this.nameStore);
      this.store$ = this.storeVerifiedService.loadStoreObservable;
      this.store$.subscribe((store) => {
        if (store === undefined) {
          this.storeUndefined = true;
          this.router.navigate(['empty'], { relativeTo: this.activatedRoute });
        }
        this.loading = false;
      });
    }
  }
}
