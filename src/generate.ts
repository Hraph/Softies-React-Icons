import fs from 'fs';
import path from 'path';
import { transform } from '@svgr/core';
import ProgressBar from 'progress';
import {toPascalCase} from "./helpers";

const USE_TYPESCRIPT = false;
const SUBPACKAGE_SUFFIX = '-icons';
const OUTPUT_EXT = '.js';
const PACKAGE_PATH = path.resolve(__dirname, '..', 'packages');

async function generateIconFile(iconPath: string, outputPath: string) {
    const iconName = toPascalCase(path.basename(iconPath, '.svg'));
    const svgCode = fs.readFileSync(iconPath, 'utf8');
    const componentCode = await transform(svgCode, { icon: true, typescript: USE_TYPESCRIPT }, { componentName: `${iconName}Icon` });
    const fileName = `${iconName}${OUTPUT_EXT}`;
    fs.writeFileSync(path.resolve(outputPath, fileName), componentCode);
}

async function generateIndexFile(iconsDirectory: string, distDirectory: string) {
    const icons = fs.readdirSync(iconsDirectory, { withFileTypes: true }).filter((dirent) => dirent.isFile() && dirent.name.endsWith(OUTPUT_EXT));
    const importStatements = icons.map((dirent) => `export { default as ${path.basename(dirent.name, OUTPUT_EXT)}Icon } from './icons/${path.basename(dirent.name, OUTPUT_EXT)}';`).join('\n');
    const indexCode = `${importStatements}\n`;
    fs.writeFileSync(path.join(distDirectory, 'index' + OUTPUT_EXT), indexCode);
}

function generateIndexTypeFile(iconsDirectory: string, distDirectory: string) {
    const indexPath = path.join(distDirectory, 'index.d.ts');
    const files = fs.readdirSync(iconsDirectory);
    const iconNames = files
        .filter((file) => file.endsWith(OUTPUT_EXT))
        .map((file) => file.replace(new RegExp('\\' + OUTPUT_EXT + '$'), ''));

    const content = `\
export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;
${iconNames.map((name) => `export declare const ${name}Icon: Icon;`).join('\n')}
`;

    fs.writeFileSync(indexPath, content);
}

async function generateIconFiles(directory: string) {
    const subpkgs = fs.readdirSync(directory, { withFileTypes: true }).filter(dir => dir.isDirectory() && dir.name.endsWith(SUBPACKAGE_SUFFIX));

    for (const subpkg of subpkgs) {
        const pkgName = subpkg.name.replace(SUBPACKAGE_SUFFIX, '');
        const pkgPath = path.join(directory, subpkg.name);
        const iconsPath = path.join(pkgPath, 'icons');
        const buildPath = path.join(pkgPath, 'build');
        const buildIconsPath = path.join(buildPath, 'icons');

        const files = fs
            .readdirSync(iconsPath, { withFileTypes: true })
            .filter(element => element.isFile() && element.name.endsWith('.svg'));

        if (files.length === 0) {
            console.log(`Skipping "${pkgName}" because it is empty.`)
            continue;
        }

        const progressBarSub = new ProgressBar(`Generating icons in "${pkgName}" [:bar] :current/:total :percent`, { total: files.length, width: 30 });

        // Create dist directory if it doesn't exist
        fs.mkdirSync(buildIconsPath, { recursive: true });

        for (const file of files) {
            if (file.isFile() && file.name.endsWith('.svg')) {
                const filePath = path.join(iconsPath, file.name);
                await generateIconFile(filePath, buildIconsPath);
                progressBarSub.tick();
            }
        }
        await generateIndexTypeFile(buildIconsPath, buildPath);
        await generateIndexFile(buildIconsPath, buildPath);
    }
}

(async () => {
    await generateIconFiles(PACKAGE_PATH);
})();