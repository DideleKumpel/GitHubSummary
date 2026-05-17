import { Component, inject, signal } from '@angular/core';
import { ProfileInfo } from './profile-info/profile-info';
import { ProjectDetails } from './project-details/project-details';
import { GitService } from './git-service';
import { UserInterface } from './user-interface';
import { RepoInterface } from './repo-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ProfileInfo, ProfileInfo, ProjectDetails, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GitHubSummary');
  protected readonly gitService = inject(GitService);

  searchText: string = "";

  user: UserInterface | undefined;
  repos: RepoInterface[] = []

  searchUser(): void{
    if(this.searchText.trim() === ""){
      console.log("empty");
      return;
    }
    console.log("searching")

    this.gitService.getUser(this.searchText).subscribe(
      {
        next: (data) => {
          this.user = data;
          console.log("good")
          console.log(this.user)
        },
        error: () =>{
          console.log("error")
        }
      }
    );

    this.gitService.getRepos(this.searchText).subscribe(
      {
        next: (data) => {
          this.repos = data;
          console.log("good")
        },
        error: () =>{
          console.log("error")
        }
      }
    )
  }

}
