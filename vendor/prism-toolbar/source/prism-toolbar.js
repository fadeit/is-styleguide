(function(){
  if (!self.Prism) {
    return;
  }

  // Escape all 'code' element contents
  escapeAllCode(document.getElementsByTagName('code'));


  // Grab the location of the ZeroClipboard flash file
  var script = document.getElementsByTagName('script');
  script = script[script.length - 1];

  if (script) {
    var moviePath = script.getAttribute('src');
    moviePath = moviePath.replace(moviePath.substring(moviePath.lastIndexOf('/')+1), 'ZeroClipboard.swf');
  }

  // Attach our hook, only for those parts that we highlighted
  Prism.hooks.add('after-highlight', function(env) {
    // Check if inline or actual code block (credit to line-numbers plugin)
    var pre = env.element.parentNode;

    // Setup the toolbar
    var toolbar = document.createElement('div');
    toolbar.setAttribute('class', 'toolbar');

    // Close Toolbar button
    var closeButton = document.createElement('a');
    closeButton.className = 'collapse-code';
    closeButton.innerHTML = 'Collapse code';

    // View source button
    var linkSource = document.createElement('a');
    linkSource.innerHTML = 'View source';
    attachClickHandler(linkSource, function() {

      var newWindow = window.open('', 'Source', 'chrome,resizable,scrollbars,centerscreen,width=800,height=600');
          newWindow.document.open();
          newWindow.document.write('<!doctype html><html><head><title>Source</title></head><body><pre><code>' + this.code + '</code></pre></body></html>');
          newWindow.document.close();
          return false;
    }, env);

    // Copy to clipboard button, requires ZeroClipboard
    if (window.ZeroClipboard && moviePath) {
      var linkCopy = document.createElement('a');
          linkCopy.innerHTML = 'Copy';

      var clip = new ZeroClipboard(linkCopy, {
        'moviePath': moviePath
      });

      clip.on('ready', function() {
        //Set the clipboard data by accessing prism's env.code
        clip.on('copy', function(event) {
          var clipboard = event.clipboardData;
          clipboard.setData( "text/plain", env.code );
        });

        clip.on('aftercopy', function() {
          linkCopy.innerHTML = 'Copied!';
          setTimeout(function(){
            linkCopy.innerHTML = 'Copy';
          }, 2000);
        });
      });

      // Append the Copy link
      toolbar.appendChild(linkCopy);
    }

    // Append the Source link
    toolbar.appendChild(linkSource);
    // Append the close button
    toolbar.appendChild(closeButton);
    // Add our toolbar to the <pre> tag
    pre.appendChild(toolbar);
  });

  // Cross-browser click handler
  function attachClickHandler(element, callback, that) {
    if(element.addEventListener) {
      element.addEventListener('click', function() { callback.apply(that) });
    } else if(element.attachEvent) {
      element.attachEvent('onclick',  function() { callback.apply(that) });
    }
  }

  // Escapes Markup
  function escapeAllCode(code){
    var i;

    for(i = 0; i <= code.length - 1; i++){
      code[i].innerHTML = HtmlEncode(code[i].innerHTML);
    }

    function HtmlEncode(s){
      return s.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    }
  }

})();
