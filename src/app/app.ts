import { Component, inject, signal } from '@angular/core';
import { GitService } from './git-service';
import { UserInterface } from './user-interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
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
