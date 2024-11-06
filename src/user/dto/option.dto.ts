import { IsString, IsOptional,IsArray,ArrayNotEmpty } from 'class-validator';

export class OptionDto {
 

  @IsString()
  email: string;

  @IsOptional()
  about?:string;

  @IsOptional()
  @IsString()
  age?: string;

  @IsOptional()
  @IsString()
  Gender?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  occupation?: string;


  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()                // Ensure it's an array
  @ArrayNotEmpty()          // Optional: Ensure the array is not empty (if provided)
  @IsString({ each: true })  // Ensure each element in the array is a string
  hobbies?: string[];  

  @IsOptional()
  @IsString()
  interests?: string;

  @IsOptional()
  @IsString()
  height?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  relationshipStatus?: string;

  @IsOptional()
  @IsString()
  children?: string;

  @IsOptional()
  @IsString()
  religion?: string;

  @IsOptional()
  @IsString()
  smoking?: string;

  @IsOptional()
  @IsString()
  drinking?: string;

  @IsOptional()
  @IsString()
  languages?: string;
}
