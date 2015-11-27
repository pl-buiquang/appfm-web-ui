Ext.data.JsonP.global({"tagname":"class","name":"global","alternateClassNames":[],"members":[{"name":"ENCODED_VALS","tagname":"property","owner":"global","id":"property-ENCODED_VALS","meta":{}},{"name":"ENCODED_VALS_BASE","tagname":"property","owner":"global","id":"property-ENCODED_VALS_BASE","meta":{}},{"name":"ENCODED_VALS_WEBSAFE","tagname":"property","owner":"global","id":"property-ENCODED_VALS_WEBSAFE","meta":{}},{"name":"byteToCharMapWebSafe_","tagname":"property","owner":"global","id":"property-byteToCharMapWebSafe_","meta":{"private":true}},{"name":"byteToCharMap_","tagname":"property","owner":"global","id":"property-byteToCharMap_","meta":{"private":true}},{"name":"charToByteMapWebSafe_","tagname":"property","owner":"global","id":"property-charToByteMapWebSafe_","meta":{"private":true}},{"name":"charToByteMap_","tagname":"property","owner":"global","id":"property-charToByteMap_","meta":{"private":true}},{"name":"decode","tagname":"method","owner":"global","id":"method-decode","meta":{}},{"name":"diff","tagname":"method","owner":"global","id":"method-diff","meta":{}},{"name":"encode","tagname":"method","owner":"global","id":"method-encode","meta":{}},{"name":"get","tagname":"method","owner":"global","id":"method-get","meta":{}},{"name":"set","tagname":"method","owner":"global","id":"method-set","meta":{}},{"name":"stringToByteArray","tagname":"method","owner":"global","id":"method-stringToByteArray","meta":{}}],"aliases":{},"files":[{"filename":"","href":""}],"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><div class='doc-contents'><p>Global variables and functions.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-ENCODED_VALS' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-property-ENCODED_VALS' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-property-ENCODED_VALS' class='name expandable'>ENCODED_VALS</a> : string<span class=\"signature\"></span></div><div class='description'><div class='short'>Our default alphabet. ...</div><div class='long'><p>Our default alphabet. Value 64 (=) is special; it means \"nothing.\"</p>\n<p>Defaults to: <code>&#39;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#39; + &#39;+/=&#39;</code></p></div></div></div><div id='property-ENCODED_VALS_BASE' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-property-ENCODED_VALS_BASE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-property-ENCODED_VALS_BASE' class='name expandable'>ENCODED_VALS_BASE</a> : string<span class=\"signature\"></span></div><div class='description'><div class='short'>Our default alphabet, shared between\nENCODED_VALS and ENCODED_VALS_WEBSAFE ...</div><div class='long'><p>Our default alphabet, shared between\nENCODED_VALS and ENCODED_VALS_WEBSAFE</p>\n<p>Defaults to: <code>&#39;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#39;</code></p></div></div></div><div id='property-ENCODED_VALS_WEBSAFE' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-property-ENCODED_VALS_WEBSAFE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-property-ENCODED_VALS_WEBSAFE' class='name expandable'>ENCODED_VALS_WEBSAFE</a> : string<span class=\"signature\"></span></div><div class='description'><div class='short'>Our websafe alphabet. ...</div><div class='long'><p>Our websafe alphabet.</p>\n<p>Defaults to: <code>&#39;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#39; + &#39;-_.&#39;</code></p></div></div></div><div id='property-byteToCharMapWebSafe_' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-property-byteToCharMapWebSafe_' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-property-byteToCharMapWebSafe_' class='name expandable'>byteToCharMapWebSafe_</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Maps bytes to websafe characters.</p>\n</div><div class='long'><p>Maps bytes to websafe characters.</p>\n</div></div></div><div id='property-byteToCharMap_' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-property-byteToCharMap_' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-property-byteToCharMap_' class='name expandable'>byteToCharMap_</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Maps bytes to characters.</p>\n</div><div class='long'><p>Maps bytes to characters.</p>\n</div></div></div><div id='property-charToByteMapWebSafe_' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-property-charToByteMapWebSafe_' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-property-charToByteMapWebSafe_' class='name expandable'>charToByteMapWebSafe_</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Maps websafe characters to bytes.</p>\n</div><div class='long'><p>Maps websafe characters to bytes.</p>\n</div></div></div><div id='property-charToByteMap_' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-property-charToByteMap_' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-property-charToByteMap_' class='name expandable'>charToByteMap_</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Maps characters to bytes.</p>\n</div><div class='long'><p>Maps characters to bytes.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-decode' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-method-decode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-decode' class='name expandable'>decode</a>( <span class='pre'>input, [opt_webSafe]</span> ) : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Base64-decode a string. ...</div><div class='long'><p>Base64-decode a string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>input</span> : String<div class='sub-desc'><p>to decode (length not required to be a multiple of 4).</p>\n</div></li><li><span class='pre'>opt_webSafe</span> : boolean (optional)<div class='sub-desc'><p>True if we should use the\n    alternative alphabet.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>bytes representing the decoded value.</p>\n</div></li></ul></div></div></div><div id='method-diff' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/JSONUtil.html#global-method-diff' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-diff' class='name expandable'>diff</a>( <span class='pre'>obj1, obj2</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>calculates the diff between the given json objects ...</div><div class='long'><p>calculates the diff between the given json objects</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj1</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>obj2</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-encode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-method-encode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-encode' class='name expandable'>encode</a>( <span class='pre'>input, [opt_webSafe]</span> ) : string<span class=\"signature\"></span></div><div class='description'><div class='short'>Base64-encode a string. ...</div><div class='long'><p>Base64-encode a string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>input</span> : string<div class='sub-desc'><p>A string to encode.</p>\n</div></li><li><span class='pre'>opt_webSafe</span> : boolean (optional)<div class='sub-desc'><p>If true, we should use the alternative alphabet.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>string</span><div class='sub-desc'><p>The base64 encoded string.</p>\n</div></li></ul></div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/JSONUtil.html#global-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-get' class='name expandable'>get</a>( <span class='pre'>data, path</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value defined by the path passed in ...</div><div class='long'><p>Returns the value defined by the path passed in</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>the JSON data object</p>\n</div></li><li><span class='pre'>path</span> : String<div class='sub-desc'><p>string leading to a desired value</p>\n</div></li></ul></div></div></div><div id='method-set' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/JSONUtil.html#global-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-set' class='name expandable'>set</a>( <span class='pre'>data, path, value</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Given a dot deliminated string set will create an object\nbased on the structure of the string with the desired value ...</div><div class='long'><p>Given a dot deliminated string set will create an object\nbased on the structure of the string with the desired value</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'><p>the json object to modify</p>\n</div></li><li><span class='pre'>path</span> : String<div class='sub-desc'><p>path indicating where value should be placed</p>\n</div></li><li><span class='pre'>value</span> : Object<div class='sub-desc'><p>the value desired to be set at the location determined by path</p>\n</div></li></ul></div></div></div><div id='method-stringToByteArray' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='global'>global</span><br/><a href='source/Base64.html#global-method-stringToByteArray' target='_blank' class='view-source'>view source</a></div><a href='#!/api/global-method-stringToByteArray' class='name expandable'>stringToByteArray</a>( <span class='pre'>str</span> ) : !Array.&lt;number&gt;<span class=\"signature\"></span></div><div class='description'><div class='short'>Turns a string into an array of bytes; a \"byte\" being a JS number in the\nrange 0-255. ...</div><div class='long'><p>Turns a string into an array of bytes; a \"byte\" being a JS number in the\nrange 0-255.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>str</span> : string<div class='sub-desc'><p>String value to arrify.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>!Array.&lt;number&gt;</span><div class='sub-desc'><p>Array of numbers corresponding to the\n    UCS character codes of each character in str.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});