import {View, FlatList, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {Text, Checkbox, ProgressBar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RenderList = React.memo(
  ({data, handleCheckPressed, handleOnUpdate, handleDelete}) => {
    // console.log('test', Math.round(Math.random() * 100, 3));
    const renderItems = ({item, index}) => (
      <View
        style={{
          marginVertical: 10,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            handleCheckPressed({id: item._id, done: !item.done});
          }}>
          <Checkbox status={item.done ? 'checked' : 'unchecked'} />
        </TouchableOpacity>
        <Pressable
          style={{flex: 8}}
          onLongPress={() => {
            handleDelete({id: item._id, txt: item.task,pri: item.value});
          }}>
          <Text
            variant="titleLarge"
            style={{
              textDecorationLine: item.done ? 'line-through' : 'none',
              color: item.done ? 'gray' : 'black',
            }}>
            {item.task}
          </Text>
          <ProgressBar
            progress={item?item.value / 10:0}
            color={item.done ? '#C8C8C8' : 'green'}
          />
        </Pressable>
        <View>
          <TouchableOpacity
            onPress={() => {
              if (item.done === false)
                handleOnUpdate({id: item._id,text: item.task,value: item.value});
            }}>
            <MaterialCommunityIcons name="pencil" color="black" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <View style={{marginVertical: 20}}>
        <FlatList
          keyExtractor={item => item._id}
          data={data}
          renderItem={renderItems}
        />
      </View>
    );
  },
);

export default RenderList;
