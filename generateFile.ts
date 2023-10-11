/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
if (process.argv.length < 3) {
console.error(
'Usage: node generate-folder-structure.js <FolderName> <FileName>'
);
process.exit(1);
}
// Get folder and file names from command-line arguments
const folderName = process.argv[2];
const fileName = process.argv[3];
// Define the target directory
const targetDirectory = path.join(
__dirname,
'src',
'app',
'modules',
folderName
);
// Create the target directory
fs.mkdirSync(targetDirectory, { recursive: true });
// Create and write the files in the target directory
const controllerTemplate = `
import { Request, Response } from "express";

export const ${fileName}Controller = {

};
`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.controller.ts`),
controllerTemplate
);
const serviceTemplate = `

export const ${fileName}Service = {

};
`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.service.ts`),
serviceTemplate
);
const routesTemplate = `
import express from 'express';

const router = express.Router();

export const ${fileName}Routes = router;
`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.routes.ts`),
routesTemplate
);
const interfacesTemplate = `
// Define your interfaces here
`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.interfaces.ts`),
interfacesTemplate
);
const constantsTemplate = `
// Define your constants here
`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.constants.ts`),
constantsTemplate
);
const validationTemplate = `
import { z } from "zod";

const postValidation = z.object({
    body: z.object({

    })
});

const updateValidation = z.object({
    body: z.object({

    })
});

export const ${fileName}Validation = {
    postValidation,
    updateValidation
}`;

fs.writeFileSync(
path.join(targetDirectory, `${fileName}.zod.validation.ts`),
validationTemplate
);
console.log(
`Folder '${folderName}' and files created successfully in 'src/app/modules'.`
);