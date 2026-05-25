import { Component, inject, signal } from '@angular/core';
import { GitService } from '../git-service';
import { UserInterface } from '../user-interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="welcome-container">
    <div class="search-box">
      <h1>GitHub Summary</h1>
      <p>Search for a GitHub user to generate their summary dashboard</p>
      <div class="main-search-bar">
        <input type="text" placeholder="Find github profile..."
               [(ngModel)]="searchText"
               (keyup.enter)="searchUser()">
        <button (click)="searchUser()">Search</button>
      </div>
    </div>
  </div>
  `,
  styleUrl: './home-page.css',
})
export class HomePage {
  protected readonly title = signal('GitHubSummary');
  protected readonly gitService = inject(GitService);
  router: Router = inject(Router);

  searchText: string = "";

  user = signal<UserInterface | undefined>(undefined);

  searchUser(): void{
    if(this.searchText.trim() === ""){
      console.log("empty");
      return;
    }
    console.log("searching")

    this.gitService.getUser(this.searchText).subscribe(
      {
        next: (data) => {
          this.user.set(data);
          console.log("good")
          this.router.navigate(['/dashboard', this.user()?.login])
        },
        error: () =>{
          console.log("error")
        }
      }
    );
  }
}
