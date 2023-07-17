    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { useNavigation } from '@react-navigation/native';

 export const StorageSave = async (key:string,value:any) => {
            try {
                await AsyncStorage.setItem(`${key}`, `${value}`);
                return true;
              } catch (e) {
                // saving error
                console.log(e);
                return false;
              }
        }
 export  const StorageGet = async (key:string) => {
          try {
           return await AsyncStorage.getItem(`${key}`);
           
          } catch(e) {
            // error reading value
            console.log(e);
            return false;
          }
        }
        
        export const StorageRemove = async () => {
            try {
                await AsyncStorage.removeItem("@app_login");
                await AsyncStorage.removeItem("@app_login_code");
                return true;
            } catch (error) {
            console.log(error);
            }
            };

            export const StorageUpdate = async (key:string,value:any) => {
              try {
                  await AsyncStorage.removeItem(`${key}`);
                  await AsyncStorage.setItem(`${key}`, `${value}`);
                  return true;
                  
              } catch (error) {
              console.log(error);
              }
              };