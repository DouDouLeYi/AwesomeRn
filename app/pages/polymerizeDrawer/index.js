import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Portal from '../../component/portal';
import {mTheme, Fontsize} from '../../theme';
import {ImageRes} from '../../assets/Assets';
import {screenH, screenW} from '../../utils/ScreenUtil';

const MENU_LIST = [
  {
    name: 'APP1',
    code: 'APPLIANCE_ENUM.APPLIANCE_EAM',
    icon: ImageRes.polymerize_eam,
  },
  {
    name: 'APP2',
    code: 'APPLIANCE_ENUM.APPLIANCE_EES',
    icon: ImageRes.polymerize_chuneng,
  },
  {
    name: 'APP3',
    code: 'APPLIANCE_ENUM.APPLIANCE_SHUIXUNENG',
    icon: ImageRes.polymerize_xuneng,
  },
];

const BUTTON_WIDTH = screenW / 4 - 1;
const BUTTON_IMAGE_WIDTH = Math.min(50, BUTTON_WIDTH);

const ADrawer = function ({onClose}) {
  const [dataList, setDatList] = useState([]);
  React.useEffect(() => {
    const onData = async () => {
      setDatList([
        {
          name: '我的应用',
          code: 'yingyong',
          children: MENU_LIST,
        },
      ]);
    };
    onData();
  }, []);
  return (
    <View style={styles.container}>
      {dataList.map(item => {
        return (
          <View key={item.code + item?.name} style={styles.panel}>
            <View style={styles.header}>
              <Text style={styles.title}>{item?.name}</Text>
            </View>
            <View style={[mTheme.flex_row, styles.row]}>
              {item.children.map((m, index) => {
                const num = index % 4;
                return (
                  <TouchableOpacity
                    key={m.menuCode || m.code}
                    activeOpacity={0.8}
                    onPress={() => {
                      onClose({index: 1, item: m});
                    }}
                    style={[
                      mTheme.flex_column,
                      styles.button,
                      {alignItems: 'center'},
                    ]}>
                    <Image
                      resizeMode={'contain'}
                      style={styles.button_image}
                      source={m.icon}
                    />
                    <Text style={styles.button_title}>{m.title || m.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: screenH * 0.75,
    minHeight: 150,
    width: screenW,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 3, height: 9},
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // borderRadius: 12,
  },
  panel: {marginTop: 20},
  header: {height: 30, marginHorizontal: 20},
  title: {color: '#333333', fontSize: Fontsize.fs_16, fontWeight: '500'},
  row: {flexWrap: 'wrap'},
  button: {minWidth: BUTTON_WIDTH, height: BUTTON_IMAGE_WIDTH + 44},
  button_image: {
    height: BUTTON_IMAGE_WIDTH,
    width: BUTTON_IMAGE_WIDTH,
    marginTop: 5,
  },
  button_title: {
    textAlign: 'center',
    width: '100%',
    fontSize: Fontsize.fs_13,
    color: '#373E48',
    lineHeight: 24,
  },
});

class PolymerizeDrawer {
  __key__ = '';
  show = () => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <Portal.Trans
            isBlack
            isCancel
            ref={c => {
              this._portal = c;
            }}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve();
            }}
            style={{
              justifyContent: 'flex-end',
              overflow: 'hidden',
              alignItems: 'center',
              bottom: 80,
            }}>
            <ADrawer
              onClose={event => {
                this._portal && this._portal.cancel();
                resolve(event || {});
              }}
            />
          </Portal.Trans>,
        );
      } else {
        this._portal && this._portal.cancel();
      }
    });
  };
  dismiss = () => {
    if (this.__key__.length > 0) {
      this._portal && this._portal.cancel();
    }
  };
}

const polymerizeDrawer = new PolymerizeDrawer();
export default polymerizeDrawer;
