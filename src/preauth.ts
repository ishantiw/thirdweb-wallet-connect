import { preAuthenticate } from "thirdweb/wallets";
import { EnvironmentVariables } from "./types";
import { ThirdwebClient } from "thirdweb";

export const preAuth = async (config: EnvironmentVariables) => {
    const client: ThirdwebClient = {
        clientId: config.CLIENT_ID,
        secretKey: config.CLIENT_SECRET,
    }

    const ecosystem = {
        id: config.ECOSYSTEM_ID as `ecosystem.${string}`,
        partnerId: config.PARTNER_ID,
    }

    // sends a verification code to the provided email
    console.log("Sending verification code to email...");
    await preAuthenticate({
        ecosystem,
        client,
        strategy: "email",
        email: config.WALLET_EMAIL,
    });
    console.log("Verification code sent to email.");
}