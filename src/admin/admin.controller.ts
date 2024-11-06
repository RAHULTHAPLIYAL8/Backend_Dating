import { Controller } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AdminService } from './admin.service';
import { CreateAdminDto } from '../user/dto/create-admin.dto';
import { Post,Body,Patch,HttpCode,Param,HttpStatus ,Delete,Get} from '@nestjs/common';
import { MatchRequestDto } from 'src/user/dto/connect.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Module')
@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Post('/adddetails')
    @ApiOperation({summary:'Not in use'})
    async admincrate(@Body() creadminDto: CreateAdminDto): Promise<object> {
      return this.adminService.admincreate(creadminDto);
    }

    @Patch(':email')
    @HttpCode(HttpStatus.OK)
    async updateAdmin(
      @Param('email') email: string,
      @Body() updateData: Partial<CreateAdminDto>
    ): Promise<object> {
      return this.adminService.adminUpdate(email, updateData);
    }
    
    @Patch('/find:email')
    @HttpCode(HttpStatus.OK)
    async findadmin(
      @Param('email') email: string,
    ): Promise<object> {
      return this.adminService.adminFind(email);
    }

   @Post('/matchpair')
  async matchPair(@Body() matchrequestdto:MatchRequestDto): Promise<object> {
    console.log(matchrequestdto.admin1,matchrequestdto.admin2,matchrequestdto.match);
    const data = await this.adminService.matchrate(matchrequestdto.admin1, matchrequestdto.admin2, matchrequestdto.match);
    return {status:"ok",value:data.matchrate };
  }

    @Delete(':email')
  @HttpCode(HttpStatus.OK)
  async adminDelete(@Param('email') email:string): Promise<object> {
    return this.adminService.adminDelete(email);
  }

  @Get('bucketlist')
async bucketList(): Promise<object> {
  return this.adminService.Bucketlist()
}
}
