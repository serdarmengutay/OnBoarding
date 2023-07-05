import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  View,
  Text,
} from 'react-native';

const COLORS = {primary: '#282534', white: '#FFF'};
const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../images/image1.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem İpsum dolor sit amet, conesctetur adipiscing elit',
  },
  {
    id: '2',
    image: require('../images/image2.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem İpsum dolor sit amet, conesctetur adipiscing elit',
  },
  {
    id: '3',
    image: require('../images/image3.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem İpsum dolor sit amet, conesctetur adipiscing elit',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item.image}
        style={{height: '75%', width}}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const OnBoardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{marginBottom: 20}}>
          <View style={{height: 50}}>
            {currentSlideIndex == slides.length - 1 ? (
              <TouchableOpacity style={[styles.btn]} onPress={() => navigation.replace('HomeScreen')}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={Skip}
                  style={[
                    styles.btn,
                    {
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: COLORS.white,
                    },
                  ]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: COLORS.white,
                    }}>
                    SKIP
                  </Text>
                </TouchableOpacity>
                <View style={{width: 15}} />
                <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };
  const Skip = () => {
    const lastSlidesIndex = slides.length - 1;
    const offset = lastSlidesIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlidesIndex);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => <Slide item={item} />}
        pagingEnabled
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'gray',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardingScreen;
