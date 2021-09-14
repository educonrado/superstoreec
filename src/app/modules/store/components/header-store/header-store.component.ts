import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.scss']
})
export class HeaderStoreComponent implements OnInit {

  @Input()
  nameStore: string | undefined = '';
  @Input()
  imageStore: string | undefined = '';
  image$: any;

  constructor() { }

  ngOnInit(): void {
    // TODO Carga asincrona de imagen
    this.image$ = new Observable((obs)=>{
      obs.next(this.imageStore);
    });
  }

}
