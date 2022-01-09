import { Component, OnInit } from '@angular/core';
import { AudioService } from "../../services/audio.service";
import { CloudService } from "../../services/cloud.service";
import { StreamState } from "../../interfaces/stream-state";
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService,
    public auth: AuthService,
    private storage: AngularFireStorage
  ) 
  {
    // // get media files
    // cloudService.getFiles().subscribe(files => {
      
    //   this.files = files// .push(...files);

    // // hello my newest beat
    // // let ref = this.storage.ref('uploads/1641576699566_beatwad2.wav')
    // // let beatUrl: string;
    // // ref.getDownloadURL().subscribe(res => {
      
    // //   console.log(res)
      
    // //   this.files.push(
    // //     { url: res,
    // //       name: 'beatwad2',
    // //       artist: 'Robi'
    // //     }
    // //   );

    // //   return;

    // //   });

    //   console.log('player says', this.files)

    // });

    // // listen to stream state
    // this.audioService.getState().subscribe(state => {
    //   this.state = state;
    // });

  }

  ngOnInit() {
    // get all files
    this.cloudService.getFiles().subscribe((files) => {
      this.files = files
    });
    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  files: Array<{url: string, name: string, artist: string}>;
  state: StreamState;
  currentFile: any = {};

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  stop() {
    this.audioService.stop();
  }

}
