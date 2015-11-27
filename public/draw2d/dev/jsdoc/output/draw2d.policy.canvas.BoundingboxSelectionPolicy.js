Ext.data.JsonP.draw2d_policy_canvas_BoundingboxSelectionPolicy({"tagname":"class","name":"draw2d.policy.canvas.BoundingboxSelectionPolicy","autodetected":{},"files":[{"filename":"BoundingboxSelectionPolicy.js","href":"BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy"}],"author":[{"tagname":"author","name":"Andreas Herz","email":null}],"extends":"draw2d.policy.canvas.SelectionPolicy","members":[{"name":"constructor","tagname":"method","owner":"draw2d.policy.canvas.BoundingboxSelectionPolicy","id":"method-constructor","meta":{}},{"name":"attr","tagname":"method","owner":"draw2d.policy.EditPolicy","id":"method-attr","meta":{"experimental":{"text":"\n"}}},{"name":"createMonochromGif","tagname":"method","owner":"draw2d.policy.canvas.CanvasPolicy","id":"method-createMonochromGif","meta":{}},{"name":"onClick","tagname":"method","owner":"draw2d.policy.canvas.CanvasPolicy","id":"method-onClick","meta":{"template":true}},{"name":"onDoubleClick","tagname":"method","owner":"draw2d.policy.canvas.CanvasPolicy","id":"method-onDoubleClick","meta":{"template":true}},{"name":"onInstall","tagname":"method","owner":"draw2d.policy.EditPolicy","id":"method-onInstall","meta":{}},{"name":"onMouseDown","tagname":"method","owner":"draw2d.policy.canvas.BoundingboxSelectionPolicy","id":"method-onMouseDown","meta":{}},{"name":"onMouseDrag","tagname":"method","owner":"draw2d.policy.canvas.BoundingboxSelectionPolicy","id":"method-onMouseDrag","meta":{"template":true}},{"name":"onMouseMove","tagname":"method","owner":"draw2d.policy.canvas.CanvasPolicy","id":"method-onMouseMove","meta":{"template":true}},{"name":"onMouseUp","tagname":"method","owner":"draw2d.policy.canvas.BoundingboxSelectionPolicy","id":"method-onMouseUp","meta":{}},{"name":"onRightMouseDown","tagname":"method","owner":"draw2d.policy.canvas.CanvasPolicy","id":"method-onRightMouseDown","meta":{"template":true}},{"name":"onUninstall","tagname":"method","owner":"draw2d.policy.EditPolicy","id":"method-onUninstall","meta":{}},{"name":"select","tagname":"method","owner":"draw2d.policy.canvas.BoundingboxSelectionPolicy","id":"method-select","meta":{}},{"name":"setDecisionMode","tagname":"method","owner":"draw2d.policy.canvas.BoundingboxSelectionPolicy","id":"method-setDecisionMode","meta":{}},{"name":"snap","tagname":"method","owner":"draw2d.policy.canvas.CanvasPolicy","id":"method-snap","meta":{}},{"name":"unselect","tagname":"method","owner":"draw2d.policy.canvas.SelectionPolicy","id":"method-unselect","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-draw2d.policy.canvas.BoundingboxSelectionPolicy","component":false,"superclasses":["draw2d.policy.EditPolicy","draw2d.policy.canvas.CanvasPolicy","draw2d.policy.canvas.SelectionPolicy"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/draw2d.policy.EditPolicy' rel='draw2d.policy.EditPolicy' class='docClass'>draw2d.policy.EditPolicy</a><div class='subclass '><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='docClass'>draw2d.policy.canvas.CanvasPolicy</a><div class='subclass '><a href='#!/api/draw2d.policy.canvas.SelectionPolicy' rel='draw2d.policy.canvas.SelectionPolicy' class='docClass'>draw2d.policy.canvas.SelectionPolicy</a><div class='subclass '><strong>draw2d.policy.canvas.BoundingboxSelectionPolicy</strong></div></div></div></div><h4>Files</h4><div class='dependency'><a href='source/BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy' target='_blank'>BoundingboxSelectionPolicy.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.BoundingboxSelectionPolicy'>draw2d.policy.canvas.BoundingboxSelectionPolicy</span><br/><a href='source/BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy-method-constructor' class='name expandable'>draw2d.policy.canvas.BoundingboxSelectionPolicy</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy\" rel=\"draw2d.policy.canvas.BoundingboxSelectionPolicy\" class=\"docClass\">draw2d.policy.canvas.BoundingboxSelectionPolicy</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates a new selection policy for a canvas. ...</div><div class='long'><p>Creates a new selection policy for a canvas.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy\" rel=\"draw2d.policy.canvas.BoundingboxSelectionPolicy\" class=\"docClass\">draw2d.policy.canvas.BoundingboxSelectionPolicy</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.policy.canvas.SelectionPolicy-method-constructor\" rel=\"draw2d.policy.canvas.SelectionPolicy-method-constructor\" class=\"docClass\">draw2d.policy.canvas.SelectionPolicy.constructor</a></p></div></div></div><div id='method-attr' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.EditPolicy' rel='draw2d.policy.EditPolicy' class='defined-in docClass'>draw2d.policy.EditPolicy</a><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-attr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.EditPolicy-method-attr' class='name expandable'>attr</a>( <span class='pre'>name, [value]</span> ) : Object<span class=\"signature\"><span class='experimental' >experimental</span></span></div><div class='description'><div class='short'>Read or set object attributes. ...</div><div class='long'><p>Read or set object attributes.<br>\nWhen no value is given, reads specified attribute from the element.<br>\nWhen value is given, sets the attribute to that value.\nMultiple attributes can be set by passing an object with name-value pairs.</p>\n        <p>Available since: <b>5.3.2</b></p>\n        <div class='rounded-box experimental-box deprecated-tag-box'>\n        <p>This method is <strong>experimental</strong> </p>\n        \n\n        </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String/Object<div class='sub-desc'>\n</div></li><li><span class='pre'>value</span> : Object (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-createMonochromGif' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-createMonochromGif' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-createMonochromGif' class='name expandable'>createMonochromGif</a>( <span class='pre'>w, h, d, color</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Helper method to make an monochrome GIF image WxH pixels big, first create a properly sized array: var pixels = new A...</div><div class='long'><p>Helper method to make an monochrome GIF image WxH pixels big, first create a properly sized array: var pixels = new Array(W<em>H);.\nThen, for each pixel X,Y that should be opaque, store a 1 at the proper location: pixels[X+Y</em>W] = 1;.\nFinally, create the image: var my_glif = createGif(W, H, pixels, color);\n\"0\" pixels are transparent.\nThe <b>color</b> defines the foreground color.</p>\n\n<p>Now, you can specify this image as the SRC attribute of an IMG tag: document.write(\"<IMG SRC=\\\"\" + my_glif + \"\\\">\");\nor for the canvas as background-image css attribute.</IMG></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>w</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>h</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>d</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>color</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onClick' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onClick' class='name expandable'>onClick</a>( <span class='pre'>the, mouseX, mouseY, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>Called by the canvas if the user click on a figure. ...</div><div class='long'><p>Called by the canvas if the user click on a figure.</p>\n        <p>Available since: <b>3.0.0</b></p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>the</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>figure under the click event. Can be null</p>\n</div></li><li><span class='pre'>mouseX</span> : Number<div class='sub-desc'><p>the x coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>mouseY</span> : Number<div class='sub-desc'><p>the y coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onDoubleClick' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onDoubleClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onDoubleClick' class='name expandable'>onDoubleClick</a>( <span class='pre'>the, mouseX, mouseY, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>Called by the canvas if the user double click on a figure. ...</div><div class='long'><p>Called by the canvas if the user double click on a figure.</p>\n        <p>Available since: <b>4.1.0</b></p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>the</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>figure under the double click event. Can be null</p>\n</div></li><li><span class='pre'>mouseX</span> : Number<div class='sub-desc'><p>the x coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>mouseY</span> : Number<div class='sub-desc'><p>the y coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onInstall' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.EditPolicy' rel='draw2d.policy.EditPolicy' class='defined-in docClass'>draw2d.policy.EditPolicy</a><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-onInstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.EditPolicy-method-onInstall' class='name expandable'>onInstall</a>( <span class='pre'>host</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called by the host if the policy has been installed. ...</div><div class='long'><p>Called by the host if the policy has been installed.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>host</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a>/<a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onMouseDown' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.BoundingboxSelectionPolicy'>draw2d.policy.canvas.BoundingboxSelectionPolicy</span><br/><a href='source/BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy-method-onMouseDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy-method-onMouseDown' class='name expandable'>onMouseDown</a>( <span class='pre'>canvas, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseDown\" rel=\"draw2d.policy.canvas.CanvasPolicy-method-onMouseDown\" class=\"docClass\">draw2d.policy.canvas.CanvasPolicy.onMouseDown</a></p></div></div></div><div id='method-onMouseDrag' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.BoundingboxSelectionPolicy'>draw2d.policy.canvas.BoundingboxSelectionPolicy</span><br/><a href='source/BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy-method-onMouseDrag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy-method-onMouseDrag' class='name expandable'>onMouseDrag</a>( <span class='pre'>canvas, dx, dy, dx2, dy2</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>dx</span> : Number<div class='sub-desc'><p>The x diff between start of dragging and this event</p>\n</div></li><li><span class='pre'>dy</span> : Number<div class='sub-desc'><p>The y diff between start of dragging and this event</p>\n</div></li><li><span class='pre'>dx2</span> : Number<div class='sub-desc'><p>The x diff since the last call of this dragging operation</p>\n</div></li><li><span class='pre'>dy2</span> : Number<div class='sub-desc'><p>The y diff since the last call of this dragging operation</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseDrag\" rel=\"draw2d.policy.canvas.CanvasPolicy-method-onMouseDrag\" class=\"docClass\">draw2d.policy.canvas.CanvasPolicy.onMouseDrag</a></p></div></div></div><div id='method-onMouseMove' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onMouseMove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseMove' class='name expandable'>onMouseMove</a>( <span class='pre'>canvas, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onMouseUp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.BoundingboxSelectionPolicy'>draw2d.policy.canvas.BoundingboxSelectionPolicy</span><br/><a href='source/BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy-method-onMouseUp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy-method-onMouseUp' class='name expandable'>onMouseUp</a>( <span class='pre'>canvas, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseUp\" rel=\"draw2d.policy.canvas.CanvasPolicy-method-onMouseUp\" class=\"docClass\">draw2d.policy.canvas.CanvasPolicy.onMouseUp</a></p></div></div></div><div id='method-onRightMouseDown' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onRightMouseDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onRightMouseDown' class='name expandable'>onRightMouseDown</a>( <span class='pre'>figure, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>Called if the user press the right mouse in the canvas. ...</div><div class='long'><p>Called if the user press the right mouse in the canvas.</p>\n        <p>Available since: <b>4.4.0</b></p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a>|<a href=\"#!/api/draw2d.shape.basic.Line\" rel=\"draw2d.shape.basic.Line\" class=\"docClass\">draw2d.shape.basic.Line</a><div class='sub-desc'><p>the figure below the mouse</p>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onUninstall' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.EditPolicy' rel='draw2d.policy.EditPolicy' class='defined-in docClass'>draw2d.policy.EditPolicy</a><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-onUninstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.EditPolicy-method-onUninstall' class='name expandable'>onUninstall</a>( <span class='pre'>host</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called by the host if the policy has been uninstalled. ...</div><div class='long'><p>Called by the host if the policy has been uninstalled.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>host</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a>/<a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-select' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.BoundingboxSelectionPolicy'>draw2d.policy.canvas.BoundingboxSelectionPolicy</span><br/><a href='source/BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy-method-select' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy-method-select' class='name expandable'>select</a>( <span class='pre'>canvas, figure</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>figure</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setDecisionMode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.BoundingboxSelectionPolicy'>draw2d.policy.canvas.BoundingboxSelectionPolicy</span><br/><a href='source/BoundingboxSelectionPolicy.html#draw2d-policy-canvas-BoundingboxSelectionPolicy-method-setDecisionMode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.BoundingboxSelectionPolicy-method-setDecisionMode' class='name expandable'>setDecisionMode</a>( <span class='pre'>useIntersectionMode</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Set the selection handling mode to intersection or to isInside. ...</div><div class='long'><p>Set the selection handling mode to <b>intersection</b> or to <b>isInside</b>.</p>\n\n<ul>\n  <li>true = intersection, shapes must only touch the selection bounding box </li>\n  <li>false = isInside, shapes must complete inside the selection bounding box (default)</li>\n</ul>\n\n        <p>Available since: <b>4.9.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>useIntersectionMode</span> : boolean<div class='sub-desc'><p>set true if the selection handle should use the alternative selection approach</p>\n</div></li></ul></div></div></div><div id='method-snap' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-snap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-snap' class='name expandable'>snap</a>( <span class='pre'>figure, clientPos</span> ) : <a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Adjust the coordinates to the given constraint. ...</div><div class='long'><p>Adjust the coordinates to the given constraint.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>clientPos</span> : <a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a></span><div class='sub-desc'><p>the contraint position of th efigure</p>\n</div></li></ul></div></div></div><div id='method-unselect' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.SelectionPolicy' rel='draw2d.policy.canvas.SelectionPolicy' class='defined-in docClass'>draw2d.policy.canvas.SelectionPolicy</a><br/><a href='source/SelectionPolicy.html#draw2d-policy-canvas-SelectionPolicy-method-unselect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.SelectionPolicy-method-unselect' class='name expandable'>unselect</a>( <span class='pre'>canvas, figure</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Unselect the given figure in the canvas and remove all resize handles ...</div><div class='long'><p>Unselect the given figure in the canvas and remove all resize handles</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>figure</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});