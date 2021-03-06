import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private infoMessages: any;
  public loggedUser: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tranlateService: TranslateService,
    private toastService: ToastService
    ) {
      this.tranlateService.get('info-messages').subscribe((messages) => {
        this.infoMessages = messages;
      });
    }

  ngOnInit(): void {
    this.authService.loggedUserData.subscribe((data) => this.loggedUser = data);
  }
  

  logout() {
    try {
      this.authService.logout();
      this.toastService.success(`${this.infoMessages.successfullyLogout}`);
      this.router.navigate(['/signin']);
    } catch(e) {
      this.toastService.error(e.message);
    }
  }
}
