import { ObjectId } from "bson";

export const avilableAgentSorts = ['createAt', 'updateAt', 'memberLikes', 'memberViews', 'memberRank'];
export const avilableMembertSorts = ['createAt', 'updateAt', 'memberLikes', 'memberViews'];

export const shapeIntoMongoObjectId = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
};