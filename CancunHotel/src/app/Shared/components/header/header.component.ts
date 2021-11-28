
import { Component, OnInit } from '@angular/core';
import { Token } from '../../helpers/token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  session : Token = new Token();

  constructor() { }

  ngOnInit(): void {
  }

  Logout(){
    this.session.removeToken();

  }

}
