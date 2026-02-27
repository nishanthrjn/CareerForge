// apps/backend/src/ai/ai.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { AiService } from './ai.service';
import { ProviderFactory } from './provider.factory';

@Module({
  providers: [ProviderFactory, AiService],
  exports: [AiService],
})
export class AiModule implements OnModuleInit {
  constructor(private readonly factory: ProviderFactory) { }
  async onModuleInit() {
    await this.factory.initialize();
  }
}
