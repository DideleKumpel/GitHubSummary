export interface CommitInterface {
    sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
}
