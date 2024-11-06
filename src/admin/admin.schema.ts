import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AdminDocument = Admin & Document;
@Schema()
export class Admin {
 @Prop({ type: String, maxlength: 1000 , required: false})
  email: string; 
  @Prop({ type: String, maxlength: 1000 })
  bio: string; 
  @Prop({ type: String, maxlength: 1000 })
  relationshipGoals: string; 
  @Prop({ type: String, maxlength: 1000 })
  idealPartner: string; 
  @Prop({ type: String, maxlength: 1000 })
  hobbiesAndInterests: string; 
  @Prop({ type: String, maxlength: 1000 })
  favoriteActivities: string; 
  @Prop({ type: String, maxlength: 1000 })
  valuesAndBeliefs: string; 
  @Prop({ type: String, maxlength: 1000 })
  favoriteBooksAndMovies: string;
  @Prop({ type: String, maxlength: 1000 })
  travelExperiences: string; 
  @Prop({ type: String, maxlength: 1000 })
  lifeAchievements: string;
  @Prop({ type: String, maxlength: 1000 })
  futureAspirations: string; 
  @Prop({ type: String, maxlength: 1000 })
  describeYourself: string; 
  @Prop({ type: String, maxlength: 1000 })
  workLifeBalance: string; 
  @Prop({ type: String, maxlength: 1000 })
  favoriteQuotes: string; 
  @Prop({ type: String, maxlength: 1000 })
  mostProudOf: string; 
  @Prop({ type: String, maxlength: 1000 })
  biggestChallenges: string; 
  @Prop({ type: String, maxlength: 1000 })
  favoriteFoods: string; 
  @Prop({ type: String, maxlength: 1000 })
  mostImportantLifeLesson: string;
  @Prop({ type: String, maxlength: 1000 })
  favoriteVacationSpots: string; 
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
