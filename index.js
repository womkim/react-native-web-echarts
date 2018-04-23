/**
 * Created by womkim on 2017/11/6.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, WebView, Platform } from 'react-native'

const renderChart = ({ height, option }) => `
  var main = document.getElementById('main');
  main.style.height = "${height}px";
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption(${JSON.stringify(option)});
`

export default class Echarts extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(this.props.option) !== JSON.stringify(nextProps.option) || this.props.height !== nextProps.height) {
      this.echart.injectJavaScript(renderChart({ height: nextProps.height, option: nextProps.option }))
    }
  }

  render () {
    const { height, width, style, source, option, onLoadStart, onLoad, onError, onLoadEnd, onMessage, renderLoading, renderError } = this.props
    return <View style={{width, height}}>
      <WebView
        ref={node => { this.echart = node }}
        style={[style, {height, width, backgroundColor: 'transparent'}]}
        injectedJavaScript={renderChart({ height, option })}
        source={source ? source : Platform.OS === 'android' && !__DEV__ ? { uri:'file:///android_asset/tpl.html' } : require('./tpl.html')}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={false}
        decelerationRate="normal"
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onError={onError}
        onLoadEnd={onLoadEnd}
        onMessage={onMessage}
        renderLoading={renderLoading}
        renderError={renderError}
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
  style: PropTypes.object,
  source: PropTypes.object,
  option: PropTypes.object.isRequired,
  onLoadStart: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onLoadEnd: PropTypes.func,
  onMessage: PropTypes.func,
  renderLoading: PropTypes.func,
  renderError: PropTypes.func
}

Echarts.defaultProps = {
  width: 300,
  height: 300
}
