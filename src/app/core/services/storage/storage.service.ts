import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Appsettings } from '@data/constants/appsettings';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private angularFirestorage: AngularFireStorage
  ) { }

  public saveImageStorage(uid: string, file: any): any {
    let urlStorage;
    const dirTmpImg = Appsettings.PATH_STORAGE_IMAGES +`${uid}/logo`;
    const fileRef = this.angularFirestorage.ref(dirTmpImg);
    const task = this.angularFirestorage.upload(dirTmpImg, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url)=>{
            urlStorage = url;
          });

        })
      )
      .subscribe();
      return task;
  }
}
