import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      duration={500}
      className="mx-3"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] my-5 bg-white/10 "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative justify-center items-center"
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewAbleItemChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewAbleItemChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
    />
  );
};

export default Trending;
