import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { UserInterface } from '../user-interface';

@Component({
  selector: 'app-profile-info',
  imports: [],
  template: `
    <div class="profileInfo">
      <img [src]="userData?.avatar_url">
      <div>
        <h1>{{ userData?.name }}</h1>
        <h2>{{ userData?.login}}</h2>
      </div>
      <a>{{ userData?.html_url}}</a>
    </div>
  `,
  styleUrl: './profile-info.css',
})
export class ProfileInfo {
  @Input() userData : UserInterface | undefined
}
