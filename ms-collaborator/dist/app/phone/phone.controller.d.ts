import { CreatePhoneDto } from './dtos/create-phone.dto';
import { UpdatePhoneDto } from './dtos/update-phone.dto';
import { PhoneEntity } from './phone.entity';
import { PhoneService } from './phone.service';
export declare class PhoneController {
    private readonly phoneService;
    constructor(phoneService: PhoneService);
    index(): Promise<PhoneEntity[]>;
    show(id: string): Promise<PhoneEntity>;
    store(body: CreatePhoneDto): Promise<PhoneEntity>;
    update(id: string, body: UpdatePhoneDto): Promise<PhoneEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
