<!--Menu content panel-->
<div id="left-panel">
<!--Main menu bar-->
  <div id="menu">
    <div id="app-title">AppFM</div>
  <!--Top Menu links-->
    <ul class="main-menu">
      <li><div id="corpus-menu" class=" main-menu-item"></div>
      </li>
      <li><div id="module-menu" class=" main-menu-item"></div>
      </li>
      <li><div id="process-menu" class="main-menu-item"></div>
      </li>
    </ul>
    <!--Bottom menu links-->
    <ul class="main-menu bottom-menu">
      <li><div id="settings-menu" class="main-menu-item"></div></li>
      <li><div id="help-menu" class="main-menu-item"></div></li>
    </ul>
  </div>
  <!--Menu contents-->
  <div id="menu-content">
    <div id="menu-content-title"></div>
    <div id="menu-content-body"></div>
  </div>
</div>

<!--Main content panel-->
<div id="main" class="menu-closed">
<!--Command bar-->
  <div id="cmd-bar-container">
    <div id="cmdbar">
    </div>
  </div>

<!--Active frame container-->
  <div id="active-content">
    <div id="active-content-sticky">
    </div>
    <div id="active-content-flow">
    </div>
  </div>
</div>

<div id="status-bar" class="menu-closed"><div id="status-button" class="status-button-offline"></div><div id="log-button"></div></div>

<!--Main application script entry point-->
<script>
  var cli = new vw.cpm.CLI(jQuery("body"),{cpmbaseurl:"[[BASE_URL]]",hostname:"[[HOSTNAME]]",cpmwshost:"[[WS_HOST]]"});

</script>

