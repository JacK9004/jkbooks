import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import NotificationSchema from '../../schemas/Notification.model';
import { SocketModule } from '../../socket/socket.module';
import { NotificationResolver } from './notification.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [MongooseModule.forFeature([
    {
       name: 'Notification', 
       schema: NotificationSchema 
      }
    ]), AuthModule],
	
	providers: [ NotificationResolver,NotificationService],
	exports: [NotificationService],
})
export class NotificationModule {}
