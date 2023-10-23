/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Dimensions, Image } from 'react-native';
import { useRequest } from '../../hooks/useRequest';
import { CarrocelType } from '../../../types/CarrocelType';
import { URL_CARROCEL } from '../../constants/url';
import { MethodEnum } from '../../../enums/methods.enum';

const larguraDaTela = Dimensions.get('window').width;
const Carrossel = () => {
  const { request } = useRequest();
  const [images, setImages] = useState([]);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const imageIndexRef = useRef(0);

  useEffect(() => {
    const fetchImages = () => {
      request<CarrocelType>({
        url: `${URL_CARROCEL}`,
        method: MethodEnum.GET,
      }).then((response: any) => {
        if (response.length > 0) {
          setImages(response);
        }
      }).catch((error)=>{console.log("dsadadadsadsadadadaddadasdasdasdasdasdadadadadaa"+error)});
    };
    fetchImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const autoScroll = () => {
      if (images.length > 0 && scrollViewRef.current) {
        imageIndexRef.current = (imageIndexRef.current + 1) % images.length;
        scrollViewRef.current.scrollTo({ x: imageIndexRef.current * larguraDaTela, animated: true });
      }
    };

    const interval = setInterval(autoScroll, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {images.map((image, index) => (
        <View key={index} style={{ width: larguraDaTela , alignItems:'center' }}>
          <Image source={{ uri: image }} width={larguraDaTela - 10} style={{ width: larguraDaTela - 5, height: 90 }} />
        </View>
      ))}
    </ScrollView>
  );
};

export default Carrossel;
