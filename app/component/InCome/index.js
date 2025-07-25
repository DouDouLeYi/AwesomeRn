'use strict';

import React, {PureComponent} from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import px2dp from '@utils/px2dp';
import {Colors, Fsize, ImageRes} from '#/assets/Assets';

export class LoadingComponent extends PureComponent {
  render() {
    const {customComponent, loadingStyle = {}} = this.props;
    if (customComponent) {
      return customComponent;
    }
    return (
      <View style={styles.loading}>
        <Image
          resizeMode={'contain'}
          style={[{width: px2dp(60), height: px2dp(60)}, loadingStyle]}
          source={ImageRes.loading}
        />
      </View>
    );
  }
}

export class ErrorButton extends PureComponent {
  static defaultProps = {
    retryCallBack: () => {},
  };

  render() {
    const {retryCallBack, offlineCallback, isOffLine = false} = this.props;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.reloadButton}
          onPress={() => {
            retryCallBack();
          }}>
          <Text style={{color: Colors.c_gray_5, fontSize: px2dp(13)}}>
            重新加载
          </Text>
        </TouchableOpacity>
        {isOffLine && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.offLineBtn}
            onPress={() => {
              offlineCallback();
            }}>
            <Text style={{color: Colors.White, fontSize: Fsize.fs_13}}>
              查看离线数据
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export class ErrorComponent extends PureComponent {
  render() {
    const {customComponent, errorText, errorImage, errorButton, styleError} =
      this.props;
    if (customComponent) {
      return customComponent;
    }
    return (
      <View style={[styles.error, styleError]}>
        <Image
          resizeMode={'contain'}
          style={{width: px2dp(120), height: px2dp(120)}}
          source={errorImage ? errorImage : ImageRes.no_network}
        />
        {errorText ? <Text style={styles.errortext}>{errorText}</Text> : null}
        {errorButton ? errorButton() : null}
      </View>
    );
  }
}

export class EmptyComponent extends PureComponent {
  render() {
    const {
      customComponent,
      emptyText,
      emptyImage,
      emptyImageStyle,
      emptyTextStyle,
      extraText,
      extraTextStyle,
      styleError,
    } = this.props;
    if (customComponent) {
      return customComponent;
    }
    return (
      <View style={[styles.error, styleError]}>
        {emptyImage ? (
          <Image
            resizeMode={'contain'}
            style={[{width: px2dp(60), height: px2dp(60)}, emptyImageStyle]}
            source={emptyImage}
          />
        ) : null}
        {emptyText ? (
          <Text style={emptyTextStyle ? emptyTextStyle : styles.errortext}>
            {emptyText}
          </Text>
        ) : null}
        {extraText ? (
          <Text style={extraTextStyle ? extraTextStyle : styles.errortext}>
            {extraText}
          </Text>
        ) : null}
      </View>
    );
  }
}

export class InCome extends PureComponent {
  render() {
    const {
      style,
      isLoading,
      isError,
      isEmpty,
      styleError,
      EmptyView,
      ErrorView,
      loadingStyle,
      emptyText,
      LoadingView,
      errorText,
      errorImage,
      emptyImage,
      emptyImageStyle,
      errorButton,
      emptyTextStyle,
      extraText,
      extraTextStyle,
      isNoData,
      noDataImage,
      noDataText,
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        {isLoading ? (
          <LoadingComponent
            customComponent={LoadingView}
            loadingStyle={loadingStyle}
          />
        ) : null}
        {!isLoading && isError && !isNoData ? (
          <ErrorComponent
            errorText={errorText}
            errorImage={errorImage}
            styleError={styleError}
            errorButton={errorButton}
            customComponent={ErrorView}
          />
        ) : null}
        {!isLoading && isEmpty ? (
          <EmptyComponent
            emptyTextStyle={emptyTextStyle}
            customComponent={EmptyView}
            emptyImage={emptyImage}
            emptyImageStyle={emptyImageStyle}
            emptyText={emptyText}
            extraText={extraText}
            extraTextStyle={extraTextStyle}
            styleError={styleError}
          />
        ) : null}
        {!isLoading && isNoData ? (
          <ErrorComponent
            errorText={noDataText}
            errorImage={noDataImage}
            errorButton={false}
            customComponent={ErrorView}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  loading: {flex: 1, alignItems: 'center', paddingTop: '35%'},
  error: {flex: 1, alignItems: 'center', paddingTop: '25%'},
  errortext: {
    marginTop: px2dp(25),
    fontSize: Fsize.fs_12,
    color: Colors.c_gray_3,
  },
  reloadButton: {
    height: 28,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderColor: Colors.c_gray_2,
    borderStyle: 'solid',
    borderRadius: 3,
  },
  offLineBtn: {
    height: px2dp(28),
    width: px2dp(120),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px2dp(25),
    backgroundColor: '#1E7CE8',
    borderRadius: px2dp(28),
  },
});
