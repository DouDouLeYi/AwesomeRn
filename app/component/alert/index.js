/**
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {cst, px} from '@components/utils';

import {
  AlertButton,
  AlertCustom,
  AlertMessage,
  AlertTitle,
  AlertViewProps,
} from './PropsType';
import Portal from '#/component/portal';

const {Fsize} = cst;

class AlertView extends React.Component<AlertViewProps> {
  render(): React.ReactNode {
    return (
      <Portal.Opacity
        isBlack
        ref={ref => (this.alert = ref)}
        onClose={this.props.onClose}>
        <View style={styles.flex}>
          {this.props.isCancel ? (
            <TouchableOpacity
              activeOpacity={0}
              style={StyleSheet.absoluteFill}
              onPress={() => {
                this.alert && this.alert.cancel();
              }}
            />
          ) : null}
          <View style={styles.container}>
            <View style={[styles.header, this.props.header]}>
              {this.props.custom ? this.props.custom() : this.renderTitle()}
              {this.props.customMessag
                ? this.props.customMessag()
                : this.renderMessage()}
            </View>
            <View style={styles.footer}>{this.renderButton()}</View>
          </View>
        </View>
      </Portal.Opacity>
    );
  }

  renderTitle(): React.ReactNode {
    const {title, message} = this.props;
    if (!title) {
      return null;
    }
    const titleStyle = styles.title1;

    if (Array.isArray(title)) {
      return (
        title.map <
        React.ReactNode >
        ((item, index) => {
          return (
            <Text key={index} style={titleStyle}>
              {item}
            </Text>
          );
        })
      );
    }

    return <Text style={titleStyle}>{title}</Text>;
  }

  renderMessage(): React.ReactNode {
    const {message} = this.props;
    if (!message) {
      return null;
    }
    if (message) {
      let msg: string = '';
      let messageStyle = {};
      let propsMessageStyle = {};
      if (typeof message === 'string') {
        msg = message;
      } else {
        msg = message.text;
        propsMessageStyle = message.style || {};
        switch (message.align) {
          case 'justify':
            messageStyle = styles.messageJ;
            break;
          case 'center':
            messageStyle = styles.messageC;
            break;
          case 'left':
            messageStyle = styles.messageL;
            break;
          case 'right':
            messageStyle = styles.messageR;
            break;
        }
      }

      return (
        <View style={this.props.title ? styles.messageWrap : {}}>
          <Text style={[styles.message, messageStyle, propsMessageStyle]}>
            {msg}
          </Text>
        </View>
      );
    }

    return null;
  }

  renderButton(): React.ReactNode {
    const {buttons, changeData} = this.props;
    const btns: React.ReactNode[] = [];

    buttons.forEach((button, index) => {
      let buttonTextStyle = {};
      switch (button.type) {
        case 'cancel':
          buttonTextStyle = [styles.buttonTextCancel, button.style || {}];
          break;
        case 'ok':
          buttonTextStyle = [styles.buttonTextOk, button.style || {}];
          break;
      }

      if (index !== 0) {
        btns.push(<View key={100 + index} style={styles.buttonLine} />);
      }
      let manualDismiss = button.manualDismiss;
      btns.push(
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            if (manualDismiss) {
              changeData({
                index,
                button,
              });
              return;
            }
            this.alert &&
              this.alert.cancel(() => {
                if (this.props.onClose) {
                  this.props.onClose({
                    index,
                    button,
                  });
                }
              });
          }}>
          <View style={[styles.button, button?.viewStyle || {}]}>
            <Text style={[buttonTextStyle, button.style || {}]}>
              {button.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>,
      );
    });

    return btns;
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: px(500),
    borderRadius: px(5),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: px(40),
    paddingVertical: px(40),
  },
  footer: {
    flexDirection: 'row',
    borderTopColor: '#D1D9E9',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  title1: {
    fontSize: Fsize.fs_17,
    color: '#2A2A2A',
    textAlign: 'center',
    lineHeight: px(50),
  },
  messageWrap: {
    paddingTop: px(15),
  },
  message: {
    fontSize: Fsize.fs_15,
    color: '#2A2A2A',
    textAlign: 'center',
    lineHeight: px(40),
  },
  messageJ: {
    textAlign: 'justify',
  },
  messageL: {
    textAlign: 'left',
  },
  messageR: {
    textAlign: 'right',
  },
  messageC: {
    textAlign: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: px(80),
  },
  buttonLine: {
    marginTop: px(17),
    width: StyleSheet.hairlineWidth,
    height: px(47),
    backgroundColor: '#D1D9E9',
  },
  buttonTextCancel: {
    fontSize: Fsize.fs_15,
    color: '#888E95',
  },
  buttonTextOk: {
    fontSize: Fsize.fs_15,
    color: '#048DE6',
  },
});

// alert api 方法
class Alert {
  __key__: string = '';

  alert = (
    title: AlertTitle,
    buttons: AlertButton[],
    isCancel: boolean,
    isBlack: boolean,
  ): Promise => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <AlertView
            message={title}
            isCancel={isCancel}
            buttons={buttons}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve(event || {});
            }}
          />,
        );
      } else {
        reject({});
      }
    });
  };
  alertCustom = (
    custom: AlertCustom,
    buttons: AlertButton[],
    isCancel: boolean,
    isBlack: boolean,
  ): Promise => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <AlertView
            custom={custom}
            isCancel={isCancel}
            buttons={buttons}
            changeData={event => {
              resolve(event || {});
            }}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve(event || {});
            }}
          />,
        );
      } else {
        reject({});
      }
    });
  };
  alertSelectDialog = ({
    custom,
    buttons = [],
    isCancel,
    header = {},
  }): Promise => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <AlertView
            custom={custom}
            isCancel={isCancel}
            buttons={buttons}
            header={header}
            changeData={event => {
              resolve(event || {});
            }}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve(event || {});
            }}
          />,
        );
      } else {
        reject({});
      }
    });
  };
  alertCustomMessage = (
    title: AlertTitle,
    customMessag: AlertCustom,
    buttons: AlertButton,
    isCancel: boolean,
    isBlack: boolean,
    custom,
    header = {},
  ): Promise => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <AlertView
            custom={custom}
            title={title}
            customMessag={customMessag}
            isCancel={isCancel}
            buttons={buttons}
            header={header}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve(event || {});
            }}
          />,
        );
      } else {
        reject({});
      }
    });
  };
  alertMessage = (
    title: AlertTitle,
    message: AlertMessage,
    buttons: AlertButton[],
    isCancel: boolean,
    isBlack: boolean,
  ): Promise => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <AlertView
            title={title}
            message={message}
            isCancel={isCancel}
            buttons={buttons}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve(event || {});
            }}
          />,
        );
      } else {
        reject({});
      }
    });
  };
  isShow = (): void => {
    return this.__key__.length > 0;
  };
  dismiss = (): void => {
    if (this.__key__.length > 0) {
      this.__key__ = Portal.removePortal(this.__key__);
    }
  };
}

const alert = new Alert();
export default alert;
