# thirdweb-wallet-connect

## Prerequisites

- NodeJS (recommended version v22.14.0)

## Setup

- Run `npm i`

- Run `npm run build`

Add `.env` file in the repo and set all the values

```env
CLIENT_ID=
CLIENT_SECRET=

CHAIN_ID=
RPC_URL=

ECOSYSTEM_ID=
WALLET_EMAIL=
PARTNER_ID=

EMAIL_VERIFICATION_CODE=
```

## Usage

In order to preauth your email run,

```
npm run preauth
```

Use the verification code received on the given email and set the env variable `EMAIL_VERIFICATION_CODE`

In order to connect to your account run,

```
npm run connect
```