import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvService } from './cv.service';
import { ApiResponse } from '../common/api-response';

@Controller('cv')
export class CvController {
    constructor(private readonly cvService: CvService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCv(@UploadedFile() file: Express.Multer.File): Promise<ApiResponse<any>> {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        if (file.mimetype !== 'application/pdf') {
            throw new BadRequestException('Only PDF files are allowed');
        }

        const profile = await this.cvService.parseAndExtractCv(file.buffer);
        return ApiResponse.ok(profile);
    }

    @Get('profiles')
    async getProfiles(): Promise<ApiResponse<any>> {
        const profiles = await this.cvService.getAllProfiles();
        return ApiResponse.ok(profiles);
    }
}
