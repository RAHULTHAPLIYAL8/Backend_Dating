import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module'
import { QuestionModule } from './questions/questions.module';
import { ModeratorModule } from './moderator/moderator.module';
import { UserProfileModule } from './userProfile/userProfile.module';
import { MatchingProfileModule } from './matchProfiles/matching.module';
import { CallingModule } from './callingFeature/calling.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    MongooseModule.forRoot("mongodb+srv://rahulthapliyal888:Mongodb123@cluster0.rtyip5s.mongodb.net/dating?retryWrites=true&w=majority&appName=Cluster0"),
    AdminModule, QuestionModule, ModeratorModule, UserProfileModule, MatchingProfileModule, CallingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
