"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    app_name: process.env.APP_NAME,
    database_url: process.env.DATABASE_URL,
    salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    ssl: {
        storeId: process.env.STORE_ID,
        storePass: process.env.STORE_PASSWORD,
        sslPaymentUrl: process.env.SSL_BASE_PAYMENT_URL,
        sslValidationUrl: process.env.SSL_BASE_VALIDATION_URL,
    },
};
//# sourceMappingURL=index.js.map