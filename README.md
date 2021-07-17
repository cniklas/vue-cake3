# CakePHP 3 REST API
https://www.bravo-kernel.com/2015/04/how-to-build-a-cakephp-3-rest-api-in-minutes/

## Prolog

- Verzeichnis entpacken nach `vue-cake3`
- `composer install` ausführen


## Teil 1: Cake einrichten

1. [Cake Application erzeugen](https://book.cakephp.org/3/en/installation.html) via Console: `composer create-project --prefer-dist cakephp/app:^3.8 my_app_name`
2. [CRUD-Plugin](https://github.com/FriendsOfCake/crud) installieren:  
`composer require friendsofcake/crud:^5.0`  
`bin\cake plugin load Crud`
3. API-Funktionalität einrichten


## Teil 2: Daten anlegen, Views erzeugen

1. Datensätze übernehmen oder manuell anlegen
2. HTML-Views erzeugen

Jetzt ist die API nutzbar durch eine der beiden Varianten:

- Aufruf im Browser: `https://localhost.test/vue-cake3/cocktails.json`
- REST-Call: 
	- URL: `https://localhost.test/vue-cake3/cocktails`
	- HTTP Method: `GET`
	- Accept Header: `application/json`

3. Pagination anpassen (optional)
4. Querystring-Parameter anwenden (optional)


## Teil 3: Route-Prefixing

1. Route Prefixing einrichten

Die REST-Calls werden nun über eine eigene API-Route geführt: `https://localhost.test/vue-cake3/api/cocktails`  
Normale Requests laufen weiterhin über die Standard-Routen.


## Teil 4: JWT-Authentifizierung (optional)

JWT: [JSON Web Token](http://jwt.io/)

1. User erzeugen
2. [JWTAuth-Plugin](https://github.com/ADmad/cakephp-jwt-auth) installieren:  
`composer require admad/cakephp-jwt-auth`  
`bin\cake plugin load ADmad/JwtAuth`
3. Prefix-Routing anpassen
4. JWT-Authentifizierung einrichten
5. API-User-Registrierung einrichten
6. (JWT-Token auf Gültigkeit prüfen)
7. JWT-Token-Requests einrichten


### Register-Request


- URL: https://localhost.test/vue-cake3/api/users/register
- HTTP Method: POST
- Accept Header: `application/json`
- Content-Type Header: `application/json`
- Body: User-Data als JSON-String

```json
{
	"username": "mike",
	"password": "test123",
	"active": true
}
```


### Token-Request

- URL: https://localhost.test/vue-cake3/api/users/token
- HTTP Method: `POST`
- Accept Header: `application/json`
- Content-Type Header: `application/json`
- Body: Credentials als JSON-String

```json
{
	"username": "cniklas",
	"password": "123456"
}
```


## Teil 5: JSON-API verwenden

Die [JSON-API](https://jsonapi.org/) ist eine Spezifikation für (REST-)APIs bei Verwendung von JSON. Hierfür gibt es diverse Plugins für alle möglichen Programmiersprachen und Frameworks, u.a. auch für Vuex: https://github.com/mrichar1/jsonapi-vuex
Durch die Verwendung der JSON-API lassen sich deutlich komplexere Daten abrufen, verarbeiten und speichern; Stichwort Model-Relations, Validierung, …

1. Composer-Packages aktualisieren/entfernen/ergänzen:  
`composer update`  
`composer require friendsofcake/crud`  
`composer remove neomerx/json-api`  
`composer require friendsofcake/crud-json-api`
2. JWT-Authentifizierung deaktivieren (weil nicht relevant)
3. JSON-API einrichten
	- Accept Header: `application/vnd.api+json`
	- Content-Type Header: `application/vnd.api+json`
4. [CORS Middleware Plugin](https://github.com/ozee31/cakephp-cors) installieren:  
`composer require ozee31/cakephp-cors:^1`
5. CORS Middleware einrichten, um API-Aufrufe außerhalb der eigenen Domain zu ermöglichen

Für __Register- und Token-Requests__ (Teil 4) bleiben Accept-Header und Content-Type-Header auf `application/json` eingestellt.


### API Request mit Auth-Token

- URL: https://localhost.test/vue-cake3/api/cocktails
- HTTP Method: `GET`
- Accept Header: `application/vnd.api+json`
- Authorization Header: `Bearer {YOUR-JWT-TOKEN}`  
z.B. `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTU5NTg3NDU4OH0.e8MfoPPAU7pbqr34N7frBG_pbKCi3Ah6Pc0SHfquWQU`


## Teil 6. Frontend einrichten

Im Tutorial wird Ember verwendet.  
Vuex-Modul für Vue 2: https://github.com/mrichar1/jsonapi-vuex

Beachte [Best practice to integrate VueJS with CakePHP 3](https://stackoverflow.com/a/51098921)

### Build-Anpassung

https://vitejs.dev/guide/build.html#public-base-path

```json
"build": "vite build --base=https://myplanner.de/cocktails/"
```
