'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

class index extends Component {
	static defaultProps = {
	  activeOpacity: 0.85,
	  style:{},
	  children:null,
	  disabled:false,
	  onPress:()=>{}
	}
	__isPress__ = false;
	componentWillUnmount(){
		this.timer&&clearTimeout(this.timer);
	}
	_onPress(){
		if (!this.__isPress__) {
			this.__isPress__ = true;
			this.timer = setTimeout(()=>{
				this.__isPress__  ="";
				clearTimeout(this.timer );
			}, 1000);
			this.props.onPress&&this.props.onPress()
		}
	}
  	render() {
    	return (
      		<TouchableOpacity disabled={this.props.disabled} style={this.props.style} activeOpacity={this.props.activeOpacity} onPress={()=>{
      			this._onPress()
      		}} >
      			{this.props.children}
      		</TouchableOpacity>
    	);
  	}
}

const styles = StyleSheet.create({

});


export default index;