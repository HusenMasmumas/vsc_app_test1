import * as React from 'react';
import {
  Animated,
  StyleProp,
  PanResponderGestureState,
  ViewStyle,
} from 'react-native';
export interface IOnLayoutEvent {
  nativeEvent: {
    layout: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}
interface IBaseItemType {
  key: string;
}
export interface IDraggableGridProps<DataType extends IBaseItemType> {
  numColumns: number;
  data: DataType[];
  renderItem: (item: DataType, order: number) => React.ReactElement<any>;
  style?: ViewStyle;
  itemHeight?: number;
  dragStartAnimation?: StyleProp<any>;
  onItemPress?: (item: DataType, position: Animated.AnimatedValueXY) => void;
  onDragStart?: (item: DataType) => void;
  onDragRelease?: (newSortedData: DataType[]) => void;
  onHandMove?: (gestureEvent: PanResponderGestureState) => void;
  dragEnabled?: boolean;
}
export interface IDraggableGridState {
  blockHeight: number;
  blockWidth: number;
  gridHeight: Animated.Value;
  activeItemIndex?: number;
  gridLayout: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  hadInitBlockSize: boolean;
  dragStartAnimatedValue: Animated.Value;
}
export declare class DraggableGrid<
  DataType extends IBaseItemType,
> extends React.Component<IDraggableGridProps<DataType>, IDraggableGridState> {
  private panResponder;
  private panResponderCapture;
  private orderMap;
  private items;
  private blockPositions;
  private activeBlockOffset;
  static defaultProps: {
    dragEnabled: boolean;
  };
  constructor(props: IDraggableGridProps<DataType>);
  private resetGridHeight;
  componentDidUpdate(nextProps: IDraggableGridProps<DataType>): void;
  componentDidUpdate(): void;
  private addItem;
  private removeItem;
  componentDidMount(): void;
  render(): JSX.Element;
  private onBlockPress;
  private getBlockStyle;
  private setActiveBlock;
  private getDragStartAnimation;
  private getDefaultDragStartAnimation;
  private startDragStartAnimation;
  private getBlockPositionByOrder;
  private assessGridSize;
  private initBlockPositions;
  private getActiveItem;
  private getDistance;
  private onStartDrag;
  private onHandMove;
  private resetBlockPositionByOrder;
  private moveBlockToBlockOrderPosition;
  private getKeyByOrder;
  private onHandRelease;
}
export {};
