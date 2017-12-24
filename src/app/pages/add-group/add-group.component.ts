import { Component, OnInit } from '@angular/core';
import { GroupGame } from 'app/Models/GroupGame';
import { ImageGame } from 'app/Models/ImageGame';
import { FirebaseService } from 'app/services/firebase/firebase.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  public groupGame = new GroupGame();

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  addImage() {
    const imageGame = new ImageGame();
    this.groupGame.imageGameList.push(imageGame);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  onFileChange(ev, index) {
    ev.preventDefault();
    ev.stopPropagation();
    this.handleInputChange(ev, index);
  }

  handleInputChange(e, index) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = reader.onload = (event) => {

      const img = new Image();
      if (reader.result) {
        // this.groupGame.imageGameList[index].imageUrl = reader.result;
        this.firebaseService.uploadImage(reader, 'sdsd').then(
          (snapshot) => {
            console.log(snapshot);
            console.log('Uploaded a base64 string!');
            this.groupGame.imageGameList[index].imageUrl = snapshot.downloadURL;
          });
      }
      console.log(img.src);
    };
    // reader.readAsDataURL(item[0]);

    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e, index) {
    const reader = e.target;
    this.groupGame.imageGameList[index].imageUrl = reader.result;
  }

}
