/* eslint-disable prettier/prettier */ /* eslint-disable react-hooks/exhaustive-deps */
import React = require('react');
import { View } from 'react-native';
import Text from '../../../shared/components/text/Text';
import { textTypes } from '../../../shared/components/text/textTypes';

const Administrador = () => {
   
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text type={textTypes.TITLE_BOLD}>Ainda Não há nada</Text>
      </View>
      
    );
};


export default Administrador;
