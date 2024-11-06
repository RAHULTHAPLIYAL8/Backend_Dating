import { IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class CreateAdminDto {

  @IsString()
  email:string;

  @IsString()
  @MaxLength(1000)
  bio: string; 

  @IsString()
  @MaxLength(1000)
  relationshipGoals: string; 

  @IsString()
  @MaxLength(1000)
  idealPartner: string; 

  @IsString()
  @MaxLength(1000)
  hobbiesAndInterests: string; 

  @IsString()
  @MaxLength(1000)
  favoriteActivities: string; 

  @IsString()
  @MaxLength(1000)
  valuesAndBeliefs: string; 

  @IsString()
  @MaxLength(1000)
  favoriteBooksAndMovies: string;

  @IsString()
  @MaxLength(1000)
  travelExperiences: string;

  @IsString()
  @MaxLength(1000)
  lifeAchievements: string; 

  @IsString()
  @MaxLength(1000)
  futureAspirations: string; 

  @IsString()
  @MaxLength(1000)
  describeYourself: string; 

  
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  favoriteQuotes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  mostProudOf?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  biggestChallenges?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  favoriteFoods?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  mostImportantLifeLesson?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  favoriteVacationSpots?: string;
}
