# icns-frontend

## Development

Add an .env file and fill the following variables or manually add them in your terminal.

```
TWITTER_CLIENT_ID=...
TWITTER_CLIENT_SECRET=...
TWITTER_AUTH_STATE=...
TWITTER_AUTH_CALLBACK_URI=...

IRON_PASSWORD=...

# must be separated by commas
ICNS_VERIFIER_ORIGIN_LIST=http:localhost:8080,http://localhost:8081
```

Run the development server:

```bash
yarn install
yarn dev
```
