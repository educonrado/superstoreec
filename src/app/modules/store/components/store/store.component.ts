import { Component, OnInit } from '@angular/core';
import { StoreVerifiedService } from '@core/services/store-verified/store-verified.service';
import { Store } from '@data/model/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  store$!: Observable<Store>;
  constructor(private storeVerifiedService: StoreVerifiedService ) { }

  ngOnInit(): void {
    this.storeVerifiedService.getStore('edu');
    this.store$ = this.storeVerifiedService.loadStoreObservable;
  }

}
