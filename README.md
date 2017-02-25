# d3-matrix

**d3-matrix** is an open-source JavaScript library for rendering Matrices using the D3.js library.

Check out an [Example](https://arpitnarechania.github.io/d3-matrix/) where you can test various configuration options.

# Installation

Using Bower:

```
bower install d3-matrix --save
```

To use this library then, simply include d3.js, matrix.js and matrix.css:

``` html
<script src="/path/to/d3.min.js"></script>
<script src="/path/to/dist/matrix.css"></script>
<script src="/path/to/dist/matrix.js"></script>
```

# Usage

To use this library, you must create a container element and instantiate a new
Matrix:

```html
<div id="Matrix"></div>
```

Data in .json format
``` javascript
    var data = {
        values: [[1, 0.3],
                [0.3, 1]],
        labels: ['Var 1', 'Var 2']
    };
```

Setting chart parameters
``` javascript

    var chart_options = {
        container: "#Matrix",
        show_labels : true,
        start_color : '#ffffff',
        end_color : '#3498db',
        width: 400,
        height: 400,
        margin: {top: 50, right: 50, bottom: 100, left: 100},
        highlight_cell_on_hover: true,
        highlight_cell_color: '#2ecc71'
    };

    Matrix(data,chart_options);

```

## Options

| Option                     | Description                                                               | Type     | Example
| -------------------------- | ------------------------------------------------------------------------- | -------- | ----------------------------- |
| `container`                | The DOM element id/ class to append the chart to                          | string   | `#Matrix`                     |
| `width`                    | The width of the chart in pixels                                          | number   | `900`                         |
| `height`                   | The height of the chart in pixels                                         | number   | `500`                         |
| `margin.top`               | The top margin                                                            | number   | `75`                          |
| `margin.bottom`            | The bottom margin                                                         | number   | `50`                          |
| `margin.left`              | The left margin                                                           | number   | `100`                         |
| `margin.right`             | The right margin                                                          | number   | `50`                          |
| `show_labels`              | Whether the labels are to be shown.                                       | bool     | `true`                        |
| `start_color`              | The color for the minimum value                                           | string   | `'white'`                     |
| `end_color`                | The color for the maximum value                                           | string   | `'blue'`                      |
| `highlight_cell_on_hover`  | Whether the cells are to be highlighted on mouseover                      | bool     | `true`                        |
| `highlight_cell_color`     | The color of the cells on mouseover                                       | string   | `'green'`                     |

# Author

Arpit Narechania
arpitnarechania@gmail.com

# License

MIT license.