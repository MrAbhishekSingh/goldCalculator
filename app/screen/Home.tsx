import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  Dimensions,
  Modal,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';

const list = [
  'Sr. No.',
  'Item Name',
  'Weight(Gm.)',
  'Rate(10gm.)',
  'Making(%)',
  'Lobor',
  'Amount',
];

const CreateBill = () => {
  const [filePath, setFilePath] = useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalItem, setModalItem] = React.useState(false);
  const [amount, setAmount] = React.useState();
  const [totalAmount, setTotalAmount] = React.useState();
  const [allList, setAllList] = React.useState([]);
  const [values, setValues] = React.useState({
    ItemName: '',
    Weight: '',
    Rate: '',
    Making: '',
    Lobor: '',
    Amount: '',
  });

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (allList.length > 0) {
      var total = 0;
      for (var i = 0; allList.length > i; i++) {
        total += +allList[i].Amount;
      }
      setTotalAmount(total)
    }
  }, [allList]);

  useEffect(() => {
    if (amount) {
      setValues(values => ({
        ...values,
        Amount: amount,
      }));
    }
  }, [amount]);

  useEffect(() => {
    if (
      values.Weight !== null &&
      values.Weight !== undefined &&
      values.Weight !== ''
    ) {
      let value = values.Rate * values.Weight;
      setAmount(value);
    }
  }, [values]);

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: '<h1 style="text-align: center;"><strong strong > Hello Guys its me Abhishek</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
        fileName: 'test',
        directory: 'docs',
      };

      let file = await RNHTMLtoPDF.convert(options);
      const destinationPath = RNFS.DownloadDirectoryPath;
      const destinationFile =
        destinationPath + '/abhishek' + `${Date.now()}.pdf`;
      RNFS.copyFile(file.filePath, destinationFile).then(res => {
        console.log(destinationFile);
        setFilePath(destinationFile);
        setModalVisible(!modalVisible);
        // Alert.alert(res);
      });
      // console.log(destinationFile);
    }
  };
  const submit = () => {
    if (
      values.ItemName !== null &&
      values.ItemName !== undefined &&
      values.ItemName !== ''
    ) {
      if (
        values.Weight !== null &&
        values.Weight !== undefined &&
        values.Weight !== ''
      ) {
        if (
          values.Rate !== null &&
          values.Rate !== undefined &&
          values.Rate !== ''
        ) {
          if (
            values.Lobor !== null &&
            values.Lobor !== undefined &&
            values.Lobor !== ''
          ) {
            setAllList([...allList, values]);
            setValues('');
            setModalItem(!modalItem);
          } else {
            Alert.alert('please fill all box');
          }
        } else {
          Alert.alert('please fill all box');
        }
      } else {
        Alert.alert('please fill all box');
      }
    } else {
      Alert.alert('please fill all box');
    }
  };

  const getdata = async () => {
    var myArray = ['one', 'two', 'three', 'abhishe'];

    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(myArray));
    } catch (error) {
      // Error saving data
    }

    try {
      const myArray = await AsyncStorage.getItem('@MySuperStore:key');
      if (myArray !== null) {
        // We have data!!
        console.log('sdgsdgsdg', JSON.parse(myArray));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // useEffect( () => {
  //  getdata()
  // }, []);
  const source = {uri: filePath, cache: true};
  const {width, height} = Dimensions.get('window');
  return (
    <>
      <SafeAreaView style={{flex: 1, padding: 5, marginBottom: 5}}>
        <ScrollView h="80">
          <Box my="1" justifyContent="center" alignItems="center">
            <Text
              fontSize="md"
              fontWeight="bold"
              color="primary.900"
              letterSpacing="lg">
              Customer Detail
            </Text>
          </Box>
          <Box alignItems="center">
            <Input bg="muted.100" mb="2" placeholder="Name" w="100%" />
            <Input bg="muted.100" mb="2" placeholder="Phone No." w="100%" />
            <TextArea bg="muted.100" h={20} placeholder="Address" w="100%" />
          </Box>
          <Box
            borderRadius="3"
            my="2"
            p="2"
            flexDirection="row"
            bg="muted.100"
            shadow={3}
            justifyContent="space-between">
            <Text
              fontSize="md"
              fontWeight="medium"
              color="primary.900"
              letterSpacing="lg">
              ITEM LIST
            </Text>
            <TouchableOpacity onPress={() => setModalItem(!modalItem)}>
              <Box
                bg="success.500"
                borderRadius="3"
                paddingX="2"
                flexDirection="row">
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="primary.100"
                  marginRight="1"
                  letterSpacing="lg">
                  +
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  color="primary.100"
                  letterSpacing="lg">
                  ADD ITEM
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <Stack
            flexDirection="row"
            borderRadius="3"
            width="100%"
            // height="45%"
            height={height * 0.4}
            borderColor="muted.300"
            borderWidth="2px">
            <HStack flexDirection="column" width="30%" height="100%">
              {list.map((item, index) => (
                <Box
                  paddingLeft="2"
                  key={index}
                  flex="1"
                  justifyContent="center"
                  borderColor="muted.300"
                  borderWidth="1px">
                  <Text
                    fontSize="md"
                    fontWeight="extrabold"
                    color="primary.900">
                    {item}
                  </Text>
                </Box>
              ))}
            </HStack>
            <HStack width="70%" height="100%">
              <FlatList
                data={allList}
                horizontal
                // keyExtractor={index => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <Box key={index} width={150} flexDirection="column">
                        <Box
                          paddingLeft="2"
                          flex="1"
                          justifyContent="center"
                          borderColor="muted.300"
                          borderWidth="1px">
                          <Text
                            fontSize="md"
                            fontWeight="extrabold"
                            color="primary.900"
                            letterSpacing="lg">
                            {index + 1}
                          </Text>
                        </Box>
                        <Box
                          paddingLeft="2"
                          flex="1"
                          justifyContent="center"
                          borderColor="muted.300"
                          borderWidth="1px">
                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            color="warmGray.400"
                            letterSpacing="lg">
                            {item.ItemName}
                          </Text>
                        </Box>
                        <Box
                          paddingLeft="2"
                          flex="1"
                          justifyContent="center"
                          borderColor="muted.300"
                          borderWidth="1px">
                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            color="warmGray.400"
                            letterSpacing="lg">
                            {item.Weight}
                          </Text>
                        </Box>
                        <Box
                          paddingLeft="2"
                          flex="1"
                          justifyContent="center"
                          borderColor="muted.300"
                          borderWidth="1px">
                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            color="warmGray.400"
                            letterSpacing="lg">
                            {item.Rate}
                          </Text>
                        </Box>
                        <Box
                          paddingLeft="2"
                          flex="1"
                          justifyContent="center"
                          borderColor="muted.300"
                          borderWidth="1px">
                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            color="warmGray.400"
                            letterSpacing="lg">
                            {item.Making}
                          </Text>
                        </Box>
                        <Box
                          paddingLeft="2"
                          flex="1"
                          justifyContent="center"
                          borderColor="muted.300"
                          borderWidth="1px">
                          <Text
                            fontSize="md"
                            fontWeight="bold"
                            color="warmGray.400"
                            letterSpacing="lg">
                            {item.Lobor}
                          </Text>
                        </Box>
                        <Box
                          paddingLeft="2"
                          flex="1"
                          justifyContent="center"
                          borderColor="muted.300"
                          borderWidth="1px">
                          <Text
                            fontSize="md"
                            fontWeight="extrabold"
                            color="warmGray.800"
                            letterSpacing="lg">
                            {item.Amount}
                          </Text>
                        </Box>
                      </Box>
                    </>
                  );
                }}
              />
            </HStack>
          </Stack>
          <Box p="2" flexDirection="row" justifyContent="space-between">
            <Text
              fontSize="md"
              fontWeight="extrabold"
              color="primary.900"
              letterSpacing="lg">
              Total Amount
            </Text>
            <Text
              fontSize="md"
              fontWeight="extrabold"
              color="primary.900"
              letterSpacing="lg">
              INR {totalAmount ? totalAmount : 0}
            </Text>
          </Box>
          <Box>
            <TouchableOpacity
              onPress={() => {
                console.log('sgsd');
              }}>
              <View
                style={{
                  backgroundColor: '#22c55e',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  padding: 15,
                }}>
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  color="primary.100"
                  letterSpacing="lg">
                  Generate Bill
                </Text>
              </View>
            </TouchableOpacity>
          </Box>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalItem}
          onRequestClose={() => {
            setModalVisible(!modalItem);
          }}>
          <>
            <SafeAreaView
              style={{
                flex: 1,
                padding: 5,
                marginBottom: 5,
                backgroundColor: '#fff',
              }}>
              <ScrollView h="100">
                <Center bg="lightText" w="100%">
                  <ScrollView p="2" w="100%" py="5">
                    <Heading
                      size="lg"
                      color="coolGray.800"
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      fontWeight="semibold">
                      ITEM Details
                    </Heading>
                    <VStack space={1} mt="2">
                      <FormControl isRequired>
                        <FormControl.Label>Item Name</FormControl.Label>
                        <Input
                          value={values.ItemName}
                          onChangeText={text => handleChange('ItemName', text)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormControl.Label>{'Weight(Gm.)'}</FormControl.Label>
                        <Input
                          keyboardType="numeric"
                          value={values.Weight}
                          onChangeText={value => handleChange('Weight', value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormControl.Label>{'Rate (10gm.)'}</FormControl.Label>
                        <Input
                          keyboardType="numeric"
                          value={values.Rate}
                          onChangeText={value => handleChange('Rate', value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormControl.Label>{'Making(%)'}</FormControl.Label>
                        <Input
                          keyboardType="numeric"
                          value={values.Making}
                          onChangeText={value => handleChange('Making', value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormControl.Label>{'Lobor (Rs.)'}</FormControl.Label>
                        <Input
                          keyboardType="numeric"
                          value={values.Lobor}
                          onChangeText={value => handleChange('Lobor', value)}
                        />
                      </FormControl>

                      <Box
                        p="2"
                        flexDirection="row"
                        justifyContent="space-between">
                        <Text
                          fontSize="md"
                          fontWeight="extrabold"
                          color="primary.900"
                          letterSpacing="lg">
                          Amount
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight="extrabold"
                          color="primary.900"
                          letterSpacing="lg">
                          INR {amount ? amount : 0}
                        </Text>
                      </Box>
                      <Button onPress={() => submit()} my="2" bg="success.400">
                        <Text
                          fontSize="lg"
                          fontWeight="extrabold"
                          color="lightText"
                          letterSpacing="lg">
                          SAVE
                        </Text>
                      </Button>
                      <Button
                        bg="#ef4444"
                        onPress={() => setModalItem(!modalItem)}>
                        <Text
                          fontSize="lg"
                          fontWeight="extrabold"
                          color="lightText"
                          letterSpacing="lg">
                          CLOSE
                        </Text>
                      </Button>
                    </VStack>
                  </ScrollView>
                </Center>
              </ScrollView>
            </SafeAreaView>
          </>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default CreateBill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'stretch',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
