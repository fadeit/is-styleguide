## 'View source' and 'Copy to clipboard' for [prism.js](http://prismjs.com)

<img src="http://danmind.ru/tmp/prism-toolbar.png" alt="Prism Toolbar"/><br/>

Under the hood, this plugin uses [Zeroclipboard](http://zeroclipboard.org) (V2), which in turn uses Flash to allow copying to clipboard. Apparently, this is the only way to do it in a consistent manner. If you are not sure about it (I wasn't), you should know that [Github](https://github.com/blog/1365-a-more-transparent-clipboard-button) is also using it.

### Getting started
Include the CSS in the `<head>` of your document and the scripts before the closing `</body>` tag.

```html
<head>
...
  <link rel="stylesheet" href="assets/prism-toolbar.css">
</head>
<body>
  ...
  <script src="./assets/ZeroClipboard.min.js"></script>
  <script src="./assets/prism-toolbar.js"></script>
</body>
```

Add the class `code-toolbar` to a `pre` element to display the toolbar.

```html
<pre class="code-toolbar">
  <code>
    ...
  </code>
</pre>
```


### Gotchas
Remember to run it on a server.

### Credits
Credits to Philip Lawrence, developing the toolbar for the first time at [misterphilip.com](http://dev.misterphilip.com/prism/plugins/toolbar/)