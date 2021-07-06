# quill-receiver

this is intended for use with operation mode 2 on [quillbot](https://github.com/zanedb/quillbot). you should go ahead and [read the docs](https://github.com/zanedb/quillbot#operation) there.

## setup

1. install packages.

```sh
cd quill-receiver
yarn
```

2. create a file named `.env` and enter values for the following:

```sh
# discord webhook url (i.e. #incoming)
# make sure this matches the channel id in your quillbot config
WEBHOOK_URL=
# twilio credentials
TWILIO_AUTH_TOKEN=
# endpoint URL
# this is IMPORTANT! requests will blindly fail without it
ENDPOINT_URL=
```

3. develop.

```sh
vercel dev
```

4. [deploy to vercel](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fzanedb%2Fquill-receiver).

5. configure the same env variables on their backend.
