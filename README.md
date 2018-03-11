<h1>GiveMeMovie_API</h1>
<p>
API responsável pelo gerenciamento de usuário e fornecimento de sugestões das aplicações Give Me Movie. Desenvolvida em Node.Js se comunicando com base de dados em Mongo e com a API do The Movie DB.

<ul>
  <li>Base de dados: mongodb://dbuser:dbpassword@ds117128.mlab.com:17128/givememovie_api</li>
  <li>The Movie DB API: <a>https://developers.themoviedb.org/3/discover/</a></li>
  <li>Heroku: <a>https://shielded-lowlands-27093.herokuapp.com/<a/></li>
</ul>
</p>

<br />
<h2>Exemplos de requests</h2>
<h3>Usuário</h3>

<ul>
<li>Criar:</li>
<p>
POST: /users/
</p>
<p>
<code>
 {
    "name": "User 01",
    "email": "01@user.com",
    "sex": "Masculino",
    "birth": "2000-01-20",
    "password": "123456",
    "pictureUrl": "http://example.com/01.png"
 }
 </code>
 </p>
<br />
  
<li>Atualizar:</li>
<p>
POST: /users/update
</p>
<p>
<code>
 {
    "name": "User 01",
    "email": "01@user.com",
    "sex": "Masculino",
    "birth": "2000-01-20",
    "password": "123456",
    "pictureUrl": "http://example.com/01.png"
 }
 </code>
 </p>
<br />
  
<li>Listar todos:</li>
<p>
GET: /users/
</p>
<br />

<li>Listar por email:</li>
<p>
GET: /users/:email
</p>
<br />

<li>Adicionar filme a lista de assistidos do usuário:</li>
<p>
POST: /users/movies/pushWatched
</p>
<p>
<code>
  {
    "email": "01@user.com",
    "movie": {
    		"id": 198663,
    		"rate": 5
    }
 }
  </code>
 </p>
 <br />

<li>Adicionar filme a lista de assistir depois do usuário:</li>
<p>
POST: /users/movies/pushWatchLater
</p>
<p>
<code>
 {
    "email": "01@user.com",
    "movie": {
    		"id": 353486
    }
 }
  </code>
 </p>
 <br />

<li>Adicionar filme a lista de não exibir novamente do usuário:</li>
<p>
POST: /users/movies/pushBlacklist
</p>
<p>
<code>
 {
    "email": "01@user.com",
    "movie": {
    		"id": 8844
    }
 }
  </code>
 </p>
 <br />
 
 </ul>
 

