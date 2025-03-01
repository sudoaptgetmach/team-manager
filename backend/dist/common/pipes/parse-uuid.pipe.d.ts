import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ValidateUuidPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
