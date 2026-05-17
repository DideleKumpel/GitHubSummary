import { inject, Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './user-interface';
import { RepoInterface } from './repo-interface';
import { CommitInterface } from './commit-interface';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  httpClient = inject(HttpClient)

  baseApiUrl = "https://api.github.com";

  getUser(username : string) : Observable<UserInterface>{
    return this.httpClient.get<UserInterface>(`${this.baseApiUrl}/users/${username}`);
  }

  getRepos(username : string) : Observable<RepoInterface[]>{
    return this.httpClient.get<RepoInterface[]>(`${this.baseApiUrl}/users/${username}/repos`)
  } 

  getCommits(username: string, repoName: string): Observable<CommitInterface[]> {
    return this.httpClient.get<CommitInterface[]>(
      `${this.baseApiUrl}/repos/${username}/${repoName}/commits?per_page=20`
    );
  }
}
