import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreatePhoneDto } from './dtos/create-phone.dto';
import { UpdatePhoneDto } from './dtos/update-phone.dto';
import { PhoneEntity } from './phone.entity';
export declare class PhoneService {
    private readonly phoneRepository;
    constructor(phoneRepository: Repository<PhoneEntity>);
    findAll(): Promise<PhoneEntity[]>;
    findOneOrfail(conditions: FindConditions<PhoneEntity>, options?: FindOneOptions<PhoneEntity>): Promise<PhoneEntity>;
    store(phonesDto: CreatePhoneDto): Promise<PhoneEntity>;
    update(id: string, phoneDto: UpdatePhoneDto): Promise<PhoneEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
