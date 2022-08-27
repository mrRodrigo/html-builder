# Simple html builder for js



```
npm i simple-html-builder
```



Each html tag has two functions, eg: using p tag:


```javascript

const html = new HtmlBuilder;

html.p(); // this function stack p tag and resolve on the build function

html.innerp(); // this function auto build and close the p tag


```

For tag functions you can pass 3 args:

- `attributes` (Object) => here you can set all params to you tag like class, style and key

- `innerContent` (String) => here you can set the inner text for this tag

- `options` (Object) => Only option is a boolean for `close`. When set this to true this tag is closed immediately and not respect the stack of tags. (works only for non "inner" functions)



For build simple html string:

```javascript

const HtmlBuilder = require('../index.js');


const html = new HtmlBuilder
    .div({ class: 'test' })
    .p({}, 'test')
    .build();

console.log(html);

//output

//<div class="test"><p>test</p></div>

```

For build html with inner tags with custom params like class and styles.

```javascript

const HtmlBuilder = require('../index.js');


const html = new HtmlBuilderhtmlBuilder
            .tr()
            .td(
              { class: 'column' },
              htmlBuilder.innerp({ class: 'larger' }, 'date'),
              { close: true }
            )
            .td(
              { class: 'column' },
              htmlBuilder.innerdiv(
                { style: 'text-align: center;' },
                htmlBuilder.innerimg({
                  width: '23',
                  src: 'src',
                })
              )
            )
            .p(
              {
                style: 'margin: 5px 0; text-align: center;',
              },
              htmlBuilder.innera(
                { class: 'link', href: 'test' },
                'test'
              ),
              { close: true }
            )
            .build();

console.log(html);

//output (formatted)

<tr>
   <td class="column">
      <p class="larger">date</p>
   </td>
   <td class="column">
      <div style="text-align: center;"><img width="23" src="src"></img></div>
      <p style="margin: 5px 0; text-align: center;"><a class="link" href="test">test</a></p>
   </td>
</tr>

```
