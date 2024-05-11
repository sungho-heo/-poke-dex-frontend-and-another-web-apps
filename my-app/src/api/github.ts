import axios from "axios";

export async function getUserProfile(username: string) {
  // Generic을 통해서 응답 데이터의 타입을 설정할수있다.
  const response = await axios.get<GithubProfile>(
    `https://api.github.com/users/${username}`
  );
  return response.data; // 데이터 값을 바로 반환하도록함.
}

export interface GithubProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_url: string;
  url: string;
  html_url: string;
  follwers_url: string;
  follwing_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: null;
  email: null;
  hireable: null;
  bio: string;
  public_repos: number;
  public_gists: number;
  follwers: number;
  follwing: number;
  created_at: Date;
  updated_at: Date;
}
