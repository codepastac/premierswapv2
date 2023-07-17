import * as React from 'react';
import { Image,View } from 'react-native';
import { Banner } from 'react-native-paper';
import {colors,emages} from './index';
import { useNavigation } from '@react-navigation/native';

const Banners = () => {
    const [visible, setVisible] = React.useState(true);
 const navigation=useNavigation();
    return (
      <Banner style={{backgroundColor:colors.white,
        borderRadius:5,
        shadowColor: '#FFF',
       shadowOffset: { width: 0, height: 1 },
       shadowOpacity: 0.8,
       shadowRadius: 1,
      elevation: 5,
     
        
    }}
        visible={visible}
        actions={[
          {
            label: 'Verify now',
            //onPress: () => navigation.navigate('') ,
          },
          
        ]}
        icon={({size}) => (
          <View style={{
            backgroundColor:colors.lightgrey,
            borderRadius:100,
            alignItems:"center",
            justifyContent:"center",
            width:50,height:50,
            left:0,

           }}>
        <Image source={emages.Warning} style={{width:size,height:size}}/>
     </View>
        )}>
        Please verify your account with your BVN, for you to be able to enjoy more of our services.
      </Banner>
  )
}

export default Banners