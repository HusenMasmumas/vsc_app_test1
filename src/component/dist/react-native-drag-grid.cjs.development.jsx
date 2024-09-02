'use strict';

var React = require('react');
var reactNative = require('react-native');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var Block =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Block, _React$Component);

  function Block() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Block.prototype;

  _proto.render = function render() {
    return React.createElement(reactNative.Animated.View, Object.assign({
      style: [styles.blockContainer, this.props.style, this.props.dragStartAnimationStyle]
    }, this.props.panHandlers), React.createElement(reactNative.Animated.View, null, React.createElement(reactNative.TouchableWithoutFeedback, {
      onPress: this.props.onPress,
      onLongPress: this.props.onLongPress
    }, this.props.children)));
  };

  return Block;
}(React.Component);
var styles =
/*#__PURE__*/
reactNative.StyleSheet.create({
  blockContainer: {
    alignItems: 'center'
  }
});

function findKey(map, fn) {
  var keys = Object.keys(map);

  for (var i = 0; i < keys.length; i++) {
    if (fn(map[keys[i]])) {
      return keys[i];
    }
  }

  return 0;
}

function findIndex(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return i;
    }
  }

  return -1;
}

function differenceBy(arr1, arr2, key) {
  var result = [];
  arr1.forEach(function (item1) {
    var keyValue = item1[key];

    if (!arr2.some(function (item2) {
      return item2[key] === keyValue;
    })) {
      result.push(item1);
    }
  });
  return result;
}

