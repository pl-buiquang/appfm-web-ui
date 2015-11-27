Ext.data.JsonP.draw2d_io_png_Writer({"tagname":"class","name":"draw2d.io.png.Writer","autodetected":{},"files":[{"filename":"Writer.js","href":"Writer2.html#draw2d-io-png-Writer"}],"author":[{"tagname":"author","name":"Andreas Herz","email":null}],"extends":"draw2d.io.Writer","members":[{"name":"constructor","tagname":"method","owner":"draw2d.io.Writer","id":"method-constructor","meta":{"private":true}},{"name":"formatXml","tagname":"method","owner":"draw2d.io.Writer","id":"method-formatXml","meta":{}},{"name":"marshal","tagname":"method","owner":"draw2d.io.png.Writer","id":"method-marshal","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-draw2d.io.png.Writer","short_doc":"Convert the canvas document into a PNG Image. ...","component":false,"superclasses":["draw2d.io.Writer"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/draw2d.io.Writer' rel='draw2d.io.Writer' class='docClass'>draw2d.io.Writer</a><div class='subclass '><strong>draw2d.io.png.Writer</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Writer2.html#draw2d-io-png-Writer' target='_blank'>Writer.js</a></div></pre><div class='doc-contents'><p>Convert the canvas document into a PNG Image.</p>\n\n<pre><code>// example how to create a PNG image and set an \n// image src attribute.\n//\nvar writer = new <a href=\"#!/api/draw2d.io.png.Writer\" rel=\"draw2d.io.png.Writer\" class=\"docClass\">draw2d.io.png.Writer</a>();\nwriter.marshal(canvas, function(png){\n    $(\"#preview\").attr(\"src\",png);\n});\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.io.Writer' rel='draw2d.io.Writer' class='defined-in docClass'>draw2d.io.Writer</a><br/><a href='source/Writer4.html#draw2d-io-Writer-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.io.Writer-method-constructor' class='name expandable'>draw2d.io.png.Writer</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.io.Writer\" rel=\"draw2d.io.Writer\" class=\"docClass\">draw2d.io.Writer</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.io.Writer\" rel=\"draw2d.io.Writer\" class=\"docClass\">draw2d.io.Writer</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-formatXml' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.io.Writer' rel='draw2d.io.Writer' class='defined-in docClass'>draw2d.io.Writer</a><br/><a href='source/Writer4.html#draw2d-io-Writer-method-formatXml' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.io.Writer-method-formatXml' class='name expandable'>formatXml</a>( <span class='pre'>xml</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>utility method to format a given XML string. ...</div><div class='long'><p>utility method to format a given XML string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>xml</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-marshal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.io.png.Writer'>draw2d.io.png.Writer</span><br/><a href='source/Writer2.html#draw2d-io-png-Writer-method-marshal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.io.png.Writer-method-marshal' class='name expandable'>marshal</a>( <span class='pre'>canvas, resultCallback, cropBoundingBox</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Export the content to a PNG image. ...</div><div class='long'><p>Export the content to a PNG image. The result can be set as <b>src=\"....\"</b> because\nthe result is encoded as data source url <b>data:image/png;base64....</b>\n<br>\n<br></p>\n\n<p>Method signature has been changed from version 2.10.1 to version 3.0.0.<br>\nThe parameter <b>resultCallback</b> is required and new. The method calls\nthe callback instead of return the result.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>resultCallback</span> : Function<div class='sub-desc'><p>the method to call on success. The first argument is the dataUrl, the second is the base64 formated png image</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>img</span> : String<div class='sub-desc'><p>The image as data source url <b>data:image/png;base64....</b></p>\n</div></li><li><span class='pre'>base64</span> : String<div class='sub-desc'><p>the image encoded in base64</p>\n</div></li></ul></div></li><li><span class='pre'>cropBoundingBox</span> : <a href=\"#!/api/draw2d.geo.Rectangle\" rel=\"draw2d.geo.Rectangle\" class=\"docClass\">draw2d.geo.Rectangle</a><div class='sub-desc'><p>optional cropping/clipping bounding box</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.io.Writer-method-marshal\" rel=\"draw2d.io.Writer-method-marshal\" class=\"docClass\">draw2d.io.Writer.marshal</a></p></div></div></div></div></div></div></div>","meta":{}});