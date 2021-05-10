import decodeEnv from "./utils/decodeEnv";
import { config } from 'dotenv'

config()

const env = decodeEnv(process.env.REACT_APP_ENVIRONMENT || process.env.NODE_ENV)

const envConfig = {
  env,
  apiKey: process.env.REACT_APP_API_KEY,
  accessApiKey: process.env.REACT_APP_ACCESS_API_KEY,
  messagesBaseUrl: `https://affinidi-messages.${env}.affinity-project.org`,
  emailJsServiceID: process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
  emailJsTemplateID: process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,
  emailJsUserID: process.env.REACT_APP_EMAIL_JS_USER_ID,
};

export default envConfig
