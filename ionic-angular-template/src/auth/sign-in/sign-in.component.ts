import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public email: FormControl;
  public password: FormControl;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
    this.signInForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  async signIn(email: string, password: string) {
    const checkEmailVerified = await this.authService.checkUserEmailVerified(email, password);
    if (checkEmailVerified === undefined) {
      this.showAlert("User with that email doesn't exist!");
      return;
    }
    if (checkEmailVerified === false) {
      const alert = await this.alertCtrl
      .create({
        header: 'Info Message',
        message: 'If you want to use all functionalities you have to verify your email first!',
        buttons: ['Okay']
      })
      alert.present();
      }
    this.authService.signIn().subscribe((d) => {
        console.log(d);
        // this.notificationService.success('Successfully logged!');
        this.router.navigate(['']);
      }, (e) => {
        this.showAlert(e.error.message)
      });
    }

    private async showAlert(message: string) {
      const alert = await this.alertCtrl
        .create({
          header: 'Authentication failed',
          message: message,
          buttons: ['Okay']
        })
        alert.present();
    }
}