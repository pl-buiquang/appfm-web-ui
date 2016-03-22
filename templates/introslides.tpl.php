    <div class="reveal">

      <!-- Any section element inside of this container is displayed as a slide -->
      <div class="slides">
      <!--<section>
      <a onclick="window.parent.cli.demo();">Demo</a>
      </section>
      <section>
      <h2>ToDo</h2>
      <section>
      <h3>Core</h3>
      <ul>
        <li>Module creation/validation/deletion</li>
        <li>fix val string proper serialization</li>
        <li><a onclick="window.parent.cli.view.createPanel('test','it works!');">Fix _map issue...</a></li>
      </ul>
      </section>
      <section>
      <h3>Web front</h3>
      <ul>
        <li>Add results dir view in corpus</li>
        <li>add throbber for command bar</li>
        <li>view system on result</li>
        <li>corpus/module upload</li>
        <li>result download</li>
        <li>web doc</li>
      </ul>
      </section>
      <section>
      <h3>Modules</h3>
      <ul>
        <li>ner systems</li>
        <li>proper stanford module</li>
        <li>unitex</li>
      </ul>
      </section>
      <section>
      <h3>Meta</h3>
      </section>
      </section>-->

        <section>
        <h1>AppFM</h1>
            <h3>Application Frame Manager</h3>
            <h4>Chaîne de traitement TAL </h4>
            <p>
            <small>Created by <a href="http://versatile-world.net">Paul Bui-Quang</a> / <a href="mailto:paul.bui-quang@limsi.fr">paul.bui-quang@limsi.fr</a></small>
          </p>
          </section>

        <section>
        <h2>Objectifs</h2>
        <p>
        <ol>
        <li class="fragment">Facilité d'utilisation</li>
        <li class="fragment">Compositionnalité (chaînes)</li>
        <li class="fragment">"Scalabilité"</li>
        </ol>
        </p>
        </section>
        
        <section>
          <h2>Existant</h2>
          <ul>
            <li class="fragment">ESB, Talend, ...</li>
            <li class="fragment">UIMA, Gate, Lingpipe, ...</li>
            <li class="fragment">gparallel, bash scripts, xml definition, ...</li>
          </ul>
        </section>

        <section>
          <h2>1. Facilité d'utilisation : installation</h2>
          <center class="fragment"><img src="../public/img/slides/docker.png"></center>
          
          <div class="fragment">
            Architecture client-serveur : les applications sont déjà installées !
          </div>
        </section>

        <section>
          <h2>1. Facilité d'utilisation : interfaces</h2>
          <ul>
            <li class="fragment">Interface web : tests / demos
            </li>
            <li class="fragment">Interface ligne de commande : scripting
            <img src="../public/img/slides/python.png">
            </li>
          </ul>
        </section>

        <section>
          <h2>2. Compositionnalité : (M : I -> O)+</h2>
          <div class="fragment">"Modules" : applications fonctionneles décrites en YAML</div>
          <div class="fragment">Module de base : _CMD</div>
          <div class="fragment">Opérateurs : _MAP, _IF, ...</div>
        </section>


        <section>
          <h2>3. "Scalabilité"</h2>
          Architecture orientée "message" + conteneurs Docker
          <center><img src="../public/img/slides/zmq.gif" width="300px"></center>
        </section>


        <section>
          <h2>Etat d'avancement</h2>
          <ul>
          <li>interfaces et serveur</li>
          <li>~10 modules implémentés</li>
          </ul>
        </section>

        <section>
          <h2>En cours</h2>
          <ul>
          <li>Services</li>
          <li>Contraintes</li>
          <li>Vues</li>
          </ul>
        </section>

        <section>
          <h2>Roadmap</h2>
          <ul>
            <li>Edition graphique</li>
            <li>Replica system (/hdfs/nfs)</li>
          </ul>
        </section>

        <section>
          <h2>Demo</h2>
          
        </section>


      </div>

    </div>