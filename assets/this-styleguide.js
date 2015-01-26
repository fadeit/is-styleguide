(function styleGuideApp(){
  //toggle code blocks
  (function codeToggler(){
    var i,
        codeBlocks = document.querySelectorAll('.code-toolbar');

    for(i = 0; i<= codeBlocks.length-1; i++){
      codeBlocks[i].addEventListener('click', expandCode);
    }

    function expandCode(e){
      var pre = e.target;

      if(!hasClass(pre, 'toggled-code') && e.target.tagName === 'PRE'){
        addClass(pre, 'toggled-code');

        var toolbar = pre.querySelector('.toolbar');
        var collapse_button = toolbar.querySelector('.collapse-code');

        collapse_button.addEventListener('click', collapseCode);
      }

      function collapseCode(e){
        removeClass(pre, 'toggled-code');
      }
    }
  })();

  //generate ToC
  (function generateTableOfContents(){
    var i,
        tocList,
        tocListItem,
        tocAnchor,
        tocLastTag,
        tocLastList,
        tocNestedListItem,
        tocContainer = document.querySelector("#table-of-contents"),
        tocItems = document.querySelectorAll('.toc-heading');

    for(i = 0; i <= tocItems.length - 1; i++) {
      tocListItem = document.createElement('li');
      tocAnchor = document.createElement('a');
      tocAnchor.href = "#"+tocItems[i].id;;
      tocAnchor.innerHTML = tocItems[i].innerHTML;

      //append anchor to list item
      tocListItem.appendChild(tocAnchor);

      if(tocLastTag !== tocItems[i].tagName){
        //append list
        if(tocLastList){
          tocNestedListItem.appendChild(tocLastList)
          tocContainer.appendChild(tocNestedListItem);
        }

        tocNestedListItem = document.createElement('li');
        tocLastTag = tocItems[i].tagName;
        tocLastList = document.createElement('ul');
        addClass(tocLastList, 'toc-list-'+tocItems[i].tagName.toLowerCase());
      }

      tocLastList.appendChild(tocListItem);
    }
  })();

  //tocScroll
  (function TocScroll(){
    var introSize = document.getElementsByClassName('intro')[0].offsetHeight,
        tocContainer = document.querySelector('#toc-container'),
        scrollGuard = false;

    window.onscroll = handleScrollChange;

    function handleScrollChange(){
      var scrollPosition = getScrollTop();

      if(scrollPosition >= introSize && !scrollGuard){
        addClass(tocContainer, 'fixed-table');
        scrollGuard = true;
      } else if(scrollPosition < introSize && scrollGuard){
        removeClass(tocContainer, 'fixed-table');
        scrollGuard = false;
      }
    }

    function getScrollTop(){
      if(typeof pageYOffset != 'undefined'){
        return pageYOffset;
      }
      else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement;
        D= (D.offsetHeight)? D: B;
        return D.scrollTop;
      }
    }
  })();

  //focus text input
  (function focusTextInput(){
    var i,
        j,
        dynamic_input_rows = document.querySelectorAll('.dynamic-input-row')

    for(i = 0; i <= dynamic_input_rows.length - 1; i++){
      addInputListenersTo(dynamic_input_rows[i].querySelectorAll('input[type], textarea'));
    }

    function addInputListenersTo(inputs){
      if(inputs){
        for(j = 0; j <= inputs.length - 1; j++){
          inputs[j].addEventListener('focus', dynamicInputFocused, true);
          inputs[j].addEventListener('blur', dynamicInputFocused, true);
        }
      }
    }

    function dynamicInputFocused(e){
      if(!hasClass(this.parentNode, 'input-focused')){
        addClass(this.parentNode, 'input-focused');
      } else {
        if(!this.value){
          removeClass(this.parentNode, 'input-focused');
        }
      }
    }
  })();


  /*
   * Helper methods
   * Should simplify tasks.
   *
   */

  //Check if a element has a class
  function hasClass(haystack, needle){
    var fullClassName = haystack.className;
    var classRegExp = new RegExp(needle);
    return classRegExp.test(fullClassName);
  }

  //Remove a class from an element
  function removeClass(targetElement, classToRemove){
    var initialClass = targetElement.className;

    targetElement.className = targetElement.className.replace(' ' + classToRemove, '');

    //try without space
    if(targetElement.className === initialClass){
      targetElement.className = targetElement.className.replace(classToRemove, '');
    }
  }

  //add a class to a element
  function addClass(targetElement, newClass){
    var separator = (!targetElement.className) ? '' : ' ';

    targetElement.className = targetElement.className + separator + newClass;
  }
})();