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


  products$!: Observable<any>;
  constructor(private storeVerifiedService: StoreVerifiedService) { }

  ngOnInit(): void {
    this.products$ = this.storeVerifiedService.storeProducts$;
  }

  clickProduct(id: number): void {
    console.log('producto:' + id);
  }
}
