import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { StreamState } from '../interfaces/stream-state';
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class AudioService {
  private stop$ = new Subject<void>();
  private audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  private addEvents(obj, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }

  private streamObservable(url) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
  
      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };
  
      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  pause() {
    this.audioObj.pause();
  }

  play() {
    this.audioObj.play();
  }

  playStream(url) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  seekTo(seconds) {
    this.audioObj.currentTime = seconds;
  }

  stop() {
    this.stop$.next();
  }

}