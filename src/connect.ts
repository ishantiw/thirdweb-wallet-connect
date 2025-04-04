import { ecosystemWallet } from "thirdweb/wallets";
import { EnvironmentVariables } from "./types";

export const getAccount = async (config: EnvironmentVariables) => {
    // sends a verification code to the provided email
    const wallet = ecosystemWallet(config.ECOSYSTEM_ID as `ecosystem.${string}`, {
        partnerId: config.PARTNER_ID,
      });
    console.log("Connecting to wallet...");    
    const account = await wallet.connect({
        chain: {
            id: config.CHAIN_ID,
            name: "lisk-sepolia",
            rpc: config.RPC_URL,
          },
        client: {
          clientId: config.CLIENT_ID,
          secretKey: config.CLIENT_SECRET,
      },
        strategy: "email",
        email: config.WALLET_EMAIL,
        verificationCode: config.EMAIL_VERIFICATION_CODE,
    });
    console.log("account", account);
}

