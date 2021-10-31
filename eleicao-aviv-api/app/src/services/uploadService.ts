import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";
import ConfiguracaoRepository from "../repositories/configuracaoRepository";

export class UploadService {

    public async obterUrlUpload(extensao: string) {
        const configuracaoRepository = new ConfiguracaoRepository();
        const bucketFotos = await configuracaoRepository.obterValorConfiguracao('bucket-fotos');
        const regionBucketFotos = await configuracaoRepository.obterValorConfiguracao('region-bucket-fotos');

        const s3 = new S3({
            region: regionBucketFotos,
        });

        const key = `${uuid()}.${extensao}`;
        
        const s3Params = {
            Bucket: bucketFotos,
            Key: key,
            ACL: 'public-read',
            Expires: 60,
            ContentType: `image/${extensao}`
        }

        const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params);

        return {
            uploadUrl,
            key
        }
    }
}