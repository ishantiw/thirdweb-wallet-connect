import { preAuthenticate } from "thirdweb/wallets";
import { EnvironmentVariables } from "./types";

export const preAuth = async (config: EnvironmentVariables) => {
   

    // sends a verification code to the provided email
    console.log("Sending verification code to email...");
    await preAuthenticate({
        ecosystem: {
            id: config.ECOSYSTEM_ID as `ecosystem.${string}`,
            partnerId: config.PARTNER_ID,
        },
        client: {
            clientId: config.CLIENT_ID,
            secretKey: config.CLIENT_SECRET,
        },
        strategy: "email",
        email: config.WALLET_EMAIL,
    });
    console.log("Verification code sent to email.");
}