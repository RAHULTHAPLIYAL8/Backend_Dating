import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { CallingService } from './calling.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Calling Module')
@Controller('calling')
export class CallingController {
  constructor(private readonly callingService: CallingService) {}

  // 1. Create a new session
  @Post('session/new')
  async createSession() {
    return await this.callingService.createSession();
  }

  // 2. Add a new track to an existing session
  @Post('session/:sessionId/track/new')
  async addTrack(@Param('sessionId') sessionId: string, @Body('type') type: string) {
    return await this.callingService.addTrack(sessionId, type);
  }

  // 3. Renegotiate session
  @Put('session/:sessionId/renegotiate')
  async renegotiateSession(@Param('sessionId') sessionId: string) {
    return await this.callingService.renegotiateSession(sessionId);
  }

  // 4. Close a track
  @Put('session/:sessionId/track/close')
  async closeTrack(@Param('sessionId') sessionId: string, @Body('trackId') trackId: string) {
    return await this.callingService.closeTrack(sessionId, trackId);
  }

  // 5. Retrieve session info
  @Get('session/:sessionId')
  async getSessionInfo(@Param('sessionId') sessionId: string) {
    return await this.callingService.getSessionInfo(sessionId);
  }
}