var DraggableGrid =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DraggableGrid, _React$Component);

  function DraggableGrid(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.orderMap = {};
    _this.items = [];
    _this.blockPositions = [];
    _this.activeBlockOffset = {
      x: 0,
      y: 0
    };

    _this.resetGridHeight = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var rowCount = Math.ceil(props.data.length / props.numColumns);

      _this.state.gridHeight.setValue(rowCount * _this.state.blockHeight);
    };

    _this.addItem = function (item, index) {
      _this.blockPositions.push(_this.getBlockPositionByOrder(_this.items.length));

      _this.orderMap[item.key] = {
        order: index
      };

      _this.items.push({
        key: item.key,
        itemData: item,
        currentPosition: new reactNative.Animated.ValueXY(_this.getBlockPositionByOrder(index))
      });
    };

    _this.removeItem = function (item) {
      var itemIndex = findIndex(_this.items, function (curItem) {
        return curItem.key === item.key;
      });

      _this.items.splice(itemIndex, 1);

      _this.blockPositions.pop();

      delete _this.orderMap[item.key];
    };

    _this.getBlockStyle = function (itemIndex) {
      return [{
        justifyContent: 'center',
        alignItems: 'center'
      }, _this.state.hadInitBlockSize && {
        width: _this.state.blockWidth,
        height: _this.state.blockHeight,
        position: 'absolute',
        top: _this.items[itemIndex].currentPosition.getLayout().top,
        left: _this.items[itemIndex].currentPosition.getLayout().left
      }];
    };

    _this.setActiveBlock = function (itemIndex) {
      if (!_this.props.dragEnabled) {
        return false;
      }

      _this.panResponderCapture = true;

      _this.setState({
        activeItemIndex: itemIndex
      }, function () {
        _this.startDragStartAnimation();
      });

      return true;
    };

    _this.getDragStartAnimation = function (itemIndex) {
      if (_this.state.activeItemIndex != itemIndex) {
        return;
      }

      var dragStartAnimation;

      if (_this.props.dragStartAnimation) {
        dragStartAnimation = _this.props.dragStartAnimation;
      } else {
        dragStartAnimation = _this.getDefaultDragStartAnimation();
      }

      return _extends({
        zIndex: 3
      }, dragStartAnimation);
    };

    _this.getDefaultDragStartAnimation = function () {
      return {
        transform: [{
          scale: _this.state.dragStartAnimatedValue
        }],
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 1
        }
      };
    };

    _this.startDragStartAnimation = function () {
      if (!_this.props.dragStartAnimation) {
        _this.state.dragStartAnimatedValue.setValue(1);

        reactNative.Animated.timing(_this.state.dragStartAnimatedValue, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }
    };

    _this.getBlockPositionByOrder = function (order) {
      if (_this.blockPositions[order]) {
        return _this.blockPositions[order];
      }

      var _this$state = _this.state,
          blockWidth = _this$state.blockWidth,
          blockHeight = _this$state.blockHeight;
      var columnOnRow = order % _this.props.numColumns;
      var y = blockHeight * Math.floor(order / _this.props.numColumns);
      var x = columnOnRow * blockWidth;
      return {
        x: x,
        y: y
      };
    };

    _this.assessGridSize = function (event) {
      if (!_this.state.hadInitBlockSize) {
        var blockWidth, blockHeight;
        blockWidth = event.nativeEvent.layout.width / _this.props.numColumns;
        blockHeight = _this.props.itemHeight || blockWidth;

        _this.setState({
          blockWidth: blockWidth,
          blockHeight: blockHeight,
          gridLayout: event.nativeEvent.layout
        }, function () {
          _this.initBlockPositions();

          _this.resetGridHeight();
        });
      }
    };

    _this.initBlockPositions = function () {
      _this.items.forEach(function (_, index) {
        _this.blockPositions[index] = _this.getBlockPositionByOrder(index);
      });

      _this.items.forEach(function (item) {
        item.currentPosition.setOffset(_this.blockPositions[_this.orderMap[item.key].order]);
      });

      _this.setState({
        hadInitBlockSize: true
      });
    };

    _this.getActiveItem = function () {
      if (_this.state.activeItemIndex === undefined) return false;
      return _this.items[_this.state.activeItemIndex];
    };

    _this.getDistance = function (startOffset, endOffset) {
      var xDistance = startOffset.x + _this.activeBlockOffset.x - endOffset.x;
      var yDistance = startOffset.y + _this.activeBlockOffset.y - endOffset.y;
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    };

    _this.resetBlockPositionByOrder = function (startOrder, endOrder) {
      if (startOrder > endOrder) {
        for (var i = startOrder - 1; i >= endOrder; i--) {
          var key = _this.getKeyByOrder(i);

          _this.orderMap[key].order++;

          _this.moveBlockToBlockOrderPosition(key);
        }
      } else {
        for (var _i = startOrder + 1; _i <= endOrder; _i++) {
          var _key = _this.getKeyByOrder(_i);

          _this.orderMap[_key].order--;

          _this.moveBlockToBlockOrderPosition(_key);
        }
      }
    };

    _this.moveBlockToBlockOrderPosition = function (itemKey) {
      var itemIndex = findIndex(_this.items, function (item) {
        return item.key === itemKey;
      });

      _this.items[itemIndex].currentPosition.flattenOffset();

      reactNative.Animated.timing(_this.items[itemIndex].currentPosition, {
        toValue: _this.blockPositions[_this.orderMap[itemKey].order],
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    _this.getKeyByOrder = function (order) {
      return findKey(_this.orderMap, function (item) {
        return item.order === order;
      });
    };

    _this.panResponderCapture = false;
    _this.panResponder = reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true;
      },
      onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture() {
        return false;
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return _this.panResponderCapture;
      },
      onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture() {
        return _this.panResponderCapture;
      },
      onShouldBlockNativeResponder: function onShouldBlockNativeResponder() {
        return false;
      },
      onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
        return false;
      },
      onPanResponderGrant: _this.onStartDrag.bind(_assertThisInitialized(_this)),
      onPanResponderMove: _this.onHandMove.bind(_assertThisInitialized(_this)),
      onPanResponderRelease: _this.onHandRelease.bind(_assertThisInitialized(_this))
    });
    _this.state = {
      blockHeight: 0,
      blockWidth: 0,
      gridHeight: new reactNative.Animated.Value(0),
      hadInitBlockSize: false,
      dragStartAnimatedValue: new reactNative.Animated.Value(1),
      gridLayout: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    };
    return _this;
  }

  var _proto = DraggableGrid.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(nextProps) {
    var _this2 = this;

    if (JSON.stringify(this.props.data) === JSON.stringify(nextProps.data)) {
      return;
    }

    nextProps.data.forEach(function (item, index) {
      if (_this2.orderMap[item.key]) {
        if (_this2.orderMap[item.key].order != index) {
          _this2.orderMap[item.key].order = index;

          _this2.moveBlockToBlockOrderPosition(item.key);
        }

        var currentItem = _this2.items.find(function (i) {
          return i.key === item.key;
        });

        if (currentItem) {
          currentItem.itemData = item;
        }
      } else {
        _this2.addItem(item, index);
      }
    });
    var deleteItems = differenceBy(this.items, nextProps.data, 'key');
    deleteItems.forEach(function (item) {
      _this2.removeItem(item);
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.resetGridHeight();
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this3 = this;

    this.items = this.props.data.map(function (item, index) {
      _this3.orderMap[item.key] = {
        order: index
      };
      return {
        key: item.key,
        itemData: item,
        currentPosition: new reactNative.Animated.ValueXY()
      };
    });
  };

  _proto.render = function render() {
    var _this4 = this;

    return React.createElement(reactNative.Animated.View, {
      style: [styles$1.draggableGrid, this.props.style, {
        height: this.state.gridHeight
      }],
      onLayout: this.assessGridSize
    }, this.state.hadInitBlockSize && this.items.map(function (item, itemIndex) {
      return React.createElement(Block, {
        onPress: _this4.onBlockPress.bind(_this4, itemIndex),
        onLongPress: _this4.setActiveBlock.bind(_this4, itemIndex),
        panHandlers: _this4.panResponder.panHandlers,
        style: _this4.getBlockStyle(itemIndex),
        dragStartAnimationStyle: _this4.getDragStartAnimation(itemIndex),
        key: item.key
      }, _this4.props.renderItem(item.itemData, _this4.orderMap[item.key].order));
    }));
  };

  _proto.onBlockPress = function onBlockPress(itemIndex) {
    this.props.onItemPress && this.props.onItemPress(this.items[itemIndex].itemData, this.items[itemIndex].currentPosition);
  };

  _proto.onStartDrag = function onStartDrag(_, gestureState) {
    var activeItem = this.getActiveItem();
    if (!activeItem) return false;
    this.props.onDragStart && this.props.onDragStart(activeItem.itemData);
    var x0 = gestureState.x0,
        y0 = gestureState.y0,
        moveX = gestureState.moveX,
        moveY = gestureState.moveY;
    var activeOrigin = this.blockPositions[this.orderMap[activeItem.key].order];
    var x = activeOrigin.x - x0;
    var y = activeOrigin.y - y0;
    activeItem.currentPosition.setOffset({
      x: x,
      y: y
    });
    this.activeBlockOffset = {
      x: x,
      y: y
    };
    activeItem.currentPosition.setValue({
      x: moveX,
      y: moveY
    });
    return true;
  };

  _proto.onHandMove = function onHandMove(_, gestureState) {
    var _this5 = this;

    var activeItem = this.getActiveItem();
    this.props.onHandMove && this.props.onHandMove(gestureState);
    if (!activeItem) return false;
    var moveX = gestureState.moveX,
        moveY = gestureState.moveY;
    var xChokeAmount = Math.max(0, this.activeBlockOffset.x + moveX - (this.state.gridLayout.width - this.state.blockWidth));
    var xMinChokeAmount = Math.min(0, this.activeBlockOffset.x + moveX);
    var dragPosition = {
      x: moveX - xChokeAmount - xMinChokeAmount,
      y: moveY
    };
    var originPosition = this.blockPositions[this.orderMap[activeItem.key].order];
    var dragPositionToActivePositionDistance = this.getDistance(dragPosition, originPosition);
    activeItem.currentPosition.setValue(dragPosition);
    var closetItemIndex = this.state.activeItemIndex;
    var closetDistance = dragPositionToActivePositionDistance;
    this.items.forEach(function (item, index) {
      if (index != _this5.state.activeItemIndex) {
        var dragPositionToItemPositionDistance = _this5.getDistance(dragPosition, _this5.blockPositions[_this5.orderMap[item.key].order]);

        if (dragPositionToItemPositionDistance < closetDistance && dragPositionToItemPositionDistance < _this5.state.blockWidth) {
          closetItemIndex = index;
          closetDistance = dragPositionToItemPositionDistance;
        }
      }
    });

    if (this.state.activeItemIndex != closetItemIndex) {
      var closetOrder = this.orderMap[this.items[closetItemIndex].key].order;
      this.resetBlockPositionByOrder(this.orderMap[activeItem.key].order, closetOrder);
      this.orderMap[activeItem.key].order = closetOrder;
    }

    return true;
  };

  _proto.onHandRelease = function onHandRelease() {
    var _this6 = this;

    var activeItem = this.getActiveItem();
    if (!activeItem) return false;

    if (this.props.onDragRelease) {
      var dragReleaseResult = [];
      this.items.forEach(function (item) {
        dragReleaseResult[_this6.orderMap[item.key].order] = item.itemData;
      });
      this.props.onDragRelease(dragReleaseResult);
    }

    this.panResponderCapture = false;
    activeItem.currentPosition.flattenOffset();
    this.moveBlockToBlockOrderPosition(activeItem.key);
    this.setState({
      activeItemIndex: undefined
    });
    return true;
  };

  return DraggableGrid;
}(React.Component);
DraggableGrid.defaultProps = {
  dragEnabled: true
};
var styles$1 =
/*#__PURE__*/
reactNative.StyleSheet.create({
  draggableGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

exports.DraggableGrid = DraggableGrid;
exports.default = DraggableGrid;
//# sourceMappingURL=react-native-drag-grid.cjs.development.js.map
