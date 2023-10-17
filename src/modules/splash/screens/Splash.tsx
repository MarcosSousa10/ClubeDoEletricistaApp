/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { ContainerSplash, ImagelogSplash } from '../styles/splash.style';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MenuUrl } from '../../../shared/components/enums/MenuUrl.enum';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import React from 'react';
const Splash = () => {
    const {reset} = useNavigation<NavigationProp<ParamListBase>>();
    useEffect(() => {
      const verifyLogin = async () =>{
        const tokens = await getAuthorizationToken();
        if (tokens){
            reset({
                index:0,
                routes:[{ name: MenuUrl.HOME}],
            });
        } else {
            reset({
                index:0,
                routes:[{ name: MenuUrl.LOGIN}],
            });
        }
      };
      verifyLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ContainerSplash >
            <ImagelogSplash
                resizeMode="contain"
                source={require('../../../assets/images/download.png')}
            />
        </ContainerSplash>);
};
export default Splash;
