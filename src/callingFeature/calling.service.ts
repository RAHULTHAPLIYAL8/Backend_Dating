import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CallingService {

  private readonly cloudflareBaseUrl = 'https://rtc.live.cloudflare.com/v1/apps';
//   'https://api.cloudflare.com/client/v4/apps';
//   base url = https://rtc.live.cloudflare.com/v1
  private readonly appId = 'ae14cbbdae947cbe7266898ebaa4694e'; 
  private readonly apiKey = 'd1a90baaa2c982b49c440cee18f3943bf3785a7671ab9c7d5e281378a9eb99c5'; 

  // Helper to configure axios headers
  private getHeaders() {
    return {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    };
  }

  // 1. Create a new session
  async createSession(): Promise<any> {
    const url = `${this.cloudflareBaseUrl}/${this.appId}/sessions/new`;
    const body = {
        // Example session data, change based on the API requirements
        "config": {
          "resolution": "720p",
          "maxDuration": 3600
        }
      };
    try {
      const response = await axios.post(url, body, this.getHeaders());
      console.log("Response = " + response);
      return response.data;
    } catch (error) {
        console.log("Error = " + error.response.data);
      throw new Error('Error creating session: ' + error.message);
    }
  }

  // 2. Add a new track (audio/video) to a session
  async addTrack(sessionId: string, trackType: string): Promise<any> {
    const url = `${this.cloudflareBaseUrl}/${this.appId}/sessions/${sessionId}/tracks/new`;
    const trackData = { type: trackType }; // audio or video
    try {
      const response = await axios.post(url, trackData, this.getHeaders());
      return response.data;
    } catch (error) {
      throw new Error('Error adding track: ' + error.message);
    }
  }

  // 3. Renegotiate session (for changes during the call)
  async renegotiateSession(sessionId: string): Promise<any> {
    const url = `${this.cloudflareBaseUrl}/${this.appId}/sessions/${sessionId}/renegotiate`;
    try {
      const response = await axios.put(url, {}, this.getHeaders());
      return response.data;
    } catch (error) {
      throw new Error('Error renegotiating session: ' + error.message);
    }
  }

  // 4. Close a track (stop audio or video)
  async closeTrack(sessionId: string, trackId: string): Promise<any> {
    const url = `${this.cloudflareBaseUrl}/${this.appId}/sessions/${sessionId}/tracks/close`;
    const trackData = { trackId }; // Specify which track to close
    try {
      const response = await axios.put(url, trackData, this.getHeaders());
      return response.data;
    } catch (error) {
      throw new Error('Error closing track: ' + error.message);
    }
  }

  // 5. Retrieve session information
  async getSessionInfo(sessionId: string): Promise<any> {
    const url = `${this.cloudflareBaseUrl}/${this.appId}/sessions/${sessionId}`;
    try {
      const response = await axios.get(url, this.getHeaders());
      return response.data;
    } catch (error) {
      throw new Error('Error retrieving session info: ' + error.message);
    }
  }
}
