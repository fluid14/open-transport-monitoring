## Backend services

### Dependencies
```sh
$ npm install -g serverless
$ cd backend
$ npm install
$ pip install -r requirements.txt
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

### Local development
Żeby odpalić lambdę lokalnie możemy użyć następującego polecenia
```shell script
$ py invoke_lambda.py -f nazwaFunkcji -s nazwaSerwisu
```
gdzie `nazwaFunkcji` to nazwa funkcji określona w pliku `serverless.yml`
Skrypt `invoke_lambda.py` znajduje się w katalogu `scripts`

##### Lambda wymagająca inputu 
Jeśli lambda oczekuje inputu należy umieścić przykładową strukturę w pliku `input.json` w folderze z lambdą.

##### Lambda wymagająca zmiennych środowiskowych
Jeśli lambda oczekuje zmiennych środowiskowych należy umieścić je w pliku `env.yml` w folderze z lambdą.
Plik nie będzie wersjonowany.