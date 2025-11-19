// Service abstraction

// apps/backend/src/latex/latex-compiler.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { tmpdir } from 'os';

@Injectable()
export class LatexCompilerService {
  async compileLatex(mainFileName: string, files: Record<string, string>): Promise<Buffer> {
    const workDir = await fs.mkdtemp(path.join(tmpdir(), 'cv-tailor-'));

    // Write all files
    await Promise.all(
      Object.entries(files).map(([name, content]) =>
        fs.writeFile(path.join(workDir, name), content, 'utf-8'),
      ),
    );

    await this.runLatex(workDir, mainFileName);

    const pdfPath = path.join(
      workDir,
      mainFileName.replace(/\.tex$/, '.pdf'),
    );
    const pdfBuffer = await fs.readFile(pdfPath);

    // NOTE: In real implementation, also clean up workDir
    return pdfBuffer;
  }

  private runLatex(cwd: string, mainFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = spawn('pdflatex', ['-interaction=nonstopmode', mainFile], {
        cwd,
      });

      let stderr = '';
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`LaTeX failed with code ${code}: ${stderr}`));
      });
    });
  }
}
