import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {  
  public isCanMikeActive : boolean = true;
  public recording : boolean = false;
  public isSearchFocused : boolean = false;
  public fileName : string;
  public filePath : string;
  public audio : any;
  public audioList: any[] = [];

  constructor(  private mediaObj : Media, private fileObj : File, private platform : Platform) {  }

  private getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  public record(event) {
    this.recording = true;
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.fileObj.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.mediaObj.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.fileObj.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.mediaObj.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  public recordStop(event) {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  public focusSearch() {
    this.isSearchFocused = true;
  }

  public focusSearchOut() {
    this.isSearchFocused = false;
  }
}
