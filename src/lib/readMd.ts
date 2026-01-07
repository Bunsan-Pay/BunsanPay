import path from "path";
import { promises as fs } from 'fs';

export const readMd = async (pathName: string) => {
    const projectRoot = process.cwd();
    if (pathName !== 'README.md') {
        pathName = `src/markdown/${pathName}`;
    }
    const filePath = path.join(projectRoot, pathName);

    let readmeContent = '';

    try {
        // ファイルを非同期で読み込む
        readmeContent = await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.error(`${pathName}の読み込みに失敗しました`, error);
    }
    return readmeContent;
}