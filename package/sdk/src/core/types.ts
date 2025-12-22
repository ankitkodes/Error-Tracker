export interface SDKconfig {
  projectId: string;
  user_id: string;
  environment: Environment;
}

export enum Environment {
  Production,
  Staging,
  Development,
}
