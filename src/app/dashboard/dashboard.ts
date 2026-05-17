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
  template: ` <div>
      <app-profile-info [userData]="user()"></app-profile-info>
    </div>
    <div>
      <app-project-details *ngFor="let repo of repos()" [repoData]="repo" [username]="user()?.login"></app-project-details>
    </div> `,
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
