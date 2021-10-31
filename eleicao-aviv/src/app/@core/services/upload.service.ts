import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { BaseService } from "./@base/base.service";
import { Upload } from "../models/upload.model";

@Injectable()
export class UploadService extends BaseService {
    
    constructor(private httpClient: HttpClient) { 
        super();
    }

    public obterUrlUpload(extensao: string): Observable<Upload> {
        return this.httpClient.get<Upload>(`${this.endpoint}/upload?extensao=${extensao}`);
    }

    public uploadImagem(url: string, file: File) {
        return this.httpClient.put(url, file);
    }
}