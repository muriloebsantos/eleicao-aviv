import { environment } from "src/environments/environment";

export class BaseService {
    
    protected endpoint!: string;

    constructor() {
        this.endpoint = environment.apiUrl;
    }
}