export interface SDKconfig {
    projectId: string;
    user_id: string;
    environment: Environment;
}
export declare enum Environment {
    Production = 0,
    Staging = 1,
    Development = 2
}
