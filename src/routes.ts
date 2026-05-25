import { HomePage } from "./app/home-page/home-page";
import { RepoDetails } from "./app/repo-details/repo-details";
import { Dashboard } from "./app/dashboard/dashboard";

export const routesConfig = [
  { path: '', component:  HomePage},
  { path: 'dashboard/:username', component: Dashboard },

  { path: 'repo/:username/:reponame', 
    component: RepoDetails,
    title: "Repo Details"
  }
];