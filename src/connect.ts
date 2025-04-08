import { ecosystemWallet } from "thirdweb/wallets";
import { EnvironmentVariables } from "./types";
import { liskSepolia } from "./lisk_network";
import { ThirdwebClient } from "thirdweb";

type AsyncStorage = {
    getItem: (key: string) => Promise<null | string>;
    removeItem: (key: string) => Promise<void>;
    setItem: (key: string, value: string) => Promise<void>;
  };
var localStorage = {}
const asyncStorage: AsyncStorage = {
    getItem: async (key: string) => {
        const value = localStorage[key];
        return value ? value : null;
    },
    removeItem: async (key: string) => {
        delete localStorage[key];
    },
    setItem: async (key: string, value: string) => {
        localStorage[key] = value;
    }
}

export const connectWallet = async (config: EnvironmentVariables) => {
    // sends a verification code to the provided email
    const wallet = ecosystemWallet(config.ECOSYSTEM_ID as `ecosystem.${string}`,
        {
        storage: asyncStorage,
        // partnerId: config.PARTNER_ID,
     }
    );
    
    const client: ThirdwebClient = {
        clientId: config.CLIENT_ID,
        secretKey: config.CLIENT_SECRET,
    }
    console.log("Connecting to wallet...");
    const account = await wallet.connect({
        chain: liskSepolia,
        client,
        strategy: "email",
        email: config.WALLET_EMAIL,
        verificationCode: config.EMAIL_VERIFICATION_CODE,
    });

    console.log("Signed into Account =>", account.address);
    console.log("Local storage =>",  localStorage);
    const signedMessage = await account.signMessage({
        message: {
            raw: "0x1111"
        },
        chainId: liskSepolia.id,
    });
    console.log("signedMessage =>", signedMessage);
    const result = await account.sendTransaction({
        to: "0x1adA1B260C80d9035BD82c8Ea3cd469a80505de3",
        value: BigInt(10000000000),
        chainId: liskSepolia.id,
    });
    console.log("result =>", result);
    // const gasEstimate = await account.estimateGas({
    //     to: "0x",
    //     chain: liskSepolia,
    //     client,
    // });

    // console.log("gasEstimate =>", gasEstimate);
}


export const createAccount = async (config: EnvironmentVariables) => {
    // sends a verification code to the provided email
    const wallet = ecosystemWallet(config.ECOSYSTEM_ID as `ecosystem.${string}`);
    
    const client = {
        clientId: config.CLIENT_ID,
        secretKey: config.CLIENT_SECRET,
    }
    console.log("Connecting to wallet...");
    const account = await wallet.connect({
        chain: liskSepolia,
        client,
        strategy: "email",
        email: config.WALLET_EMAIL,
        verificationCode: config.EMAIL_VERIFICATION_CODE,
    });
    console.log("account", account);
}
