<nav class="top-bar" data-topbar role="navigation" >
    <ul class="title-area">
      <li class="name">
        <h1><a href="#">CPM</a></h1>
      </li>
  </ul>
    <section class="top-bar-section">
      <!-- Right Nav Section -->
      <ul class="right"> 
      </ul>
  
      <!-- Left Nav Section -->
      <ul class="left">
          <li><a href="#corpus">Corpus</a></li>
          <li><a href="#modules">Modules</a></li>
          <li><a href="#run">Run</a></li>
      </ul>
  </section>
</nav>
<div style="clear:both; width:100%; "></div>


<div class="row">
  <div class="large-2 medium-2 columns">
    <div class="row" >  
    </div>
    <div class="row">
    </div>
  </div>
  <div class="large-10 medium-10 columns" id="cpm-cli-main">
    <div class="row">
      <div id="search-navigation" style="cmd">
        <textarea></textarea>
        <input type="text" name="url" id="dl-url"><div id="dlthrobber"></div> 
      </div>
    </div>
    <div class="row">
      <div id="active-content">
        <iframe src="http://localhost:8001/index.xhtml" width="100%" height="800px;"></iframe>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div id="#log">
  </div>
</div>
<script>
var cli = new vw.cpm.CLI(jQuery("#cpm-cli-main"));
</script>

