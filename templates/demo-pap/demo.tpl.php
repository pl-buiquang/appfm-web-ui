<nav class="top-bar" data-topbar role="navigation">
  <ul class="title-area">
    <li class="name">
      <h1><a href="[[BASE_URL]]demo">Accueil</a></h1>
    </li>
     <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
  </ul>

  <section class="top-bar-section">
    <!-- Right Nav Section -->
    <ul class="right">
      <li class="has-dropdown">
        <a href="#">Exemples</a>
        <ul class="dropdown">
          [[EXEMPLES]]
        </ul>
      </li>
    </ul>

    <!-- Left Nav Section -->
    <ul class="left">
      <li class="has-dropdown">
        <a href="#">Tâche n°1</a>
        <ul class="dropdown">
          <li><a href="[[BASE_URL]]demo/t1">Un Exemple</a></li>
          <li><a href="[[BASE_URL]]demo/t1/multiple">Multiple exemples</a></li>
        </ul>
      </li>
      <li class="has-dropdown">
        <a href="#">Tâche n°2</a>
        <ul class="dropdown">
          <li><a href="[[BASE_URL]]demo/t2">Un Exemple</a></li>
          <li><a href="[[BASE_URL]]demo/t2/multiple">Multiple exemples</a></li>
        </ul>
      </li>
      <li class="has-dropdown">
        <a href="#">Tâche n°3</a>
        <ul class="dropdown">
          <li><a href="[[BASE_URL]]demo/t3">Un Exemple</a></li>
          <li><a href="[[BASE_URL]]demo/t3/multiple">Multiple exemples</a></li>
        </ul>
      </li>
    </ul>
  </section>
</nav>

<div class="row" style="max-width:1280px; margin:80px auto;">
  <div class="large-12 medium-12 columns">
  [[CONTENT]]
  </div>
</div>
    
