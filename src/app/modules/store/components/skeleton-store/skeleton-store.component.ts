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
  store: Store = {};
  constructor(
    private storeVerifiedService: StoreVerifiedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nameStore = this.activatedRoute.snapshot.params.id;
    if (this.nameStore !== undefined) {
      this.storeVerifiedService.getStore(this.nameStore).then();

      /**
       * .then((res) => {
        res.subscribe((store) => {
          if (store.exists) {
            this.store = store.data() as Store;
          } else {
            // TODO revisar
            this.router.navigate([':id/empty'])
          }
        });
      });
       */
    }
  }
}
