export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    assignedRoles: [];
    access_token?: string;
    additionalUserInformation:any;
}
