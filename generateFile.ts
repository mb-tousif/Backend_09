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
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ${fileName}FilterAbleField } from "./${fileName}.constants";
import { ${fileName}Service } from "./${fileName}.service";

// Create and Save new ${fileName}
const create${fileName} = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await ${fileName}Service.create${fileName}(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "${fileName} created successfully",
      data: result,
    });
})

// Retrieve all ${fileName}s from the database.
const getAll${fileName}s = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const payload = pick(req.query, ${fileName}FilterAbleField);
    const result = await ${fileName}Service.getAll${fileName}s( options, payload );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "${fileName} list fetched successfully",
      data: result,
    });
});

// Find a single ${fileName} with an id
const get${fileName}ById = catchAsync(async (req: Request, res: Response) => {
    const ${fileName}Id = req.params.id;
    const result = await ${fileName}Service.get${fileName}ById(${fileName}Id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "${fileName} fetched successfully",
      data: result,
    });
});

// Update a ${fileName} by id
const update${fileName}ById = catchAsync(async (req: Request, res: Response) => {
    const ${fileName}Id = req.params.id;
    const payload = req.body;
    const result = await ${fileName}Service.update${fileName}ById(${fileName}Id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "${fileName} updated successfully",
      data: result,
    });
});

// Delete a ${fileName} with the specified id 
const delete${fileName}ById = catchAsync(async (req: Request, res: Response) => {
    const ${fileName}Id = req.params.id;
    const result = await ${fileName}Service.delete${fileName}ById(${fileName}Id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "${fileName} deleted successfully",
      data: result,
    });
});

export const ${fileName}Controller = {
    create${fileName},
    getAll${fileName}s,
    get${fileName}ById,
    update${fileName}ById,
    delete${fileName}ById,
};

`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.controller.ts`),
controllerTemplate
);
const serviceTemplate = `

export const ${fileName}Service = {

};
import { ${fileName}, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { ${fileName}FilterAbleField } from "./${fileName}.constants";
import { T${fileName}FilterableOptions } from "./${fileName}.interfaces";

// Post ${fileName} data to database
const create${fileName} = async (payload: ${fileName}): Promise<${fileName}> => {
  // Check ${fileName} is already exist with same user and service
  const isExist = await prisma.${fileName}.findFirst({
    where: {
      userId: payload.userId,
      serviceId: payload.serviceId,
    },
  });

  // Check user is blocked or not
  if (isExist?.status === "Blocked" || isExist?.status === "Inactive") {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is blocked or inactive");
  }

  const result = await prisma.${fileName}.create({
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "${fileName} did not created");
  }

  return result;
};

// Get all ${fileName}s
const getAll${fileName}s = async (
  options: IPaginationOptions,
  payload: T${fileName}FilterableOptions
): Promise<IGenericResponse<${fileName}[]>> => {
  // Handle pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // Handle search
  const { search, ...filterData } = payload;
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: ${fileName}FilterAbleField.map((field) => ({
        [field.toString()]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }
  // Handle filter
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }

  const whereQuery: Prisma.${fileName}WhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.${fileName}.findMany({
    where: whereQuery,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      users: true,
      services: true,
    },
  });

  if (result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "${fileName} did not found");
  }
  const count = await prisma.${fileName}.count({
    where: whereQuery,
  });

  return {
    meta: {
      page,
      limit,
      total: count,
    },
    data: result,
  };
};

// Get ${fileName} by id
const get${fileName}ById = async (${fileName}Id: string): Promise<${fileName}> => {
  const result = await prisma.${fileName}.findUnique({
    where: {
      id: ${fileName}Id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "${fileName} did not found");
  }

  return result;
};

// Update ${fileName} by id
const update${fileName}ById = async ( ${fileName}Id: string, payload: ${fileName}): Promise<${fileName}> => {
  // Handle ${fileName} is already completed
  const isCompleted = await prisma.${fileName}.findFirst({
    where: {
      id: ${fileName}Id,
      status: "Completed",
    },
  });
  if (isCompleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "${fileName} already completed now you can not update it"
    );
  }

  const result = await prisma.${fileName}.update({
    where: {
      id: ${fileName}Id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "${fileName} did not found");
  }

  return result;
};

// Delete ${fileName} by id
const delete${fileName}ById = async (${fileName}Id: string): Promise<${fileName}> => {
  const result = await prisma.${fileName}.delete({
    where: {
      id: ${fileName}Id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "${fileName} did not found");
  }

  return result;
};

export const ${fileName}Service = {
    create${fileName},
    getAll${fileName}s,
    get${fileName}ById,
    update${fileName}ById,
    delete${fileName}ById,
};

`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.service.ts`),
serviceTemplate
);
const routesTemplate = `

import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/common';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ${fileName}Controller } from './${fileName}.controller';
import { ${fileName}Validation } from './${fileName}.zod.validation';

const router = express.Router();

router.get(
    '/all-${fileName}s',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    ${fileName}Controller.getAll${fileName}s
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    ${fileName}Controller.get${fileName}ById
);

router.post(
    '/create-${fileName}',
    auth(ENUM_USER_ROLE.USER),
    validateRequest(${fileName}Validation.postValidation),
    ${fileName}Controller.create${fileName}
);

router.patch(
  "/update-${fileName}/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(${fileName}Validation.updateValidation),
  ${fileName}Controller.update${fileName}ById
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    ${fileName}Controller.delete${fileName}ById
);

export const ${fileName}Routes = router;

`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.routes.ts`),
routesTemplate
);
const interfacesTemplate = `

export type T${fileName}FilterableOptions = {
    search?: string;
}

`;
fs.writeFileSync(
path.join(targetDirectory, `${fileName}.interfaces.ts`),
interfacesTemplate
);
const constantsTemplate = `

export const ${fileName}SearchAbleField:string[]= [ "" ];

export const ${fileName}FilterAbleField:string[]= [ "search" ];

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