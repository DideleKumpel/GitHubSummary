import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { UserInterface } from '../user-interface';

@Component({
  selector: 'app-profile-info',
  imports: [],
  template: `
    <div class="profile-info">
      <img [src]="userData?.avatar_url">
      <div>
        <h1>{{ userData?.login}}</h1>
        <h2>{{ userData?.name }}</h2>
        <a [href]="userData?.html_url" target="_blank">View on github</a>
      </div>
    </div>
  `,
  styleUrl: './profile-info.css',
})
export class ProfileInfo {
  @Input() userData : UserInterface | undefined
}
