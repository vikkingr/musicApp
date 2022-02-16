import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root"
})
export class CloudService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {

    let storageRef = this.storage.ref('uploads');
    // let fStoreRef = this.db.collection('files');
    // fStoreRef.valueChanges().subscribe(res => {
    //   console.log(res);
    // });
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
