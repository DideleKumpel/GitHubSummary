import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RepoInterface } from '../repo-interface';

@Component({
  selector: 'app-project-details',
  imports: [],
  template: `
    <div>
      <h1> {{ repoData?.name}}</h1>
      <article> {{ repoData?.description}} </article>
      <a> {{repoData?.html_url}} </a>
    </div>
   `,
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  @Input() repoData: RepoInterface | undefined
}
