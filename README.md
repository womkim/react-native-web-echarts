### react-native-web-echarts ([点我查看中文版](README.ZH.md))

#### Introduction
Use the chart library of [`echarts`](http://echarts.baidu.com) on [`react-native`](http://facebook.github.io/react-native/), the current method is mainly The `echarts` graphic is loaded as a web page using `react-native` `webview`.

#### Install

use `npm` install
```
npm install react-native-web-echarts --save
```
use `yarn` install（recommendation）
```
yarn add react-native-web-echarts
```

#### use

##### example

```
import React from 'react'
import { View, Text, Button } from 'react-native'
import Echarts from 'react-native-web-echarts'

export default class EcahrtsDemo extends React.Component {
  state = {
    data1: [1, 2, 3, 4],
    data2: [2, 4, 6, 8],
    data3: [1, 2, 3, 4]
  }
  render () {
    const { data1, data2, data3 } = this.state
    const option = {
      title: {
        text: 'ECharts demo'
      },
      tooltip: {},
      angleAxis: {
      },
      radiusAxis: {
        type: 'category',
        data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        z: 10
      },
      polar: {
      },
      series: [{
        type: 'bar',
        data: data1,
        coordinateSystem: 'polar',
        name: 'A',
        stack: 'a'
      }, {
        type: 'bar',
        data: data2,
        coordinateSystem: 'polar',
        name: 'B',
        stack: 'a'
      }, {
        type: 'bar',
        data: data3,
        coordinateSystem: 'polar',
        name: 'C',
        stack: 'a'
      }],
      legend: {
        show: true,
        data: ['A', 'B', 'C'],
        right: 0
      }
    }
    return <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>{'\necharts demo\n'}</Text>
        <Echarts
          option={option}
          height={300}
        />
        <Button
          title="reload"
          onPress={() => { this.setState({
            data1: Array(4).fill(0).map(_ => Math.ceil(Math.random() * (10))),
            data2: Array(4).fill(0).map(_ => Math.ceil(Math.random() * (10))),
            data3: Array(4).fill(0).map(_ => Math.ceil(Math.random() * (10)))
          })} }
        />
      </View>
    </View>
  }
}
```

##### effect
android

![android-screenshot](./screenshot-01.jpg)

##### params
- `option` The parameters of echarts are the same as those used by echarts. See [`echarts` documentation](http://echarts.baidu.com/option.html)
- `source` The source resource configuration directory, that is, the tpl resource file directory. In the default Android product model, in the `android / app / src / main / assets` directory, in other cases, use `require('./tpl.html')` according to the user's requirements. To configure the directory yourself, first copy `tpl.html` to the appropriate directory and then configure the `source` path.
- `width` (optional / default is ** 300 **) component width, which can be a number or a percentage
- `height` (optional / default **300**) component height, can be a number or a percentage
- `style` (Optional) The `style` attribute adds additional styles to the component, except that the width and height are already fixed.
- other `webview` Attributes：（Optional）
  + `onLoadStart`
  + `onLoad`
  + `onError`
  + `onLoadEnd`
  + `renderLoading`
  + `renderError`

#### Description
- The principle of the project is to create a fixed-size `webview` in the page to load the components of `echarts` in the form of web pages. All the charts are loaded with an `echarts` component in an html, according to the setting of `option` content. Different shows different graphics.
- Due to the web loading method, all graphics displays will have a certain delay.
- **Since the development mode and production mode read [different] file resources in the "Android" environment (http://blog.csdn.net/luo_xinran/article/details/71787831), the project directory mode needs to be copied in production. The `tpl.html` file in the `android / app / src / main / assets` directory will be displayed after packaging.**
- support `react-native-windows` ，reference： [example](https://github.com/jyiL/react-native-windows)
