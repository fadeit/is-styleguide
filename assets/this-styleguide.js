//toggle code
(function codeToggler(){
  var i,
      codeBlocks = document.querySelectorAll('.code-toolbar');

  for(i = 0; i<= codeBlocks.length-1; i++){
    codeBlocks[i].addEventListener('click', expandCode);
  }

  function expandCode(e){
    var className = new RegExp(e.target.className);
    var pre = e.target;

    if(!className.test('toggled-code') && e.target.tagName === 'PRE'){
      pre.className = pre.className + ' toggled-code';

      var toolbar = pre.querySelector('.toolbar');
      var collapse_button = toolbar.querySelector('.collapse-code');

      collapse_button.addEventListener('click', collapseCode);
    }

    function collapseCode(e){
      pre.className = pre.className.replace(' toggled-code', '');
    }
  }
})();

//generate ToC
(function generateTableOfContents(){
  var i,
      toc_list,
      toc_list_item,
      toc_anchor,
      toc_last_tag,
      toc_last_list,
      toc_nested_list_item,
      toc_container = document.querySelector("#table-of-contents"),
      toc_items = document.querySelectorAll('.style-heading');

  for(i = 0; i <= toc_items.length - 1; i++) {
    toc_list_item = document.createElement('li');
    toc_anchor = document.createElement('a');
    toc_anchor.href = "#"+toc_items[i].id;;
    toc_anchor.innerHTML = toc_items[i].innerHTML;

    //append anchor to list item
    toc_list_item.appendChild(toc_anchor);

    if(toc_last_tag !== toc_items[i].tagName){
      //append list
      if(toc_last_list){
        toc_nested_list_item.appendChild(toc_last_list)
        toc_container.appendChild(toc_nested_list_item);
      }

      toc_nested_list_item = document.createElement('li');
      toc_last_tag = toc_items[i].tagName;
      toc_last_list = document.createElement('ul');
      toc_last_list.className = "toc-list-" + toc_items[i].tagName.toLowerCase();
    }

    toc_last_list.appendChild(toc_list_item);
  }
})();

//tocScroll
(function TocScroll(){
  var intro_size = document.getElementsByClassName('intro')[0].clientHeight,
      toc_container = document.querySelector('#toc-container'),
      scroll_guard = false;

  window.onscroll = handleScrollChange;

  function handleScrollChange(){
    //console.log(intro_size);
    var scroll_position = getScrollTop();

    if(scroll_position >= intro_size && !scroll_guard){
      toc_container.className = toc_container.className + 'fixed-table';
      scroll_guard = true;
    } else if(scroll_position < intro_size && scroll_guard){
      toc_container.className = toc_container.className.replace('fixed-table', '');
      scroll_guard = false;
    }
  }

  function getScrollTop(){
    if(typeof pageYOffset != 'undefined'){
      return pageYOffset;
    }
    else{
      var B= document.body; //IE 'quirks'
      var D= document.documentElement;
      D= (D.clientHeight)? D: B;
      return D.scrollTop;
    }
  }
})();