import * as React from 'react';
import {StyleProp, GestureResponderHandlers} from 'react-native';
interface BlockProps {
  style?: StyleProp<any>;
  dragStartAnimationStyle: StyleProp<any>;
  onPress?: () => void;
  onLongPress: () => void;
  panHandlers: GestureResponderHandlers;
}
export declare class Block extends React.Component<BlockProps> {
  render(): JSX.Element;
}
export {};
