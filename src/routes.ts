import { Router } from "@angular/router";
import { ProfileInfo } from "./app/profile-info/profile-info";
import { ProjectDetails } from "./app/project-details/project-details";
import { RepoDetails } from "./app/repo-details/repo-details";
import { Dashboard } from "./app/dashboard/dashboard";

export const routesConfig = [
  { path: 'dashboard/:username', component: Dashboard },

  { path: 'repo/:username/:reponame', 
    component: RepoDetails,
    title: "Repo Details"
  }
];