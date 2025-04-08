import dotenv from 'dotenv';
import { connectWallet } from './connect';
import { preAuth } from './preauth';

export async function run() {
  console.log("Starting...");
  dotenv.config();
  const clientId = process.env.CLIENT_ID;
  const secretKey = process.env.CLIENT_SECRET;
  const chainID = process.env.CHAIN_ID;
  const rpcURL = process.env.RPC_URL;
  const ecosystemId = process.env.ECOSYSTEM_ID;
  const email = process.env.WALLET_EMAIL;
  const partnerId = process.env.PARTNER_ID;

  // Check if the required environment variables are set
  if (!clientId || !secretKey || !chainID || !rpcURL || !ecosystemId || !email || !partnerId) {
    console.error("Missing required environment variables");
    return;
  }
  // Check if the ecosystemId is in the correct format
  if (!ecosystemId.startsWith("ecosystem.")) {
    console.error("Ecosystem ID must start with 'ecosystem.'");
    return;
  }
  // Check if the email is in the correct format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("Invalid email format");
    return;
  }

  // Check if the chainID is in the correct format
  if (chainID && !chainID.match(/^[0-9]+$/)) {
    console.error("Invalid chain ID format");
    return;
  }
  // Check if the rpcURL is in the correct format
  if (rpcURL && !rpcURL.match(/^(https?:\/\/[^\s$.?#].[^\s]*)$/)) {
    console.error("Invalid RPC URL format");
    return;
  }

  const config = {
    CLIENT_ID: clientId,
    CLIENT_SECRET: secretKey,
    CHAIN_ID: +chainID,
    RPC_URL: rpcURL,
    ECOSYSTEM_ID: ecosystemId,
    WALLET_EMAIL: email,
    PARTNER_ID: partnerId,
    EMAIL_VERIFICATION_CODE: process.env.EMAIL_VERIFICATION_CODE,
  };

  const arg = process.argv.slice(2)
  switch (arg[0]) {
    case 'connect':
      await connectWallet(config);
      break;
    case 'preauth':
      await preAuth(config);
      break;
    default:
      console.log("no command");
      break;
  }
}

(async () => {
  await run();
}
)();
