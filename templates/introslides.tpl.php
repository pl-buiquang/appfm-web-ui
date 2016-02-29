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
            <h4>(name subject to change)</h4>
            <p>
            <small>Created by <a href="http://versatile-world.net">Paul Bui-Quang</a> / <a href="mailto:paul.bui-quang@limsi.fr">paul.bui-quang@limsi.fr</a></small>
          </p>
          </section>

        <section>
        <h1>TODO (présentation slides)</h1>
        </section>
        
        <section>
        <h2>Technologies</h2>
        <ul>
          <li>Docker
          </li>
          <li>0MQ</li>
        </ul>
        </section>

        <section>
        <h2>Modules</h2>
        <code><pre class="yaml">
        name : name of the module

        desc : description

        input : #inputs
          KEY :
            type : FILE

        output : # outpus
          KEY :
            type : VAL*
            value :
              - val1
              - val2

        exec :
          - modval1
          - modval2

        </pre></code>
        </section>

      </div>

    </div>