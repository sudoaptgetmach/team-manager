import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class ValidateUuidPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {

        if (metadata.type !== 'param' || metadata.data !== 'id') {
            return value;
        }

        if (!isUUID(value)) {
            throw new BadRequestException("ID should be an UUID.");
        }

        return value;
    }
}