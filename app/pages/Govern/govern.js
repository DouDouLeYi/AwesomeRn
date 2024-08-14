import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {mTheme} from '../../theme';
import {EamNavBarView} from '../../component/TRNavbar';
import event from '../../utils/event';

export default class Govern extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const code = props.navigation.getParam('code') || '';
    this.state = {
      isBack: code.length > 0,
      isShow: code.length > 0,
      code: code,
    };
  }

  _handleOp = obj => {
    this.setState({
      isShow: true,
      code: obj?.code || '',
    });
  };
  async componentDidMount() {
    event.subscribe('onClickMore', this._handleOp);
  }
  componentWillUnmount() {
    event.unSubscribe('onClickMore', this._handleOp);
  }
  render() {
    const {isShow, code, isBack} = this.state;
    if (!isShow) return null;
    console.log(this.state);
    return (
      <View style={[mTheme.container, mTheme.bg_White]}>
        <EamNavBarView navigation={this.props.navigation} title={'EAM'} />
      </View>
    );
  }
}
Govern.navigationOptions = {
  header: null,
};
