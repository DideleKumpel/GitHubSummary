import { Component, inject } from '@angular/core';
import { ProfileInfo } from '../profile-info/profile-info';
import { ProjectDetails } from '../project-details/project-details';
import { UserInterface } from '../user-interface';
import { RepoInterface } from '../repo-interface';
import { signal } from '@angular/core';
import { GitService } from '../git-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule ,ProfileInfo, ProjectDetails],
  template: ` 
    <div class="container">
      <section class="profile-section">
        <h1>Profile Info</h1>
        <div>
          <app-profile-info [userData]="user()"></app-profile-info>
        </div>
      </section>
      <section class="projects-section">
        <h1>Projects:</h1>
        @for (repo of repos(); track repo.name) {
          <app-project-details [repoData]="repo" [username]="user()?.login"></app-project-details>
        }@empty {
          <h2>User don't have public projects</h2>
        }
      </section> 
    </div>
    `,
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected readonly gitService = inject(GitService);
  route: ActivatedRoute = inject(ActivatedRoute);

  user = signal<UserInterface | undefined>(undefined);
  repos = signal<RepoInterface[]>([]);

  constructor() {
    this.gitService.getUser(this.route.snapshot.params['username']).subscribe(
      {
        next: (data) => {
          this.user.set(data);
          console.log("good")
        },
        error: () =>{
          console.log("error")
        }
      }
    );

    this.gitService.getRepos(this.route.snapshot.params['username']).subscribe(
      {
        next: (data) => {
          this.repos.set(data);
          console.log("good")
          console.log(this.repos())
        },
        error: () =>{
          console.log("error")
        }
      }
    )
  }
}
