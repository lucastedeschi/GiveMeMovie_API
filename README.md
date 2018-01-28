# GiveMeMovie_API
<p>
API responsável pelo gerenciamento de usuário e fornecimento de sugestões das aplicações Give Me Movie. Desenvolvida em Node.Js se comunicando com base de dados em Mongo e com a API do The Movie DB.

<ul>
  <li>Base de dados: mongodb://dbuser:dbpassword@ds117128.mlab.com:17128/givememovie_api</li>
  <li>The Movie DB API: <a>https://developers.themoviedb.org/3/discover/</a></li>
</ul>
</p>

<br />
## Exemplos de requests
### Usuário

<ul>
<li>Criação:</li>
<p>
/users/
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

<li>Adicionar filme a lista de assistidos do usuário:</li>
<p>
/users/movies/pushWatched
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
/users/movies/pushWatchLater
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
/users/movies/pushBlacklist
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
 

