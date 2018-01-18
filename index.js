/**
 * Created by womkim on 2017/11/6.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, WebView } from 'react-native'

const renderChart = ({ height, option }) => `
  var main = document.getElementById('main');
  main.style.height = "${height}px";
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption(${JSON.stringify(option)});
`

export default class Echarts extends React.Component {

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(this.props.option) !== JSON.stringify(nextProps)) {
      this.echart.reload()
    }
  }

  render () {
    const { height, width, debug, style } = this.props
    return <View style={{flex: 1, height}}>
      <WebView
        ref={node => { this.echart = node }}
        style={[style, {height, width}]}
        injectedJavaScript={renderChart(this.props)}
        source={debug ? require('./tpl.html') : { uri:'file:///android_asset/tpl.html' }}
        startInLoadingState={false}
      />
    </View>
  }
}

Echarts.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  debug: PropTypes.bool,
  style: PropTypes.object,
  option: PropTypes.object.isRequired
}

Echarts.defaultProps = {
  width: '100%',
  height: 300,
  debug: true
}
