import { AdminService } from './admin.service';
import { CreateAdminDto } from '../user/dto/create-admin.dto';
import { MatchRequestDto } from 'src/user/dto/connect.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    admincrate(creadminDto: CreateAdminDto): Promise<object>;
    updateAdmin(email: string, updateData: Partial<CreateAdminDto>): Promise<object>;
    findadmin(email: string): Promise<object>;
    matchPair(matchrequestdto: MatchRequestDto): Promise<object>;
    adminDelete(email: string): Promise<object>;
    bucketList(): Promise<object>;
}
