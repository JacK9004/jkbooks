import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
    constructor(@InjectModel('Book') private readonly bookyModel: Model<null>) {}
}
