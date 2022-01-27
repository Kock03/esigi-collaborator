import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
export declare class AddressService {
    private readonly addressRepository;
    constructor(addressRepository: Repository<AddressEntity>);
    findAll(): Promise<AddressEntity[]>;
    findOneOrFail(conditions: FindConditions<AddressEntity>, options?: FindOneOptions<AddressEntity>): Promise<AddressEntity>;
    store(data: CreateAddressDto): Promise<AddressEntity>;
    update(id: string, data: UpdateAddressDto): Promise<AddressEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
