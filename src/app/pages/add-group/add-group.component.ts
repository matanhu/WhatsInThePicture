import { ActivatedRoute, Router } from '@angular/router';
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
  public isGroupName = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.groupGame.key = params['id'] || '';
        if (this.groupGame.key) {
          this.firebaseService.getGroup(this.firebaseService.getUserId(), this.groupGame.key).then(
            (snapshot) => {
              this.groupGame = snapshot.val();
              this.groupGame.key = params['id'];
              this.isGroupName = true;
            });
        }
      });
  }

  ngOnInit() {
  }

  addImage() {
    const imageGame = new ImageGame();
    this.groupGame.imageGameList.push(imageGame);
  }

  allowDrop(ev) {
    ev.preventDefault();
    ev.target.style.background = '#e3e3e3';
  }

  dragleave(ev) {
    ev.preventDefault();
    ev.target.style.background = 'none';
  }

  onFileChange(ev, index) {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.style.background = 'none';
    this.handleInputChange(ev, index);
  }

  handleInputChange(e, index) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.groupGame.imageGameList[index].name = file.name.substring(0, file.name.lastIndexOf('.'));

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
        this.firebaseService.uploadImage(this.firebaseService.getUserId(), this.groupGame.name, reader, file.name).then(
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

  continue() {
    if (!this.groupGame.name) {
      alert('יש להכניס שם קבוצה');
      return;
    }
    this.isGroupName = true;
  }

  removeImage(index) {
    this.groupGame.imageGameList.splice(index, 1);
  }

  save() {
    if (!this.groupGame.name) {
      alert('יש להכניס שם קבוצה');
      return;
    }
    if (!this.groupGame.key) {
      this.firebaseService.setGroup(this.firebaseService.getUserId(), this.groupGame).then(
        (snapshot) => {
          console.log(snapshot);
          this.router.navigate(['/Backoffice']);
        });
    } else {
      this.firebaseService.updateGroup(this.firebaseService.getUserId(), this.groupGame).then(
        (snapshot) => {
          console.log(snapshot);
          this.router.navigate(['/Backoffice']);
        });
    }
  }

}
