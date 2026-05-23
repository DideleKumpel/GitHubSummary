import { Component, inject } from '@angular/core';
import { ProjectDetails } from '../project-details/project-details';
import { CommitInterface } from '../commit-interface';
import { signal } from '@angular/core';
import { GitService } from '../git-service';
import { ActivatedRoute } from '@angular/router';
import { RepoInterface } from '../repo-interface';
import { listAnimation } from '../shared/animations';

@Component({
  selector: 'app-repo-details',
  imports: [ProjectDetails],
  template: `
    <div>
      <app-project-details [repoData]="repo()"></app-project-details>
    </div>
    <section class="commits-section" [@listAnimation]="commits().length">
      @for (commit of commits(); track commit.sha) {
      <div class="commit-details animate-list-appear">
        <h2>Message: {{ commit.commit.message }}</h2>
        <h2>Author: {{ commit.commit.author.name }}</h2>
        <h2>Date: {{ commit.commit.author.date }}</h2>
      </div>
      }
    </section>
  `,
  animations: [listAnimation],
  styleUrl: './repo-details.css',
})
export class RepoDetails {
  protected readonly gitService = inject(GitService);
  route: ActivatedRoute = inject(ActivatedRoute);
  repo = signal<RepoInterface | undefined>(undefined);
  commits = signal<CommitInterface[]>([]);

  constructor() {
      this.gitService.getSingleRepo(this.route.snapshot.params['username'], this.route.snapshot.params['reponame']).subscribe(
        {
          next: (data) => {
            this.repo.set(data);
            console.log("good")
            console.log(this.repo())
          },
          error: () =>{
            console.log("error")
          }
        }
      );

      this.gitService.getCommits(this.route.snapshot.params['username'], this.route.snapshot.params['reponame'] ).subscribe(
        {
          next: (data) => {
            this.commits.set(data);
            console.log("good")
            console.log(this.commits())
          },
          error: () =>{
            console.log("error")
          }
        }
      );
  }
}
