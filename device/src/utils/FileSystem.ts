import * as fs from 'fs';
import * as path from 'path';

class FileSystem {

  public static checkIfPathExists(path: string): boolean {
    return fs.existsSync(path);
  }

  public static save<T>(filePath: string, content: NodeJS.ReadableStream ): Promise<void> {
    const dirName = path.dirname(filePath);
    const fullPath = path.resolve(dirName);

    if (!fs.existsSync(fullPath)) {
      console.log(`Creating directory ${dirName}...`);
      fs.mkdirSync(fullPath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        const fileStream = content.pipe(file);
        fileStream.on('error', reject);
        fileStream.on('finish', resolve);
    });
  }

}

export default FileSystem;
