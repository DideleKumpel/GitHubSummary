import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import { RepoInterface } from '../repo-interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GitService } from '../git-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <div class="project-details">
        <h1> {{ repoData?.name}}</h1>
        @if(repoData?.description) {
          <article> {{ repoData?.description}} </article>
        }@else {
          <article> No description provided </article>
        }
        <div class="github-link">
        <p>Link to GitHub: </p>
        <a [href]="repoData?.html_url" target="_blank"> {{repoData?.html_url}} </a>
        </div>
        <div class="commits-link">
        <p>Check commits: </p>
        <a [routerLink]="['/repo', username, repoData?.name]">View Commits</a>
        </div>
      </div>
   `,
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  @Input() repoData: RepoInterface | undefined;
  @Input() username: string | undefined;
}
