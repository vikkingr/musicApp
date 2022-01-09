import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
  providedIn: "root"
})
export class CloudService {

  constructor(private storage: AngularFireStorage) {

    let storageRef = this.storage.ref('uploads');
    storageRef.listAll().subscribe((response) => {
      response.items.forEach(item => {
        item.getDownloadURL().then(response2 => {
          this.files.push({
            url: response2,
            name: item.name,
            artist: 'Robi'
          })
        })
      })
    })
    
  }

  files: Array<{url: string, name: string, artist: string}> = [];

  getFiles() {
    return of(this.files);
  }

}
