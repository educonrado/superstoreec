import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Appsettings } from '@data/constants/appsettings';
import { MatDialog } from '@angular/material/dialog';
import { AsistentComponent } from '../asistent/asistent.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
    name: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {

  }

  openAsistent(): any {
    const dialogRef = this.dialog.open(AsistentComponent);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([Appsettings.RUTA_LOGIN]);
  }
}
