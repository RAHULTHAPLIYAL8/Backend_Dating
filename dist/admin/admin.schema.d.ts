import { Document } from 'mongoose';
export type AdminDocument = Admin & Document;
export declare class Admin {
    email: string;
    bio: string;
    relationshipGoals: string;
    idealPartner: string;
    hobbiesAndInterests: string;
    favoriteActivities: string;
    valuesAndBeliefs: string;
    favoriteBooksAndMovies: string;
    travelExperiences: string;
    lifeAchievements: string;
    futureAspirations: string;
    describeYourself: string;
    workLifeBalance: string;
    favoriteQuotes: string;
    mostProudOf: string;
    biggestChallenges: string;
    favoriteFoods: string;
    mostImportantLifeLesson: string;
    favoriteVacationSpots: string;
}
export declare const AdminSchema: import("mongoose").Schema<Admin, import("mongoose").Model<Admin, any, any, any, Document<unknown, any, Admin> & Admin & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Admin, Document<unknown, {}, import("mongoose").FlatRecord<Admin>> & import("mongoose").FlatRecord<Admin> & {
    _id: import("mongoose").Types.ObjectId;
}>;
