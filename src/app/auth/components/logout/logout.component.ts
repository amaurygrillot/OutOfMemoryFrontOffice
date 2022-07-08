import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "@app/auth/services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.logOut()
  }

  logOut() {
    this.localStorage.remove("JWTToken");
    this.router.navigateByUrl('').then(() => {
      window.location.reload()
    });
  }
}
