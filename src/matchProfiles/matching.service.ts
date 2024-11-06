import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as data from '../matchProfiles/data/dating_data.json';


@Injectable()
export class MatchingProfileService {
  async getEmbeddings(sentence: String, oppositeGenderDescriptions: string[]) {
    const model = 'sentence-transformers/all-MiniLM-L6-v2';
    const apiKey = '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';

    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          inputs: {
            source_sentence: sentence,
            sentences: oppositeGenderDescriptions,
          },
        },
        { headers: { Authorization: `Bearer ${apiKey}` } },
      );

      console.log('Full response from Hugging Face API : ', response.data);

      return response.data;
    } catch (error) {
      console.error('Error message: ', error.message);
      if (error.response) {
        console.error('Status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else {
        console.error('No response received:', error.message);
      }
      throw new Error('Error fetching embeddings');
    }
  }

  async getScore() {
    const sentence =
      "I find joy in gardening and nurturing plants. There's something satisfying about growing my own herbs and vegetables.";
    if (!sentence) {
      return { status: 'error', message: 'Sentence is required' };
    }

    try {
      // business logic
      const allUsers = this.getAllUsers();

      const results = [];

      for (const user of await allUsers) {
        
        const oppositeGenderUsers = (await allUsers).filter(
          (otherUser) =>
            otherUser.gender !== user.gender && otherUser.id !== user.id,
        );

        const oppositeGenderDescriptions = oppositeGenderUsers.map(
          (otherUser) => otherUser.description,
        );

        const embeddings = await this.getEmbeddings(
          user.description,
          oppositeGenderDescriptions,
        );
        const response = (await oppositeGenderUsers).map(
          (otherUser, index) => ({
            id: otherUser.id,
            name: otherUser.name,
            matchingScore: embeddings[index].toFixed(2),
          }),
        );
        const sortedResponse = response.sort(
          (a, b) => b.matchingScore - a.matchingScore,
        );

        results.push({
          userId: user.id,
          userName: user.name,
          comparisons: sortedResponse,
        });
      }
      return results;
     
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

async getAllUsers() {
    const usersData = data.responses.map((field, index) => {
      return {
        id: index,
        name: field.firstName + ' ' + field.lastName,
        gender: field.gender,
        description: `${field.interest} ${field.currentLocation.city} ${field.currentLocation.country} ${field.zodiacSign} ${field.languagesSpoken}`,
      };
    });

    return usersData;
}

async getStablePartner(userID: string) {
    const userScores = await this.getScore();

    console.log('Prefer = ' + userScores);

    interface UserComparison {
      id: number;
      name: string;
      matchingScore: string;
    }

    interface User {
      userId: number;
      userName: string;
      comparisons: UserComparison[];
    }

    const userData: User[] = userScores as User[];

    console.log('Total users = ' + userData.length);

    console.log('User Data = ' + userData[0].comparisons.length);

    const n = userData[0].comparisons.length;

    const preferenceMatrix: number[][] = userData.map((user) =>
      user.comparisons.map((comparison) => comparison.id),
    );

    console.log('Preference matrix = ' + preferenceMatrix);

    const stableCouples = this.stableMarriage(preferenceMatrix, n);
    const partnerMatchForUserID = this.findPartnerByUserId(
      stableCouples,
      Number(userID),
    );
    console.log('Perfect Match  = ' + partnerMatchForUserID);

    const matchedUser = userData.find(
      (user) => user.userId === partnerMatchForUserID,
    );
    const matchedUserJson = matchedUser 
    ? {
        id: matchedUser.userId,
        name: matchedUser.userName,
      } 
    : { 
        id: null, 
        name: 'Not found', 
        description: 'Not found' 
      };

  console.log('Matched User = ', matchedUserJson);

    return matchedUserJson;
  }

  findPartnerByUserId(result: number[][], userId: number): number {
    for (const pair of result) {
        if (pair[0] === userId) {
          return pair[1]; // If the userId is at index 0, return the partner at index 1
        }
        if (pair[1] === userId) {
          return pair[0]; // If the userId is at index 1, return the partner at index 0
        }
      }
      return -1;
  }

  wPrefersM1OverM(
    prefer: number[][],
    w: number,
    m: number,
    m1: number,
    N: number,
  ): boolean {
    for (let i = 0; i < N; i++) {
      // If m1 comes before m in list of w, then w prefers her current engagement, don't do anything
      if (prefer[w][i] === m1) return true;

      // If m comes before m1 in w's list, then free her current engagement and engage her with m
      if (prefer[w][i] === m) return false;
    }
    return true; // Default return if preferences are not valid
  }

  stableMarriage(prefer: number[][], N: number): number[][] {
    // Stores partner of women. This indicates the partner assigned to woman N+i
    const wPartner: number[] = new Array(N).fill(-1);

    // An array to store availability of men. If mFree[i] is false, then man 'i' is free, otherwise engaged.
    const mFree: boolean[] = new Array(N).fill(false);

    let freeCount: number = N;

    // While there are free men
    while (freeCount > 0) {
      // Pick the first free man
      let m: number;
      for (m = 0; m < N; m++) {
        if (!mFree[m]) break;
      }

      // One by one go to all women according to m's preferences
      for (let i = 0; i < N && !mFree[m]; i++) {
        const w: number = prefer[m][i];

        // The woman of preference is free, w and m become partners
        if (wPartner[w - N] === -1) {
          wPartner[w - N] = m;
          mFree[m] = true;
          freeCount--;
        } else {
          // If w is not free, find current engagement of w
          const m1: number = wPartner[w - N];

          // If w prefers m over her current engagement m1, engage m with w
          if (!this.wPrefersM1OverM(prefer, w, m, m1, N)) {
            wPartner[w - N] = m;
            mFree[m] = true;
            mFree[m1] = false;
          }
        }
      }
    }

    const result: number[][] = [];

    for (let i = 0; i < N; i++) {
      const woman = i + N;
      const man = wPartner[i];
      result.push([woman, man]);
    }

    console.log(result);

    return result;
  }
}
