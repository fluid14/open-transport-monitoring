## Backend services

### Dependencies
```sh
$ npm install -g serverless
$ cd backend
$ npm install
```

### Serverless configuration
```sh
$ sls config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET
$ sls login
```

### Deployment
```sh
$ cd device
$ sls deploy
```