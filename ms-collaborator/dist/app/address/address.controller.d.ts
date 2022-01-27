import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    index(): Promise<import("./address.entity").AddressEntity[]>;
    show(id: string): Promise<import("./address.entity").AddressEntity>;
    store(body: CreateAddressDto): Promise<import("./address.entity").AddressEntity>;
    update(id: string, body: UpdateAddressDto): Promise<import("./address.entity").AddressEntity>;
    destroy(id: string): Promise<import("typeorm").UpdateResult>;
}
